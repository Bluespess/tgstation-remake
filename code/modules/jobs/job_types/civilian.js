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
	departments: ["service"],
	access: ["theatre"],
	minimal_access: ["theatre"],
	name_override: "clown"
});

let clown_outfit = new JobType.Outfit({
	name: "Clown",
	jobtype: module.exports.jobs.clown,
	slots: {
		iclothing: "jumpsuit_clown",
		shoes: "clown_shoes"
	},
	backpack: "backpack_clown"
});
module.exports.jobs.clown.outfit = clown_outfit;

module.exports.jobs.mime = new JobType({
	title: "Mime",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#dddddd",
	department_head: ["hop"],
	departments: ["service"],
	access: ["theatre"],
	minimal_access: ["theatre"],
	name_override: "mime"
});

let mime_outfit = new JobType.Outfit({
	name: "Mime",
	jobtype: module.exports.jobs.mime,
	slots: {
		iclothing: "jumpsuit_mime",
		shoes: "shoes_brown",
		head: "beret"
	},
	backpack: "backpack_mime"
});
module.exports.jobs.mime.outfit = mime_outfit;

module.exports.jobs.curator = new JobType({
	title: "Curator",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#dddddd",
	department_head: ["hop"],
	departments: ["service"],
	access: ["library"],
	minimal_access: ["library", "construction", "mining_station"],
});

let curator_outfit = new JobType.Outfit({
	name: "Curator",
	jobtype: module.exports.jobs.curator,
	slots: {
		iclothing: "jumpsuit_curator",
		shoes: "shoes_brown"
	},
});
module.exports.jobs.curator.outfit = curator_outfit;

module.exports.jobs.lawyer = new JobType({
	title: "Lawyer",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#dddddd",
	department_head: ["hop"],
	departments: ["service"],
	access: ["lawyer", "courtroom", "security"],
	minimal_access: ["lawyer", "courtroom", "security"],
});

let lawyer_outfit = new JobType.Outfit({
	name: "Lawyer",
	jobtype: module.exports.jobs.lawyer,
	slots: {
		iclothing: "jumpsuit_lawyer_black",
		shoes: "shoes_black"
	},
});
module.exports.jobs.lawyer.outfit = lawyer_outfit;
