'use strict';

class JobController {
	constructor(server) {
		this.server = server;
		this.jobs = {};

		this.importModule(require('./job_types/assistant.js'));
		this.importModule(require('./job_types/civilian.js'));
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
}

module.exports.now = function(server) {
	server.job_controller = new JobController(server);
};
