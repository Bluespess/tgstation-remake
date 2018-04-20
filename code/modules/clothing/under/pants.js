'use strict';

module.exports.templates = {
	"classic_jeans": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "jeansclassic",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "You feel cooler already."
				}
			},
			name: "classic jeans",
			icon_state: "jeansclassic"
			//TODO item_color: "jeansclassic"
		},
		tree_paths: ["items/clothing/under/pants/classic_jeans"]
	},
	"mustang_jeans": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "jeansmustang",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "Made in the finest space jeans factory this side of Alpha Centauri."
				}
			},
			name: "must hang jeans",
			icon_state: "jeansmustang"
			//TODO item_color: "jeansmustang"
		},
		tree_paths: ["items/clothing/under/pants/mustang_jeans"]
	},
	"black_jeans": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "jeansblack",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "Only for those who can pull it off."
				}
			},
			name: "black jeans",
			icon_state: "jeansblack"
			//TODO item_color: "jeansblack"
		},
		tree_paths: ["items/clothing/under/pants/black_jeans"]
	},
	"youngfolks_jeans": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "jeansyoungfolks",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "For those tired of boring old jeans. Relive the passion of your youth!"
				}
			},
			name: "young folks jeans",
			icon_state: "jeansyoungfolks"
			//TODO item_color: "jeansyoungfolks"
		},
		tree_paths: ["items/clothing/under/pants/youngfolks_jeans"]
	},
	"white_pants": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "whitepants",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "Plain white pants. Boring."
				}
			},
			name: "white pants",
			icon_state: "whitepants"
			//TODO item_color: "whitepants"
		},
		tree_paths: ["items/clothing/under/pants/white_pants"]
	},
	"red_pants": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "redpants",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "Bright red pants. Overflowing with personality."
				}
			},
			name: "red pants",
			icon_state: "redpants"
			//TODO item_color: "redpants"
		},
		tree_paths: ["items/clothing/under/pants/red_pants"]
	},
	"black_pants": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "blackpants",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "These pants are dark, like your soul."
				}
			},
			name: "black pants",
			icon_state: "blackpants"
			//TODO item_color: "blackpants"
		},
		tree_paths: ["items/clothing/under/pants/black_pants"]
	},
	"tan_pants": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "tanpants",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "Some tan pants. You look like a white collar worker with these on."
				}
			},
			name: "tan pants",
			icon_state: "tanpants"
			//TODO item_color: "tanpants"
		},
		tree_paths: ["items/clothing/under/pants/tan_pants"]
	},
	"track_pants": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "trackpants",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "A pair of track pants, for the athletic."
				}
			},
			name: "track pants",
			icon_state: "trackpants"
			//TODO item_color: "trackpants"
		},
		tree_paths: ["items/clothing/under/pants/track_pants"]
	},
	"jeans": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "jeans",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "A nondescript pair of tough blue jeans."
				}
			},
			name: "jeans",
			icon_state: "jeans"
			//TODO item_color: "jeans"
		},
		tree_paths: ["items/clothing/under/pants/jeans"]
	},
	"khaki_pants": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "khaki",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "A pair of dust beige khaki pants."
				}
			},
			name: "khaki pants",
			icon_state: "khaki"
			//TODO item_color: "khaki"
		},
		tree_paths: ["items/clothing/under/pants/khaki_pants"]
	},
	"camo_pants": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "camopants",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['groin', 'l_leg', 'r_leg']
				},
				"Examine": {
					desc: "A pair of woodland camouflage pants. Probably not the best choice for a space station."
				}
			},
			name: "camo pants",
			icon_state: "camopants"
			//TODO item_color: "camopants"
		},
		tree_paths: ["items/clothing/under/pants/camo_pants"]
	},
};
