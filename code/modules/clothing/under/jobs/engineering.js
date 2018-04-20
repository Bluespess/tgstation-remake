'use strict';

module.exports.templates = {
	"jumpsuit_ce": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "chief",
				},
				"WearableItem": {
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 10, fire: 80, acid: 40}
				},
				"Item": {
					inhand_icon_state: "gy_suit",
				},
				"Examine": {
					desc: "It's a high visibility jumpsuit given to those engineers insane enough to achieve the rank of \"Chief Engineer\". It has minor radiation shielding."
				}
			},
			name: "chief engineer's jumpsuit",
			icon_state: "chiefengineer"
			//TODO item_color: "chief"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/rank/chief_engineer"]
	},
	"jumpsuit_atmos_tech": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "atmos_suit",
				},
				"Examine": {
					desc: "It's a jumpsuit worn by atmospheric technicians."
				}
			},
			name: "atmos technician's jumpsuit",
			icon_state: "atmos"
			//TODO item_color: "atmos_suit"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/rank/atmos_tech"]
	},
	"jumpsuit_engineer": {
		components: ["UniformItem"],
		vars: {
			components: {
				"WearableItem": {
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 10, fire: 60, acid: 20}
				},
				"Item": {
					inhand_icon_state: "engi_suit",
				},
				"Examine": {
					desc: "It's an orange high visibility jumpsuit worn by engineers. It has minor radiation shielding."
				}
			},
			name: "engineer's jumpsuit",
			icon_state: "engine"
			//TODO item_color: "engine"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/rank/engineer"]
	},
};
