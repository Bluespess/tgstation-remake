'use strict';

//TODO:
/*
/obj/item/clothing/head/chefhat/suicide_act(mob/user)
/obj/item/clothing/head/cage
// det_hat's examine(), altclick(), and pocket
/obj/item/clothing/head/beret/highlander
*/

module.exports.templates = {
	"chefhat": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					put_on_delay: 1000,
					strip_delay: 1000,
					dynamic_hair_suffix: ""
					//TODO dog_fashion = /datum/dog_fashion/head/chef
				},
				"Item": {
					inhand_icon_state: "chef",
				},
				"Examine": {
					desc: "The commander in chef's head wear."
				}
			},
			name: "chef's hat",
			icon_state: "chef"
		},
		tree_paths: ["items/clothing/head/chefhat"]
	},
	"caphat": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					strip_delay: 6000,
					clothing_armor: {melee: 25, bullet: 15, laser: 25, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
					flags_inv: 0,
					//TODO dog_fashion = /datum/dog_fashion/head/captain
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "It's good being the king."
				}
			},
			name: "captain's hat",
			icon_state: "captain"
		},
		tree_paths: ["items/clothing/head/caphat"]
	},
	"caphat_parade": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					strip_delay: 6000,
					clothing_armor: {melee: 25, bullet: 15, laser: 25, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
					flags_inv: 0,
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "Worn only by Captains with an abundance of class."
				}
			},
			name: "captain's parade cap",
			icon_state: "capcap"
		},
		tree_paths: ["items/clothing/head/caphat/parade"]
	},
	"hopcap": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					clothing_armor: {melee: 25, bullet: 15, laser: 25, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
					//TODO dog_fashion = /datum/dog_fashion/head/hop
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "The symbol of true bureaucratic micromanagement."
				}
			},
			name: "head of personnel's cap",
			icon_state: "hopcap"
		},
		tree_paths: ["items/clothing/head/hopcap"]
	},
	"nun_hood": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					flags_inv: "hidehair",
					flags_cover: "headcoverseyes"
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "Maximum piety in this star system."
				}
			},
			name: "nun hood",
			icon_state: "nun_hood"
		},
		tree_paths: ["items/clothing/head/nun_hood"]
	},
	"witchhunter_hat": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					flags_cover: "headcoverseyes"
				},
				"Item": {
					inhand_icon_state: "witchhunterhat",
				},
				"Examine": {
					desc: "This hat saw much use back in the day."
				}
			},
			name: "witchhunter hat",
			icon_state: "witchhunterhat"
		},
		tree_paths: ["items/clothing/head/witchhunter_hat"]
	},
	"det_hat": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					clothing_armor: {melee: 25, bullet: 5, laser: 25, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 50},
				},
				"Item": {
					inhand_icon_state: "fedora",
				},
				"Examine": {
					desc: "There's only one man who can sniff out the dirty stench of crime, and he's likely wearing this hat."
				}
			},
			name: "detective's fedora",
			icon_state: "detective"
		},
		tree_paths: ["items/clothing/head/det_hat"]
	},
	"beret": {
		components: ["HeadItem"],
		vars: {
			components: {
				"HeadItem": {
					dynamic_hair_suffix: ""
				},
				"WearableItem": {
					//TODO dog_fashion = /datum/dog_fashion/head/beret
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "A beret, a mime's favorite headwear."
				}
			},
			name: "beret",
			icon_state: "beret"
		},
		tree_paths: ["items/clothing/head/beret"]
	},
	"beret_black": {
		components: ["HeadItem"],
		vars: {
			components: {
				"HeadItem": {
					dynamic_hair_suffix: ""
				},
				"WearableItem": {
					//TODO dog_fashion = /datum/dog_fashion/head/beret
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "A black beret, perfect for war veterans and dark, brooding, anti-hero mimes."
				}
			},
			name: "black beret",
			icon_state: "beretblack"
		},
		tree_paths: ["items/clothing/head/beret_black"]
	},
	"hos_cap": {
		components: ["HeadItem"],
		vars: {
			components: {
				"HeadItem": {
					dynamic_hair_suffix: ""
				},
				"WearableItem": {
					clothing_armor: {melee: 40, bullet: 30, laser: 25, energy: 10, bomb: 25, bio: 10, rad: 0, fire: 50, acid: 60},
					strip_delay: 8000
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "The robust standard-issue cap of the Head of Security. For showing the officers who's in charge."
				}
			},
			name: "head of security cap",
			icon_state: "hoscap"
		},
		tree_paths: ["items/clothing/head/hos_cap"]
	},
	"hos_beret": {
		components: ["HeadItem"],
		vars: {
			components: {
				"HeadItem": {
					dynamic_hair_suffix: ""
				},
				"WearableItem": {
					clothing_armor: {melee: 40, bullet: 30, laser: 25, energy: 10, bomb: 25, bio: 10, rad: 0, fire: 50, acid: 60},
					strip_delay: 8000
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "A robust beret for the Head of Security, for looking stylish while not sacrificing protection."
				}
			},
			name: "head of security beret",
			icon_state: "hosberetblack"
		},
		tree_paths: ["items/clothing/head/hos_beret"]
	},
	"syndicate_cap": {
		components: ["HeadItem"],
		vars: {
			components: {
				"HeadItem": {
					dynamic_hair_suffix: ""
				},
				"WearableItem": {
					clothing_armor: {melee: 40, bullet: 30, laser: 25, energy: 10, bomb: 25, bio: 10, rad: 0, fire: 50, acid: 60},
					strip_delay: 8000
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "A black cap fit for a high ranking syndicate officer."
				}
			},
			name: "syndicate cap",
			icon_state: "hoscap"
		},
		tree_paths: ["items/clothing/head/syndicate_cap"]
	},
	"syndicate_beret": {
		components: ["HeadItem"],
		vars: {
			components: {
				"HeadItem": {
					dynamic_hair_suffix: ""
				},
				"WearableItem": {
					clothing_armor: {melee: 40, bullet: 30, laser: 25, energy: 10, bomb: 25, bio: 10, rad: 0, fire: 50, acid: 60},
					strip_delay: 8000
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "A black beret with thick armor padding inside. Stylish and robust."
				}
			},
			name: "syndicate beret",
			icon_state: "hosberetblack"
		},
		tree_paths: ["items/clothing/head/syndicate_beret"]
	},
	"warden_hat": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					clothing_armor: {melee: 40, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 30, acid: 60},
					strip_delay: 6000,
					//TODO dog_fashion: /datum/dog_fashion/head/warden
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "It's a special armored hat issued to the Warden of a security force. Protects the head from impacts."
				}
			},
			name: "warden's police hat",
			icon_state: "policehelm"
		},
		tree_paths: ["items/clothing/head/warden_hat"]
	},
	"beret_sec": {
		components: ["HeadItem"],
		vars: {
			components: {
				"HeadItem": {
					dynamic_hair_suffix: ""
				},
				"WearableItem": {
					clothing_armor: {melee: 40, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 20, acid: 50},
					strip_delay: 6000,
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "A robust beret with the security insignia emblazoned on it. Uses reinforced fabric to offer sufficent protection."
				}
			},
			name: "security beret",
			icon_state: "beret_badge"
		},
		tree_paths: ["items/clothing/head/beret_sec"]
	},
	"beret_navyhos": {
		components: ["HeadItem"],
		vars: {
			components: {
				"HeadItem": {
					dynamic_hair_suffix: ""
				},
				"WearableItem": {
					clothing_armor: {melee: 40, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 20, acid: 50},
					strip_delay: 6000,
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "A special beret with the Head of Security's insignia emblazoned on it. A symbol of excellence, a badge of courage, a mark of distinction."
				}
			},
			name: "head of security's beret",
			icon_state: "hosberet"
		},
		tree_paths: ["items/clothing/head/beret_navyhos"]
	},
	"beret_navywarden": {
		components: ["HeadItem"],
		vars: {
			components: {
				"HeadItem": {
					dynamic_hair_suffix: ""
				},
				"WearableItem": {
					clothing_armor: {melee: 40, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 20, acid: 50},
					strip_delay: 6000,
				},
				"Item": {
					inhand_icon_state: "that",
				},
				"Examine": {
					desc: "A special beret with the Warden's insignia emblazoned on it. For wardens with class."
				}
			},
			name: "warden's beret",
			icon_state: "wardenberet"
		},
		tree_paths: ["items/clothing/head/beret_navywarden"]
	},
	"curator_fedora": {
		components: ["HeadItem"],
		vars: {
			components: {
				"WearableItem": {
					clothing_armor: {melee: 25, bullet: 5, laser: 25, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 30, acid: 50},
				},
				"Item": {
					inhand_icon_state: "fedora",
				},
				"Examine": {
					desc: "You got red text today kid, but it doesn't mean you have to like it."
				}
			},
			name: "treasure hunter's fedora",
			icon_state: "curator"
		},
		tree_paths: ["items/clothing/head/curator_fedora"]
	},
};
