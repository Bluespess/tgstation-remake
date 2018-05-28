'use strict';
const {Component, Atom, chain_func, has_component, to_chat} = require('bluespess');
const _ = require('underscore');

class AmmoCasing extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		if(this.projectile_type) {
			this.projectile = new Atom(this.a.server, this.projectile_type, this.a);
		}
		this.a.once("moved", () => { //TODO: pixel offsets
			this.a.dir = _.sample([1,2,4,8,5,6,9,10]);
		});
		this.update_icon();
	}

	update_icon() {
		this.a.icon_state = `${this.a.template.vars.icon_state}${this.projectile ? `-live` : ``}`;
		this.a.c.Examine.desc = `${this.a.template.vars.components.Examine.desc}${this.projectile ? `` : ` This one is spent.`}`;
	}

	newshot() { //proc to magically refill a casing with a new projectile. For energy weapons, syringe gun, shotgun shells and wands (!).
		if(!this.projectile) {
			this.projectile = new Atom(this.a.server, this.projectile_type, this.a);
		}
	}

	attack_by(prev, item, user) {
		if(has_component(item, "AmmoBox")) {
			if(this.a.loc && this.a.loc.is_base_loc) {
				let boolets = 0;
				for(let bullet of this.a.loc.contents) {
					if(has_component(bullet, "AmmoCasing")) {
						if(item.c.AmmoBox.stored_ammo && item.c.AmmoBox.stored_ammo.length >= item.c.AmmoBox.max_ammo) {
							break;
						}
						if(bullet.c.AmmoCasing.projectile) {
							if(item.c.AmmoBox.give_round(bullet, 0)) {
								boolets++;
							}
						} else {
							continue;
						}
					}
				}
				if(boolets > 0) {
					item.c.AmmoBox.update_icon();
					to_chat`<span class='notice'>You collect ${boolets} shell${boolets == 1 ? "" : "s"}. The ${this.a} now contains ${item.c.AmmoBox.stored_ammo.length} shell${item.c.AmmoBox.stored_ammo.length == 1 ? `` : `s`}</span>`(user);
				} else {
					to_chat`<span class='warning'>You fail to collect anything!</span>`(user);
				}
			}
		} else {
			return prev();
		}
	}
}

AmmoCasing.depends = ["Item"];
AmmoCasing.loadBefore = ["Item"];

AmmoCasing.template = {
	vars: {
		components: {
			"AmmoCasing": {
				fire_sound: null, //What sound should play when this ammo is fired
				caliber: null, //Which kind of guns it can be loaded into
				projectile_type: null, //The bullet type to create when New() is called
				projectile: null, //The loaded bullet. Renamed from TG's "BB".
				pellets: 1, //Pellets for spreadshot
				variance: 0, //variance for inaccuracy fundamental to the casing
				randomspread: 0, //Randomspread for automatics
				delay: 0, //Delay for energy weapons
				click_cooldown_override: 0, //Override this to make your gun have a faster fire rate, in tenths of a second. 4 is the default gun cooldown.
				firing_effect_type: null, //the visual effect appearing when the ammo is fired. //TODO: set this to /obj/effect/temp_visual/dir_setting/firing_effect once that exists
				casing_type: "ammo_casing" //Literally just the template name. Require because of how TG's whole ammo box/ammo casing/etc system is setup
			},
			"Item": {
				force: 0,
				size: 1,
				//TODO flags_1 = CONDUCT_1
				//TODO slot_flags = SLOT_BELT
			},
			"Examine": {
				desc: "A bullet casing."
			}
		},
		icon: 'icons/obj/ammo.png',
		icon_state: "s-casing",
		name: "bullet casing"
	}
};

module.exports.templates = {
	"ammo_casing": {
		components: ["AmmoCasing"],
		tree_paths: ["items/ammo_casing"]
	},
};

module.exports.components = {AmmoCasing};
