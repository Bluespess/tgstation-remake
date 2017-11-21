'use strict';
const _slot = Symbol('_slot');
const {Component, Sound, chain_func, has_component, to_chat} = require('bluespess');
const combat_defines = require('../../defines/combat_defines.js');

class Item extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_hand = chain_func(this.a.attack_hand, this._attack_hand.bind(this));
		this.a.on("before_move", this.before_move.bind(this));
		this.a.c.Examine.examine = chain_func(this.a.c.Examine.examine, this.examine.bind(this));
	}

	attack_self() {}

	_attack_hand(prev, user) {
		if(has_component(user, "MobInventory")) {
			var slot = user.c.MobInventory.slots[user.c.MobInventory.active_hand];
			if(slot.item != null || !slot.can_accept_item(this.a))
				return prev();
			slot.item = this.atom;
			return;
		}
		return prev();
	}

	get slot() {
		return this[_slot];
	}

	before_move() {
		if(this.slot) {
			this.slot.item = null;
		}
	}

	examine(prev, user) {
		prev();
		to_chat`${this.a.gender == "plural" ? "They are" : "It is"} a ${this.get_size_text()} item.`(user);
	}

	get_size_text() {
		switch(this.size) {
		case 1:
			return "tiny";
		case 2:
			return "small";
		case 3:
			return "normal-sized";
		case 4:
			return "bulky";
		case 5:
			return "huge";
		case 6:
			return "gigantic";
		}
	}

	get_attack_volume() {
		if(this.size) {
			if(this.force)
				return Math.min(Math.max((this.force + this.w_class) * 0.04, 0.3), 1);
			else
				return Math.min(Math.max(this.w_class * 0.06, 0.1), 1);
		}
	}

	pre_attack() {}

	after_attack() {}

	melee_attack_chain(user, target, e) {
		if(!this.pre_attack(target, user, e)) {
			let resolved = target.attack_by(this.a, user, e);
			if(!resolved && !target.destroyed && !this.a.destroyed) {
				this.after_attack(target, user, true, e);
			}
		}
	}

	attack(target, user) {
		if(this.no_bludgeon)
			return;
		if(!this.force)
			new Sound(this.a.server, {path: 'sound/weapons/tap.ogg', volume: this.get_attack_volume(), vary: true}).emit_from(this.a);
		else
			new Sound(this.a.server, {path: this.hitsound, volume: this.get_attack_volume(), vary: true}).emit_from(this.a);

		target.c.Mob.last_attacker_key = user.c.Mob.key;

		user.c.Tangible.do_attack_animation(target);
		target.c.Tangible.attacked_by(this.a, target);

		// TODO logs and fingerprints
	}

	attack_obj(target, user) {
		if(this.no_bludgeon)
			return;
		user.c.MobInteract.change_next_move(combat_defines.CLICK_CD_MELEE);
		user.c.Tangible.do_attack_animation(target);
		target.c.Destructible.attacked_by(this.a, user);
	}
}
Item.depends = ["Tangible"];
Item.loadBefore = ["Tangible"];

Item.IS_BLUNT = 0;
Item.IS_SHARP = 1;
Item.IS_SHARP_ACCURATE = 2;

Item.template = {
	vars: {
		components: {
			Item: {
				inhand_lhand_icon: 'icons/mob/inhands/items_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/items_righthand.png',
				size: 3,
				sharpness: Item.IS_BLUNT,
				force: 0,
				damage_type: "brute"
			}
		},
		icon: 'icons/obj/items.png',
		layer:3,
		bounds_x: 0.375,
		bounds_y: 0.375,
		bounds_width: 0.125,
		bounds_height: 0.125
	}
};

module.exports.templates = {
	"cablecuffs": {
		components: ["Item"],
		vars: {
			icon: 'icons/obj/items_and_weapons.png',
			icon_state: "cuff",
			components: {
				"Item": {
					inhand_lhand_icon: 'icons/mob/inhands/equipment/tools_lefthand.png',
					inhand_rhand_icon: 'icons/mob/inhands/equipment/tools_righthand.png',
					inhand_icon_state: "coil_red"
				}
			}
		}
	}
};

module.exports.symbols = {_slot};
module.exports.components = {Item};
