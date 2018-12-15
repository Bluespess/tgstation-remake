'use strict';
const {Component} = require('bluespess');
const pass_flags = require('../../../defines/pass_flags.js');
const lighting = require('../../../defines/lighting.js');

class BeamProjectile extends Component {}

BeamProjectile.loadBefore = ["Projectile", "LightSource"];
BeamProjectile.depends = ["Projectile", "LightSource"];

//TODO: /obj/item/projectile/beam/laser/on_hit(atom/target, blocked = FALSE) and /obj/item/projectile/beam/lasertag/on_hit(atom/target, blocked = FALSE)

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
	"beam_laser_practice": {
		parent_template: "beam_laser",
		vars: {
			components: {
				"Projectile": {
					damage: 0,
					no_damage: true
				},
			},
			name: "practice laser"
		}
	},
	"beam_laser_lasertag": {
		parent_template: "beam_laser",
		vars: {
			components: {
				"Projectile": {
					damage: 0,
					damage_type: "stamina",
					hitsound: null,
					//TODO:
					//flag = "laser"
					//var/suit_types = list(/obj/item/clothing/suit/redtag, /obj/item/clothing/suit/bluetag)
					//impact_effect_type = /obj/effect/temp_visual/impact_effect/blue_laser
				},
				"LightSource": {
					color: lighting.LIGHT_COLOR_BLUE
				}
			},
			name: "laser tag beam",
			icon_state: "omnilaser"
		}
	},
	"beam_laser_lasertag_redtag": {
		parent_template: "beam_laser_lasertag",
		vars: {
			components: {
				"Projectile": {
					//TODO:
					//suit_types = list(/obj/item/clothing/suit/bluetag)
					//impact_effect_type = /obj/effect/temp_visual/impact_effect/red_laser
				},
				"LightSource": {
					color: lighting.LIGHT_COLOR_RED
				}
			},
			name: "laser tag beam",
			icon_state: "laser"
		}
	},
	"beam_laser_lasertag_bluetag": {
		parent_template: "beam_laser_lasertag",
		vars: {
			components: {
				"Projectile": {
					//TODO:
					//suit_types = list(/obj/item/clothing/suit/redtag)
				},
			},
			name: "laser tag beam",
			icon_state: "bluelaser"
		}
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
