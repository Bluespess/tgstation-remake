'use strict';

module.exports.templates = {
	"lasergun": {
		components: ["EnergyGun", "BeltItem"],
		vars: {
			components: {
				"EnergyGun": {
					ammo_type: ["energy_lens_lasergun"],
					shaded_charge: true
					//select_icon: true
				},
				"Examine": {
					desc: "A basic energy-based laser gun that fires concentrated beams of light which pass through glass and thin metal."
				}
			},
			name: "laser gun",
			icon_state: "laser"
		},
		tree_paths: ["items/gun/energy/laser"]
	},
};
