'use strict';
const {Component} = require('bluespess');

//TODO: var/fire_resist = T0C+100
//TODO: /obj/item/clothing/suit/worn_overlays(isinhands = FALSE)
//TODO: /obj/item/clothing/suit/update_clothes_damaged_state(damaging = TRUE)
//TODO: Update the suit_storage_whitelist once internals are added

class SuitItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

SuitItem.template = {
	vars: {
		components: {
			"SuitItem": {
				worn_icon: 'icons/mob/suit.png',
				worn_icon_state: null, // If null, inherits from inhand_icon_state //*ACTUALLY* icon_state: this[_item].c[this.props.clothing_slot].worn_icon_state || this[_item].icon_state,
				suit_storage_blacklist: [], // components you can or can't put in the suit storage slot
				suit_storage_whitelist: [],
				blood_overlay_type: "suit", //currently useless
				toggle_name: null //also useless
			},
		},
		icon: 'icons/obj/clothing/suits.png',
		name: "suit"
	}
};

SuitItem.depends = ["WearableItem"];
SuitItem.loadBefore = ["WearableItem"];

module.exports.components = {SuitItem};
