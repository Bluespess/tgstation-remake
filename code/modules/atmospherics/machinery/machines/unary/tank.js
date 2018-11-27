'use strict';
const {Component} = require('bluespess');
const atmos_defines = require('../../../../../defines/atmos_defines.js');
const layers = require('../../../../../defines/layers.js');

const PRESSURE_TANK_VOLUME = 10000;
const AIR_CONTENTS = (25*atmos_defines.ONE_ATMOSPHERE) * (10000) / (atmos_defines.R_IDEAL_GAS_EQUATION * atmos_defines.T20C);

class PressureTank extends Component {
	constructor(atom, template) {
		super(atom, template);
		let air_contents = this.a.c.AtmosMachine.airs[0];
		air_contents.volume = PRESSURE_TANK_VOLUME;
		air_contents.parse_gas_string(this.init_gas);

	}
}

PressureTank.loadBefore = ["UnaryAtmosMachine"];
PressureTank.depends = ["UnaryAtmosMachine"];

PressureTank.template = {
	vars: {
		components: {
			"PressureTank": {
				init_gas: ""
			},
			"Destructible": {
				max_integrity: 800 // dayum
			},
			"Examine": {
				desc: "A large vessel containing pressurized gas."
			}
		},
		icon: 'icons/obj/atmospherics/pipes/pressure_tank.png',
		icon_state: "generic",
		name: "pressure tank",
		density: 1,
		layer: layers.ABOVE_WINDOW_LAYER
	},
	variants: [
		{
			type: "single",
			var_path: ["dir"],
			values: [1, 2, 4, 8],
			orientation: "horizontal"
		}
	]
};

module.exports.templates = {
	"pressure_tank_air": {
		components: ["PressureTank"],
		vars: {
			components: {
				"PressureTank": {
					init_gas: `o2=${AIR_CONTENTS*0.2};n2=${AIR_CONTENTS*0.8};TEMP=${atmos_defines.T20C}`
				}
			},
			icon_state: "grey",
			name: "pressure tank (Air)"
		}
	}
};

module.exports.components = {PressureTank};
