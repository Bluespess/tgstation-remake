'use strict';

//TODO:
/*
Basically every suit_storage_whitelist since none of the items are implemented yet.

*/

module.exports.templates = {
	"captunic": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
					flags_inv: "hidejumpsuit"
				},
				"Item": {
					inhand_icon_state: "bio_suit",
				},
				"Examine": {
					desc: "Worn by a Captain to show their class."
				}
			},
			name: "captain's parade tunic",
			icon_state: "captunic"
		},
		tree_paths: ["items/clothing/head/captunic"]
	},
};
