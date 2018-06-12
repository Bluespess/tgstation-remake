'use strict';

//TODO: Almost all magazines are implemented, but not all of them have their ammo_type implemented. Probably worth double-checking all the ammo_types once they're all implemented.
//TODO: /obj/item/ammo_box/magazine/recharge and procs

//TODO: On TG, most of these have snowflake update_icon() procs. Monster volunteered to deal with it.

module.exports.templates = {
	"mag_m10mm": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "10mm",
					ammo_type: "casing_c10mm",
					max_ammo: 8,
					multiple_sprites: 2
				},
				"Examine": {
					desc: "A gun magazine."
				}
			},
			name: "pistol magazine (10mm)",
			icon_state: "9x19p"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/magazine/m10mm"]
	},
	"mag_m10mm_rifle": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "10mm",
					ammo_type: "casing_c10mm",
					max_ammo: 10,
					multiple_sprites: 2
				},
				"Examine": {
					desc: "A well-worn magazine fitted for the surplus rifle."
				}
			},
			name: "rifle magazine (10mm)",
			icon_state: "75"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/magazine/m10mm/rifle"]
	},
	"mag_m10mm_fire": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "10mm",
					ammo_type: "casing_c10mm_inc",
					max_ammo: 8,
					multiple_sprites: 2
				},
				"Examine": {
					desc: "A gun magazine. Loaded with rounds which ignite the target."
				}
			},
			name: "pistol magazine (10mm incendiary)",
			icon_state: "9x19pI"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/magazine/m10mm/fire"]
	},
	"mag_m10mm_hp": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "10mm",
					ammo_type: "casing_c10mm_hp",
					max_ammo: 8,
					multiple_sprites: 2
				},
				"Examine": {
					desc: "A gun magazine. Loaded with hollow-point rounds, extremely effective against unarmored targets, but nearly useless against protective clothing."
				}
			},
			name: "pistol magazine (10mm HP)",
			icon_state: "9x19pH"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/magazine/m10mm/hp"]
	},
	"mag_m10mm_ap": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "10mm",
					ammo_type: "casing_c10mm_ap",
					max_ammo: 8,
					multiple_sprites: 2
				},
				"Examine": {
					desc: "A gun magazine. Loaded with rounds which penetrate armour, but are less effective against normal targets."
				}
			},
			name: "pistol magazine (10mm AP)",
			icon_state: "9x19pA"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/magazine/m10mm/ap"]
	},
	"mag_m45": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: ".45",
					ammo_type: "casing_c45",
					max_ammo: 8
				},
			},
			name: "handgun magazine (.45)",
			icon_state: "45-8"
		},
		tree_paths: ["items/ammo_box/magazine/m45"]
	},
	"mag_wt550m9": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "4.6x30mm",
					ammo_type: "casing_c46x30mm",
					max_ammo: 20,
					ammo_mod: 4,
					multiple_sprites: 1
				},
			},
			name: "wt550 magazine (4.6x30mm)",
			icon_state: "46x30mmt-20"
		},
		tree_paths: ["items/ammo_box/magazine/wt550m9"]
	},
	"mag_wt550m9_wtap": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "4.6x30mm",
					ammo_type: "casing_c46x30mm_ap",
					max_ammo: 20,
					ammo_mod: 4,
					multiple_sprites: 1
				},
			},
			name: "wt550 magazine (Armor Piercing 4.6x30mm)",
			icon_state: "46x30mmtA-20"
		},
		tree_paths: ["items/ammo_box/magazine/wt550m9/wtap"]
	},
	"mag_wt550m9_wtic": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "4.6x30mm",
					ammo_type: "casing_c46x30mm_inc",
					max_ammo: 20,
					ammo_mod: 4,
					multiple_sprites: 1
				},
			},
			name: "wt550 magazine (Incendiary 4.6x30mm)",
			icon_state: "46x30mmtI-20"
		},
		tree_paths: ["items/ammo_box/magazine/wt550m9/wtic"]
	},
	"mag_uzim9mm": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "9mm",
					ammo_type: "casing_c9mm",
					max_ammo: 32,
					ammo_mod: 4,
					multiple_sprites: 1
				},
			},
			name: "uzi magazine (9mm)",
			icon_state: "uzi9mm-32"
		},
		tree_paths: ["items/ammo_box/magazine/uzim9mm"]
	},
	"mag_smgm9mm": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "9mm",
					ammo_type: "casing_c9mm",
					max_ammo: 21
				},
			},
			name: "SMG magazine (9mm)",
			icon_state: "smg9mm"
		},
		tree_paths: ["items/ammo_box/magazine/smgm9mm"]
	},
	"mag_smgm9mm_ap": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "9mm",
					ammo_type: "casing_c9mm_ap",
					max_ammo: 21
				},
			},
			name: "SMG magazine (Armor Piercing 9mm)",
			icon_state: "smg9mm"
		},
		tree_paths: ["items/ammo_box/magazine/smgm9mm/ap"]
	},
	"mag_smgm9mm_fire": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "9mm",
					ammo_type: "casing_c9mm_inc",
					max_ammo: 21
				},
			},
			name: "SMG magazine (Incendiary 9mm)",
			icon_state: "smg9mm"
		},
		tree_paths: ["items/ammo_box/magazine/smgm9mm/fire"]
	},
	"mag_pistolm9mm": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "9mm",
					ammo_type: "casing_c9mm",
					max_ammo: 15
				},
			},
			name: "pistol magazine (9mm)",
			icon_state: "9x19p"
		},
		tree_paths: ["items/ammo_box/magazine/pistolm9mm"]
	},
	"mag_smgm45": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: ".45",
					ammo_type: "casing_c45_nostamina",
					max_ammo: 24,
					ammo_mod: 2,
					multiple_sprites: 2
				},
			},
			name: "SMG magazine (.45)",
			icon_state: "c20r45"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/magazine/smgm45"]
	},
	"mag_tommygunm45": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: ".45",
					ammo_type: "casing_c45",
					max_ammo: 50
				},
			},
			name: "drum magazine (.45)",
			icon_state: "drum45"
		},
		tree_paths: ["items/ammo_box/magazine/tommygunm45"]
	},
	"mag_m50": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: ".50",
					ammo_type: "casing_a50ae",
					max_ammo: 7,
					multiple_sprites: 1
				},
			},
			name: "handgun magazine (.50ae)",
			icon_state: "50ae"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/magazine/m50"]
	},
	"mag_m75": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "75",
					ammo_type: "caseless_a75",
					max_ammo: 8,
					multiple_sprites: 2
				},
			},
			name: "specialized magazine (.75)",
			icon_state: "75"
		},
		tree_paths: ["items/ammo_box/magazine/m75"]
	},
	"mag_m556": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "a556",
					ammo_type: "casing_a556",
					max_ammo: 30,
					multiple_sprites: 2
				},
			},
			name: "toploader magazine (5.56mm)",
			icon_state: "5.56m"
			//TODO origin_tech: "combat=5;syndicate=1"
		},
		tree_paths: ["items/ammo_box/magazine/m556"]
	},
	"mag_m12g": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "shotgun",
					ammo_type: "casing_shotgun_stunslug",
					max_ammo: 8,
					multiple_sprites: 2
				},
			},
			name: "shotgun magazine (12g taser slugs)",
			icon_state: "m12gs"
			//TODO origin_tech: "combat=3;syndicate=1"
		},
		tree_paths: ["items/ammo_box/magazine/m12g"]
	},
	"mag_m12g_buckshot": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "shotgun",
					ammo_type: "casing_shotgun_buckshot",
					max_ammo: 8,
					multiple_sprites: 2
				},
			},
			name: "shotgun magazine (12g buckshot slugs)",
			icon_state: "m12gb"
			//TODO origin_tech: "combat=3;syndicate=1"
		},
		tree_paths: ["items/ammo_box/magazine/m12g/buckshot"]
	},
	"mag_m12g_slug": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "shotgun",
					ammo_type: "casing_shotgun",
					max_ammo: 8,
					multiple_sprites: 2
				},
			},
			name: "shotgun magazine (12g slugs)",
			icon_state: "m12gb"
			//TODO origin_tech: "combat=3;syndicate=1"
		},
		tree_paths: ["items/ammo_box/magazine/m12g/slug"]
	},
	"mag_m12g_dragon": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "shotgun",
					ammo_type: "casing_shotgun_dragonsbreath",
					max_ammo: 8,
					multiple_sprites: 2
				},
			},
			name: "shotgun magazine (12g dragon's breath)",
			icon_state: "m12gf"
			//TODO origin_tech: "combat=3;syndicate=1"
		},
		tree_paths: ["items/ammo_box/magazine/m12g/dragonsbreath"]
	},
	"mag_m12g_bioterror": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "shotgun",
					ammo_type: "casing_shotgun_dart_bioterror",
					max_ammo: 8,
					multiple_sprites: 2
				},
			},
			name: "shotgun magazine (12g bioterror)",
			icon_state: "m12gt"
			//TODO origin_tech: "combat=3;syndicate=1"
		},
		tree_paths: ["items/ammo_box/magazine/m12g/bioterror"]
	},
	"mag_m12g_meteor": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "shotgun",
					ammo_type: "casing_shotgun_meteorslug",
					max_ammo: 8,
					multiple_sprites: 2
				},
			},
			name: "shotgun magazine (12g meteor slugs)",
			icon_state: "m12gbc"
			//TODO origin_tech: "combat=3;syndicate=1"
		},
		tree_paths: ["items/ammo_box/magazine/m12g/meteor"]
	},
	"mag_sniper_rounds": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: ".50",
					ammo_type: "casing_p50",
					max_ammo: 6,
					multiple_sprites: 2
				},
			},
			name: "sniper rounds (.50)",
			icon_state: ".50mag"
			//TODO origin_tech: "combat=6;syndicate=2"
		},
		tree_paths: ["items/ammo_box/magazine/sniper_rounds"]
	},
	"mag_sniper_rounds_soporific": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: ".50",
					ammo_type: "casing_p50_soporific",
					max_ammo: 3,
					multiple_sprites: 2
				},
				"Examine": {
					desc: "Soporific sniper rounds, designed for happy days and dead quiet nights..."
				}
			},
			name: "sniper rounds (Zzzzz)",
			icon_state: "soporific"
			//TODO origin_tech: "combat=6;syndicate=3"
		},
		tree_paths: ["items/ammo_box/magazine/sniper_rounds/soporific"]
	},
	"mag_sniper_rounds_penetrator": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: ".50",
					ammo_type: "casing_p50_penetrator",
					max_ammo: 5,
					multiple_sprites: 2
				},
				"Examine": {
					desc: "An extremely powerful round capable of passing straight through cover and anyone unfortunate enough to be behind it."
				}
			},
			name: "sniper rounds (penetrator)",
			icon_state: ".50mag"
			//TODO origin_tech: "combat=6;syndicate=3"
		},
		tree_paths: ["items/ammo_box/magazine/sniper_rounds/penetrator"]
	},
	"mag_mm195x129": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "mm195129",
					ammo_type: "casing_mm195x129",
					max_ammo: 50,
					ammo_mod: 10,
					multiple_sprites: 1
				},
			},
			name: "box magazine (1.95x129mm)",
			icon_state: "a762"
			//TODO origin_tech: "combat=2"
		},
		tree_paths: ["items/ammo_box/magazine/mm195x129"]
	},
	"mag_mm195x129_hp": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "mm195129",
					ammo_type: "casing_mm195x129_hp",
					max_ammo: 50,
					ammo_mod: 10,
					multiple_sprites: 1
				},
			},
			name: "box magazine (Hollow-Point 1.95x129mm)",
			icon_state: "a762"
			//TODO origin_tech: "combat=3"
		},
		tree_paths: ["items/ammo_box/magazine/mm195x129/hp"]
	},
	"mag_mm195x129_ap": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "mm195129",
					ammo_type: "casing_mm195x129_ap",
					max_ammo: 50,
					ammo_mod: 10,
					multiple_sprites: 1
				},
			},
			name: "box magazine (Armor Penetrating 1.95x129mm)",
			icon_state: "a762"
			//TODO origin_tech: "combat=4"
		},
		tree_paths: ["items/ammo_box/magazine/mm195x129/ap"]
	},
	"mag_mm195x129_inc": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "mm195129",
					ammo_type: "casing_mm195x129_inc",
					max_ammo: 50,
					ammo_mod: 10,
					multiple_sprites: 1
				},
			},
			name: "box magazine (Incendiary 1.95x129mm)",
			icon_state: "a762"
			//TODO origin_tech: "combat=4"
		},
		tree_paths: ["items/ammo_box/magazine/mm195x129/inc"]
	},
	"mag_toy": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "foam_force",
					ammo_type: "caseless_foam_dart"
				},
			},
			name: "foam force META magazine",
		},
		tree_paths: ["items/ammo_box/magazine/toy"]
	},
	"mag_toy_smg": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "foam_force",
					ammo_type: "caseless_foam_dart",
					max_ammo: 20,
					multiple_sprites: 2
				},
			},
			name: "foam force SMG magazine",
			icon_state: "smg9mm"
		},
		tree_paths: ["items/ammo_box/magazine/toy/smg"]
	},
	"mag_toy_smg_riot": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "foam_force",
					ammo_type: "caseless_foam_dart_riot",
					max_ammo: 20,
					multiple_sprites: 2
				},
			},
			name: "foam force SMG magazine",
			icon_state: "smg9mm"
		},
		tree_paths: ["items/ammo_box/magazine/toy/smg/riot"]
	},
	"mag_toy_pistol": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "foam_force",
					ammo_type: "caseless_foam_dart",
					max_ammo: 8,
					multiple_sprites: 2
				},
			},
			name: "foam force pistol magazine",
			icon_state: "9x19p"
		},
		tree_paths: ["items/ammo_box/magazine/toy/pistol"]
	},
	"mag_toy_smgm45": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "foam_force",
					ammo_type: "caseless_foam_dart",
					max_ammo: 20,
					ammo_mod: 2,
					mutiple_sprites: 1
				},
			},
			name: "donksoft SMG magazine",
			icon_state: "c20r45"
		},
		tree_paths: ["items/ammo_box/magazine/toy/smgm45"]
	},
	"mag_toy_smgm45_riot": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "foam_force",
					ammo_type: "caseless_foam_dart_riot",
					max_ammo: 20,
					ammo_mod: 2,
					multiple_sprites: 1
				},
			},
			name: "donksoft SMG magazine",
			icon_state: "c20r45"
		},
		tree_paths: ["items/ammo_box/magazine/toy/smgm45/riot"]
	},
	"mag_toy_m762": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "foam_force",
					ammo_type: "caseless_foam_dart",
					max_ammo: 50
				},
			},
			name: "donksoft box magazine",
		},
		tree_paths: ["items/ammo_box/magazine/toy/m762"]
	},
	"mag_toy_m762_riot": {
		components: ["GunMagazine"],
		vars: {
			components: {
				"AmmoBox": {
					caliber: "foam_force",
					ammo_type: "caseless_foam_dart_riot",
					max_ammo: 50
				},
			},
			name: "donksoft box magazine",
		},
		tree_paths: ["items/ammo_box/magazine/toy/m762/riot"]
	},
};
