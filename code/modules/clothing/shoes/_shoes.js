'use strict';
const {Component} = require('bluespess');

class FootItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

FootItem.template = {
	vars: {
		components: {
			"FootItem": {
				worn_icon: 'icons/mob/feet.png',
				worn_icon_state: null // If null, inherits from inhand_icon_state
			},
			"Describe": {
				desc: "comfortable-looking shoes."
			}
		},
		name: "shoes",
		icon: 'icons/obj/clothing/shoes.png',
		gender: "plural"
	}
};

FootItem.depends = ["WearableItem"];
FootItem.loadBefore = ["WearableItem"];

module.exports.components = {FootItem};
