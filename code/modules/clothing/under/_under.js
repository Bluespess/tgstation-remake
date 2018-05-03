'use strict';
const {Component} = require('bluespess');

class UniformItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}
//TODO: Alt styles
//TODO: Sensors
//TODO: "fitted" probably isn't fully implemented
//TODO: A fuckton of other procs from the DM file

UniformItem.template = {
	vars: {
		components: {
			"UniformItem": {
				worn_icon: 'icons/mob/uniform.png',
				worn_icon_state: null, // If null, inherits from inhand_icon_state
				fitted: "female_uniform_full",
				can_adjust: true, //Useless until alt styles are implemented
				alt_covers_chest: false //Also useless until alt styles
			},
			"WearableItem": {
				permeability_coefficient: 0.9,
				body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm']
			}
		},
		icon: 'icons/obj/clothing/uniforms.png',
		name: "under"
	}
};

UniformItem.depends = ["WearableItem"];
UniformItem.loadBefore = ["WearableItem"];

module.exports.components = {UniformItem};
