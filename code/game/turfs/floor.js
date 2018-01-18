'use strict';
const {Component} = require('bluespess');
const layers = require('../../defines/layers.js');

class FloorCover extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

FloorCover.depends = ["FloorBase"];
FloorCover.loadBefore = ["FloorBase"];

FloorCover.template = {
	vars: {
		layer: layers.FLOOR_LAYER,
		icon: 'icons/turf/floors.png'
	},
	requires_under: {
		component: "Plating",
		default: "plating"
	}
};

module.exports.templates = {
	"floor": {
		components: ["FloorCover"],
		tree_paths: ["basic_structures/floor"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: ["floor", "white", "dark", "bar", "floorgrime", "delivery", "bot", "barber", "whitebot", "whitedelivery", "cmo", "grimy", "freezerfloor"],
				label: true,
				orientation: "vertical"
			}
		]
	},
	"floor_ss13": {
		components: ["FloorCover"],
		tree_paths: ["basic_structures/floor/ss13"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"L1", "L3", "L5", "L7", "L2", "L4", "L6", "L8", "L9", "L11", "L13", "L7", "L10", "L12", "L14", "L8"
				],
				orientation: "horizontal",
				wrap: 4
			}
		]
	},
	"floor_edge": {
		components: ["FloorCover"],
		tree_paths: ["basic_structures/floor/edge"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"red", "whitered", "blue", "whiteblue", "green", "whitegreen", "yellow", "whiteyellow", "orange", "whitehall", "arrival", "escape", "purple", "whitepurple", "brownold", "brown", "redyellow", "redblue", "bluered", "redgreen", "greenyellow", "greenblue", "blueyellow", "darkpurple", "darkred", "darkblue", "darkgreen", "darkyellow", "darkbrown"
				],
				label:true,
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8, 5, 6, 9, 10
				],
				orientation: "horizontal",
				wrap: 4
			}
		]
	},
	"floor_corner": {
		components: ["FloorCover"],
		tree_paths: ["basic_structures/floor/corner"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"redcorner", "whiteredcorner", "bluecorner", "whitebluecorner", "greencorner", "whitegreencorner", "yellowcorner", "whiteyellowcorner", "orangecorner", "arrivalcorner", "escapecorner", "purplecorner", "whitepurplecorner", "browncorner"
				],
				label:true,
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		]
	},
	"floor_plaque": {
		components: ["FloorCover"],
		vars: {
			icon_state: "plaque"
		},
		tree_paths: ["basic_structures/floor/plaque"]
	},
	"floor_wood": {
		components: ["FloorCover"],
		vars: {
			icon_state: "wood"
		},
		tree_paths: ["basic_structures/floor/wood"]
	},
	"floor_carpet": {
		components: ["FloorCover", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "carpet"
				},
				"SmoothGroup": {
					groups: ["carpet"]
				}
			},
			icon: 'icons/turf/floors/carpet.png',
			icon_state: "carpet"
		},
		tree_paths: ["basic_structures/floor/carpet"]
	}
};

module.exports.components = {FloorCover};
