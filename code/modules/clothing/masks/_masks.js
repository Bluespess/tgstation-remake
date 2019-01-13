'use strict';
const {Component} = require('bluespess');

class MaskItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

MaskItem.template = {
	vars: {
		components: {
			"MaskItem": {
				worn_icon: 'icons/mob/mask.png',
				worn_icon_state: null, // If null, inherits from icon_state
				hide_face: false,
				internals_mask: true,
				adjusted: false
			}
		},
		icon: 'icons/obj/clothing/masks.png'
	}
};

MaskItem.depends = ["WearableItem"];
MaskItem.loadBefore = ["WearableItem"];

module.exports.components = {MaskItem};