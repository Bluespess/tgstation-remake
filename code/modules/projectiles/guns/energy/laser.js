'use strict';

//TODO: Origin tech. We should really implement those at some point, even just as placeholders...

//TODO:
/*
/obj/item/gun/energy/laser/captain/scattershot
/obj/item/gun/energy/laser/cyborg
/obj/item/gun/energy/laser/scatter
/obj/item/gun/energy/laser/scatter/shotty
/obj/item/gun/energy/lasercannon
/obj/item/ammo_casing/energy/laser/accelerator
/obj/item/projectile/beam/laser/accelerator
/obj/item/gun/energy/xray
*/

module.exports.templates = {
	"lasergun": {
		components: ["EnergyGun", "BeltItem"],
		vars: {
			components: {
				"EnergyGun": {
					ammo_type: ["energy_lens_lasergun"],
					shaded_charge: true,
				},
				"Item": {
					inhand_icon_state: "laser",
					materials: {"metal": 2000}
				},
				"Examine": {
					desc: "A basic energy-based laser gun that fires concentrated beams of light which pass through glass and thin metal."
				}
			},
			name: "laser gun",
			icon_state: "laser"
		},
		tree_paths: ["items/gun/energy/laser"]
	},
	"lasergun_practice": {
		parent_template: "lasergun",
		vars: {
			components: {
				"EnergyGun": {
					ammo_type: ["energy_lens_lasergun_practice"]
				},
				"Item": {
					needs_permit: false
				},
				"Gun": {
					clumsy_check: false
				},
				"Examine": {
					desc: "A modified version of the basic laser gun, this one fires less concentrated energy bolts designed for target practice."
				}
			},
			name: "practice laser gun",
		},
		tree_paths: ["items/gun/energy/laser/practice"]
	},
	"lasergun_retro": {
		parent_template: "lasergun",
		vars: {
			components: {
				"Examine": {
					desc: "An older model of the basic lasergun, no longer used by Nanotrasen's private security or military forces. Nevertheless, it is still quite deadly and easy to maintain, making it a favorite amongst pirates and other outlaws."
				}
			},
			name: "retro laser gun",
			icon_state: "retro"
		},
		tree_paths: ["items/gun/energy/laser/retro"]
	},
	"lasergun_retro_old": {
		parent_template: "lasergun",
		vars: {
			components: {
				"EnergyGun": {
					ammo_type: ["energy_lens_lasergun_old"]
				},
				"Examine": {
					desc: "First generation lasergun, developed by Nanotrasen. Suffers from ammo issues but its unique ability to recharge its ammo without the need of a magazine helps compensate. You really hope someone has developed a better lasergun while you were in cyro."
				}
			},
			name: "laser gun",
			icon_state: "retro"
		},
		tree_paths: ["items/gun/energy/laser/retro/old"]
	},
	"lasergun_captain": {
		parent_template: "lasergun",
		vars: {
			components: {
				"EnergyGun": {
					selfcharge: true
				},
				"Examine": {
					desc: "This is an antique laser gun. All craftsmanship is of the highest quality. It is decorated with assistant leather and chrome. The object menaces with spikes of energy. On the item is an image of Space Station 13. The station is exploding."
				}
			},
			name: "antique laser gun",
			icon_state: "caplaser"
			//TODO: resistance_flags = INDESTRUCTIBLE | LAVA_PROOF | FIRE_PROOF | ACID_PROOF
		},
		tree_paths: ["items/gun/energy/laser/captain"]
	},
	"lasergun_bluetag": {
		parent_template: "lasergun",
		vars: {
			components: {
				"Item": {
					needs_permit: false
				},
				"Gun": {
					clumsy_check: false,
				},
				"EnergyGun": {
					selfcharge: true,
					ammo_type: ["energy_lens_lasergun_bluetag"],
				},
				"Examine": {
					desc: "A retro laser gun modified to fire harmless blue beams of light. Sound effects included!"
				}
			},
			name: "laser tag gun",
			icon_state: "bluetag"
			//TODO: firing pin
		},
		tree_paths: ["items/gun/energy/laser/bluetag"]
	},
	"lasergun_redtag": {
		parent_template: "lasergun",
		vars: {
			components: {
				"Item": {
					needs_permit: false
				},
				"Gun": {
					clumsy_check: false,
				},
				"EnergyGun": {
					selfcharge: true,
					ammo_type: ["energy_lens_lasergun_redtag"],
				},
				"Examine": {
					desc: "A retro laser gun modified to fire harmless red beams of light. Sound effects included!"
				}
			},
			name: "laser tag gun",
			icon_state: "redtag"
			//TODO: firing pin
		},
		tree_paths: ["items/gun/energy/laser/redtag"]
	},
};
