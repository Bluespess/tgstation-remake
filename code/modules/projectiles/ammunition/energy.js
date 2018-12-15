'use strict';
const {Component} = require('bluespess');

class EnergyLens extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

EnergyLens.loadBefore = ["AmmoCasing"];
EnergyLens.depends = ["AmmoCasing"];

EnergyLens.template = {
	vars: {
		components: {
			"EnergyLens": {
				e_cost: 100,
				select_name: "energy"
			},
			"AmmoCasing": {
				fire_sound: 'sound/weapons/laser.ogg',
				caliber: "energy",
				projectile_type: "energy_projectile",
				infinite: true
			}
		},
		name: "energy weapon lens"
	}
};

module.exports.templates = {
	"energy_lens": {
		components: ["EnergyLens"]
	},
	"energy_lens_electrode": {
		components: ["EnergyLens"],
		vars: {
			components: {
				"EnergyLens": {
					e_cost: 200,
					select_name: "stun"
				},
				"AmmoCasing": {
					projectile_type: "energy_electrode",
					fire_sound: 'sound/weapons/taser.ogg'
				}
			}
		},
		tree_paths: ["items/ammo_casing/energy/electrode"]
	},
	"energy_lens_disabler": {
		components: ["EnergyLens"],
		vars: {
			components: {
				"EnergyLens": {
					e_cost: 50,
					select_name: "disable"
				},
				"AmmoCasing": {
					projectile_type: "beam_disabler",
					fire_sound: 'sound/weapons/taser2.ogg'
				}
			}
		},
		tree_paths: ["items/ammo_casing/energy/disabler"]
	},
	"energy_lens_lasergun": {
		components: ["EnergyLens"],
		vars: {
			components: {
				"EnergyLens": {
					e_cost: 83,
					select_name: "kill"
				},
				"AmmoCasing": {
					projectile_type: "beam_laser"
				}
			}
		},
		tree_paths: ["items/ammo_casing/energy/lasergun"]
	},
	"energy_lens_lasergun_practice": {
		components: ["EnergyLens"],
		vars: {
			components: {
				"EnergyLens": {
					select_name: "practice"
				},
				"AmmoCasing": {
					projectile_type: "beam_laser_practice"
				}
			}
		},
		tree_paths: ["items/ammo_casing/energy/lasergun/practice"]
	},
	"energy_lens_lasergun_old": {
		components: ["EnergyLens"],
		vars: {
			components: {
				"EnergyLens": {
					e_cost: 200,
					select_name: "kill"
				},
				"AmmoCasing": {
					projectile_type: "beam_laser"
				}
			}
		},
		tree_paths: ["items/ammo_casing/energy/lasergun/old"]
	},
	"energy_lens_lasergun_bluetag": {
		components: ["EnergyLens"],
		vars: {
			components: {
				"EnergyLens": {
					select_name: "bluetag"
				},
				"AmmoCasing": {
					projectile_type: "beam_laser_lasertag_bluetag"
				}
			}
		},
		tree_paths: ["items/ammo_casing/energy/lasergun/bluetag"]
	},
	"energy_lens_lasergun_redtag": {
		components: ["EnergyLens"],
		vars: {
			components: {
				"EnergyLens": {
					select_name: "redtag"
				},
				"AmmoCasing": {
					projectile_type: "beam_laser_lasertag_redtag"
				}
			}
		},
		tree_paths: ["items/ammo_casing/energy/lasergun/redtag"]
	}
};

module.exports.components = {EnergyLens};
