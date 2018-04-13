'use strict';
const {Component, Atom, chain_func, has_component} = require('bluespess');
const combat_defines = require('../../../../defines/combat_defines.js');
const atmos_defines = require('../../../../defines/atmos_defines.js');

const _lying_counter = Symbol('_lying_counter');

const HUMAN_MAX_OXYLOSS = 3;
const HUMAN_CRIT_MAX_OXYLOSS = 2/3;

class CarbonMob extends Component.Networked {
	constructor(atom, template) {
		super(atom, template);

		this.a.c.LivingMob.on("health_changed", this.health_changed.bind(this));
		this.a.c.LivingMob.on("stat_changed", this.stat_changed.bind(this));
		this.a.c.LivingMob.update_stat = this.update_stat.bind(this);
		this.a.c.LivingMob.movement_delay = chain_func(this.a.c.LivingMob.movement_delay, this.movement_delay.bind(this));
		this.a.c.LivingMob.life = chain_func(this.a.c.LivingMob.life, this.life.bind(this));

		this.add_networked_var("lying", (newval) => {
			if(newval) {
				this.a.density = 0;
			} else {
				this.a.density = this.a.template.vars.density;
			}
			return true;
		});

		this.organs = {};
		new Atom(this.a.server, 'organ_lungs').c.Organ.insert(this.a);
	}

	stat_changed(oldstat, newstat) {
		if(!oldstat && newstat) {
			this.lying_counter++;
		} else if(oldstat && !newstat) {
			this.lying_counter--;
		}
	}

	health_changed() {
		this.update_damage_hud();
		this.update_health_hud();
	}

	update_stat() {
		if(this.a.c.LivingMob.status_flags & combat_defines.GODMODE)
			return;
		let health = this.a.c.LivingMob.health;
		if(this.a.c.LivingMob.stat != combat_defines.DEAD) {
			if(health <= combat_defines.HEALTH_THRESHOLD_DEAD) {
				this.a.c.LivingMob.stat = combat_defines.DEAD;
				return;
			}
			if(this.a.c.LivingMob.get_damage("oxy") > 50 || health <= combat_defines.HEALTH_THRESHOLD_FULLCRIT) {
				this.a.c.LivingMob.stat = combat_defines.UNCONSCIOUS;
			} else {
				if(health <= combat_defines.HEALTH_THRESHOLD_CRIT) {
					this.a.c.LivingMob.stat = combat_defines.SOFT_CRIT;
				} else {
					this.a.c.LivingMob.stat = combat_defines.CONSCIOUS;
				}
			}
		}
	}

	update_health_hud() {
		let health_hud = this.a.c.Eye.screen.health;
		if(!health_hud)
			return;
		let health = this.a.c.LivingMob.health;
		let max_health = this.a.c.LivingMob.max_health;
		let variant;
		if(this.a.c.LivingMob.stat != combat_defines.DEAD) {
			variant = Math.min(Math.max(5 - Math.floor(health / max_health * 5), 0), 6);
		} else {
			variant = 7;
		}
		health_hud.icon_state = `health${variant}`;
	}

	update_damage_hud() {
		if(this.a.c.LivingMob.stat == combat_defines.DEAD) {
			if(this.a.c.Eye.screen.crit_vision) {
				this.a.c.Eye.screen.crit_vision.destroy();
				delete this.a.c.Eye.screen.crit_vision;
			}
			if(this.a.c.Eye.screen.crit) {
				this.a.c.Eye.screen.crit.destroy();
				delete this.a.c.Eye.screen.crit;
			}
			if(this.a.c.Eye.screen.brute) {
				this.a.c.Eye.screen.brute.destroy();
				delete this.a.c.Eye.screen.brute;
			}
			return;
		}
		let health = this.a.c.LivingMob.health;
		if(health <= combat_defines.HEALTH_THRESHOLD_CRIT) {
			let severity = Math.min(Math.max(Math.floor(-health * 0.1), 0), 10);
			if(health <= -95)
				severity = 10;
			if(!this.a.c.LivingMob.in_full_crit) {
				let visionseverity = Math.min(Math.max(Math.floor(-health / 4) + 4, 0), 10);
				if(!this.a.c.Eye.screen.crit_vision)
					this.a.c.Eye.screen.crit_vision = new Atom(this.a.server, "screen_crit_vision");
				this.a.c.Eye.screen.crit_vision.icon_state = `oxydamageoverlay${visionseverity}`;
			} else {
				if(this.a.c.Eye.screen.crit_vision) {
					this.a.c.Eye.screen.crit_vision.destroy();
					delete this.a.c.Eye.screen.crit_vision;
				}
			}
			if(!this.a.c.Eye.screen.crit)
				this.a.c.Eye.screen.crit = new Atom(this.a.server, "screen_crit");
			this.a.c.Eye.screen.crit.icon_state = `passage${severity}`;
		} else {
			if(this.a.c.Eye.screen.crit) {
				this.a.c.Eye.screen.crit.destroy();
				delete this.a.c.Eye.screen.crit;
			}
			if(this.a.c.Eye.screen.crit_vision) {
				this.a.c.Eye.screen.crit_vision.destroy();
				delete this.a.c.Eye.screen.crit_vision;
			}
		}

		let oxyloss = this.a.c.LivingMob.get_damage("oxy");
		if(oxyloss) {
			let severity = Math.max(Math.floor(oxyloss / 10), 0);
			if(oxyloss >= 45)
				severity = 7;
			if(!this.a.c.Eye.screen.oxy)
				this.a.c.Eye.screen.oxy = new Atom(this.a.server, "screen_oxy");
			this.a.c.Eye.screen.oxy.icon_state = `oxydamageoverlay${severity}`;
		} else {
			if(this.a.c.Eye.screen.oxy) {
				this.a.c.Eye.screen.oxy.destroy();
				delete this.a.c.Eye.screen.oxy;
			}
		}

		let damage = this.a.c.LivingMob.get_damage("brute") + this.a.c.LivingMob.get_damage("burn");
		if(damage >= 0) {
			let severity = 0;
			if(damage >= 5) {
				severity = Math.min(Math.floor(damage / 15) + 1, 6);
			}
			if(!this.a.c.Eye.screen.brute)
				this.a.c.Eye.screen.brute = new Atom(this.a.server, "screen_brute");
			this.a.c.Eye.screen.brute.icon_state = `brutedamageoverlay${severity}`;
		} else {
			if(this.a.c.Eye.screen.brute) {
				this.a.c.Eye.screen.brute.destroy();
				delete this.a.c.Eye.screen.brute;
			}
		}
	}

	movement_delay(prev) {
		let delay = prev();
		if(this.a.c.LivingMob.stat == combat_defines.SOFT_CRIT)
			delay += combat_defines.SOFTCRIT_ADD_SLOWDOWN;
		let health_deficiency = 100 - this.a.c.LivingMob.health;
		if(health_deficiency >= 40) {
			delay += (health_deficiency * 4);
		}
		return delay;
	}

	get lying_counter() {
		return this[_lying_counter];
	}
	set lying_counter(val) {
		let old = this[_lying_counter];
		if(old == val)
			return;
		this[_lying_counter] = val;
		this.update_lying(old, val);
	}

	update_lying() {
		let old = this.lying;
		this.lying = !!this[_lying_counter];
		if(has_component(this.a, "MobInventory")) {
			if(this.lying && !old)
				this.a.c.MobInventory.nohold_counter++;
			else if(!old && this.lying)
				this.a.c.MobInventory.nohold_counter--;
		}
	}

	life(prev, cycle) {
		prev();
		this.breathe(cycle);
	}

	breathe() {
		let lungs = this.organs.lungs;

		if(this.a.c.LivingMob.in_full_crit)
			this.losebreath++;
		else if(this.a.c.LivingMob.in_crit)
			this.losebreath += 0.25;
		let environment;
		if(this.a.base_loc && this.a.base_loc.turf) {
			environment = this.a.base_loc.turf.c.Turf.air;
			this.a.server.air_controller.add_to_active(this.a.base_loc.turf);
		}
		let breath;
		if(this.losebreath >= 1) {
			this.losebreath--;
		} else {
			if(!breath && environment) {
				let percentage = Math.min(atmos_defines.BREATH_VOLUME / environment.volume, 1);
				breath = environment.remove_ratio(percentage);
				breath.volume = atmos_defines.BREATH_VOLUME;
			}
		}

		if(lungs && has_component(lungs, "OrganLungs")) {
			lungs.c.OrganLungs.breathe(breath);
		} else {
			if(!this.a.c.LivingMob.in_crit)
				this.a.c.LivingMob.adjust_damage("oxy", HUMAN_MAX_OXYLOSS);
			else
				this.a.c.LivingMob.adjust_damage("oxy", HUMAN_CRIT_MAX_OXYLOSS);
		}

		if(environment)
			environment.merge(breath);
	}

	slip(obj) {
		this.a.c.LivingMob.apply_effect("Knockdown", {delay: obj.c.Slippery.knockdown_amount});
	}
}
CarbonMob.depends = ["LivingMob", "Puller"];
CarbonMob.loadBefore = ["LivingMob"];

CarbonMob.template = {
	vars: {
		components: {
			CarbonMob: {
				lying_counter: 0,
				losebreath: 0
			}
		}
	}
};

module.exports.templates = {
	"screen_crit": {
		vars: {
			icon: 'icons/mob/screen_full.png',
			screen_loc_x: 0,
			screen_loc_y: 14,
			mouse_opacity: 0,
			layer: 21
		}
	},
	"screen_crit_vision": {
		vars: {
			icon: 'icons/mob/screen_full.png',
			screen_loc_x: 0,
			screen_loc_y: 14,
			mouse_opacity: 0,
			layer: 20.9
		}
	},
	"screen_brute": {
		vars: {
			icon: 'icons/mob/screen_full.png',
			screen_loc_x: 0,
			screen_loc_y: 14,
			mouse_opacity: 0,
			layer: 20.8
		}
	},
	"screen_oxy": {
		vars: {
			icon: 'icons/mob/screen_full.png',
			screen_loc_x: 0,
			screen_loc_y: 14,
			mouse_opacity: 0,
			layer: 20.9
		}
	},
};

module.exports.components = {CarbonMob};
