'use strict';
const JobType = require('./job.js');

module.exports.jobs = {};

module.exports.jobs.assistant = new JobType({ //TODO: Config-based maint access for assistants like on TG
	title: "Assistant",
	total_positions: -1,
	spawn_positions: -1,
	supervisors: "absolutely everyone",
	selection_color: "#dddddd",
	access: ["maint"],
	minimal_access: ["maint"]
});

let assistant_outfit = new JobType.Outfit({
	name: "Assistant",
	jobtype: module.exports.jobs.assistant
});
module.exports.jobs.assistant.outfit = assistant_outfit;
