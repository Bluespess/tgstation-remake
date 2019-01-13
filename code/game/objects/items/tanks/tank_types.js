'use strict';
const atmos_defines = require('../../../../defines/atmos_defines.js');

module.exports.templates = {
	"tank_emergency_oxygen": {
		components: ["Tank", "BeltItem"],
		vars: {
			components: {
				"Tank": {
					init_gas: `o2=${(10*atmos_defines.ONE_ATMOSPHERE)*3/(atmos_defines.R_IDEAL_GAS_EQUATION*atmos_defines.T20C)};TEMP=${atmos_defines.T20C}`,
					volume: 3,
					distribute_pressure: atmos_defines.TANK_DEFAULT_RELEASE_PRESSURE
				},
				"Examine": {
					desc: "Used for emergencies. Contains very little oxygen, so try to conserve it until you actually need it."
				},
				"Item": {
					size: 2,
					force: 4
				}
			},
			icon_state: "emergency",
			name: "emergency oxygen tank"
		}
	}
};