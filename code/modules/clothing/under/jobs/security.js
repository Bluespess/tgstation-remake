'use strict';

module.exports.templates = {
	//Security Officer
	"jumpsuit_security_red": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"Examine": {
					desc: "A tactical security jumpsuit for officers complete with Nanotrasen belt buckle."
				}
			},
			name: "security jumpsuit",
			icon_state: "rsecurity"
			//TODO item_color: "rsecurity"
		},
		tree_paths: ["items/clothing/under/rank/security_officer/red"]
	},
	"jumpsuit_security_grey": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "gy_suit",
				},
				"Examine": {
					desc: "A tactical relic of years past before Nanotrasen decided it was cheaper to dye the suits red instead of washing out the blood."
				}
			},
			name: "grey security jumpsuit",
			icon_state: "security"
			//TODO item_color: "security"
		},
		tree_paths: ["items/clothing/under/rank/security_officer/grey"]
	},
	"jumpsuit_security_navyblue": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "officerblueclothes",
				},
				"Examine": {
					desc: "The latest in fashionable security outfits."
				}
			},
			name: "security officer's formal uniform",
			icon_state: "officerblueclothes"
			//TODO item_color: "officerblueclothes"
		},
		tree_paths: ["items/clothing/under/rank/security_officer/navyblue"]
	},

	//Warden
	"jumpsuit_warden_red": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"Examine": {
					desc: "A formal security suit for officers complete with Nanotrasen belt buckle."
				}
			},
			name: "security suit",
			icon_state: "rwarden"
			//TODO item_color: "rwarden"
		},
		tree_paths: ["items/clothing/under/rank/warden/red"]
	},
	"jumpsuit_warden_grey": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "gy_suit",
				},
				"Examine": {
					desc: "A formal relic of years past before Nanotrasen decided it was cheaper to dye the suits red instead of washing out the blood."
				}
			},
			name: "grey security suit",
			icon_state: "warden"
			//TODO item_color: "warden"
		},
		tree_paths: ["items/clothing/under/rank/warden/grey"]
	},
	"jumpsuit_warden_navyblue": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "wardenblueclothes",
				},
				"Examine": {
					desc: "The insignia on this uniform tells you that this uniform belongs to the Warden."
				}
			},
			name: "warden's formal uniform",
			icon_state: "wardenblueclothes"
			//TODO item_color: "wardenblueclothes"
		},
		tree_paths: ["items/clothing/under/rank/warden/navyblue"]
	},

	//Detective
	"jumpsuit_detective": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "det",
				},
				"Examine": {
					desc: "Someone who wears this means business."
				}
			},
			name: "hard-worn suit",
			icon_state: "detective"
			//TODO item_color: "detective"
		},
		tree_paths: ["items/clothing/under/rank/detective"]
	},
	"jumpsuit_detective_noir": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "greydet",
				},
				"Examine": {
					desc: "Someone who wears this means business."
				}
			},
			name: "noir suit",
			icon_state: "greydet"
			//TODO item_color: "greydet"
		},
		tree_paths: ["items/clothing/under/rank/detective/grey"]
	},

	//Head of Security
	"jumpsuit_hos_red": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 6000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"Examine": {
					desc: "A security jumpsuit decorated for those few with the dedication to achieve the position of Head of Security."
				}
			},
			name: "head of security's jumpsuit",
			icon_state: "rhos"
			//TODO item_color: "rhos"
		},
		tree_paths: ["items/clothing/under/rank/head_of_security/red"]
	},
	"jumpsuit_hos_grey": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 6000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "gy_suit",
				},
				"Examine": {
					desc: "There are old men, and there are bold men, but there are very few old, bold men."
				}
			},
			name: "head of security's grey jumpsuit",
			icon_state: "hos"
			//TODO item_color: "hos"
		},
		tree_paths: ["items/clothing/under/rank/head_of_security/grey"]
	},
	"jumpsuit_hos_navyblue": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 6000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "hosblueclothes",
				},
				"Examine": {
					desc: "The insignia on this uniform tells you that this uniform belongs to the Head of Security."
				}
			},
			name: "head of security's formal uniform",
			icon_state: "hosblueclothes"
			//TODO item_color: "hosblueclothes"
		},
		tree_paths: ["items/clothing/under/rank/head_of_security/navyblue"]
	},
	"jumpsuit_hos_alt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 6000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"Examine": {
					desc: "A stylish alternative to the normal head of security jumpsuit, complete with tactical pants."
				}
			},
			name: "head of security's turtleneck",
			icon_state: "hosalt"
			//TODO item_color: "hosalt"
		},
		tree_paths: ["items/clothing/under/rank/head_of_security/alt"]
	},

	//Blueshirt
	"jumpsuit_security_blueshirt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "blueshift",
				},
				"Examine": {
					desc: "I'm a little busy right now, Calhoun."
				}
			},
			name: "security jumpsuit",
			icon_state: "blueshift"
			//TODO item_color: "blueshift"
		},
		tree_paths: ["items/clothing/under/rank/security_officer/blueshirt"]
	},
};
