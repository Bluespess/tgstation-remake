'use strict';

module.exports.templates = {
	"stechkin_pistol": {
		components: ["BallisticGun"],
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
	}
};
