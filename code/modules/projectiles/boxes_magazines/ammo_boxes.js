'use strict';

//TODO: All ammo boxes are implemented, but not all of them have their ammo_type implemented. Probably worth double-checking all the ammo_types once they're all implemented.

module.exports.templates = {
	"ammo_box_a357": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "casing_a357",
					max_ammo: 7,
					multiple_sprites: 1
				},
				"Examine": {
					desc: "Designed to quickly reload revolvers."
				}
			},
			name: "speed loader (.357)",
			icon_state: "357"
		},
		tree_paths: ["items/ammo_box/a357"]
	},
	"ammo_box_c38": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "casing_c38",
					max_ammo: 6,
					multiple_sprites: 1
				},
				"Examine": {
					desc: "Designed to quickly reload revolvers."
				}
			},
			name: "speed loader (.38)",
			icon_state: "38",

		},
		tree_paths: ["items/ammo_box/c38"]
	},
	"ammo_box_c9mm": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "casing_c9mm",
					max_ammo: 30
				},
			},
			name: "ammo box (9mm)",
			icon_state: "9mmbox"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/c9mm"]
	},
	"ammo_box_c10mm": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "casing_c10mm",
					max_ammo: 20
				},
			},
			name: "ammo box (10mm)",
			icon_state: "10mmbox"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/c10mm"]
	},
	"ammo_box_c45": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "casing_c45",
					max_ammo: 20
				}
			},
			name: "ammo box (.45)",
			icon_state: "45box"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/c45"]
	},
	"ammo_box_a40mm": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "casing_a40mm",
					max_ammo: 4,
					multiple_sprites: 1
				}
			},
			name: "ammo box (40mm grenades)",
			icon_state: "40mm"
		},
		tree_paths: ["items/ammo_box/a40mm"]
	},
	"ammo_box_a762": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "casing_a762",
					max_ammo: 5,
					multiple_sprites: 1
				},
				"Examine": {
					desc: "A stripper clip."
				}
			},
			name: "stripper clip (7.62mm)",
			icon_state: "762"
		},
		tree_paths: ["items/ammo_box/a762"]
	},
	"ammo_box_n762": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "casing_n762",
					max_ammo: 14
				},
			},
			name: "ammo box (7.62x38mmR)",
			icon_state: "10mmbox"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/n762"]
	},
	"ammo_box_foambox": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "caseless_foam_dart",
					max_ammo: 40
				}
			},
			name: "ammo box (Foam Darts)",
			icon: "icons/obj/guns/toy.png",
			icon_state: "foambox"
		},
		tree_paths: ["items/ammo_box/foambox"]
	},
	"ammo_box_foambox_riot": {
		components: ["AmmoBox"],
		vars: {
			components: {
				"AmmoBox": {
					ammo_type: "caseless_foam_dart_riot",
					max_ammo: 40
				}
			},
			name: "ammo box (Foam Darts)",
			icon: "icons/obj/guns/toy.png",
			icon_state: "foambox_riot"
		},
		tree_paths: ["items/ammo_box/foambox/riot"]
	}
};
