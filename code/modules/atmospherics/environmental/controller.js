'use strict';
const {has_component} = require('bluespess');
const atmos_defines = require('../../../defines/atmos_defines.js');

class AirController {
	constructor(server) {
		this.excited_groups = [];
		this.active_turfs = new Set();
		this.high_pressure_delta = new Set();
		this.server = server;
		this.ticknum = 0;
	}

	start() {
		setInterval(this.tick.bind(this), 500);
	}

	async tick() {
		try {
			this.ticknum++;
			await this.process_active_turfs();
			await this.process_excited_groups();
			await this.process_high_pressure_delta();
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

	async process_high_pressure_delta() {
		var high_pressure_delta = [...this.high_pressure_delta];
		this.high_pressure_delta.clear();
		for(var turf of high_pressure_delta) {
			turf.c.SimulatedTurf.high_pressure_movements();
			turf.c.SimulatedTurf.pressure_difference = 0;
		}
	}

	remove_from_active(turf) {
		this.active_turfs.delete(turf);
		if(has_component(turf, "SimulatedTurf")) {
			turf.c.SimulatedTurf.excited = false;
			if(turf.c.SimulatedTurf.excited_group)
				turf.c.SimulatedTurf.excited_group.garbage_collect();
		}
	}

	add_to_active(turf, blockchanges = true) {
		if(has_component(turf, "SimulatedTurf")) {
			turf.c.SimulatedTurf.excited = true;
			this.active_turfs.add(turf);
			if(blockchanges && turf.c.SimulatedTurf.excited_group)
				turf.c.SimulatedTurf.excited_group.garbage_collect();
		}
	}
}

module.exports.now = (server) => {
	server.air_controller = new AirController(server);
};

module.exports.server_start = (server) => {
	server.air_controller.start();
};
