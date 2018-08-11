'use strict';
const {Component} = require('bluespess');

class LightFixture extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

LightFixture.loadBefore = ["ApcPowered", "Destructible", "LightSource"];
LightFixture.depends = ["ApcPowered", "Destructible", "LightSource"];

LightFixture.template = {
	vars: {
		components: {
			"LightFixture": {
				base_state: "tube",
				tube_type: "tube",
				default_tube: "tube"
			},
			"LightSource": {
				enabled: true,
				radius: 8,
				color: "#ffffff"
			},
			"ApcPowered": {
				power_usage: 20,
				using_idle_power: true
			},
			"Tangible": {
				anchored: true,
			}
		},
		name: "light fixture",
		layer: 2.9,
		icon: 'icons/obj/lighting.png',
		icon_state: "tube1"
	}
};

module.exports.templates = {
	"light": {
		components: ["LightFixture"],
		variants: [
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
	"light_small": {
		components: ["LightFixture"],
		vars: {
			icon_state: "bulb1",
			components: {
				"LightSource": {
					radius: 4,
					color: "#ccbbaa"
				}
			}
		},
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		]
	}
};

module.exports.components = {LightFixture};
