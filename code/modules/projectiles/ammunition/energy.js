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
	}
};

module.exports.components = {EnergyLens};
