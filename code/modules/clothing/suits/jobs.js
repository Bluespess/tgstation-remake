'use strict';

//TODO:
/*
Basically every suit_storage_whitelist since none of the items are implemented yet.
/obj/item/clothing/head/hooded/chaplain_hood
/obj/item/clothing/suit/suspenders //icon shenanigans
*/

module.exports.templates = {
	"apron": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin'],
				},
				"Item": {
					inhand_icon_state: "apron",
				},
				"Examine": {
					desc: "A basic blue apron."
				}
			},
			name: "apron",
			icon_state: "apron"
		},
		tree_paths: ["items/clothing/suit/apron"]
	},
	"captunic": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm']
				},
				"SuitItem": {
					covered_slots: ['iclothing']
				},
				"Item": {
					inhand_icon_state: "bio_suit",
				},
				"Examine": {
					desc: "Worn by a Captain to show their class."
				}
			},
			name: "captain's parade tunic",
			icon_state: "captunic"
		},
		tree_paths: ["items/clothing/suit/captunic"]
	},
	"chaplain_hoodie": { //TODO: hoodtype
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "chaplain_hoodie",
				},
				"Examine": {
					desc: "This suit says to you 'hush'!"
				}
			},
			name: "chaplain hoodie",
			icon_state: "chaplain_hoodie"
		},
		tree_paths: ["items/clothing/suit/hooded/chaplain_hoodie"]
	},
	"nun_robe": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
				},
				"SuitItem": {
					covered_slots: ['iclothing', 'id', 'storage1', 'storage2', 'belt', 'gloves']
				},
				"Item": {
					inhand_icon_state: "nun",
				},
				"Examine": {
					desc: "Maximum piety in this star system."
				}
			},
			name: "nun robe",
			icon_state: "nun"
		},
		tree_paths: ["items/clothing/suit/nun_robe"]
	},
	"studentuni": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "studentuni",
				},
				"Examine": {
					desc: "The uniform of a bygone institute of learning."
				}
			},
			name: "student robe",
			icon_state: "studentuni"
		},
		tree_paths: ["items/clothing/suit/studentuni"]
	},
	"witchhunter": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "witchhunter",
				},
				"Examine": {
					desc: "This worn outfit saw much use back in the day."
				}
			},
			name: "witchhunter garb",
			icon_state: "witchhunter"
		},
		tree_paths: ["items/clothing/suit/witchhunter"]
	},
	"toggle_chef": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					toggle_name: "sleeves"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm'],
					permeability_coefficient: 0.5
					//TODO gas_transfer_coefficient: 0.9
				},
				"Item": {
					inhand_icon_state: "chef",
				},
				"Examine": {
					desc: "An apron-jacket used by a high class chef."
				}
			},
			name: "chef's apron",
			icon_state: "chef"
		},
		tree_paths: ["items/clothing/suit/toggle/chef"]
	},
	"apron_chef": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin']
				},
				"Item": {
					inhand_icon_state: "apronchef",
				},
				"Examine": {
					desc: "A basic, dull, white chef's apron."
				}
			},
			name: "cook's apron",
			icon_state: "apronchef"
		},
		tree_paths: ["items/clothing/suit/apron/chef"]
	},
	"det_suit": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 25, bullet: 10, laser: 25, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 0, acid: 45},
					heat_protection: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
					cold_protection: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "det_suit",
				},
				"Examine": {
					desc: "An 18th-century multi-purpose trenchcoat. Someone who wears this means serious business."
				}
			},
			name: "trenchcoat",
			icon_state: "detective"
		},
		tree_paths: ["items/clothing/suit/det_suit"]
	},
	"det_suit_grey": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 25, bullet: 10, laser: 25, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 0, acid: 45},
					heat_protection: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
					cold_protection: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "greydet",
					//TODO cold_protection: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
					//TODO head_protection: ['chest', 'groin', 'l_leg', 'r_leg', 'l_arm', 'r_arm'],
				},
				"Examine": {
					desc: "A hard-boiled private investigator's grey trenchcoat."
				}
			},
			name: "noir trenchcoat",
			icon_state: "greydet"
		},
		tree_paths: ["items/clothing/suit/det_suit/grey"]
	},
	"hazardvest": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"Item": {
					inhand_icon_state: "hazard",
				},
				"Examine": {
					desc: "A high-visibility vest used in work zones."
				}
			},
			name: "hazard vest",
			icon_state: "hazard"
			//TODO: resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/hazardvest"]
	},
	"toggle_lawyer": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					toggle_name: "buttons",
					blood_overlay_type: "coat"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "suitjacket_blue",
				},
				"Examine": {
					desc: "A snappy dress jacket."
				}
			},
			name: "blue suit jacket",
			icon_state: "suitjacket_blue"
		},
		tree_paths: ["items/clothing/suit/toggle/lawyer"]
	},
	"toggle_lawyer_purple": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					toggle_name: "buttons",
					blood_overlay_type: "coat"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "suitjacket_purp",
				},
				"Examine": {
					desc: "A foppish dress jacket."
				}
			},
			name: "purple suit jacket",
			icon_state: "suitjacket_purp"
		},
		tree_paths: ["items/clothing/suit/toggle/lawyer/purple"]
	},
	"toggle_lawyer_black": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					toggle_name: "buttons",
					blood_overlay_type: "coat"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "ro_suit",
				},
				"Examine": {
					desc: "A professional suit jacket."
				}
			},
			name: "black suit jacket",
			icon_state: "suitjacket_black"
		},
		tree_paths: ["items/clothing/suit/toggle/lawyer/black"]
	},
	"security_officer": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "officerbluejacket",
				},
				"Examine": {
					desc: "This jacket is for those special occasions when a security officer isn't required to wear their armor."
				}
			},
			name: "security officer's jacket",
			icon_state: "officerbluejacket"
		},
		tree_paths: ["items/clothing/suit/security/officer"]
	},
	"security_warden": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "wardenbluejacket",
				},
				"Examine": {
					desc: "Perfectly suited for the warden that wants to leave an impression of style on those who visit the brig."
				}
			},
			name: "warden's jacket",
			icon_state: "wardenbluejacket"
		},
		tree_paths: ["items/clothing/suit/security/warden"]
	},
	"security_hos": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
				},
				"Item": {
					inhand_icon_state: "hosbluejacket",
				},
				"Examine": {
					desc: "This piece of clothing was specifically designed for asserting superior authority."
				}
			},
			name: "head of security's jacket",
			icon_state: "hosbluejacket"
		},
		tree_paths: ["items/clothing/suit/security/hos"]
	},
	"apron_surgical": {
		components: ["SuitItem"],
		vars: {
			components: {
				"Examine": {
					desc: "A sterile blue surgical apron."
				}
			},
			name: "surgical apron",
			icon_state: "surgical"
		},
		tree_paths: ["items/clothing/suit/apron/surgical"]
	},
	"curator": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 25, bullet: 10, laser: 25, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 0, acid: 45},
					heat_protection: ['chest', 'l_arm', 'r_arm'],
					cold_protection: ['chest', 'l_arm', 'r_arm']
				},
				"Item": {
					inhand_icon_state: "curator",
					//TODO cold_protection: ['chest', 'l_arm', 'r_arm'],
					//TODO head_protection: ['chest', 'l_arm', 'r_arm'],
				},
				"Examine": {
					desc: "Both fashionable and lightly armoured, this jacket is favoured by treasure hunters the galaxy over."
				}
			},
			name: "treasure hunter's coat",
			icon_state: "curator"
		},
		tree_paths: ["items/clothing/suit/curator"]
	},
};
