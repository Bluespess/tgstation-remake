'use strict';

//TODO (and their procs):
/*
/obj/item/projectile/bullet/incendiary
/obj/item/projectile/bullet/incendiary/c10mm
/obj/item/projectile/bullet/incendiary/c9mm
/obj/item/projectile/bullet/incendiary/c46x30mm
/obj/item/projectile/bullet/a40mm
/obj/item/projectile/bullet/p50
/obj/item/projectile/bullet/p50/soporific
/obj/item/projectile/bullet/p50/penetrator
/obj/item/projectile/bullet/incendiary/mm195x129
/obj/item/projectile/bullet/incendiary/shotgun
/obj/item/projectile/bullet/incendiary/shotgun/dragonsbreath
/obj/item/projectile/bullet/shotgun_stunslug
/obj/item/projectile/bullet/shotgun_meteorslug
/obj/item/projectile/bullet/shotgun_frag12
/obj/item/projectile/bullet/pellet //And all pellet subtypes
/obj/item/projectile/bullet/incendiary/fnx99
/obj/item/projectile/bullet/honker
/obj/item/projectile/bullet/mime
/obj/item/projectile/bullet/dart //And all dart subtypes
/obj/item/projectile/bullet/dnainjector
*/

module.exports.templates = {
	"bullet": {
		components: ["Projectile"],
		vars: {
			components: {
				"Bullet": {
					damage: 60,
					hitsound_wall: "ricochet"
					//TODO impact_effect_type = /obj/effect/temp_visual/impact_effect
				}
			},
			name: "bullet",
			icon_state: "bullet"
		},
		tree_paths: ["items/projectile/bullet"]
	},
	// .357 (Syndie Revolver)
	"bullet_a357": {
		parent_template: "bullet",
		vars: {
			name: ".357 bullet"
		},
		tree_paths: ["items/projectile/bullet/a357"]
	},
	// 7.62 (Nagant Rifle)
	"bullet_a762": {
		parent_template: "bullet",
		vars: {
			name: "7.62 bullet"
		},
		tree_paths: ["items/projectile/bullet/a762"]
	},
	"bullet_a762_enchanted": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 5,
					//TODO stamina: 80
				}
			},
			name: "enchanted 7.62 bullet"
		},
		tree_paths: ["items/projectile/bullet/a762_enchanted"]
	},
	// 7.62x38mmR (Nagant Revolver)
	"bullet_n762": {
		parent_template: "bullet",
		vars: {
			name: "7.62x38mmR bullet"
		},
		tree_paths: ["items/projectile/bullet/n762"]
	},
	// .50AE (Desert Eagle)
	"bullet_a50AE": {
		parent_template: "bullet",
		vars: {
			name: ".50AE bullet"
		},
		tree_paths: ["items/projectile/bullet/a50AE"]
	},
	// .38 (Detective's Gun)
	"bullet_c38": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 15,
					//TODO stamina: 50
					status_effects: {"Knockdown": {delay: 6000}},
				}
			},
			name: "enchanted 7.62 bullet"
		},
		tree_paths: ["items/projectile/bullet/c38"]
	},
	// 10mm (Stechkin)
	"bullet_c10mm": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 30,
				}
			},
			name: "10mm bullet"
		},
		tree_paths: ["items/projectile/bullet/c10mm"]
	},
	"bullet_c10mm_ap": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 27,
					//TODO armor_penetration: 40
				}
			},
			name: "10mm armor-piercing bullet"
		},
		tree_paths: ["items/projectile/bullet/c10mm_ap"]
	},
	"bullet_c10mm_hp": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 40,
					//TODO armor_penetration: -50
				}
			},
			name: "10mm hollow-point bullet"
		},
		tree_paths: ["items/projectile/bullet/c10mm_hp"]
	},
	// 9mm (Stechkin APS)
	"bullet_c9mm": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 20,
				}
			},
			name: "9mm bullet"
		},
		tree_paths: ["items/projectile/bullet/c9mm"]
	},
	"bullet_c9mm_ap": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 15,
					//TODO armor_penetration: 40
				}
			},
			name: "10mm armor-piercing bullet"
		},
		tree_paths: ["items/projectile/bullet/c9mm_ap"]
	},
	// 4.6x30mm (Autorifles)
	"bullet_c46x30mm": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 20,
				}
			},
			name: "4.6x30mm bullet"
		},
		tree_paths: ["items/projectile/bullet/c46x30mm"]
	},
	"bullet_c46x30mm_ap": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 15,
					//TODO armor_penetration: 40
				}
			},
			name: "4.6x30mm armor-piercing bullet"
		},
		tree_paths: ["items/projectile/bullet/c46x30mm_ap"]
	},
	// .45 (M1911 & C20r)
	"bullet_c45": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 20,
					//TODO stamina: 65
				}
			},
			name: ".45 bullet"
		},
		tree_paths: ["items/projectile/bullet/c45"]
	},
	"bullet_c45_nostamina": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 30,
				}
			},
			name: ".45 bullet"
		},
		tree_paths: ["items/projectile/bullet/c45_nostamina"]
	},
	// 5.56mm (M-90gl Carbine)
	"bullet_a556": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 35,
				}
			},
			name: "5.56mm bullet"
		},
		tree_paths: ["items/projectile/bullet/a556"]
	},
	// 1.95x129mm (SAW)
	"bullet_mm195x129": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 45,
					//TODO armor_penetration: 5
				}
			},
			name: "1.95x129mm bullet"
		},
		tree_paths: ["items/projectile/bullet/mm195x129"]
	},
	"bullet_mm195x129_ap": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 40,
					//TODO armor_penetration: 75
				}
			},
			name: "1.95x129mm armor-piercing bullet"
		},
		tree_paths: ["items/projectile/bullet/mm195x129_ap"]
	},
	"bullet_mm195x129_hp": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 60,
					//TODO armor_penetration: -60
				}
			},
			name: "1.95x129mm hollow-point bullet"
		},
		tree_paths: ["items/projectile/bullet/mm195x129_hp"]
	},
	// Shotgun
	"bullet_shotgun_slug": {
		parent_template: "bullet",
		vars: {
			name: "12g shotgun slug"
		},
		tree_paths: ["items/projectile/bullet/shotgun_slug"]
	},
	"bullet_shotgun_beanbag": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 5,
					//TODO stamina: 80
				}
			},
			name: "beanbag slug"
		},
		tree_paths: ["items/projectile/bullet/shotgun_beanbag"]
	},
	// Scattershot
	"bullet_scattershot": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 60,
					//TODO stamina: 65
				}
			},
			name: "bullet"
		},
		tree_paths: ["items/projectile/bullet/scattershot"]
	},
	// LMD (exosuits)
	"bullet_lmg": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 20
				}
			},
			name: "bullet"
		},
		tree_paths: ["items/projectile/bullet/lmg"]
	},
	// Turrets
	"bullet_manned_turret": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 20
				}
			},
			name: "bullet"
		},
		tree_paths: ["items/projectile/bullet/manned_turret"]
	},
	"bullet_syndicate_turret": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 20
				}
			},
			name: "bullet"
		},
		tree_paths: ["items/projectile/bullet/syndicate_turret"]
	},
	// C3D (Borgs)
	"bullet_c3d": {
		parent_template: "bullet",
		vars: {
			components: {
				"Bullet": {
					damage: 20
				}
			},
			name: "bullet"
		},
		tree_paths: ["items/projectile/bullet/c3d"]
	},
};
