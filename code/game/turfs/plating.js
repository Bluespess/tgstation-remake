'use strict';
const {Component} = require('bluespess');
const layers = require('../../defines/layers.js');

class Plating extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.floor = this.a;
		this.icon_groups = {};
	}
}

Plating.depends = ["SimulatedTurf", "FloorBase", "SmoothGroup"];
Plating.loadBefore = ["SimulatedTurf", "FloorBase", "SmoothGroup"];

Plating.template = {
	vars: {
		components: {
			"FloorBase": {
				broken_states: ["platingdmg1", "platingdmg2", "platingdmg3"],
				burnt_states: ["panelscorched"]
			},
			"SmoothGroup": {
				groups: ["lattice"]
			},
		},
		name: "plating",
		icon: 'icons/turf/floors.png',
		icon_state: "plating",
		layer: layers.TURF_LAYER
	}
};

module.exports.templates = {
	"plating": {
		components: ["Plating"],
		tree_paths: ["basic_structures/plating"]
	}
};

module.exports.components = {Plating};
