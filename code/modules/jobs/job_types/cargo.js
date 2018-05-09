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

module.exports.jobs.cargo_tech = new JobType({
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

let cargo_tech_outfit = new JobType.Outfit({
	name: "Cargo Technician",
	jobtype: module.exports.jobs.cargo_tech,
	slots: {
		iclothing: "jumpsuit_cargo",
		shoes: "shoes_brown",
	},
});
module.exports.jobs.cargo_tech.outfit = cargo_tech_outfit;


module.exports.jobs.mining = new JobType({
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

let mining_outfit = new JobType.Outfit({
	name: "Shaft Miner",
	jobtype: module.exports.jobs.mining,
	slots: {
		iclothing: "jumpsuit_miner_lavaland",
		shoes: "boots_mining",
	},
	backpack: "backpack_explorer"
});
module.exports.jobs.mining.outfit = mining_outfit;
