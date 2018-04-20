'use strict';

module.exports.templates = {
	"jumpsuit_bartender": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true
				},
				"Item": {
					inhand_icon_state: "bar_suit"
				},
				"Examine": {
					desc: "It looks like it could use some more flair."
				}
			},
			name: "bartender's uniform",
			icon_state: "barman"
		},
		tree_paths: ["items/clothing/under/rank/bartender"]
	},
	"jumpsuit_captain": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "b_suit"
				},
				"Examine": {
					desc: "It's a blue jumpsuit with some gold markings denoting the rank of \"Captain\"."
				}
			},
			name: "captain's jumpsuit",
			icon_state: "captain"
		},
		tree_paths: ["items/clothing/under/rank/captain"]
	},
	"jumpsuit_qm": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "lb_suit"
				},
				"Examine": {
					desc: "It's a jumpsuit worn by the quartermaster. It's specially designed to prevent back injuries caused by pushing paper."
				}
			},
			name: "quartermaster's jumpsuit",
			icon_state: "qm"
		},
		tree_paths: ["items/clothing/under/rank/qm"]
	},
	"jumpsuit_cargo": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "lb_suit"
				},
				"Examine": {
					desc: "Shooooorts! They're comfy and easy to wear!"
				}
			},
			name: "cargo technician's jumpsuit",
			icon_state: "cargo"
		},
		tree_paths: ["items/clothing/under/rank/cargotech"]
	},
	"jumpsuit_chaplain": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "bl_suit"
				},
				"Examine": {
					desc: "It's a black jumpsuit, often worn by religious folk."
				}
			},
			name: "chaplain's jumpsuit",
			icon_state: "chaplain"
		},
		tree_paths: ["items/clothing/under/rank/chaplain"]
	},
	"jumpsuit_chef": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true
				},
				"Item": {
					inhand_icon_state: "chef"
				},
				"Examine": {
					desc: "A suit which is given only to the most <b>hardcore</b> cooks in space."
				}
			},
			name: "cook's suit",
			icon_state: "chef"
		},
		tree_paths: ["items/clothing/under/rank/chef"]
	},
	"jumpsuit_clown": { //TODO: /obj/item/clothing/under/rank/clown/hit_reaction()
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"Item": {
					inhand_icon_state: "clown"
				},
				"Examine": {
					desc: "<i>'HONK!'</i>"
				}
			},
			name: "clown suit",
			icon_state: "clown"
		},
		tree_paths: ["items/clothing/under/rank/clown"]
	},
	"jumpsuit_hop": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "b_suit"
				},
				"Examine": {
					desc: "It's a jumpsuit worn by someone who works in the position of \"Head of Personnel\"."
				}
			},
			name: "head of personnel's jumpsuit",
			icon_state: "hop"
		},
		tree_paths: ["items/clothing/under/rank/chef"]
	},
	"jumpsuit_botanist": {
		components: ["UniformItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.5
				},
				"Item": {
					inhand_icon_state: "g_suit"
				},
				"Examine": {
					desc: "It's a jumpsuit designed to protect against minor plant-related hazards."
				}
			},
			name: "botanist's jumpsuit",
			icon_state: "hydroponics"
		},
		tree_paths: ["items/clothing/under/rank/botany"]
	},
	"jumpsuit_janitor": {
		components: ["UniformItem"],
		vars: {
			components: {
				"WearableItem": {
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 10, rad: 0, fire: 0, acid: 0}
				},
				"Item": {
					inhand_icon_state: "janitor"
				},
				"Examine": {
					desc: "It's the official uniform of the station's janitor. It has minor protection from biohazards."
				}
			},
			name: "janitor's jumpsuit",
			icon_state: "janitor"
		},
		tree_paths: ["items/clothing/under/rank/janitor"]
	},
	"jumpsuit_lawyer_black": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "lawyer_black"
				},
				"Examine": {
					desc: "Slick threads."
				}
			},
			name: "lawyer suit",
			icon_state: "lawyer_black"
		},
		tree_paths: ["items/clothing/under/rank/lawyer/lawyer_black"]
	},
	"jumpsuit_lawyer_female": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "black_suit_fem"
				},
				"Examine": {
					desc: "Slick threads."
				}
			},
			name: "lawyer suit",
			icon_state: "black_suit_fem"
		},
		tree_paths: ["items/clothing/under/rank/lawyer/lawyer_female"]
	},
	"jumpsuit_lawyer_red": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "lawyer_red"
				},
				"Examine": {
					desc: "Slick threads."
				}
			},
			name: "lawyer suit",
			icon_state: "lawyer_red"
		},
		tree_paths: ["items/clothing/under/rank/lawyer/lawyer_red"]
	},
	"jumpsuit_lawyer_blue": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "lawyer_blue"
				},
				"Examine": {
					desc: "Slick threads."
				}
			},
			name: "lawyer suit",
			icon_state: "lawyer_blue"
		},
		tree_paths: ["items/clothing/under/rank/lawyer/lawyer_blue"]
	},
	"jumpsuit_lawyer_bluesuit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true
				},
				"Item": {
					inhand_icon_state: "bluesuit"
				},
				"Examine": {
					desc: "A classy suit and tie."
				}
			},
			name: "blue suit",
			icon_state: "bluesuit"
		},
		tree_paths: ["items/clothing/under/rank/lawyer/lawyer_bluesuit"]
	},
	"jumpsuit_lawyer_purpsuit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					fitted: "no_female_uniform"
				},
				"Item": {
					inhand_icon_state: "lawyer_purp"
				},
				"Examine": {
					desc: "Slick threads."
				}
			},
			name: "purple suit",
			icon_state: "lawyer_purp"
		},
		tree_paths: ["items/clothing/under/rank/lawyer/lawyer_purpsuit"]
	},
	"jumpsuit_lawyer_blacksuit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					alt_covers_chest: true,
					worn_icon_state: "blacksuit"
				},
				"Item": {
					inhand_icon_state: "bar_suit"
				},
				"Examine": {
					desc: "A professional black suit. Nanotrasen Investigation Bureau approved!"
				}
			},
			name: "black suit",
			icon_state: "blacksuit"
		},
		tree_paths: ["items/clothing/under/rank/lawyer/lawyer_blacksuit"]
	},
	"jumpsuit_curator": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "red_suit"
				},
				"Examine": {
					desc: "It's very... sensible."
				}
			},
			name: "sensible suit",
			icon_state: "red_suit"
		},
		tree_paths: ["items/clothing/under/rank/curator"]
	},
	"jumpsuit_curator_treasure_hunter": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "curator"
				},
				"Examine": {
					desc: "A rugged uniform suitable for treasure hunting."
				}
			},
			name: "treasure hunter uniform",
			icon_state: "curator"
		},
		tree_paths: ["items/clothing/under/rank/curator/trasure_hunter"]
	},
	"jumpsuit_mime": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "mime"
				},
				"Examine": {
					desc: "It's not very colorful."
				}
			},
			name: "mime's outfit",
			icon_state: "mime"
		},
		tree_paths: ["items/clothing/under/rank/mime"]
	},
	"jumpsuit_miner": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "miner"
				},
				"Examine": {
					desc: "It's a snappy jumpsuit with a sturdy set of overalls. It is very dirty."
				}
			},
			name: "shaft miner's jumpsuit",
			icon_state: "miner"
		},
		tree_paths: ["items/clothing/under/rank/miner"]
	},
	"jumpsuit_miner_lavaland": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "explorer"
				},
				"Examine": {
					desc: "A green uniform for operating in hazardous environments."
				}
			},
			name: "shaft miner's jumpsuit",
			icon_state: "explorer"
		},
		tree_paths: ["items/clothing/under/rank/miner/lavaland"]
	},
};
