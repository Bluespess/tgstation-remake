'use strict';

module.exports.templates = {
	//Science
	"jumpsuit_rd": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"WearableItem": {
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 10, bio: 10, rad: 0, fire: 0, acid: 35}
				},
				"Item": {
					inhand_icon_state: "lb_suit",
				},
				"Examine": {
					desc: "It's a suit worn by those with the know-how to achieve the position of \"Research Director\". Its fabric provides minor protection from biological contaminants."
				}
			},
			name: "research director's vest suit",
			icon_state: "director"
			//TODO item_color: "director"
		},
		tree_paths: ["items/clothing/under/rank/research_director"]
	},
	"jumpsuit_rd_alt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true
				},
				"WearableItem": {
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 10, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "rdwhimsy",
				},
				"Examine": {
					desc: "Maybe you'll engineer your own half-man, half-pig creature some day. Its fabric provides minor protection from biological contaminants."
				}
			},
			name: "research director's tan suit",
			icon_state: "rdwhimsy"
			//TODO item_color: "rdwhimsy"
		},
		tree_paths: ["items/clothing/under/rank/research_director/alt"]
	},
	"jumpsuit_rd_turtleneck": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true
				},
				"WearableItem": {
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 10, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "p_suit",
				},
				"Examine": {
					desc: "A dark purple turtleneck and tan khakis, for a director with a superior sense of style."
				}
			},
			name: "research director's turtleneck",
			icon_state: "rdturtle"
			//TODO item_color: "rdturtle"
		},
		tree_paths: ["items/clothing/under/rank/research_director/turtleneck"]
	},
	"jumpsuit_roboticist": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "robotics",
				},
				"Examine": {
					desc: "It's a slimming black with reinforced seams; great for industrial work."
				}
			},
			name: "roboticist's jumpsuit",
			icon_state: "robotics"
			//TODO item_color: "robotics"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/rank/roboticist"]
	},
	"jumpsuit_scientist": {
		components: ["UniformItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 10, bio: 0, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's made of a special fiber that provides minor protection against explosives. It has markings that denote the wearer as a scientist."
				}
			},
			name: "scientist's jumpsuit",
			icon_state: "toxins"
			//TODO item_color: "toxinswhite"
		},
		tree_paths: ["items/clothing/under/rank/scientist"]
	},

	//Medical
	"jumpsuit_cmo": {
		components: ["UniformItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's a jumpsuit worn by those with the experience to be \"Chief Medical Officer\". It provides minor biological protection."
				}
			},
			name: "chief medical officer's jumpsuit",
			icon_state: "cmo"
			//TODO item_color: "cmo"
		},
		tree_paths: ["items/clothing/under/rank/chief_medical_officer"]
	},
	"jumpsuit_chemist": {
		components: ["UniformItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 50, acid: 65}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's made of a special fiber that gives special protection against biohazards. It has a chemist rank stripe on it."
				}
			},
			name: "chemist's jumpsuit",
			icon_state: "chemistry"
			//TODO item_color: "chemistrywhite"
		},
		tree_paths: ["items/clothing/under/rank/scientist"]
	},
	"jumpsuit_geneticist": {
		components: ["UniformItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's made of a special fiber that gives special protection against biohazards. It has a genetics rank stripe on it."
				}
			},
			name: "geneticist's jumpsuit",
			icon_state: "genetics"
			//TODO item_color: "geneticswhite"
		},
		tree_paths: ["items/clothing/under/rank/geneticist"]
	},
	"jumpsuit_virologist": {
		components: ["UniformItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's made of a special fiber that gives special protection against biohazards. It has a virologist rank stripe on it."
				}
			},
			name: "virologist's jumpsuit",
			icon_state: "virology"
			//TODO item_color: "virologywhite"
		},
		tree_paths: ["items/clothing/under/rank/virologist"]
	},
	"jumpsuit_nurse": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's a jumpsuit commonly worn by nursing staff in the medical department."
				}
			},
			name: "nurse's suit",
			icon_state: "nursesuit"
			//TODO item_color: "nursesuit"
		},
		tree_paths: ["items/clothing/under/rank/nurse"]
	},
	"jumpsuit_medical_doctor": {
		components: ["UniformItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's made of a special fiber that provides minor protection against biohazards. It has a cross on the chest denoting that the wearer is trained medical personnel."
				}
			},
			name: "medical doctor's jumpsuit",
			icon_state: "medical"
			//TODO item_color: "medical"
		},
		tree_paths: ["items/clothing/under/rank/medical_doctor"]
	},
	"jumpsuit_scrubs_blue": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's made of a special fiber that provides minor protection against biohazards. This one is in baby blue."
				}
			},
			name: "medical scrubs",
			icon_state: "scrubsblue"
			//TODO item_color: "scrubsblue"
		},
		tree_paths: ["items/clothing/under/rank/scrubs_blue"]
	},
	"jumpsuit_scrubs_green": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's made of a special fiber that provides minor protection against biohazards. This one is in dark green."
				}
			},
			name: "medical scrubs",
			icon_state: "scrubsgreen"
			//TODO item_color: "scrubsgreen"
		},
		tree_paths: ["items/clothing/under/rank/scrubs_green"]
	},
	"jumpsuit_scrubs_purple": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"WearableItem": {
					permeability_coefficient: 0.5,
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "It's made of a special fiber that provides minor protection against biohazards. This one is in deep purple."
				}
			},
			name: "medical scrubs",
			icon_state: "scrubspurple"
			//TODO item_color: "scrubspurple"
		},
		tree_paths: ["items/clothing/under/rank/scrubs_purple"]
	},
};
