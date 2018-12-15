'use strict';
const {Component, Atom, make_watched_property, chain_func, to_chat} = require('bluespess');

class EnergyGun extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(this.cell_type)
			this.cell = new Atom(this.a.server, this.cell_type, this.a);

		this.ammo_type = [...this.ammo_type];
		for(let i = 0; i < this.ammo_type.length; i++) {
			this.ammo_type[i] = new Atom(this.a.server, this.ammo_type[i], this.a);
		}


		this.on("select_changed", this.select_changed.bind(this));
		this.on("cell_changed", this.cell_changed.bind(this));
		this.cell_charge_changed = this.cell_charge_changed.bind(this);
		this.a.c.Gun.can_shoot = chain_func(this.a.c.Gun.can_shoot, this.can_shoot.bind(this));
		this.a.c.Gun.process_chamber = chain_func(this.a.c.Gun.process_chamber, this.process_chamber.bind(this));
		this.a.c.Item.attack_self = this.attack_self.bind(this);
		this.a.c.Rechargeable.check_can_charge = this.check_can_charge.bind(this);
		this.a.c.Rechargeable.recharge = this.recharge.bind(this);

		make_watched_property(this, "select", "number");
		make_watched_property(this, "cell");
	}

	update_charge_overlay() {
		let cell_charge = this.cell ? this.cell.c.PowerCell.charge : 0;
		let cell_max_charge = this.cell ? this.cell.c.PowerCell.max_charge : 1000;
		let ratio = Math.ceil((cell_charge / cell_max_charge) * this.charge_sections);
		let shot = this.ammo_type[this.select];
		let select_suffix = "";
		if(this.select_icon) {
			select_suffix = `_${shot.c.EnergyLens.select_name}`;
			this.a.overlays.energy_select_icon = {icon_state: `[parent]${select_suffix}`};
		}
		if(cell_charge < shot.c.EnergyLens.e_cost) {
			this.a.overlays.energy_charge = {icon_state: `[parent]_empty`};
			for(let i = 0; i < this.charge_sections; i++) {
				this.a.overlays[`energy_csection_${i}`] = null;
			}
		} else {
			if(this.shaded_charge) {
				this.a.overlays.energy_charge = {icon_state: `[parent]_charge${ratio}`};
			} else {
				for(let i = 0; i < this.charge_sections; i++) {
					if(i >= ratio) {
						this.a.overlays[`energy_csection_${i}`] = null;
					} else {
						this.a.overlays[`energy_csection_${i}`] = {
							icon_state: `[parent]_charge${select_suffix}`,
							offset_x: this.charge_x_offset * i,
							offset_y: this.charge_y_offset * i
						};
					}
				}
				this.a.overlays.energy_charge = null;
			}
		}
		if(!this.a.template.vars.components.Item.inhand_icon_state) {
			this.a.c.Item.inhand_icon_state = this.a.icon_state + (shot.c.EnergyLens.select_name || "") + ratio;
		}
	}

	process_chamber(prev) {
		prev();
		if(this.a.c.Gun.chambered) {
			this.cell.c.PowerCell.use(this.ammo_type[this.select].c.EnergyLens.e_cost);
		}
	}

	can_shoot(prev) {
		let shot = this.ammo_type[this.select];
		if(!shot || !this.cell)
			return false;
		if(this.cell.c.PowerCell.charge < shot.c.EnergyLens.e_cost)
			return false;
		return prev();
	}

	cell_charge_changed() {
		this.update_charge_overlay();
	}

	cell_changed(from, to) {
		if(from) {
			from.c.PowerCell.removeListener("charge_changed", this.cell_charge_changed);
		}
		if(to) {
			to.c.PowerCell.on("charge_changed", this.cell_charge_changed);
		} else if(from) {
			this.cell_charge_changed(from.c.PowerCell.charge, 0);
		}
	}

	attack_self(user) {
		if(this.ammo_type.length > 1) {
			this.select++;
			let shot = this.a.c.Gun.chambered;
			if(shot && shot.c.EnergyLens.select_name) {
				to_chat`<span class='notice'>The ${this.a} is now set to ${shot.c.EnergyLens.select_name}.</span>`(user);
			}
		}
	}

	select_changed(from, to) {
		if(this.ammo_type.length <= 0)
			return; // this shouldn't happen
		if(to >= this.ammo_type.length) {
			this.select -= this.ammo_type.length;
			return;
		}
		else if(to < 0) {
			this.select += this.ammo_type.length;
			return;
		}
		let shot = this.ammo_type[to];
		this.a.c.Gun.fire_sound = shot.c.AmmoCasing.fire_sound;
		// TODO delay
		this.a.c.Gun.chambered = shot;
		this.a.c.Gun.update_icon();
		this.update_charge_overlay();
	}

	check_can_charge(user) {
		if(!this.can_charge) {
			to_chat`<span class='notice'>Your gun has no external power connector</span>`(user);
			return false;
		}
		return true;
	}
	recharge(recharger, dt) {
		let recharge_coeff = recharger.c.Recharger.recharge_coeff;
		if(this.cell.c.PowerCell.charge < this.cell.c.PowerCell.max_charge) {
			// fun fact rechargers multiply your energy by like a thousand.
			// not very realistic but meh, I'll keep it over from byond tg
			let diff = Math.min((this.cell.c.PowerCell.max_charge - this.cell.c.PowerCell.charge), this.cell.c.PowerCell.charge_rate * recharge_coeff * dt, recharger.c.ApcPowered.get_available_power());
			diff = this.cell.c.PowerCell.give(diff);
			recharger.c.ApcPowered.use_power(diff);
			return true;
		} else {
			return false;
		}
	}
}

EnergyGun.loadBefore = ["Gun", "Rechargeable"];
EnergyGun.depends = ["Gun", "Rechargeable"];

EnergyGun.template = {
	vars: {
		components: {
			"EnergyGun": {
				cell_type: "cell",
				ammo_type: ["energy_lens"],
				select: 0,
				charge_sections: 4,
				shaded_charge: false,
				charge_x_offset: 2/32,
				charge_y_offset: 0,
				select_icon: false,
				can_charge: true,
				selfcharge: false //TODO: Actually implement this. Currently a placeholder.
			},
			"Examine": {
				desc: "A basic energy-based gun."
			}
		},
		name: "energy",
		icon: 'icons/obj/guns/energy.png',
		icon_state: "energy"
	}
};

module.exports.templates = {
	"test_egun": {
		components: ["EnergyGun"]
	}
};

module.exports.components = {EnergyGun};
