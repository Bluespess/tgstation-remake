'use strict';
const {Component} = require('bluespess');

class HealthDoll extends Component {
	constructor(atom, template) {
		super(atom, template);
		for(let zone of ['head', 'chest', 'l_leg', 'r_leg', 'l_arm', 'r_arm']) {
			this.a.overlays[zone] = {icon_state: `${zone}6`};
		}
	}

	bind_mob(mob) {
		this.mob = mob;
		this.mob.c.LivingMob.on("health_changed", this.update_icon.bind(this));
		this.update_icon();
	}

	update_icon() {
		for(let zone of ['head', 'chest', 'l_leg', 'r_leg', 'l_arm', 'r_arm']) {
			let bp = this.mob.c.MobBodyParts.limbs[zone];
			if(!bp)
				this.a.overlays[zone] = {icon_state: `${zone}6`};
			else
				this.a.overlays[zone] = {icon_state: `${zone}${Math.ceil(((bp.c.BodyPart.brute_damage+bp.c.BodyPart.burn_damage)/bp.c.BodyPart.max_damage)*5)}`};
		}
	}
}

HealthDoll.template = {
	vars: {
		icon: 'icons/mob/screen_gen.png',
		icon_state: "healthdoll_OVERLAY",
		screen_loc_x: 13.875,
		screen_loc_y: 5.40625,
		layer: 30
	}
};

module.exports.templates = {
	"human_health_doll": {
		components: ["HealthDoll"]
	}
};
module.exports.components = {HealthDoll};
