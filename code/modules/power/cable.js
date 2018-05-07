'use strict';
const {Component} = require('bluespess');
const layers = require('../../defines/layers.js');

const cable_colors = {
	red: "#ff0000",
	yellow: "#ffff00",
	green: "#00aa00",
	blue: "#1919c8",
	pink: "#ff3cc8",
	orange: "#ff8000",
	cyan: "#00ffff",
	white: "#ffffff"
};

class Cable extends Component {
	constructor(atom, template) {
		super(atom, template);
		let match = /^([0-9]+)-([0-9]+)$/.exec(this.a.icon_state);
		let d1 = +match[1];
		let d2 = +match[2];
		if(![0,1,2,4,5,6,8,9,10].includes(d1)
			|| ![1,2,4,5,6,8,9,10].includes(d2)
			|| d1 >= d2) {
			console.warn(new Error(`Invalid cable icon_state ${this.a.icon_state}`));
		}
		this.d1 = d1;
		this.d2 = d2;
		this.a.color = cable_colors[this.cable_color];
	}
}

Cable.loadBefore = ["Destructible"];
Cable.depends = ["Destructible"];

Cable.template = {
	vars: {
		components: {
			"Cable": {
				cable_color: "red"
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "A flexible, superconducting insulated cable for heavy-duty power transfer."
			}
		},
		name: "power cable",
		icon: 'icons/obj/power_cond/cables.png',
		icon_state: "0-1",
		layer: layers.WIRE_LAYER
	}
};

module.exports.templates = {
	"cable": {
		components: ["Cable"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Cable", "cable_color"],
				values: [...Object.keys(cable_colors)],
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"0-1", "0-2", "0-4", "0-5", "0-6", "0-8", "0-9", "0-10",
					"1-2", "1-4", "1-5", "1-6", "1-8", "1-9", "1-10",
					"2-4", "2-5", "2-6", "2-8", "2-9", "2-10",
					"4-5", "4-6", "4-8", "4-9", "4-10",
					"5-6", "5-8", "5-9", "5-10",
					"6-8", "6-9", "6-10",
					"8-9", "8-10",
					"9-10"
				],
				label: true,
				orientation: "horizontal",
				wrap: 4
			}
		],
		tree_paths: ["basic_structures/cable"]
	}
};

module.exports.components = {Cable};
