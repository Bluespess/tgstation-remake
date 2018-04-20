'use strict';

//Just some alt-uniforms themed around Star Trek - Pls don't sue, Mr Roddenberry ;_;

module.exports.templates = {
	//TOS
	"tos_command": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trek_command",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "y_suit",
				},
				"Examine": {
					desc: "The uniform worn by command officers."
				}
			},
			name: "command uniform",
			icon_state: "trek_command"
			//TODO item_color: "trek_command"
		},
		tree_paths: ["items/clothing/under/trek/tos_command"]
	},
	"tos_engsec": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trek_engsec",
					can_adjust: false
				},
				"WearableItem": {
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 0, acid: 0},
					strip_delay: 5000,
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"Examine": {
					desc: "The uniform worn by engineering/security officers."
				}
			},
			name: "engsec uniform",
			icon_state: "trek_engsec"
			//TODO item_color: "trek_engsec"
		},
		tree_paths: ["items/clothing/under/trek/tos_engsec"]
	},
	"tos_medsci": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trek_medsci",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "b_suit",
				},
				"Examine": {
					desc: "The uniform worn by medical/science officers."
				}
			},
			name: "medsci uniform",
			icon_state: "trek_medsci"
			//TODO item_color: "trek_medsci"
		},
		tree_paths: ["items/clothing/under/trek/tos_medsci"]
	},

	//TNG
	"tng_command": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trek_next_command",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"Examine": {
					desc: "The uniform worn by command officers."
				}
			},
			name: "command uniform",
			icon_state: "trek_next_command"
			//TODO item_color: "trek_command"
		},
		tree_paths: ["items/clothing/under/trek/tng_command"]
	},
	"tng_engsec": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trek_next_engsec",
					can_adjust: false
				},
				"WearableItem": {
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 0, acid: 0},
					strip_delay: 5000,
				},
				"Item": {
					inhand_icon_state: "y_suit",
				},
				"Examine": {
					desc: "The uniform worn by engineering/security officers."
				}
			},
			name: "engsec uniform",
			icon_state: "trek_next_engsec"
			//TODO item_color: "trek_next_engsec"
		},
		tree_paths: ["items/clothing/under/trek/tng_engsec"]
	},
	"tng_medsci": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trek_next_medsci",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "b_suit",
				},
				"Examine": {
					desc: "The uniform worn by medical/science officers."
				}
			},
			name: "medsci uniform",
			icon_state: "trek_next_medsci"
			//TODO item_color: "trek_next_medsci"
		},
		tree_paths: ["items/clothing/under/trek/tng_medsci"]
	},

	//ENT
	"ent_command": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trek_ent_command",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"Examine": {
					desc: "The uniform worn by command officers."
				}
			},
			name: "command uniform",
			icon_state: "trek_ent_command"
			//TODO item_color: "trek_ent_command"
		},
		tree_paths: ["items/clothing/under/trek/ent_command"]
	},
	"ent_engsec": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trek_ent_engsec",
					can_adjust: false
				},
				"WearableItem": {
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 0, acid: 0},
					strip_delay: 5000,
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"Examine": {
					desc: "The uniform worn by engineering/security officers."
				}
			},
			name: "engsec uniform",
			icon_state: "trek_ent_engsec"
			//TODO item_color: "trek_ent_engsec"
		},
		tree_paths: ["items/clothing/under/trek/ent_engsec"]
	},
	"ent_medsci": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trek_ent_medsci",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"Examine": {
					desc: "The uniform worn by medical/science officers."
				}
			},
			name: "medsci uniform",
			icon_state: "trek_ent_medsci"
			//TODO item_color: "trek_ent_medsci"
		},
		tree_paths: ["items/clothing/under/trek/ent_medsci"]
	},
};
