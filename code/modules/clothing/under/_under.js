'use strict';
const {Component} = require('bluespess');

class UniformItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

UniformItem.template = {
	vars: {
		components: {
			"UniformItem": {
				worn_icon: 'icons/mob/uniform.png',
				worn_icon_state: null, // If null, inherits from inhand_icon_state
				body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
				fitted: "female_uniform_full"
			},
			"WearableItem": {
				permeability_coefficient: 0.9
			}
		},
		icon: 'icons/obj/clothing/uniforms.png',
		name: "under"
	}
};

UniformItem.depends = ["WearableItem"];
UniformItem.loadBefore = ["WearableItem"];

module.exports.components = {UniformItem};
