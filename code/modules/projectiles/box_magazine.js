'use strict';
const {Component, Atom, chain_func, has_component, Sound, to_chat} = require('bluespess');

class AmmoBox extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Item.attack_self = this.attack_self.bind(this);
		if(!this.start_empty) {
			for(let i = 1; i <= this.max_ammo; i++) {
				this.stored_ammo += new Atom(this.a.server, this.ammo_type, this.a);
			}
		}
		this.update_icon();
	}

	update_icon() {
		switch (this.multiple_sprites) {
		case 1:
			this.a.icon_state = `${this.template.vars.icon_state}-${this.stored_ammo.length}`;
			break;
		case 2:
			this.a.icon_state = `${this.template.vars.icon_state}-${this.stored_ammo.length ? `${this.max_ammo}` : `0`}`;
			break;
		}
		this.a.c.Examine.desc = `${this.template.vars.components.Examine.desc} There are ${this.stored_ammo.length} shell${this.stored_ammo.length == 1 ? "" : "s"} left.`;
	}

	get_round(keep = false) {
		if(!this.stored_ammo.length) {
			return null;
		}
		let round = this.stored_ammo[this.stored_ammo.length];
		if(!keep) {
			this.stored_ammo -= round;
		}
		return round;
	}

	give_round(ammo_casing, replace_spent = false) {
		// Boxes don't have a caliber type, magazines do. Not sure if it's intended or not, but if we fail to find a caliber, then we fall back to ammo_type.
		if(!ammo_casing || (this.caliber && ammo_casing.caliber != this.caliber) || (!this.caliber && ammo_casing.template != this.ammo_type)) { //TODO: no fucking clue if "ammo_casing.template != this.ammo_type" works or is correct
			return false;
		}

		if(this.stored_ammo.length < this.max_ammo) {
			this.stored_ammo += ammo_casing;
			ammo_casing.loc = this.a;
			return true;
		} else if (replace_spent) { //for accessibles magazines (e.g internal ones) when full, start replacing spent ammo
			for(let casing in this.stored_ammo) {
				if(!casing.BB) { //Spent ammo. //TODO: This is "var/obj/item/projectile/BB" on "/obj/item/ammo_casing". Make sure it's still correct once casings are coded.
					this.stored_ammo -= casing;
					casing.loc = this.a.loc;

					this.stored_ammo += ammo_casing;
					ammo_casing.loc = this.a;
					return true;
				}
			}
		}
		return false;
	}

	can_load(/*user*/) {
		return true;
	}

	ammo_count() {
		return this.stored_ammo.length;
	}

	empty_magazine() {
		for(let ammo in this.stored_ammo) {
			ammo.loc = this.a.loc;
			this.stored_ammo -+ ammo;
		}
	}

	attack_by(prev, item, user, {silent = false, replace_spent = false} = {}) {
		let num_loaded = 0;
		if(!this.can_load(user)) {
			return;
		}
		if(has_component(item, "AmmoBox")) {
			for(let casing in item.stored_ammo) {
				let did_load = this.give_round(casing, replace_spent);
				if(did_load) {
					item.stored_ammo -= casing;
					num_loaded++;
				}
				if(!did_load || !this.multiload) {
					break;
				}
			}
			item.update_icon();
		}
		if(has_component(item, "AmmoCasing")) { //TODO: Make sure this is correct once ammo casings are coded
			if(this.give_round(item, replace_spent)) {
				item.loc = this.a;
				num_loaded++;
			}
		}
		if(num_loaded) {
			if(!silent) {
				to_chat`<span class='notice'>You load ${num_loaded} shell${this.num_loaded == 1 ? "" : "s"} into the ${this.a}!</span>`(user);
				new Sound(this.a.server, {path: 'sound/weapons/bulletinsert.ogg', volume: 0.6, vary: true}).emit_from(user);
			}
		}
		this.update_icon();
		return prev();
	}

	attack_self(user) {
		let casing = this.get_round();
		if(casing) {
			user.put_in_hands(casing);
			to_chat`<span class='notice'>You remove a round from the ${this.a}!</span>`(user);
			new Sound(this.a.server, {path: 'sound/weapons/bulletremove.ogg', volume: 0.6, vary: true}).emit_from(user);
			this.update_icon();
		}
	}
}

AmmoBox.depends = ["Item"];
AmmoBox.loadBefore = ["Item"];

AmmoBox.template = {
	vars: {
		components: {
			"AmmoBox": {
				stored_ammo: [],
				ammo_type: "AmmoCasing", //TODO: Replace this with whatever eventually becomes the equivalent of /obj/item/ammo_casing
				max_ammo: 7,
				multiple_sprites: 0,
				caliber: null,
				multiload: true,
				start_empty: false
			},
			"Item": {
				force: 2,
				throw_speed: 3,
				throw_range: 7,
				attack_verb: ["pinched", "nipped"],
				size: 1,
				hitsound: 'sound/items/wirecutter.ogg',
				inhand_lhand_icon: 'icons/mob/inhands/equipment/medical_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/medical_righthand.png',
				inhand_icon_state: "syringe_kit",
				//TODO flags_1 = CONDUCT_1
				//TODO slot_flags = SLOT_BELT
				materials: {"metal": 30000},
			},
			"Examine": {
				desc: "A box of ammo."
			}
		},
		icon: 'icons/obj/ammo.png',
		icon_state: "357",
		name: "ammo box (null_reference_exception)"
	}
};

module.exports.templates = {
	"ammo_box": {
		components: ["AmmoBox"],
		tree_paths: ["items/ammo_box"]
	},
};

module.exports.components = {AmmoBox};
