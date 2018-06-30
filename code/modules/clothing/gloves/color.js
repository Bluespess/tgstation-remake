'use strict';

module.exports.templates = {
	"gloves_yellow": {
		components: ["HandItem"],
		vars: {
			components: {
				"HandItem": {
					siemens_coefficient: 0,
					worn_icon_state: "ygloves"
				},
				"Item": {
					inhand_icon_state: "ygloves"
				},
				"Examine": {
					desc: "These gloves will protect the wearer from electric shock"
				}
			},
			name: "insulated gloves",
			icon_state: "yellow"
		},
		tree_paths: ["items/clothing/gloves/color/yellow"]
	},
	"gloves_fyellow": { // Cheap Chinese Crap
		components: ["HandItem"],
		vars: {
			components: {
				"HandItem": {
					siemens_coefficient: [0, 0.5, 0.5, 0.5, 0.5, 0.75, 1.5],
					worn_icon_state: "ygloves"
				},
				"Item": {
					inhand_icon_state: "ygloves"
				},
				"Examine": {
					desc: "These gloves are cheap knockoffs of the coveted ones - no way this can end badly."
				}
			},
			name: "budget insulated gloves",
			icon_state: "yellow"
		},
		tree_paths: ["items/clothing/gloves/color/fyellow"]
	}
};
