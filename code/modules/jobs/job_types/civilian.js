'use strict';
const JobType = require('./job.js');

module.exports.jobs = {};

module.exports.jobs.clown = new JobType({
	title: "Clown",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#dddddd",
	department_head: ["hop"],
	access: ["theatre"],
	minimal_access: ["theatre"],
	name_override: "clown"
});

let clown_outfit = new JobType.Outfit({
	name: "Assistant",
	jobtype: module.exports.jobs.clown,
	slots: {
		iclothing: "jumpsuit_clown",
		shoes: "clown_shoes"
	},
	backpack: "backpack_clown"
});
module.exports.jobs.clown.outfit = clown_outfit;
