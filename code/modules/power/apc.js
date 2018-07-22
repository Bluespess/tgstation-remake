'use strict';
const {Component} = require('bluespess');
const layers = require('../../defines/layers.js');

class Apc extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

Apc.loadBefore = ["Destructible", "PowerNode"];
Apc.depends = ["Destructible", "PowerNode"];

Apc.template = {
	vars: {
		components: {
			"Apc": {

			},
			"Destructible": {
				max_integrity: 200,
				integrity_failure: 0
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "A control terminal for the area electrical systems."
			}
		},
		name: "area power controller",
		icon: 'icons/obj/power.png',
		icon_state: "apc0",
		layer: layers.OBJ_LAYER
	}
};

module.exports.templates = {
	"apc": {
		components: ["Apc"],
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [1, 2, 4, 8],
				orientation: "horizontal"
			}
		],
		tree_path: ["basic_structures/apc"]
	}
};

module.exports.components = {Apc};
