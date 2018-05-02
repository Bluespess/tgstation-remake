'use strict';
const JobType = require('./job.js');

module.exports.jobs = {};

module.exports.jobs.qm = new JobType({
	title: "Quartermaster",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#d7b088",
	department_head: ["hop"],
	departments: ["supply"],
	access: ["maint", "cargo", "qm", "mining", "mining_station", "mineral_storeroom"],
	minimal_access: ["maint", "cargo", "qm", "mining", "mining_station", "mineral_storeroom"],
});

let qm_outfit = new JobType.Outfit({
	name: "Quartermaster",
	jobtype: module.exports.jobs.qm,
	slots: {
		iclothing: "jumpsuit_qm",
		shoes: "shoes_brown",
	},
});
module.exports.jobs.qm.outfit = qm_outfit;

module.exports.jobs.ct = new JobType({
	title: "Cargo Technician",
	total_positions: 3,
	spawn_positions: 2,
	supervisors: "the quartermaster and the head of personnel",
	selection_color: "#dcba97",
	department_head: ["qm", "hop"],
	departments: ["supply"],
	access: ["maint", "cargo", "mining", "mining_station", "mineral_storeroom"],
	minimal_access: ["maint", "cargo", "mineral_storeroom"],
});

let ct_outfit = new JobType.Outfit({
	name: "Cargo Technician",
	jobtype: module.exports.jobs.ct,
	slots: {
		iclothing: "jumpsuit_cargo",
		shoes: "shoes_brown",
	},
});
module.exports.jobs.ct.outfit = ct_outfit;


module.exports.jobs.sm = new JobType({
	title: "Shaft Miner",
	total_positions: 3,
	spawn_positions: 3,
	supervisors: "the quartermaster and the head of personnel",
	selection_color: "#dcba97",
	department_head: ["qm", "hop"],
	departments: ["supply"],
	access: ["maint", "cargo", "mining", "mining_station", "mineral_storeroom"],
	minimal_access: ["maint", "cargo", "mineral_storeroom"],
});

let sm_outfit = new JobType.Outfit({
	name: "Shaft Miner",
	jobtype: module.exports.jobs.sm,
	slots: {
		iclothing: "jumpsuit_miner",
		shoes: "shoes_brown",
	},
	backpack: "backpack_explorer"
});
module.exports.jobs.sm.outfit = sm_outfit;

module.exports.jobs.bar = new JobType({
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

let bar_outfit = new JobType.Outfit({
	name: "Bartender",
	jobtype: module.exports.jobs.bar,
	slots: {
		iclothing: "jumpsuit_bartender",
		shoes: "shoes_black",
	},
});
module.exports.jobs.bar.outfit = bar_outfit;

module.exports.jobs.chef = new JobType({
	title: "Chef",
	total_positions: 2,
	spawn_positions: 1,
	supervisors: "the head of personnel",
	selection_color: "#bbe291",
	department_head: ["hop"],
	departments: ["service"],
	access: ["hydroponics", "bar", "kichen", "morgue"],
	minimal_access: ["kitchen", "morgue"],
});

let chef_outfit = new JobType.Outfit({
	name: "Chef",
	jobtype: module.exports.jobs.chef,
	slots: {
		iclothing: "jumpsuit_chef",
		shoes: "shoes_white",
	},
});
module.exports.jobs.chef.outfit = chef_outfit;

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
