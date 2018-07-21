'use strict';
const {Component} = require('bluespess');

class Multitool extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.buffer = null; // Simple machine buffer for device linkage
	}
}

Multitool.loadBefore = ["Tool"];
Multitool.depends = ["Tool"];

Multitool.template = {
	vars: {
		components: {
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/equipment/tools_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/tools_righthand.png',
				force: 5,
				size: 2,
				hitsound: 'sound/weapons/tap.ogg'
			},
			"Examine": {
				desc: "Used for pulsing wires to test which to cut. Not recommended by doctors."
			}
		},
		name: "multitool",
		icon_state: "multitool",
		icon: 'icons/obj/device.png'
	}
};

module.exports.templates = {
	"multitool": {
		components: ["Multitool"],
		tree_paths: ["/items/tools/multitool"]
	}
};

module.exports.components = {Multitool};
