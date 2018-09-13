'use strict';

module.exports.templates = {
	"stechkin_pistol": {
		components: ["BallisticGun", "BeltItem"],
		vars: {
			components: {
				"BallisticGun": {
					tactical_reloads: true,
					mag_caliber: "10mm",
					mag_form_factor: "pistol",
					reload_sound: 'sound/weapons/autoguninsert.ogg',
					can_suppress: true,
					empty_state: true
				},
				"Examine": {
					desc: "A small, easily concealable 10mm handgun. Has a threaded barrel for suppressors."
				},
				"Item": {
					size: 2
				}
			},
			name: "stechkin pistol",
			icon_state: "pistol"
		},
		tree_paths: ["items/gun/ballistic/automatic/pistol"]
	},
	"deagle": {
		components: ["BallisticGun", "BeltItem"],
		vars: {
			components: {
				"BallisticGun": {
					spawn_mag: "mag_m50",
					mag_caliber: ".50",
					mag_form_factor: "pistol",
					tactical_reloads: true,
					reload_sound: 'sound/weapons/autoguninsert.ogg',
					can_suppress: false,
					mag_state: true
				},
				"Examine": {
					desc: "A robust .50 AE handgun."
				},
				"Item": {
					size: 2
				},
			},
			name: "improper Desert Eagle",
			icon_state: "deagle"
			
		},
		tree_paths: ["items/gun/ballistic/automatic/pistol/deagle"]
	},
	"deagleg": {
		components: ["BallisticGun", "BeltItem"],
		vars: {
			components: {
				"BallisticGun": {
					spawn_mag: "mag_m50",
					mag_caliber: ".50",
					mag_form_factor: "pistol",
					tactical_reloads: true,
					reload_sound: 'sound/weapons/autoguninsert.ogg',
					can_suppress: false,
					mag_state: true
				},
				"Examine": {
					desc: "A gold plated Desert Eagle folded over a million times by superior martian gunsmiths. Uses .50 AE ammo."
				},
				"Item": {
					size: 2
				},
			},
			name: "improper Desert Eagle",
			icon_state: "deagleg"
			
		},
		tree_paths: ["items/gun/ballistic/automatic/pistol/deagle/gold"]
	},
	"deaglecamo": {
		components: ["BallisticGun", "BeltItem"],
		vars: {
			components: {
				"BallisticGun": {
					spawn_mag: "mag_m50",
					mag_caliber: ".50",
					mag_form_factor: "pistol",
					tactical_reloads: true,
					reload_sound: 'sound/weapons/autoguninsert.ogg',
					can_suppress: false,
					mag_state: true
				},
				"Examine": {
					desc: "A Deagle brand Deagle for operators operating operationally. Uses .50 AE ammo."
				},
				"Item": {
					size: 2
				},
			},
			name: "improper Desert Eagle",
			icon_state: "deaglecamo"
			
		},
		tree_paths: ["items/gun/ballistic/automatic/pistol/deagle/camo"]
	}
};
