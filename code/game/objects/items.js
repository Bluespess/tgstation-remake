'use strict';
const _slot = Symbol('_slot');
const {Component, chain_func} = require('bluespess');

class Item extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.atom.attack_hand = chain_func(this.atom.attack_hand, this._attack_hand.bind(this));
	}

	attack_self() {}

	_attack_hand(prev, user) {
		if(this.atom.server.has_component(user, "MobInventory")) {
			var slot = user.components.MobInventory.slots[user.components.MobInventory.active_hand];
			if(slot.item != null)
				return prev();
			slot.item = this.atom;
			return;
		}
		return prev();
	}

	get slot() {
		return this[_slot];
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
		appearance: {
			icon: 'icons/obj/items.png',
			layer:3
		}
	}
};

module.exports.templates = {
	"cablecuffs": {
		components: ["Item"],
		vars: {
			icon: 'icons/obj/items.png',
			icon_state: "cuff_red",
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
