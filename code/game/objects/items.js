'use strict';
const _slot = Symbol('_slot');
const {Component, chain_func} = require('bluespess');

class Item extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_hand = chain_func(this.a.attack_hand, this._attack_hand.bind(this));
		this.a.on("before_move", this.before_move.bind(this));
	}

	attack_self() {}

	_attack_hand(prev, user) {
		if(this.a.server.has_component(user, "MobInventory")) {
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
			var old_loc = this.a.fine_loc;
			this.slot.item = null;
			this.a.fine_loc = old_loc;
		}
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
				sharpness: Item.IS_BLUNT
			}
		},
		icon: 'icons/obj/items.png',
		layer:3
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
					inhand_icon_state: "coil_red"
				}
			}
		}
	}
};

module.exports.symbols = {_slot};
module.exports.components = {Item};
