'use strict';
const JobType = require('./job.js');

//TODO: A ton of chaplain-specific snowflake code.

module.exports.jobs = {};

module.exports.jobs.chaplain = new JobType({
	title: "Chaplain",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#dddddd",
	department_head: ["hop"],
	departments: ["service"],
	access: ["morgue", "crematorium", "theatre", "chapel_office"],
	minimal_access: ["morgue", "crematorium", "theatre", "chapel_office"],
});

let chaplain_outfit = new JobType.Outfit({
	name: "Chaplain",
	jobtype: module.exports.jobs.chaplain,
	slots: {
		iclothing: "jumpsuit_chaplain",
		shoes: "shoes_brown",
	},
	backpack: "cultpack",
	satchel: "cultpack"
});
module.exports.jobs.chaplain.outfit = chaplain_outfit;
