'use strict';

module.exports.templates = {
	"energy_projectile": {
		components: ["Projectile"],
		vars: {
			components: {
				"Projectile": {
					damage: 0,
					damage_type: "burn",
					flag: "energy"
				}
			},
			name: "energy",
			icon_state: "spark",
		}
	},
	"energy_electrode": {
		components: ["Projectile"],
		vars: {
			components: {
				"Projectile": {
					status_effects: {"Knockdown": {delay: 10000}},
					range: 7,
					hitsound: 'sound/weapons/taserhit.ogg',
					no_damage: true
				}
			},
			name: "electrode",
			icon_state: "spark",
			color: "#ffff00"
		}
	}
};
