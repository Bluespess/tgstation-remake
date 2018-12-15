'use strict';
const {Component, Atom, Sound, has_component, chain_func, to_chat} = require('bluespess');

class BallisticGun extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.magazine = null;

		this.a.c.Gun.update_icon = chain_func(this.a.c.Gun.update_icon, this.update_icon.bind(this));
		this.a.c.Gun.process_chamber = chain_func(this.a.c.Gun.process_chamber, this.process_chamber.bind(this));
		this.a.c.Examine.examine = chain_func(this.a.c.Examine.examine, this.examine.bind(this));
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Item.attack_self = this.attack_self.bind(this);

		if(this.spawn_mag) {
			this.magazine = new Atom(this.a.server, this.spawn_mag);
			this.chamber_round();
		}
		this.a.c.Gun.update_icon();
	}

	process_chamber(prev) {
		prev();
		let ammo = this.a.c.Gun.chambered;
		if(has_component(ammo, "AmmoCasing")) {
			if(this.casing_ejector) {
				ammo.loc = this.a.base_mover.fine_loc;
				ammo.move(Math.random() - 0.5, Math.random() - 0.5, "placement");
				this.a.c.Gun.chambered = null;
			} else if(!this.keep_casing) {
				ammo.destroy();
				this.a.c.Gun.chambered = null;
			}
		}
		this.chamber_round();
	}

	chamber_round() {
		if(this.a.c.Gun.chambered || !this.magazine)
			return;
		else if(this.magazine.c.AmmoBox.ammo_count()) {
			this.a.c.Gun.chambered = this.magazine.c.AmmoBox.get_round();
			this.a.c.Gun.chambered.loc = this.a;
		}
	}

	attack_by(prev, item, user) {
		if(has_component(item, "GunMagazine") && !has_component(item, "InternalMagazine") && this.mag_caliber == item.c.AmmoBox.caliber && this.mag_form_factor == item.c.AmmoBox.form_factor) {
			if(this.magazine && !this.tactical_reloads) {
				to_chat`<span class='notice'>There's already a magazine in the ${this.a}.</span>`(user);
				return true;
			}
			if(!item.slot || item.slot.can_unequip()) {
				if(this.magazine) {
					to_chat`<span class='notice'>You perform a tactical reload on the ${this.a}, replacing the magazine.</span>`(user);
					this.magazine.c.AmmoBox.update_icon();
					this.magazine.loc = this.a.base_mover.fine_loc;
				} else {
					to_chat`<span class='notice'>You insert the magazine into the ${this.a}.</span>`(user);
				}

				if(this.reload_sound)
					new Sound(this.a.server, {path: this.reload_sound, volume: 0.6, vary: true}).emit_from(user);
				this.magazine = item;
				item.loc = this.a;
				this.chamber_round();
				this.a.c.Gun.update_icon();
				return true;
			} else {
				to_chat`<span class='warning'>You cannot seem to get the ${this.a} out of your hands!</span>`(user);
				return true;
			}
		}
		return prev();
	}

	attack_self(user) {
		if(this.magazine) {
			this.magazine.loc = this.a.base_mover.fine_loc;
			user.c.MobInventory.put_in_hands(this.magazine);
			this.magazine.c.AmmoBox.update_icon();
			this.magazine = null;
			to_chat`<span class='notice'>You pull the magazine out of the ${this.a}.</span>`(user);
		} else if(this.a.c.Gun.chambered) {
			this.a.c.Gun.chambered.loc = this.a.base_mover.fine_loc;
			this.a.c.Gun.chambered = null;
			to_chat`<span class='notice'>You unload the round from the ${this.a}'s chamber.</span>`(user);
		} else {
			to_chat`<span class='notice'>There's no magazine in the ${this.a}.</span>`(user);
		}
		this.a.c.Gun.update_icon();
	}

	update_icon(prev) {
		prev();
		let state = this.a.template.vars.icon_state;
		if(this.empty_state && !this.a.c.Gun.chambered)
			state += '-e';
		if(this.a.c.Gun.suppressed)
			state += '-suppressed';
		this.a.icon_state = state;
	}
	examine(prev, user) {
		prev();
		let ammo_count = this.get_ammo();
		to_chat`It has ${ammo_count} round${ammo_count == 1 ? '' : 's'} remaining.`(user);
	}

	get_ammo({count_chambered = true} = {}) {
		let boolets = 0;
		if(this.a.c.Gun.chambered && count_chambered)
			boolets++;
		if(this.magazine)
			boolets += this.magazine.c.AmmoBox.ammo_count();
		return boolets;
	}
}

BallisticGun.loadBefore = ["Gun"];
BallisticGun.depends = ["Gun"];

BallisticGun.template = {
	vars: {
		components: {
			"BallisticGun": {
				spawn_mag: "mag_m10mm",
				mag_caliber: "10mm",
				mag_form_factor: "pistol",
				max_mag_size: 3,
				casing_ejector: true,
				keep_casing: false,
				tactical_reloads: false,
				reload_sound: null,
				can_suppress: false,
				can_unsuppress: true,
				empty_state: true,
				mag_state: true
			},
			"Item": {
				size: 3
			},
			"Examine": {
				desc: "Now comes in flavors like GUN. Uses 10mm ammo, for some reason."
			}
		},
		name: "projectile gun",
		icon_state: "pistol"
	}
};

module.exports.components = {BallisticGun};
