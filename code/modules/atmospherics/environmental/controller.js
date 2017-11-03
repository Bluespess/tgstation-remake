'use strict';
const atmos_defines = require('../../../defines/atmos_defines.js');

class AirController {
	constructor(server) {
		this.excited_groups = [];
		this.active_turfs = [];
		this.server = server;
		this.ticknum = 0;
		setInterval(this.tick.bind(this), 500);
		server.air_controller = this;
	}

	async tick() {
		try {
			this.ticknum++;
			await this.process_active_turfs();
			await this.process_excited_groups();
		} catch (e) {
			console.error(e.stack);
		}
	}

	async process_active_turfs() {
		var active_turfs = [...this.active_turfs];
		var ticknum = this.ticknum;
		for(var turf of active_turfs) {
			turf.c.SimulatedTurf.process_cell(ticknum);
		}
	}

	async process_excited_groups() {
		var excited_groups = [...this.excited_groups];
		for(var group of excited_groups) {
			group.breakdown_cooldown++;
			group.dismantle_cooldown++;
			if(group.breakdown_cooldown >= atmos_defines.EXCITED_GROUP_BREAKDOWN_CYCLES)
				group.self_breakdown();
			if(group.dismantle_cooldown >= atmos_defines.EXCITED_GROUP_DISMANTLE_CYCLES)
				group.dismantle();
		}
	}

	remove_from_active(turf) {
		var idx = this.active_turfs.indexOf(turf);
		if(idx != -1)
			this.active_turfs.splice(idx, 1);
		if(this.server.has_component(turf, "SimulatedTurf")) {
			turf.c.SimulatedTurf.excited = false;
			if(turf.c.SimulatedTurf.excited_group)
				turf.c.SimulatedTurf.excited_group.garbage_collect();
		}
	}

	add_to_active(turf, blockchanges = true) {
		if(this.server.has_component(turf, "SimulatedTurf")) {
			turf.c.SimulatedTurf.excited = true;
			if(this.active_turfs.indexOf(turf) == -1)
				this.active_turfs.push(turf);
			if(blockchanges && turf.c.SimulatedTurf.excited_group)
				turf.c.SimulatedTurf.excited_group.garbage_collect();
		}
	}
}

module.exports.server_start = (server) => {
	server.air_controller = new AirController(server);
};
