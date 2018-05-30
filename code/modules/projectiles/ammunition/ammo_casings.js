'use strict';

//TODO: Almost all casings are implemented, but not all of them have their projectile_type implemented. Probably worth double-checking all the projectile_types once they're all implemented.

//TODO (including their procs and subtypes): /obj/item/ammo_casing/shotgun/dart

module.exports.templates = {
	// .357 (Syndie Revolver)
	"casing_a357": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "357",
					projectile_type: "bullet_a357",
					casing_type: "casing_a357"
				},
				"Examine": {
					desc: "A .357 bullet casing."
				}
			},
			name: ".357 bullet casing"
		},
		tree_paths: ["items/ammo_casing/a357"]
	},
	// 7.62 (Nagant Rifle)
	"casing_a762": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "a762",
					projectile_type: "bullet_a762",
					casing_type: "casing_a762"
				},
				"Examine": {
					desc: "A 7.62 bullet casing."
				}
			},
			name: "7.62 bullet casing",
			icon_state: "762-casing"
		},
		tree_paths: ["items/ammo_casing/a762"]
	},
	"casing_a762_enchanted": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "a762",
					projectile_type: "bullet_a762_enchanted",
					casing_type: "casing_a762_enchanted"
				},
				"Examine": {
					desc: "A 7.62 bullet casing."
				}
			},
			name: "7.62 bullet casing",
			icon_state: "762-casing"
		},
		tree_paths: ["items/ammo_casing/a762"]
	},
	// 7.62x38mmR (Nagant Revolver)
	"casing_n762": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "n762",
					projectile_type: "bullet_n762",
					casing_type: "casing_n762"
				},
				"Examine": {
					desc: "A 7.62x38mmR bullet casing."
				}
			},
			name: "7.62x38mmR bullet casing",
		},
		tree_paths: ["items/ammo_casing/n762"]
	},
	// .50AE (Desert Eagle)
	"casing_a50AE": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: ".50",
					projectile_type: "bullet_a50AE",
					casing_type: "casing_a50AE"
				},
				"Examine": {
					desc: "A .50AE bullet casing."
				}
			},
			name: ".50AE bullet casing",
		},
		tree_paths: ["items/ammo_casing/a50AE"]
	},
	// .38 (Detective's Gun)
	"casing_c38": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "38",
					projectile_type: "bullet_c38",
					casing_type: "casing_c38"
				},
				"Examine": {
					desc: "A .38 bullet casing."
				}
			},
			name: ".38 bullet casing",
		},
		tree_paths: ["items/ammo_casing/c38"]
	},
	// 10mm (Stechkin)
	"casing_c10mm": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "10mm",
					projectile_type: "bullet_c10mm",
					casing_type: "casing_c10mm"
				},
				"Examine": {
					desc: "A 10mm bullet casing."
				}
			},
			name: "10mm bullet casing",
		},
		tree_paths: ["items/ammo_casing/c10mm"]
	},
	"casing_c10mm_ap": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "10mm",
					projectile_type: "bullet_c10mm_ap",
					casing_type: "casing_c10mm_ap"
				},
				"Examine": {
					desc: "A 10mm armor-piercing bullet casing."
				}
			},
			name: "10mm armor-piercing bullet casing",
		},
		tree_paths: ["items/ammo_casing/c10mm_ap"]
	},
	"casing_c10mm_hp": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "10mm",
					projectile_type: "bullet_c10mm_hp",
					casing_type: "casing_c10mm_hp"
				},
				"Examine": {
					desc: "A 10mm hollow-point bullet casing."
				}
			},
			name: "10mm hollow point bullet casing",
		},
		tree_paths: ["items/ammo_casing/c10mm_hp"]
	},
	"casing_c10mm_inc": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "10mm",
					projectile_type: "bullet_c10mm_inc",
					casing_type: "casing_c10mm_inc"
				},
				"Examine": {
					desc: "A 10mm incendiary bullet casing."
				}
			},
			name: "10mm incendiary bullet casing",
		},
		tree_paths: ["items/ammo_casing/c10mm_inc"]
	},
	// 9mm (Stechkin APS)
	"casing_c9mm": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "9mm",
					projectile_type: "bullet_c9mm",
					casing_type: "casing_c9mm"
				},
				"Examine": {
					desc: "A 9mm bullet casing."
				}
			},
			name: "9mm bullet casing",
		},
		tree_paths: ["items/ammo_casing/c9mm"]
	},
	"casing_c9mm_ap": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "9mm",
					projectile_type: "bullet_c9mm_ap",
					casing_type: "casing_c9mm_ap"
				},
				"Examine": {
					desc: "A 9mm armor-piercing bullet casing."
				}
			},
			name: "9mm armor-piercing bullet casing",
		},
		tree_paths: ["items/ammo_casing/c9mm_ap"]
	},
	"casing_c9mm_inc": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "9mm",
					projectile_type: "bullet_c9mm_inc",
					casing_type: "casing_c9mm_inc"
				},
				"Examine": {
					desc: "A 9mm incendiary bullet casing."
				}
			},
			name: "9mm incendiary bullet casing",
		},
		tree_paths: ["items/ammo_casing/c9mm_inc"]
	},
	// 4.6x30mm (Autorifles)
	"casing_c46x30mm": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "4.6x30mm",
					projectile_type: "bullet_c46x30mm",
					casing_type: "casing_c46x30mm"
				},
				"Examine": {
					desc: "A 4.6x30mm bullet casing."
				}
			},
			name: "4.6x30mm bullet casing",
		},
		tree_paths: ["items/ammo_casing/c46x30mm"]
	},
	"casing_c46x30mm_ap": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "4.6x30mm",
					projectile_type: "bullet_c46x30mm_ap",
					casing_type: "casing_c46x30mm_ap"
				},
				"Examine": {
					desc: "A 4.6x30mm armor-piercing bullet casing."
				}
			},
			name: "4.6x30mm armor-piercing bullet casing",
		},
		tree_paths: ["items/ammo_casing/c46x30mm_ap"]
	},
	"casing_c46x30mm_inc": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "4.6x30mm",
					projectile_type: "bullet_c46x30mm_inc",
					casing_type: "casing_c46x30mm_inc"
				},
				"Examine": {
					desc: "A 4.6x30mm incendiary bullet casing."
				}
			},
			name: "4.6x30mm incendiary bullet casing",
		},
		tree_paths: ["items/ammo_casing/c46x30mm_inc"]
	},
	// .45 (M1911 + C20r)
	"casing_c45": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: ".45",
					projectile_type: "bullet_c45",
					casing_type: "casing_c45"
				},
				"Examine": {
					desc: "A .45 bullet casing."
				}
			},
			name: ".45 bullet casing",
		},
		tree_paths: ["items/ammo_casing/c45"]
	},
	"casing_c45_nostamina": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: ".45",
					projectile_type: "bullet_c45_nostamina",
					casing_type: "casing_c45_nostamina"
				},
				"Examine": {
					desc: "A .45 bullet casing."
				}
			},
			name: ".45 bullet casing",
		},
		tree_paths: ["items/ammo_casing/c45_nostamina"]
	},
	// 5.56mm (M-90gl Carbine)
	"casing_a556": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "a556",
					projectile_type: "bullet_a556",
					casing_type: "casing_a556"
				},
				"Examine": {
					desc: "A 5.56mm bullet casing."
				}
			},
			name: "5.56mm bullet casing",
		},
		tree_paths: ["items/ammo_casing/a556"]
	},
	// 40mm (Grenade Launcher)
	"casing_a40mm": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "40mm",
					projectile_type: "bullet_a556",
					casing_type: "casing_a556"
				},
				"Examine": {
					desc: "A cased high explosive grenade that can only be activated once fired out of a grenade launcher."
				}
			},
			name: "40mm HE shell",
			icon_state: "40mmHE"
		},
		tree_paths: ["items/ammo_casing/a40mm"]
	},
	// .50 (Sniper)
	"casing_p50": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: ".50",
					projectile_type: "bullet_p50",
					casing_type: "casing_p50"
				},
				"Examine": {
					desc: "A .50 bullet casing."
				}
			},
			name: ".50 bullet casing",
			icon_state: ".50"
		},
		tree_paths: ["items/ammo_casing/p50"]
	},
	"casing_p50_soporific": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: ".50",
					projectile_type: "bullet_p50_soporific",
					casing_type: "casing_p50_soporific"
				},
				"Examine": {
					desc: "A .50 bullet casing, specialised in sending the target to sleep, instead of hell."
				}
			},
			name: ".50 soporific bullet casing",
			icon_state: "sleeper"
		},
		tree_paths: ["items/ammo_casing/p50_soporific"]
	},
	"casing_p50_penetrator": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: ".50",
					projectile_type: "bullet_p50_penetrator",
					casing_type: "casing_p50_penetrator"
				},
				"Examine": {
					desc: "A .50 caliber penetrator round casing."
				}
			},
			name: ".50 penetrator round bullet casing",
			icon_state: ".50"
		},
		tree_paths: ["items/ammo_casing/p50_penetrator"]
	},
	// 1.95x129mm (SAW)
	"casing_mm195x129": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "mm195x129",
					projectile_type: "bullet_mm195x129",
					casing_type: "casing_mm195x129"
				},
				"Examine": {
					desc: "A 10mm bullet casing."
				}
			},
			name: "1.95x129mm bullet casing",
		},
		tree_paths: ["items/ammo_casing/mm195x129"]
	},
	"casing_mm195x129_ap": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "mm195x129",
					projectile_type: "bullet_mm195x129_ap",
					casing_type: "casing_mm195x129_ap"
				},
				"Examine": {
					desc: "A 1.95x129mm bullet casing designed with a hardened-tipped core to help penetrate armored targets."
				}
			},
			name: "1.95x129mm armor-piercing bullet casing",
		},
		tree_paths: ["items/ammo_casing/mm195x129_ap"]
	},
	"casing_mm195x129_hp": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "mm195x129",
					projectile_type: "bullet_mm195x129_hp",
					casing_type: "casing_mm195x129_hp"
				},
				"Examine": {
					desc: "A 1.95x129mm bullet casing designed to cause more damage to unarmored targets."
				}
			},
			name: "1.95x129mm hollow point bullet casing",
		},
		tree_paths: ["items/ammo_casing/mm195x129_hp"]
	},
	"casing_mm195x129_inc": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "mm195x129",
					projectile_type: "bullet_mm195x129_inc",
					casing_type: "casing_mm195x129_inc"
				},
				"Examine": {
					desc: "A 1.95x129mm bullet casing designed with a chemical-filled capsule on the tip that when bursted, reacts with the atmosphere to produce a fireball, engulfing the target in flames."
				}
			},
			name: "1.95x129mm incendiary bullet casing",
		},
		tree_paths: ["items/ammo_casing/mm195x129_inc"]
	},
	// Shotgun
	"casing_shotgun_slug": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_shotgun_slug",
					casing_type: "casing_shotgun_slug"
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "A 12 gauge lead slug."
				}
			},
			name: "shotgun slug",
			icon_state: "blshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_slug"]
	},
	"casing_shotgun_beanbag": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_shotgun_beanbag",
					casing_type: "casing_shotgun_beanbag"
				},
				"Item": {
					materials: {"metal": 250},
				},
				"Examine": {
					desc: "A weak beanbag slug for riot control."
				}
			},
			name: "beanbag slug",
			icon_state: "bshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_beanbag"]
	},
	"casing_shotgun_inc": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_shotgun_inc",
					casing_type: "casing_shotgun_inc"
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "An incendiary-coated shotgun slug."
				}
			},
			name: "incendiary slug",
			icon_state: "ishell"
		},
		tree_paths: ["items/ammo_casing/shotgun_inc"]
	},
	"casing_shotgun_dragonsbreath": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_shotgun_dragonsbreath",
					casing_type: "casing_shotgun_dragonsbreath",
					pellets: 4,
					variance: 35
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "A shotgun shell which fires a spread of incendiary pellets."
				}
			},
			name: "dragonsbreath shell",
			icon_state: "ishell2"
		},
		tree_paths: ["items/ammo_casing/shotgun_dragonsbreath"]
	},
	"casing_shotgun_stunslug": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_shotgun_stunslug",
					casing_type: "casing_shotgun_stunslug"
				},
				"Item": {
					materials: {"metal": 250},
				},
				"Examine": {
					desc: "A stunning taser slug."
				}
			},
			name: "taser slug",
			icon_state: "stunshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_stunslug"]
	},
	"casing_shotgun_meteorslug": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_shotgun_meteorslug",
					casing_type: "casing_shotgun_meteorslug"
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "A shotgun shell rigged with CMC technology, which launches a massive slug when fired."
				}
			},
			name: "meteorslug shell",
			icon_state: "mshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_meteorslug"]
	},
	"casing_shotgun_pulseslug": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_shotgun_pulseslug",
					casing_type: "casing_shotgun_pulseslug"
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "A delicate device which can be loaded into a shotgun. The primer acts as a button which triggers the gain medium and fires a powerful energy blast. While the heat and power drain limit it to one use, it can still allow an operator to engage targets that ballistic ammunition would have difficulty with."
				}
			},
			name: "pulse slug",
			icon_state: "pshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_pulseslug"]
	},
	"casing_shotgun_frag12": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_shotgun_frag12",
					casing_type: "casing_shotgun_slug"
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "A high explosive breaching round for a 12 gauge shotgun."
				}
			},
			name: "FRAG-12 slug",
			icon_state: "heshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_frag12"]
	},
	"casing_shotgun_buckshot": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_pellet_shotgun_buckshot",
					casing_type: "casing_shotgun_buckshot",
					pellets: 6,
					variance: 25
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "A 12 gauge buckshot shell."
				}
			},
			name: "buckshot shell",
			icon_state: "gshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_buckshot"]
	},
	"casing_shotgun_rubbershot": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_pellet_shotgun_rubbershot",
					casing_type: "casing_shotgun_rubbershot",
					pellets: 6,
					variance: 25
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "A shotgun casing filled with densely-packed rubber balls, used to incapacitate crowds from a distance."
				}
			},
			name: "rubber shot",
			icon_state: "bshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_rubbershot"]
	},
	"casing_shotgun_improvised": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "bullet_pellet_shotgun_improvised",
					casing_type: "casing_shotgun_improvised",
					pellets: 10,
					variance: 25
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "An extremely weak shotgun shell with multiple small pellets made out of metal shards."
				}
			},
			name: "improvised shell",
			icon_state: "improvshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_improvised"]
	},
	"casing_shotgun_ion": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "ion_weak",
					casing_type: "casing_shotgun_ion",
					pellets: 4,
					variance: 35
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "An advanced shotgun shell which uses a subspace ansible crystal to produce an effect similar to a standard ion rifle. The unique properties of the crystal split the pulse into a spread of individually weaker bolts."
				}
			},
			name: "ion shell",
			icon_state: "ionshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_ion"]
	},
	"casing_shotgun_laserslug": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: "beam_laser",
					casing_type: "casing_shotgun_laserslug"
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "An advanced shotgun shell that uses a micro laser to replicate the effects of a laser weapon in a ballistic package."
				}
			},
			name: "shotgun slug",
			icon_state: "lshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_laserslug"]
	},
	"casing_shotgun_techshell": {
		components: ["AmmoCasing"],
		vars: {
			components: {
				"AmmoCasing": {
					caliber: "shotgun",
					projectile_type: null,
					casing_type: "casing_shotgun_techshell"
				},
				"Item": {
					materials: {"metal": 4000},
				},
				"Examine": {
					desc: "A high-tech shotgun shell which can be loaded with materials to produce unique effects."
				}
			},
			name: "unloaded technological shell",
			icon_state: "cshell"
		},
		tree_paths: ["items/ammo_casing/shotgun_techshell"]
	},
};
