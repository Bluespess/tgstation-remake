'use strict';
const JobType = require('./job.js');

module.exports.jobs = {};

module.exports.jobs.bartender = new JobType({
	title: "Bartender",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#bbe291",
	department_head: ["hop"],
	departments: ["service"],
	access: ["hydroponics", "bar", "kichen", "morgue", "weapons"],
	minimal_access: ["bar"],
});

let bartender_outfit = new JobType.Outfit({
	name: "Bartender",
	jobtype: module.exports.jobs.bartender,
	slots: {
		iclothing: "jumpsuit_bartender",
		shoes: "shoes_black",
	},
});
module.exports.jobs.bartender.outfit = bartender_outfit;

module.exports.jobs.cook = new JobType({
	title: "Cook",
	total_positions: 2,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#bbe291",
	department_head: ["hop"],
	departments: ["service"],
	access: ["hydroponics", "bar", "kichen", "morgue"],
	minimal_access: ["kitchen", "morgue"],
});

let cook_outfit = new JobType.Outfit({
	name: "Cook",
	jobtype: module.exports.jobs.cook,
	slots: {
		iclothing: "jumpsuit_chef",
		shoes: "shoes_white",
		head: "chefhat",
	},
});
module.exports.jobs.cook.outfit = cook_outfit;

module.exports.jobs.hydro = new JobType({
	title: "Botanist",
	total_positions: 3,
	spawn_positions: 2,
	supervisors: "the head of personnel",
	selection_color: "#bbe291",
	department_head: ["hop"],
	departments: ["service"],
	access: ["hydroponics", "bar", "kichen", "morgue"],
	minimal_access: ["hydroponics","morgue"],
});

let hydro_outfit = new JobType.Outfit({
	name: "Botanist",
	jobtype: module.exports.jobs.hydro,
	slots: {
		iclothing: "jumpsuit_botanist",
		shoes: "shoes_brown",
	},
	backpack: "backpack_botany"
});
module.exports.jobs.hydro.outfit = hydro_outfit;

module.exports.jobs.janitor = new JobType({
	title: "Janitor",
	total_positions: 2,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#bbe291",
	department_head: ["hop"],
	departments: ["service"],
	access: ["janitor", "maint"],
	minimal_access: ["janitor","maint"],
});

let janitor_outfit = new JobType.Outfit({
	name: "Janitor",
	jobtype: module.exports.jobs.janitor,
	slots: {
		iclothing: "jumpsuit_janitor",
		shoes: "shoes_brown",
	},
});
module.exports.jobs.janitor.outfit = janitor_outfit;
