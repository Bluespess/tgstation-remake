'use strict';
const {Component, Atom, chain_func, has_component, to_chat} = require('bluespess');
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
		new Atom(this.a.server, 'organ_liver').c.Organ.insert(this.a);
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
			else if(old && !this.lying)
				this.a.c.MobInventory.nohold_counter--;
		}
	}

	life(prev, cycle) {
		prev();

		this.handle_organs();
		this.breathe(cycle);
		this.handle_environment();
		this.handle_liver();
	}

	handle_environment() {
		let environment = this.a.c.LivingMob.environment;
		let pressure = environment.return_pressure();
		if(pressure >= atmos_defines.HAZARD_HIGH_PRESSURE) {
			this.a.c.LivingMob.adjust_damage("brute", Math.min(((pressure / atmos_defines.HAZARD_HIGH_PRESSURE) - 1) * atmos_defines.PRESSURE_DAMAGE_COEFFICIENT, atmos_defines.MAX_HIGH_PRESSURE_DAMAGE));
			this.a.c.MobHud.throw_alert("pressure", "alert_highpressure", 2);
		} else if(pressure >= atmos_defines.WARNING_HIGH_PRESSURE) {
			this.a.c.MobHud.throw_alert("pressure", "alert_highpressure", 1);
		} else if(pressure <= atmos_defines.HAZARD_LOW_PRESSURE) {
			this.a.c.LivingMob.adjust_damage("brute", atmos_defines.LOW_PRESSURE_DAMAGE);
			this.a.c.MobHud.throw_alert("pressure", "alert_lowpressure", 2);
		} else if(pressure <= atmos_defines.WARNING_LOW_PRESSURE) {
			this.a.c.MobHud.throw_alert("pressure", "alert_lowpressure", 1);
		} else {
			this.a.c.MobHud.clear_alert("pressure");
		}
	}

	breathe() {
		let lungs = this.organs.lungs;

		if(this.a.c.LivingMob.in_full_crit)
			this.losebreath++;
		else if(this.a.c.LivingMob.in_crit)
			this.losebreath += 0.25;
		let environment = this.a.c.LivingMob.environment;
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

	handle_organs() {
		for(let organ of Object.values(this.organs)) {
			organ.c.Organ.do_life();
		}
	}

	handle_liver() {
		let liver = this.organs.liver;
		if(!liver || liver.c.OrganLiver.failing) {
			// liver failure
			if(this.a.c.ReagentHolder.volume_of("Corazone")) { //corazone is processed here an not in the liver because a failing liver can't metabolize reagents
				this.a.c.ReagentHolder.remove("Corazone", 0.4); //corazone slowly deletes itself.
				return;
			}
			this.a.c.LivingMob.adjust_damage("tox", 8);
			if(Math.random() < 0.3) {
				to_chat`<span class='notice'>You feel confused and nauseous...</span>`(this.a); //actual symptoms of liver failure
			}
		}
	}

	slip(obj) {
		this.a.c.LivingMob.apply_effect("Knockdown", {delay: obj.c.Slippery.knockdown_amount});
	}
}
CarbonMob.depends = ["LivingMob", "Puller", "ReagentHolder"];
CarbonMob.loadBefore = ["LivingMob", "ReagentHolder"];

CarbonMob.template = {
	vars: {
		components: {
			CarbonMob: {
				lying_counter: 0,
				losebreath: 0,
				//None of these vars are fully implemented
				bodytemperature: 310.055, //Kelvin. aka 98.7F
				radiation: 0,
				drowsiness: 0, //This is misspelled as drowsyness in TG code
				dizziness: 0,
				jitteriness: 0,
				druggy: 0,
				hallucination: 0
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
