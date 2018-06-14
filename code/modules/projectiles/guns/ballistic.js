'use strict';
const {Component, Atom, has_component, chain_func, to_chat} = require('bluespess');

class BallisticGun extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.magazine = null;

		this.a.c.Gun.update_icon = chain_func(this.a.c.Gun.update_icon, this.update_icon.bind(this));
		this.a.c.Gun.process_chamber = chain_func(this.a.c.Gun.process_chamber, this.process_chamber.bind(this));
		this.a.c.Examine.examine = chain_func(this.a.c.Examine.examine, this.examine.bind(this));

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
				ammo.loc = this.a.fine_loc;
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

	update_icon(prev) {
		prev();
		this.a.icon_state = `${this.a.template.vars.icon_state}${this.a.c.Gun.suppressed ? '-suppressed' : ''}`;
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
				mag_caliber: "m10mm",
				max_mag_size: 3,
				casing_ejector: true,
				keep_casing: false
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

module.exports.templates = {
	"test_gun": { // TODO remove this when we have real guns that aren't test ones
		components: ["BallisticGun"]
	}
}
module.exports.components = {BallisticGun};
