'use strict';

//TODO:
/*
/obj/item/clothing/under/space
/obj/item/clothing/under/acj
/obj/item/clothing/under/kilt/highlander //Only requires NODROP, actually.
/obj/item/clothing/under/maid
/obj/item/clothing/under/singery //Requires alternate_worn_layer
/obj/item/clothing/under/singerb //Same
/obj/item/clothing/under/plasmaman
/obj/item/device/extinguisher_refill
*/

module.exports.templates = {
	"pj_red": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "red_pyjamas",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "Sleepwear."
				}
			},
			name: "red pj's",
			icon_state: "red_pyjamas"
			//TODO item_color: "red_pyjamas"
		},
		tree_paths: ["items/clothing/under/pj/red"]
	},
	"pj_blue": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "blue_pyjamas",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"Examine": {
					desc: "Sleepwear."
				}
			},
			name: "blue pj's",
			icon_state: "blue_pyjamas"
			//TODO item_color: "blue_pyjamas"
		},
		tree_paths: ["items/clothing/under/pj/blue"]
	},
	"patriot_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "ek",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "ek",
				},
				"Examine": {
					desc: "Motorcycle not included."
				}
			},
			name: "patriotic suit",
			icon_state: "ek"
			//TODO item_color: "ek"
		},
		tree_paths: ["items/clothing/under/patriot_suit"]
	},
	"scratch": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "scratch",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "scratch",
				},
				"Examine": {
					desc: "A white suit, suitable for an excellent host."
				}
			},
			name: "white suit",
			icon_state: "scratch"
			//TODO item_color: "scratch"
		},
		tree_paths: ["items/clothing/under/scratch"]
	},
	"sl_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "sl_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "sl_suit",
				},
				"Examine": {
					desc: "It's a very amish looking suit."
				}
			},
			name: "amish suit",
			icon_state: "sl_suit"
			//TODO item_color: "sl_suit"
		},
		tree_paths: ["items/clothing/under/sl_suit"]
	},
	"roman": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "roman",
					can_adjust: false
				},
				"WearableItem": {
					strip_delay: 10000
				},
				"Item": {
					inhand_icon_state: "armor",
				},
				"Examine": {
					desc: "Ancient Roman armor. Made of metallic and leather straps."
				}
			},
			name: "roman armor",
			icon_state: "roman"
			//TODO item_color: "roman"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/roman"]
	},
	"waiter": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "waiter",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "waiter",
				},
				"Examine": {
					desc: "It's a very smart uniform with a special pocket for tips."
				}
			},
			name: "waiter's outfit",
			icon_state: "waiter"
			//TODO item_color: "waiter"
		},
		tree_paths: ["items/clothing/under/waiter"]
	},
	"prisoner": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "prisoner",
					//TODO has_sensor: LOCKED_SENSORS
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"Item": {
					inhand_icon_state: "o_suit",
				},
				"Examine": {
					desc: "It's standardised Nanotrasen prisoner-wear. Its suit sensors are sruck in the \"Fully On\" position."
				}
			},
			name: "prison jumpsuit",
			icon_state: "prisoner"
			//TODO item_color: "prisoner"
		},
		tree_paths: ["items/clothing/under/rank/prisoner"]
	},
	"mailman": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "mailman",
				},
				"Item": {
					inhand_icon_state: "b_suit",
				},
				"Examine": {
					desc: "<span class='italics'>'Special delivery!'"
				}
			},
			name: "mailman's jumpsuit",
			icon_state: "mailman"
			//TODO item_color: "mailman"
		},
		tree_paths: ["items/clothing/under/rank/mailman"]
	},
	"psyche": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "psyche",
				},
				"Item": {
					inhand_icon_state: "p_suit",
				},
				"Examine": {
					desc: "Groovy!"
				}
			},
			name: "psychedelic jumpsuit",
			icon_state: "psyche"
			//TODO item_color: "psyche"
		},
		tree_paths: ["items/clothing/under/rank/psyche"]
	},
	"sexy_clown": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "sexyclown",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "sexyclown",
				},
				"Examine": {
					desc: "It makes you look HONKable!"
				}
			},
			name: "sexy-clown suit",
			icon_state: "sexyclown"
			//TODO item_color: "sexyclown"
		},
		tree_paths: ["items/clothing/under/rank/clown/sexy"]
	},
	"jabroni": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "darkholme",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "darkholme",
				},
				"Examine": {
					desc: "The leather club is two sectors down."
				}
			},
			name: "jabroni outfit",
			icon_state: "darkholme"
			//TODO item_color: "darkholme"
		},
		tree_paths: ["items/clothing/under/jabroni"]
	},
	"vice_jumpsuit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "vice",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "gy_suit",
				},
				"Examine": {
					desc: "It's the standard issue pretty-boy outfit, as seen on Holo-Vision."
				}
			},
			name: "vice officer's jumpsuit",
			icon_state: "vice"
			//TODO item_color: "vice"
		},
		tree_paths: ["items/clothing/under/rank/vice"]
	},
	"centcom_officer": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "officer",
					alt_covers_chest: true
				},
				"Item": {
					inhand_icon_state: "g_suit",
				},
				"Examine": {
					desc: "It's a jumpsuit worn by centcom officers."
				}
			},
			name: "centcom officer's jumpsuit",
			icon_state: "officer"
			//TODO item_color: "officer"
		},
		tree_paths: ["items/clothing/under/rank/centcom_officer"]
	},
	"centcom_commander": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "centcom",
				},
				"Item": {
					inhand_icon_state: "dg_suit",
				},
				"Examine": {
					desc: "It's a jumpsuit worn by centcom's highest-tier commanders."
				}
			},
			name: "centcom commander's jumpsuit",
			icon_state: "centcom"
			//TODO item_color: "centcom"
		},
		tree_paths: ["items/clothing/under/rank/centcom_commander"]
	},
	"owl": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "owl",
					can_adjust: false
				},
				"Examine": {
					desc: "A soft brown jumpsuit made of synthetic feathers and strong conviction."
				}
			},
			name: "owl uniform",
			icon_state: "owl"
			//TODO item_color: "owl"
		},
		tree_paths: ["items/clothing/under/owl"]
	},
	"griffin": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "griffin",
					can_adjust: false
				},
				"Examine": {
					desc: "A soft brown jumpsuit with a white feather collar made of synthetic feathers and a lust for mayhem."
				}
			},
			name: "griffon uniform",
			icon_state: "griffin"
			//TODO item_color: "griffin"
		},
		tree_paths: ["items/clothing/under/griffin"]
	},
	"cloud": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "cloud",
					can_adjust: false
				},
				"Examine": {
					desc: "Cloud."
				}
			},
			name: "cloud",
			icon_state: "cloud"
			//TODO item_color: "cloud"
		},
		tree_paths: ["items/clothing/under/cloud"]
	},
	"gimmick_captain": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "green_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "dg_suit",
				},
				"Examine": {
					desc: "A green suit and yellow necktie. Exemplifies authority."
				}
			},
			name: "captain's suit",
			icon_state: "green_suit"
			//TODO item_color: "green_suit"
		},
		tree_paths: ["items/clothing/under/gimmick/rank/captain/suit"]
	},
	"gimmick_hop": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "teal_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "g_suit",
				},
				"Examine": {
					desc: "A teal suit and yellow necktie. An authoritative yet tacky ensemble."
				}
			},
			name: "head of personnel's suit",
			icon_state: "teal_suit"
			//TODO item_color: "teal_suit"
		},
		tree_paths: ["items/clothing/under/gimmick/rank/hop/suit"]
	},
	"suit_jacket": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "black_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"Examine": {
					desc: "A black suit and red tie. Very formal."
				}
			},
			name: "black suit",
			icon_state: "black_suit"
			//TODO item_color: "black_suit"
		},
		tree_paths: ["items/clothing/under/suit_jacket"]
	},
	"really_black": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "really_black_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"Examine": {
					desc: "A formal black suit and red tie, intended for the station's finest."
				}
			},
			name: "executive suit",
			icon_state: "really_black_suit"
			//TODO item_color: "black_suit"
		},
		tree_paths: ["items/clothing/under/suit_jacket/really_black"]
	},
	"female_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "black_suit_fem",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "black_suit_fem",
				},
				"Examine": {
					desc: "A formal trouser suit for women, intended for the station's finest."
				}
			},
			name: "executive suit",
			icon_state: "black_suit_fem"
			//TODO item_color: "black_suit_fem"
		},
		tree_paths: ["items/clothing/under/suit_jacked/female_suit"]
	},
	"green_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "green_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "dg_suit",
				},
				"Examine": {
					desc: "A green suit and yellow necktie. Baller."
				}
			},
			name: "green suit",
			icon_state: "green_suit"
			//TODO item_color: "green_suit"
		},
		tree_paths: ["items/clothing/under/suit_jacket/green_suit"]
	},
	"red_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "red_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"Examine": {
					desc: "A red suit and blue tie. Somewhat formal."
				}
			},
			name: "red suit",
			icon_state: "red_suit"
			//TODO item_color: "red_suit"
		},
		tree_paths: ["items/clothing/under/suit_jacked/red_suit"]
	},
	"charcoal_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "charcoal_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "charcoal_suit",
				},
				"Examine": {
					desc: "A charcoal suit and red tie. Very professional."
				}
			},
			name: "charcoal suit",
			icon_state: "charcoal_suit"
			//TODO item_color: "charcoal_suit"
		},
		tree_paths: ["items/clothing/under/suit_jacket/charcoal_suit"]
	},
	"navy_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "navy_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "navy_suit",
				},
				"Examine": {
					desc: "A navy suit and red tie, intended for the station's finest."
				}
			},
			name: "navy suit",
			icon_state: "navy_suit"
			//TODO item_color: "navy_suit"
		},
		tree_paths: ["items/clothing/under/suit_jacket/navy_suit"]
	},
	"burgundy_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "burgundy_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "burgundy_suit",
				},
				"Examine": {
					desc: "A burgundy suit and black tie. Somewhat formal."
				}
			},
			name: "burgundy suit",
			icon_state: "burgundy_suit"
			//TODO item_color: "burgundy_suit"
		},
		tree_paths: ["items/clothing/under/burgundy_suit"]
	},
	"checkered_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "checkered_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "checkered_suit",
				},
				"Examine": {
					desc: "That's a very nice suit you have there. Shame if something were to happen to it, eh?"
				}
			},
			name: "checkered suit",
			icon_state: "checkered_suit"
			//TODO item_color: "checkered_suit"
		},
		tree_paths: ["items/clothing/under/suit_jacket/checkered_suit"]
	},
	"tan_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "tan_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "tan_suit",
				},
				"Examine": {
					desc: "A tan suit with a yellow tie. Smart, but casual."
				}
			},
			name: "tan suit",
			icon_state: "tan_suit"
			//TODO item_color: "tan_suit"
		},
		tree_paths: ["items/clothing/under/suit_jacket/tan_suit"]
	},
	"white_suit": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "white_suit",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "white_suit",
				},
				"Examine": {
					desc: "A white suit and jacket with a blue shirt. You wanna play rough? OKAY!"
				}
			},
			name: "white suit",
			icon_state: "white_suit"
			//TODO item_color: "white_suit"
		},
		tree_paths: ["items/clothing/under/suit_jacket/white_suit"]
	},
	"burial_garments": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "burial",
				},
				"Item": {
					inhand_icon_state: "burial",
				},
				"Examine": {
					desc: "Traditional burial garments from the early 22nd century."
				}
			},
			name: "burial garments",
			icon_state: "burial"
			//TODO item_color: "burial"
		},
		tree_paths: ["items/clothing/under/burial"]
	},
	"black_skirt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "blackskirt",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Examine": {
					desc: "A black skirt, very fancy!"
				}
			},
			name: "black skirt",
			icon_state: "blackskirt"
			//TODO item_color: "blackskirt"
		},
		tree_paths: ["items/clothing/under/skirt/black_skirt"]
	},
	"blue_skirt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "blueskirt",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "b_suit",
				},
				"Examine": {
					desc: "A blue, casual skirt."
				}
			},
			name: "blue skirt",
			icon_state: "blueskirt"
			//TODO item_color: "blueskirt"
		},
		tree_paths: ["items/clothing/under/skirt/blue_skirt"]
	},
	"red_skirt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "redskirt",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"Examine": {
					desc: "A red, casual skirt."
				}
			},
			name: "red skirt",
			icon_state: "redskirt"
			//TODO item_color: "redskirt"
		},
		tree_paths: ["items/clothing/under/skirt/red_skirt"]
	},
	"purple_skirt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "purpleskirt",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "p_suit",
				},
				"Examine": {
					desc: "A purple, casual skirt."
				}
			},
			name: "purple skirt",
			icon_state: "purpleskirt"
			//TODO item_color: "purpleskirt"
		},
		tree_paths: ["items/clothing/under/skirt/purple_skirt"]
	},
	"blue_schoolgirl": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "schoolgirl",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "schoolgirl",
				},
				"Examine": {
					desc: "It's just like one of my Japanese animes!"
				}
			},
			name: "blue schoolgirl uniform",
			icon_state: "schoolgirl"
			//TODO item_color: "schoolgirl"
		},
		tree_paths: ["items/clothing/under/schoolgirl/blue_schoolgirl"]
	},
	"red_schoolgirl": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "schoolgirlred",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "schoolgirlred",
				},
				"Examine": {
					desc: "It's just like one of my Japanese animes!"
				}
			},
			name: "red schoolgirl uniform",
			icon_state: "schoolgirlred"
			//TODO item_color: "schoolgirlred"
		},
		tree_paths: ["items/clothing/under/schoolgirl/red_schoolgirl"]
	},
	"green_schoolgirl": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "schoolgirlgreen",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "schoolgirlgreen",
				},
				"Examine": {
					desc: "It's just like one of my Japanese animes!"
				}
			},
			name: "green schoolgirl uniform",
			icon_state: "schoolgirlgreen"
			//TODO item_color: "schoolgirlgreen"
		},
		tree_paths: ["items/clothing/under/schoolgirl/green_schoolgirl"]
	},
	"orange_schoolgirl": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "schoolgirlorange",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "schoolgirlorange",
				},
				"Examine": {
					desc: "It's just like one of my Japanese animes!"
				}
			},
			name: "orange schoolgirl uniform",
			icon_state: "schoolgirlorange"
			//TODO item_color: "schoolgirlorange"
		},
		tree_paths: ["items/clothing/under/schoolgirl/orange_schoolgirl"]
	},
	"overalls": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "overalls",
					can_adjust: false,
				},
				"Item": {
					inhand_icon_state: "lb_suit",
				},
				"Examine": {
					desc: "A set of durable overalls for getting the job done."
				}
			},
			name: "laborer's overalls",
			icon_state: "overalls"
			//TODO item_color: "overalls"
		},
		tree_paths: ["items/clothing/under/overalls"]
	},
	"pirate": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "pirate",
					can_adjust: false,
				},
				"Item": {
					inhand_icon_state: "pirate",
				},
				"Examine": {
					desc: "Yarr."
				}
			},
			name: "pirate outfit",
			icon_state: "pirate"
			//TODO item_color: "pirate"
		},
		tree_paths: ["items/clothing/under/pirate"]
	},
	"soviet": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "soviet",
					can_adjust: false,
				},
				"Item": {
					inhand_icon_state: "soviet",
				},
				"Examine": {
					desc: "For the Motherland!"
				}
			},
			name: "soviet uniform",
			icon_state: "soviet"
			//TODO item_color: "soviet"
		},
		tree_paths: ["items/clothing/under/soviet"]
	},
	"redcoat": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "redcoat",
					can_adjust: false,
				},
				"Item": {
					inhand_icon_state: "redcoat",
				},
				"Examine": {
					desc: "Looks old."
				}
			},
			name: "redcoat uniform",
			icon_state: "redcoat"
			//TODO item_color: "redcoat"
		},
		tree_paths: ["items/clothing/under/redcoat"]
	},
	"kilt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "kilt",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin']
				},
				"Item": {
					inhand_icon_state: "kilt",
				},
				"Examine": {
					desc: "Includes shoes and plaid."
				}
			},
			name: "kilt",
			icon_state: "kilt"
			//TODO item_color: "kilt"
		},
		tree_paths: ["items/clothing/under/kilt"]
	},
	"sexymime": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "sexymime",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg']
				},
				"Item": {
					inhand_icon_state: "sexymime",
				},
				"Examine": {
					desc: "The only time when you DON'T enjoy looking at someone's rack."
				}
			},
			name: "sexy mime outfit",
			icon_state: "sexymime"
			//TODO item_color: "sexymime"
		},
		tree_paths: ["items/clothing/under/sexymime"]
	},
	"gladiator": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "gladiator",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "gladiator",
				},
				"Examine": {
					desc: "Are you not entertained? Is that not why you are here?"
				}
			},
			name: "gladiator uniform",
			icon_state: "gladiator"
			//TODO item_color: "gladiator"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/gladiator"]
	},
	"gladiator_ash_walker": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "gladiator",
					can_adjust: false,
					fitted: "no_female_uniform",
					//TODO has_sensor = NO_SENSORS
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "gladiator",
				},
				"Examine": {
					desc: "This gladiator uniform appears to be covered in ash and fairly dated."
				}
			},
			name: "gladiator uniform",
			icon_state: "gladiator"
			//TODO item_color: "gladiator"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/gladiator/ash_walker"]
	},
	"sundress": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "sundress",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin']
				},
				"Item": {
					inhand_icon_state: "sundress",
				},
				"Examine": {
					desc: "Makes you want to frolic in a field of daisies."
				}
			},
			name: "sundress",
			icon_state: "sundress"
			//TODO item_color: "sundress"
		},
		tree_paths: ["items/clothing/under/sundress"]
	},
	"captain_parade": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "captain_parade",
					can_adjust: false,
				},
				"Item": {
					inhand_icon_state: "by_suit",
				},
				"Examine": {
					desc: "A captain's luxury-wear, for special occasions."
				}
			},
			name: "captain's parade uniform",
			icon_state: "captain_parade"
			//TODO item_color: "captain_parade"
		},
		tree_paths: ["items/clothing/under/captain_parade"]
	},
	"hos_parade_male": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "hos_parade_male",
					can_adjust: false,
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"Examine": {
					desc: "A male head of security's luxury-wear, for special occasions."
				}
			},
			name: "head of security's parade uniform",
			icon_state: "hos_parade_male"
			//TODO item_color: "hos_parade_male"
		},
		tree_paths: ["items/clothing/under/hos_parade_male"]
	},
	"hos_parade_fem": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "hos_parade_fem",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"Examine": {
					desc: "A female head of security's luxury-wear, for special occasions."
				}
			},
			name: "head of security's parade uniform",
			icon_state: "hos_parade_fem"
			//TODO item_color: "hos_parade_fem"
		},
		tree_paths: ["items/clothing/under/hos_parade_fem"]
	},
	"assistant_formal": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "assistant_formal",
					can_adjust: false,
				},
				"Item": {
					inhand_icon_state: "gy_suit",
				},
				"Examine": {
					desc: "An assistant's formal-wear. Why an assistant needs formal-wear is still unknown."
				}
			},
			name: "assistant's formal uniform",
			icon_state: "assistant_formal"
			//TODO item_color: "assistant_formal"
		},
		tree_paths: ["items/clothing/under/assistant_formal"]
	},
	"black_tango": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "black_tango",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"Item": {
					inhand_icon_state: "wcoat",
				},
				"Examine": {
					desc: "Filled with Latin fire."
				}
			},
			name: "black tango dress",
			icon_state: "black_tango"
			//TODO item_color: "black_tango"
		},
		tree_paths: ["items/clothing/under/black_tango"]
	},
	"striped_dress": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "striped_dress",
					can_adjust: false,
					fitted: "female_uniform_full"
				},
				"Item": {
					inhand_icon_state: "stripeddress",
				},
				"Examine": {
					desc: "Fashion in space."
				}
			},
			name: "striped dress",
			icon_state: "striped_dress"
			//TODO item_color: "striped_dress"
		},
		tree_paths: ["items/clothing/under/striped_dress"]
	},
	"sailor_dress": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "sailor_dress",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"Item": {
					inhand_icon_state: "sailordress",
				},
				"Examine": {
					desc: "Formal wear for a leading lady."
				}
			},
			name: "sailor dress",
			icon_state: "sailor_dress"
			//TODO item_color: "sailor_dress"
		},
		tree_paths: ["items/clothing/under/sailor_dress"]
	},
	"red_evening_gown": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "red_evening_gown",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"Item": {
					inhand_icon_state: "redeveninggown",
				},
				"Examine": {
					desc: "Fancy dress for space bar singers."
				}
			},
			name: "red evening gown",
			icon_state: "red_evening_gown"
			//TODO item_color: "red_evening_gown"
		},
		tree_paths: ["items/clothing/under/red_evening_gown"]
	},
	"janimaid": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "janimaid",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin']
				},
				"Item": {
					inhand_icon_state: "janimaid",
				},
				"Examine": {
					desc: "A simple maid uniform for housekeeping."
				}
			},
			name: "maid uniform",
			icon_state: "janimaid"
			//TODO item_color: "janimaid"
		},
		tree_paths: ["items/clothing/under/janimaid"]
	},
	"red_plaid_skirt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "plaid_red",
					alt_covers_chest: true,
					fitted: "female_uniform_top"
				},
				"Item": {
					inhand_icon_state: "plaid_red",
				},
				"Examine": {
					desc: "A preppy red skirt with a white blouse."
				}
			},
			name: "red plaid skirt",
			icon_state: "plaid_red"
			//TODO item_color: "plaid_red"
		},
		tree_paths: ["items/clothing/under/plaid_skirt/red"]
	},
	"blue_plaid_skirt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "plaid_blue",
					alt_covers_chest: true,
					fitted: "female_uniform_top"
				},
				"Item": {
					inhand_icon_state: "plaid_blue",
				},
				"Examine": {
					desc: "A preppy blue skirt with a white blouse."
				}
			},
			name: "blue plaid skirt",
			icon_state: "plaid_blue"
			//TODO item_color: "plaid_blue"
		},
		tree_paths: ["items/clothing/under/plaid_skirt/blue"]
	},
	"purple_plaid_skirt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "plaid_purple",
					alt_covers_chest: true,
					fitted: "female_uniform_top"
				},
				"Item": {
					inhand_icon_state: "plaid_purple",
				},
				"Examine": {
					desc: "A preppy purple skirt with a white blouse."
				}
			},
			name: "purple plaid skirt",
			icon_state: "plaid_purple"
			//TODO item_color: "plaid_purple"
		},
		tree_paths: ["items/clothing/under/plaid_skirt/purple"]
	},
	"green_plaid_skirt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "plaid_green",
					alt_covers_chest: true,
					fitted: "female_uniform_top"
				},
				"Item": {
					inhand_icon_state: "plaid_green",
				},
				"Examine": {
					desc: "A preppy green skirt with a white blouse."
				}
			},
			name: "green plaid skirt",
			icon_state: "plaid_green"
			//TODO item_color: "plaid_green"
		},
		tree_paths: ["items/clothing/under/plaid_skirt/green"]
	},
	"jester": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "jester",
					can_adjust: false
				},
				"Examine": {
					desc: "A jolly dress, well suited to entertain your master, nuncle."
				}
			},
			name: "jester suit",
			icon_state: "jester"
			//TODO item_color: "jester"
		},
		tree_paths: ["items/clothing/under/jester"]
	},
	"jester_alt": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "jester2",
					can_adjust: false
				},
				"Examine": {
					desc: "A jolly dress, well suited to entertain your master, nuncle."
				}
			},
			name: "jester suit",
			icon_state: "jester2"
			//TODO item_color: "jester"
		},
		tree_paths: ["items/clothing/under/jester/alt"]
	},
	"geisha": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "geisha",
					can_adjust: false
				},
				"Examine": {
					desc: "Cute space ninja senpai not included."
				}
			},
			name: "geisha suit",
			icon_state: "geisha"
			//TODO item_color: "geisha"
		},
		tree_paths: ["items/clothing/under/geisha"]
	},
	"villain": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "villain",
					can_adjust: false
				},
				"Examine": {
					desc: "A change of wardrobe is necessary if you ever want to catch a real superhero."
				}
			},
			name: "villain suit",
			icon_state: "villain"
			//TODO item_color: "villain"
		},
		tree_paths: ["items/clothing/under/villain"]
	},
	"sailor": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "sailor",
					can_adjust: false
				},
				"Item": {
					inhand_icon_state: "b_suit",
				},
				"Examine": {
					desc: "Skipper's in the wardroom drinkin' gin."
				}
			},
			name: "sailor suit",
			icon_state: "jester"
			//TODO item_color: "sailor"
		},
		tree_paths: ["items/clothing/under/sailor"]
	},
	"russian_officer": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "hostanclothes",
					alt_covers_chest: true,
					//TODO sensor_mode: SENSOR_COORDS
					//TODO random_sensor: false
				},
				"WearableItem": {
					strip_delay: 5000,
					clothing_armor: {melee: 10, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 30}
				},
				"Item": {
					inhand_icon_state: "hostanclothes",
				},
				"Examine": {
					desc: "The latest in fashionable Russian outfits."
				}
			},
			name: "russian officer's uniform",
			icon_state: "hostanclothes"
			//TODO item_color: "hostanclothes"
		},
		tree_paths: ["items/clothing/under/rank/security/navyblue/russian"]
	},
	"mummy": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "mummy",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"Item": {
					inhand_icon_state: "mummy",
				},
				"Examine": {
					desc: "Return the slab or suffer my stale references." //Courage the Cowardly Dog is not stale you sack of shit
				}
			},
			name: "mummy",
			icon_state: "mummy"
			//TODO item_color: "mummy"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/mummy"]
	},
	"scarecrow": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "scarecrow",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"Item": {
					inhand_icon_state: "scarecrow",
				},
				"Examine": {
					desc: "Perfect camouflage for hiding in botany."
				}
			},
			name: "scarecrow",
			icon_state: "scarecrow"
			//TODO item_color: "scarecrow"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/scarecrow"]
	},
	"draculass": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "draculass",
					can_adjust: false,
					fitted: "female_uniform_top"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'r_arm', 'l_arm']
				},
				"Item": {
					inhand_icon_state: "draculass",
				},
				"Examine": {
					desc: "A dress inspired by the ancient \"Victorian\" era."
				}
			},
			name: "draculass coat",
			icon_state: "draculass"
			//TODO item_color: "draculass"
		},
		tree_paths: ["items/clothing/under/draculass"]
	},
	"dr_freeze": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "drfreeze",
					can_adjust: false,
				},
				"Item": {
					inhand_icon_state: "drfreeze",
				},
				"Examine": {
					desc: "A modified scientist jumpsuit to look extra cool."
				}
			},
			name: "doctor freeze's jumpsuit",
			icon_state: "drfreeze"
			//TODO item_color: "drfreeze"
		},
		tree_paths: ["items/clothing/under/dr_freeze"]
	},
	"lobster": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "lobster",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"Item": {
					inhand_icon_state: "lobster",
				},
				"Examine": {
					desc: "Who beheaded the college mascot?"
				}
			},
			name: "foam lobster suit",
			icon_state: "lobster"
			//TODO item_color: "lobster"
		},
		tree_paths: ["items/clothing/under/lobster"]
	},
	"skeleton": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "skeleton",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"Item": {
					inhand_icon_state: "skeleton",
				},
				"Examine": {
					desc: "A black jumpsuit with a white bone pattern printed on it. Spooky!"
				}
			},
			name: "skeleton jumpsuit",
			icon_state: "skeleton"
			//TODO item_color: "skeleton"
			//TODO resistance_flags: 0
		},
		tree_paths: ["items/clothing/under/skeleton"]
	},
};
