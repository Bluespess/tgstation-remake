'use strict';
const _ = require('underscore');

class JobController {
	constructor(server) {
		this.server = server;
		this.jobs = {};

		this.importModule(require('./job_types/assistant.js'));
		this.importModule(require('./job_types/cargo.js'));
		this.importModule(require('./job_types/chaplain.js'));
		this.importModule(require('./job_types/command.js'));
		this.importModule(require('./job_types/civilian.js'));
		this.importModule(require('./job_types/engineering.js'));
		this.importModule(require('./job_types/medical.js'));
		this.importModule(require('./job_types/science.js'));
		this.importModule(require('./job_types/security.js'));
		this.importModule(require('./job_types/service.js'));
	}

	importModule(mod) {
		if(mod) {
			if(mod.jobs) {
				for(let [id, job] of Object.entries(mod.jobs)) {
					if(this.jobs[id])
						throw new Error(`Job '${id}' defined!`);
					this.jobs[id] = job;
					job.id = id;
				}
			}
		}
	}

	send_to_atom(mob, atom) {
		if(atom.is_base_loc || atom.is_fine_loc)
			mob.loc = atom;
		else
			mob.loc = atom.base_mover.fine_loc;
	}

	send_to_late_join(mob, buckle = true) {
		if(this.arrivals_area) {
			let chairs = this.arrivals_area.c.AreaArrivals.chairs;
			if(chairs && chairs.length) {
				let chair = _.sample(chairs);
				this.send_to_atom(mob, chair, buckle);
				return;
			}
		}
		this.send_to_atom(mob, this.server.location(0,0,0), buckle);
	}
}

module.exports.now = function(server) {
	server.job_controller = new JobController(server);
};
