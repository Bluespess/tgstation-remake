'use strict';
const {Component} = require('bluespess');
const layers = require('../../../defines/layers.js');

class Grille extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

Grille.one_per_turf = true;

Grille.depends = ["Tangible"];
Grille.loadBefore = ["Tangible"];

Grille.template = {
	vars: {
		components: {
			"Grille": {
				rods_type: "stack_rods",
				rods_amount: 2,
				rods_broken: true,
				grille_type: null
			},
			"Tangible": {
				anchored: true,
				pressure_resistance: 510
			},
			"Describe": {
				desc: "A flimsy framework of metal rods."
			}
		},
		name: "grille",
		icon: 'icons/obj/structures.png',
		icon_state: "grille",
		density: true,
		layer: layers.BELOW_OBJ_LAYER
	}
};

module.exports.templates = {
	"grille": {
		components: ["Grille"],
		tree_paths: ["basic_structures/grille"]
	}
};

module.exports.components = {Grille};
