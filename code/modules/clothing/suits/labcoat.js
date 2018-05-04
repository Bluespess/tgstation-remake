'use strict';

//TODO:
/*
Basically every suit_storage_whitelist since none of the items are implemented yet.
/obj/item/clothing/suit/toggle/labcoat/mad
*/

module.exports.templates = {
	"toggle_labcoat": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat",
					toggle_name: "buttons"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 50, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "labcoat",
				},
				"Examine": {
					desc: "A suit that protects against minor chemical spills."
				}
			},
			name: "labcoat",
			icon_state: "labcoat"
		},
		tree_paths: ["items/clothing/suit/toggle/labcoat"]
	},
	"toggle_labcoat_cmo": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat",
					toggle_name: "buttons"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 50, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "labcoat_cmo",
				},
				"Examine": {
					desc: "Bluer than the standard model."
				}
			},
			name: "chief medical officer's labcoat",
			icon_state: "labcoat_cmo"
		},
		tree_paths: ["items/clothing/suit/toggle/labcoat/cmo"]
	},
	"toggle_labcoat_emt": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat",
					toggle_name: "buttons"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 50, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "labcoat",
				},
				"Examine": {
					desc: "A dark blue jacket with reflective strips for emergency medical technicians."
				}
			},
			name: "EMT's jacket",
			icon_state: "labcoat_emt"
		},
		tree_paths: ["items/clothing/suit/toggle/labcoat/emt"]
	},
	"toggle_labcoat_genetics": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat",
					toggle_name: "buttons"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 50, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "labcoat",
				},
				"Examine": {
					desc: "A suit that protects against minor chemical spills. Has a blue stripe on the shoulder."
				}
			},
			name: "geneticist labcoat",
			icon_state: "labcoat_gen"
		},
		tree_paths: ["items/clothing/suit/toggle/labcoat/genetics"]
	},
	"toggle_labcoat_chemist": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat",
					toggle_name: "buttons"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 50, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "labcoat",
				},
				"Examine": {
					desc: "A suit that protects against minor chemical spills. Has an orange stripe on the shoulder."
				}
			},
			name: "chemist labcoat",
			icon_state: "labcoat_chem"
		},
		tree_paths: ["items/clothing/suit/toggle/labcoat/chemist"]
	},
	"toggle_labcoat_virologist": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat",
					toggle_name: "buttons"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 50, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "labcoat",
				},
				"Examine": {
					desc: "A suit that protects against minor chemical spills. Offers slightly more protection against biohazards than the standard model. Has a green stripe on the shoulder." //It doesn't actually offer more protection. wew lad
				}
			},
			name: "virologist labcoat",
			icon_state: "labcoat_vir"
		},
		tree_paths: ["items/clothing/suit/toggle/labcoat/virologist"]
	},
	"toggle_labcoat_science": {
		components: ["SuitItem"],
		vars: {
			components: {
				"SuitItem": {
					blood_overlay_type: "coat",
					toggle_name: "buttons"
				},
				"WearableItem": {
					body_parts_covered: ['chest', 'l_arm', 'r_arm'],
					clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 50, rad: 0, fire: 50, acid: 50}
				},
				"Item": {
					inhand_icon_state: "labcoat",
				},
				"Examine": {
					desc: "A suit that protects against minor chemical spills. Has a purple stripe on the shoulder."
				}
			},
			name: "scientist labcoat",
			icon_state: "labcoat_tox"
		},
		tree_paths: ["items/clothing/suit/toggle/labcoat/science"]
	}
};
