'use strict';
const {Component} = require('bluespess');
const _ = require('underscore');

class HandItem extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(this.siemens_coefficient instanceof Array)
			this.siemens_coefficient = _.sample(this.siemens_coefficient);
	}
}

HandItem.template = {
	vars: {
		components: {
			"HandItem": {
				worn_icon: 'icons/mob/hands.png',
				worn_icon_state: null, // If null, inherits from icon_state
				siemens_coefficient: 0.5
			},
			"Item": {
				size: 2
			}
		},
		gender: "plural",
		icon: 'icons/obj/clothing/gloves.png'
	}
};

HandItem.depends = ["WearableItem"];
HandItem.loadBefore = ["WearableItem"];

module.exports.components = {HandItem};
