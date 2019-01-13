'use strict';
const {Component} = require('bluespess');

const HUMAN_MAX_OXYLOSS = 3;
const HUMAN_CRIT_MAX_OXYLOSS = 2/3;

class OrganLungs extends Component {
	constructor(atom, template) {
		super(atom, template);
	}

	breathe(breath) {
		let mob = this.a.c.Organ.mob;
		if(!breath || breath.total_moles() == 0) {
			for(let key of Object.keys(this.gas_reqs)) {
				let reqs = this.gas_reqs[key];
				if(reqs.min != null) {
					let alert_name = `not_enough_${key}`;
					if(this.a.server.templates[`alert_${alert_name}`])
						this.a.c.Organ.mob.c.MobHud.throw_alert(alert_name, `alert_${alert_name}`);	
				}
			}
			if(!mob.c.LivingMob.in_crit)
				mob.c.LivingMob.adjust_damage("oxy", HUMAN_MAX_OXYLOSS);
			else
				mob.c.LivingMob.adjust_damage("oxy", HUMAN_CRIT_MAX_OXYLOSS);
			return false;
		}

		let pressure = breath.return_pressure();
		let total_moles = breath.total_moles();

		let cached_moles = {};
		for(let key of Object.keys(this.gas_reqs)) {
			cached_moles[key] = breath.gases[key].moles;
		}

		for(let key of Object.keys(this.gas_reqs)) {
			let reqs = this.gas_reqs[key];
			let moles = cached_moles[key];
			let partial_pressure = moles / total_moles * pressure;
			if(reqs.min != null) {
				let breathed = 0;
				let alert_name = `not_enough_${key}`;
				if(partial_pressure <= reqs.min) {
					breathed = this.handle_gas_shortage(key, moles, partial_pressure, breath);
					if(this.a.server.templates[`alert_${alert_name}`])
						this.a.c.Organ.mob.c.MobHud.throw_alert(alert_name, `alert_${alert_name}`);
				} else {
					breathed = this.handle_enough_gas(key, moles, partial_pressure, breath);
					this.a.c.Organ.mob.c.MobHud.clear_alert(alert_name);
				}
				breath.gases[key].moles -= breathed;
				if(reqs.breath_convert)
					breath.gases[reqs.breath_convert].moles += breathed;
			}
			if(reqs.max != null) {
				let alert_name = `too_much_${key}`;
				if(partial_pressure >= reqs.max) {
					this.handle_gas_excess(key, moles, partial_pressure, breath);
					if(this.a.server.templates[`alert_${alert_name}`])
						this.a.c.Organ.mob.c.MobHud.throw_alert(alert_name, `alert_${alert_name}`);
				} else {
					this.a.c.Organ.mob.c.MobHud.clear_alert(alert_name);
				}
			}
		}
	}

	handle_gas_shortage(key, moles, pp) {
		let safe_breath_min = this.gas_reqs[key].min;
		if(pp > 0) {
			let ratio = safe_breath_min / pp;
			this.a.c.Organ.mob.c.LivingMob.adjust_damage("oxy", Math.min(5 * ratio, HUMAN_MAX_OXYLOSS));
			return moles;
		} else {
			this.a.c.Organ.mob.c.LivingMob.adjust_damage("oxy", HUMAN_MAX_OXYLOSS);
			return 0;
		}

	}

	handle_enough_gas(key, moles) {
		if(!this.a.c.Organ.mob.c.LivingMob.in_crit)
			this.a.c.Organ.mob.c.LivingMob.adjust_damage("oxy", -1);
		return moles;
	}

	handle_gas_excess(key, moles) {
		let ratio = moles / this.gas_reqs[key].max * 10;
		let min = this.gas_reqs[key].min_dam;
		let max = this.gas_reqs[key].max_dam;
		ratio = Math.max(Math.min(ratio, max), min);
		this.a.c.Organ.mob.c.LivingMob.adjust_damage(this.gas_reqs[key].dam_type, ratio);
	}
}

OrganLungs.depends = ["Organ"];
OrganLungs.loadBefore = ["Organ"];

OrganLungs.template = {
	vars: {
		components: {
			"OrganLungs": { // BE CAREFUL: The individual values within these objects will be inherited!
				gas_reqs: {
					o2: {min: 16, max: null, min_dam: 1, max_dam: 10, dam_type: "oxy", breath_convert: "co2"},
					n2: {min: null, max: null, min_dam: 1, max_dam: 10, dam_type: "oxy"},
					co2: {min: null, max: 10, min_dam: 1, max_dam: 10, dam_type: "oxy"},
					plasma: {min: null, max: 0.05, min_dam: 1, max_dam: 10, dam_type: "tox"}
				}
			},
			"Organ": {
				zone: "chest",
				slot: "lungs"
			},
			"Item": {
				size: 3
			}
		},
		gender: "plural",
		name: "lungs",
		icon_state: "lungs"
	}
};

module.exports.templates = {
	"organ_lungs": {
		components: ["OrganLungs"]
	}
};

module.exports.components = {OrganLungs};
