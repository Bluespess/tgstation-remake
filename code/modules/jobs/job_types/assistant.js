'use strict';
const JobType = require('./job.js');

module.exports.jobs = {};

module.exports.jobs.assistant = new JobType({
	title: "Assistant",
	total_positions: -1,
	spawn_positions: -1,
	supervisors: "absolutely everyone",
	selection_color: "#dddddd"
});

let assistant_outfit = new JobType.Outfit({
	name: "Assistant",
	jobtype: module.exports.jobs.assistant
});
module.exports.jobs.assistant.outfit = assistant_outfit;
