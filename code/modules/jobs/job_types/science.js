'use strict';
const JobType = require('./job.js');

module.exports.jobs = {};

module.exports.jobs.scientist = new JobType({
	title: "Scientist",
	total_positions: 5,
	spawn_positions: 3,
	supervisors: "the research director",
	selection_color: "#ffeeff",
	department_head: ["rd"],
	departments: ["sci"],
	access: ["rnd","toxins_lab","tech_storage","robotics","science","xenobiology","genetics","mineral_storeroom"],
	minimal_access: ["rnd","toxins_lab","science","xenobiology","mineral_storeroom"],
	exp_requirements: 60,
	exp_type: "crew"
});

let scientist_outfit = new JobType.Outfit({
	name: "Scientist",
	jobtype: module.exports.jobs.scientist,
	slots: {
		iclothing: "jumpsuit_scientist",
		shoes: "shoes_white",
		oclothing: "toggle_labcoat_science"
	},
	backpack: "backpack_science"
});
module.exports.jobs.scientist.outfit = scientist_outfit;

module.exports.jobs.roboticist = new JobType({
	title: "Roboticist",
	total_positions: 2,
	spawn_positions: 2,
	supervisors: "the research director",
	selection_color: "#ffeeff",
	department_head: ["rd"],
	departments: ["sci"],
	access: ["rnd","toxins_lab","tech_storage","robotics","science","xenobiology","genetics","mineral_storeroom", "morgue"],
	minimal_access: ["rnd","tech_storage","robotics","science","mineral_storeroom", "morgue"],
	exp_requirements: 60,
	exp_type: "crew"
});

let roboticist_outfit = new JobType.Outfit({
	name: "Roboticist",
	jobtype: module.exports.jobs.roboticist,
	slots: {
		iclothing: "jumpsuit_roboticist",
		oclothing: "toggle_labcoat"
	},
	backpack: "backpack_science"
});
module.exports.jobs.roboticist.outfit = roboticist_outfit;
