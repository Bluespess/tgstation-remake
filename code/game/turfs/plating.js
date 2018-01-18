'use strict';
const {Component} = require('bluespess');
const layers = require('../../defines/layers.js');

class Plating extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.floor = this.a;
	}
}

Plating.depends = ["SimulatedTurf", "FloorBase"];
Plating.loadBefore = ["SimulatedTurf", "FloorBase"];

Plating.template = {
	vars: {
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
