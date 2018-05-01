'use strict';

module.exports.templates = {
	"caphat": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					strip_delay: 6000,
					clothing_armor: {melee: 25, bullet: 15, laser: 25, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
					flags_inv: 0,
					//TODO dog_fashion = /datum/dog_fashion/head/captain
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "It's good being the king."
				}
			},
			name: "captain's hat",
			icon_state: "captain"
		},
		tree_paths: ["items/clothing/head/caphat"]
	},
};
