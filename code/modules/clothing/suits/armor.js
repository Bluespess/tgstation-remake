'use strict';
const defines = require('../../../defines/atmos_defines.js');

//TODO:
/*
Basically every suit_storage_whitelist since none of the items are implemented yet.
/obj/item/clothing/suit/armor/laserproof //and IsReflect()
/obj/item/clothing/suit/armor/reactive //Including all of its subtypes and procs
/obj/item/clothing/suit/armor/centcom
/obj/item/clothing/suit/armor/heavy
/obj/item/clothing/suit/armor/tdome //Including /red and /green subtypes
*/

module.exports.templates = {
	"armor_vest": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
					//TODO dog_fashion: /datum/dog_fashion/back
				},
				"Item": {
					inhand_icon_state: "armoralt",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A slim Type I armored vest that provides decent protection against most types of damage."
				}
			},
			name: "armor vest",
			icon_state: "armoralt"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/vest"]
	},
	"armor_vest_alt": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
					//TODO dog_fashion: /datum/dog_fashion/back
				},
				"Item": {
					inhand_icon_state: "armor",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A Type I armored vest that provides decent protection against most types of damage."
				}
			},
			name: "armor vest",
			icon_state: "armor" // the main one is "armoralt" and the alt is "armor". thanks TG.
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/vest/alt"]
	},
	"armor_vest_old": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
					//TODO dog_fashion: /datum/dog_fashion/back
				},
				"Item": {
					inhand_icon_state: "armor",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "Older generation Type 1 armored vest. Due to degradation over time the vest is far less maneuverable to move in."
				}
			},
			name: "degrading armor vest",
			icon_state: "armor"
			//resistance_flags: 0
			//slowdown: 1
		},
		tree_paths: ["items/clothing/suit/armor/vest/old"]
	},
	"blueshirt": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
					//TODO dog_fashion: /datum/dog_fashion/back
				},
				"Item": {
					inhand_icon_state: "blueshift",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A slim Type I armored vest that provides decent protection against most types of damage."
				}
			},
			name: "armor vest",
			icon_state: "blueshift"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/vest/blueshirt"]
	},
	"armor_hos": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm', 'l_leg', 'r_leg'],
					heat_protection: ['chest', 'groin', 'l_arm', 'r_arm', 'l_leg', 'r_leg'],
					cold_protection: ['chest', 'groin', 'l_arm', 'r_arm', 'l_leg', 'r_leg'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 8000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 70, acid: 90},
				},
				"Item": {
					inhand_icon_state: "greatcoat",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A greatcoat enhanced with a special alloy for some extra protection and style for those with a commanding presence."
				}
			},
			name: "armored greatcoat",
			icon_state: "hos"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/hos"]
	},
	"armor_hos_trenchcoat": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm', 'l_leg', 'r_leg'],
					heat_protection: ['chest', 'groin', 'l_arm', 'r_arm', 'l_leg', 'r_leg'],
					cold_protection: ['chest', 'groin', 'l_arm', 'r_arm', 'l_leg', 'r_leg'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 8000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 70, acid: 90},
					flags_inv: 0
				},
				"Item": {
					inhand_icon_state: "hostrench",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A trenchcoat enchanced with a special lightweight kevlar. The epitome of tactical plainclothes."
				}
			},
			name: "armored trenchcoat",
			icon_state: "hostrench"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/hos/trenchcoat"]
	},
	"armor_warden": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm'],
					heat_protection: ['chest', 'groin', 'l_arm', 'r_arm'],
					cold_protection: ['chest', 'groin', 'l_arm', 'r_arm'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 7000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
				},
				"Item": {
					inhand_icon_state: "armor",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A navy-blue armored jacket with blue shoulder designations and '/Warden/' stitched into one of the chest pockets."
				}
			},
			name: "warden's jacket",
			icon_state: "warden_alt"
			//resistance_flags: FLAMMABLE
		},
		tree_paths: ["items/clothing/suit/armor/vest/warden"]
	},
	"armor_warden_alt": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm'],
					heat_protection: ['chest', 'groin', 'l_arm', 'r_arm'],
					cold_protection: ['chest', 'groin', 'l_arm', 'r_arm'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 7000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
				},
				"Item": {
					inhand_icon_state: "armor",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A red jacket with silver rank pips and body armor strapped on top."
				}
			},
			name: "warden's armored jacket",
			icon_state: "warden_jacket"
			//resistance_flags: FLAMMABLE
		},
		tree_paths: ["items/clothing/suit/armor/vest/warden/alt"]
	},
	"armor_leather": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'l_arm', 'r_arm', 'l_leg', 'r_leg'],
					heat_protection: ['chest', 'groin', 'l_arm', 'r_arm', 'l_leg', 'r_leg'],
					cold_protection: ['chest', 'groin', 'l_arm', 'r_arm', 'l_leg', 'r_leg'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
				},
				"Item": {
					inhand_icon_state: "hostrench",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "Lightly armored leather overcoat meant as casual wear for high-ranking officers. Bears the crest of Nanotrasen Security."
				}
			},
			name: "security overcoat",
			icon_state: "leathercoat-sec"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/vest/leather"]
	},
	"armor_capcarapace": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 50, bullet: 40, laser: 50, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 100, acid: 90},
				},
				"Item": {
					inhand_icon_state: "armor",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A fireproof armored chestpiece reinforced with ceramic plates and plasteel pauldrons to provide additional protection whilst still offering maximum mobility and flexibility. Issued only to the station's finest, although it does chafe your nipples."
				}
			},
			name: "captain's carapace",
			icon_state: "capcarapace"
			//resistance_flags: FIRE_PROOF
		},
		tree_paths: ["items/clothing/suit/armor/vest/capcarapace"]
	},
	"armor_capcarapace_alt": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 50, bullet: 40, laser: 50, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 100, acid: 90},
				},
				"Item": {
					inhand_icon_state: "capspacesuit",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "For when an armoured vest isn't fashionable enough."
				}
			},
			name: "captain's parade jacket",
			icon_state: "capformal"
			//resistance_flags: FIRE_PROOF
		},
		tree_paths: ["items/clothing/suit/armor/vest/capcarapace/alt"]
	},
	"armor_capcarapace_syndicate": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 50, bullet: 40, laser: 50, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 100, acid: 90},
				},
				"Item": {
					inhand_icon_state: "armor",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A sinister looking vest of advanced armor worn over a black and red fireproof jacket. The gold collar and shoulders denote that this belongs to a high ranking syndicate officer."
				}
			},
			name: "syndicate captain's vest",
			icon_state: "syndievest"
			//resistance_flags: FIRE_PROOF
		},
		tree_paths: ["items/clothing/suit/armor/vest/capcarapace/syndicate"]
	},
	"armor_riot": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					heat_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					cold_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 8000,
					put_on_delay: 6000,
					clothing_armor: {melee: 50, bullet: 10, laser: 10, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 80, acid: 80},
				},
				"Item": {
					inhand_icon_state: "swat_suit",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A suit of semi-flexible polycarbonate body armor with heavy padding to protect against melee attacks."
				}
			},
			name: "riot suit",
			icon_state: "riot"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/riot"]
	},
	"armor_bone": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 35, bullet: 25, laser: 25, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
				},
				"Item": {
					inhand_icon_state: "bonearmor",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A tribal armor plate, crafted from animal bone."
				}
			},
			name: "bone armor",
			icon_state: "bonearmor"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/bone"]
	},
	"armor_bulletproof": { //Ironically, it's nowhere near actually bulletproof
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'groin'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 7000,
					put_on_delay: 5000,
					clothing_armor: {melee: 15, bullet: 60, laser: 10, energy: 10, bomb: 40, bio: 0, rad: 0, fire: 50, acid: 50},
				},
				"Item": {
					inhand_icon_state: "armor",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A Type III heavy bulletproof vest that excels in protecting the wearer against traditional projectile weaponry and explosives to a minor extent."
				}
			},
			name: "bulletproof armor",
			icon_state: "bulletproof"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/bulletproof"]
	},
	"armor_det_suit": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "armor"
				},
				"WearableItem": {
					body_parts_covered: ['chest'],
					heat_protection: ['chest', 'groin'],
					cold_protection: ['chest', 'groin'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 6000,
					put_on_delay: 4000,
					clothing_armor: {melee: 30, bullet: 30, laser: 30, energy: 10, bomb: 25, bio: 0, rad: 0, fire: 50, acid: 50},
				},
				"Item": {
					inhand_icon_state: "armoralt",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "An armored vest with a detective's badge on it."
				}
			},
			name: "detective's armor vest",
			icon_state: "detective-armor"
			//resistance_flags: FLAMMABLE
		},
		tree_paths: ["items/clothing/suit/armor/vest/det_suit"]
	},
	"armor_knight": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					heat_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					cold_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 8000,
					put_on_delay: 6000,
					clothing_armor: {melee: 50, bullet: 10, laser: 10, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 80, acid: 80},
				},
				"Item": {
					inhand_icon_state: "knight_green",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A classic suit of plate armour, highly effective at stopping melee attacks."
				}
			},
			name: "plate armor",
			icon_state: "knight_green"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/riot/knight"]
	},
	"armor_knight_yellow": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					heat_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					cold_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 8000,
					put_on_delay: 6000,
					clothing_armor: {melee: 50, bullet: 10, laser: 10, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 80, acid: 80},
				},
				"Item": {
					inhand_icon_state: "knight_yellow",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A classic suit of plate armour, highly effective at stopping melee attacks."
				}
			},
			name: "plate armor",
			icon_state: "knight_yellow"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/riot/knight/yellow"]
	},
	"armor_knight_blue": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					heat_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					cold_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 8000,
					put_on_delay: 6000,
					clothing_armor: {melee: 50, bullet: 10, laser: 10, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 80, acid: 80},
				},
				"Item": {
					inhand_icon_state: "knight_blue",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A classic suit of plate armour, highly effective at stopping melee attacks."
				}
			},
			name: "plate armor",
			icon_state: "knight_blue"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/riot/knight/blue"]
	},
	"armor_knight_red": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					heat_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					cold_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 8000,
					put_on_delay: 6000,
					clothing_armor: {melee: 50, bullet: 10, laser: 10, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 80, acid: 80},
				},
				"Item": {
					inhand_icon_state: "knight_red",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "A classic suit of plate armour, highly effective at stopping melee attacks."
				}
			},
			name: "plate armor",
			icon_state: "knight_red"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/riot/knight/red"]
	},
	"armor_knight_templar": {
		components: ["SuitItem"],
		vars: {
			components: {
				"WearableItem": {
					body_parts_covered: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					heat_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					cold_protection: ['chest', 'groin', 'r_leg', 'l_leg', 'r_arm', 'l_arm'],
					max_heat_protection_temperature: defines.ARMOR_MAX_TEMP_PROTECT,
					min_cold_protection_temperature: defines.ARMOR_MIN_TEMP_PROTECT,
					strip_delay: 8000,
					put_on_delay: 6000,
					clothing_armor: {melee: 50, bullet: 10, laser: 10, energy: 10, bomb: 0, bio: 0, rad: 0, fire: 80, acid: 80},
				},
				"Item": {
					inhand_icon_state: "knight_templar",
				},
				"Destructible": {
					max_integrity: 250
				},
				"Examine": {
					desc: "God wills it!"
				}
			},
			name: "crusader armor",
			icon_state: "knight_templar"
			//resistance_flags: 0
		},
		tree_paths: ["items/clothing/suit/armor/riot/knight/templar"]
	}
};
