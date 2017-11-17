'use strict';

const GasMixture = require('../gasmixtures/gas_mixture.js');
const atmos_defines = require('../../../defines/atmos_defines.js');

class ExcitedGroup {
	constructor(controller) {
		this.controller = controller;
		this.turf_list = [];
		this.breakdown_cooldown = 0;
		this.dismantle_cooldown = 0;
		this.controller.excited_groups.push(this);
	}

	add_turf(turf) {
		turf.c.SimulatedTurf.excited_group = this;
		turf.c.SimulatedTurf.recently_active = true;
		this.turf_list.push(turf);
		this.reset_cooldowns();
	}

	merge_groups(group) {
		if(this.turf_list.length > group.turf_list.length) {
			let idx = this.controller.excited_groups.indexOf(group);
			if(idx != -1)
				this.controller.excited_groups.splice(idx, 1);
			for(let turf of group.turf_list) {
				turf.c.SimulatedTurf.excited_group = this;
				this.turf_list.push(turf);
			}
			this.reset_cooldowns();
		} else {
			let idx = this.controller.excited_groups.indexOf(this);
			if(idx != -1)
				this.controller.excited_groups.splice(idx, 1);
			for(let turf of this.turf_list) {
				turf.c.SimulatedTurf.excited_group = group;
				group.turf_list.push(turf);
			}
			group.reset_cooldowns();
		}
	}

	reset_cooldowns() {
		this.breakdown_cooldown = 0;
		this.dismantle_cooldown = 0;
	}

	self_breakdown(/*space_is_all_consuming = false*/) {
		var combined = new GasMixture(this.turf_list.length * atmos_defines.CELL_VOLUME);

		for(let turf of this.turf_list) {
			// TODO handle space
			combined.merge(turf.c.Turf.air);
		}

		var turf_list_len = this.turf_list.length;
		for(let gas of combined.gases_list) {
			gas.moles /= turf_list_len;
		}

		for(let turf of this.turf_list) {
			turf.c.Turf.air.copy_from(combined);
			turf.c.SimulatedTurf.atmos_cooldown = 0;
			turf.c.SimulatedTurf.update_visuals();
		}

		this.breakdown_cooldown = 0;
	}

	dismantle() {
		for(var turf of this.turf_list) {
			turf.c.SimulatedTurf.excited = false;
			turf.c.SimulatedTurf.recently_active = false;
			turf.c.SimulatedTurf.excited_group = undefined;
			var idx = this.controller.active_turfs.delete(turf);
		}
		this.garbage_collect();
	}

	garbage_collect() {
		for(var turf of this.turf_list) {
			turf.c.SimulatedTurf.excited_group = undefined;
		}
		this.turf_list.length = 0;
		var idx = this.controller.excited_groups.indexOf(this);
		if(idx != -1) {
			this.controller.excited_groups.splice(idx, 1);
		}
	}
}

module.exports = ExcitedGroup;
