'use strict';
const {Component} = require('bluespess');
const layers = require('../../../defines/layers.js');

class Window extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

Window.one_per_turf = true;

Window.depends = ["Destructible", "BlocksAir"];
Window.loadBefore = ["Destructible", "BlocksAir"];

Window.template = {
	vars: {
		components: {
			"Window": {
				state: "out_of_frame",
				heat_resistance: 800,

			},
			"Tangible": {
				anchored: true,
				pressure_resistance: 410
			},
			"Describe": {
				desc: "A window."
			}
		},
		name: "window",
		icon: 'icons/obj/structures.png',
		icon_state: "window",
		density: true,
		layer: layers.ABOVE_OBJ_LAYER
	}
};

module.exports.templates = {
	"window": {
		components: ["Window"],
		vars: {
			icon: 'icons/obj/smooth_structures/window.png',
			icon_state: "window"
		},
		tree_paths: ["basic_structures/window"]
	}
};

module.exports.components = {Window};
