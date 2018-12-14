'use strict';

module.exports.templates = {
	"hybrid_taser": {
		components: ["EnergyGun", "BeltItem"],
		vars: {
			components: {
				"EnergyGun": {
					ammo_type: ["energy_lens_electrode", "energy_lens_disabler"],
					select_icon: true
				},
				"Item": {
					inhand_icon_state: null
				},
				"Examine": {
					desc: "A dual-mode taser designed to fire both short-range high-power electrodes and long-range disabler beams."
				}
			},
			name: "hybrid taser",
			icon_state: "advtaser"
		},
		tree_paths: ["items/gun/energy/advtaser"]
	}
};
