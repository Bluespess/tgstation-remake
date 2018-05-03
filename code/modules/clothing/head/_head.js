'use strict';
const {Component} = require('bluespess');

class HeadItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}
//TODO: Handle that dynamic_hair_suffix crap
//TODO: Toggling
//TODO: Possibly handle block_tracking? Dunno how that one works
//TODO: /obj/item/clothing/head/Initialize()
//TODO: /obj/item/clothing/head/worn_overlays(isinhands = FALSE)
//TODO: /obj/item/clothing/head/update_clothes_damaged_state(damaging = TRUE)

HeadItem.template = {
	vars: {
		components: {
			"HeadItem": {
				worn_icon: 'icons/mob/head.png',
				worn_icon_state: null, // If null, inherits from inhand_icon_state //*ACTUALLY* icon_state: this[_item].c[this.props.clothing_slot].worn_icon_state || this[_item].icon_state,
				block_tracking: false, //for AI tracking
				can_toggle: false,
				dynamic_hair_suffix: "+generic"
			},
			"WearableItem": {
				body_parts_covered: ['head']
			},
			"Item": {
				inhand_icon_state: "that",
			},
		},
		icon: 'icons/obj/clothing/hats.png',
		name: "head"
	}
};

HeadItem.depends = ["WearableItem"];
HeadItem.loadBefore = ["WearableItem"];

module.exports.components = {HeadItem};
