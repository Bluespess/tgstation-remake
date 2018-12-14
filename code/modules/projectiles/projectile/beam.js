'use strict';
const {Component} = require('bluespess');
const pass_flags = require('../../../defines/pass_flags.js');
const lighting = require('../../../defines/lighting.js');

class BeamProjectile extends Component {}

BeamProjectile.loadBefore = ["Projectile", "LightSource"];
BeamProjectile.depends = ["Projectile", "LightSource"];

BeamProjectile.template = {
	vars: {
		components: {
			"Projectile": {
				hitsound: 'sound/weapons/sear.ogg',
				hitsound_wall: 'sound/weapons/effects/searwall.ogg',
				flag: "energy",
				damage_type: "burn",
				damage: 20,
			},
			"LightSource": {
				enabled: true,
				radius: 2,
				color: lighting.LIGHT_COLOR_RED
			}
		},
		name: "laser",
		icon_state: "laser",
		pass_flags: pass_flags.PASSTABLE | pass_flags.PASSGLASS | pass_flags.PASSGRILLE
	}
};

module.exports.templates = {
	"beam_laser": {
		components: ["BeamProjectile"]
	},
	"beam_disabler": {
		components: ["BeamProjectile"],
		vars: {
			components: {
				"Projectile": {
					damage: 36,
					damage_type: "stamina",
					hitsound: 'sound/weapons/tap.ogg'
				},
				"LightSource": {
					color: lighting.LIGHT_COLOR_BLUE
				}
			},
			name: "disabler beam",
			icon_state: "omnilaser"
		}
	}
};

module.exports.components = {BeamProjectile};
