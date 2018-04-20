'use strict';

module.exports.templates = {
	"tactical_syndicate": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "syndicate",
					alt_covers_chest: true,
					//TODO has_sensor: NO_SENSORS
				},
				"WearableItem": {
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 40}
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"Examine": {
					desc: "A non-descript and slightly suspicious looking turtleneck with digital camouflage cargo pants."
				}
			},
			name: "tactical turtleneck",
			icon_state: "syndicate"
			//TODO item_color: "syndicate"
		},
		tree_paths: ["items/clothing/under/syndicate/tactical_syndicate"]
	},
	"tacticool_syndicate": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "tactifool",
					alt_covers_chest: true,
					//TODO has_sensor: NO_SENSORS
				},
				"WearableItem": {
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 40}
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"Examine": {
					desc: "Just looking at it makes you want to buy an SKS, go into the woods, and -operate-."
				}
			},
			name: "tacticool turtleneck",
			icon_state: "tactifool"
			//TODO item_color: "tactifool"
		},
		tree_paths: ["items/clothing/under/syndicate/tacticool_syndicate"]
	},
	"sniper_syndicate": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "really_black_suit",
					alt_covers_chest: true,
					//TODO has_sensor: NO_SENSORS
				},
				"WearableItem": {
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 40}
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"Examine": {
					desc: "A double seamed tactical turtleneck disguised as a civilian grade silk suit. Intended for the most formal operator. The collar is really sharp."
				}
			},
			name: "tactical turtleneck suit",
			icon_state: "really_black_suit"
			//TODO item_color: "black_suit"
		},
		tree_paths: ["items/clothing/under/syndicate/sniper_syndicate"]
	},
	"camo_syndicate": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "camogreen",
					alt_covers_chest: true,
					//TODO has_sensor: NO_SENSORS
				},
				"WearableItem": {
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 40}
				},
				"Item": {
					inhand_icon_state: "g_suit",
				},
				"Examine": {
					desc: "A green military camouflage uniform."
				}
			},
			name: "camouflage fatigues",
			icon_state: "camogreen"
			//TODO item_color: "camogreen"
		},
		tree_paths: ["items/clothing/under/syndicate/camo_syndicate"]
	},
	"soviet_syndicate": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trackpants",
					can_adjust: false,
					//TODO has_sensor: NO_SENSORS
				},
				"WearableItem": {
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 0, acid: 0}
				},
				"Examine": {
					desc: "Badly translated labels tell you to clean this in Vodka. Great for squatting in."
				}
			},
			name: "ratnik 5 tracksuit",
			icon_state: "trackpants"
			//TODO item_color: "trackpants",
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/syndicate/soviet_syndicate"]
	},
	"combat_syndicate": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "syndicate_combat",
					can_adjust: false,
					//TODO has_sensor: NO_SENSORS
				},
				"WearableItem": {
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 40}
				},
				"Examine": {
					desc: "With a suit lined with this many pockets, you are ready to operate."
				}
			},
			name: "combat uniform",
			icon_state: "syndicate_combat"
			//TODO item_color: "syndicate_combat"
		},
		tree_paths: ["items/clothing/under/syndicate/combat_syndicate"]
	},
};
