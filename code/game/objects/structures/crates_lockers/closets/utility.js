'use strict';

module.exports.templates = {
	"emergency_closet": {
		components: ["Closet"],
		vars: {
			components: {
				"Examine": {
					desc: "It's a storage unit for emergency breath maks and O2 tanks."
				}
			},
			name: "emergency closet",
			icon_state: "emergency"
		},
		tree_paths: ["closets/emergency", "basic_structures/emergency_closet"]
	},
	"fire_closet": {
		components: ["Closet"],
		vars: {
			components: {
				"Examine": {
					desc: "It's a storage unit for fire-fighting supplies."
				}
			},
			name: "fire-safety closet",
			icon_state: "fire"
		},
		tree_paths: ["closets/fire"]
	},
	"tool_closet": {
		components: ["Closet"],
		vars: {
			components: {
				"Closet": {
					icon_door: "eng_tool"
				},
				"Examine": {
					desc: "It's a storage unit for tools."
				}
			},
			name: "tool closet",
			icon_state: "eng"
		},
		tree_paths: ["closets/tools"]
	},
	"radiation_closet": {
		components: ["Closet"],
		vars: {
			components: {
				"Closet": {
					icon_door: "eng_rad"
				},
				"Examine": {
					desc: "It's a storage unit for rad-protective suits."
				}
			},
			name: "radiation closet",
			icon_state: "eng"
		},
		tree_paths: ["closets/radiation"]
	},
	"bomb_closet": {
		components: ["Closet"],
		vars: {
			components: {
				"Examine": {
					desc: "It's a storage unit for explosion-protective suits"
				}
			},
			name: "EOD closet",
			icon_state: "bomb",
			force_improper: true
		},
		tree_paths: ["closets/bomb"]
	},
};
