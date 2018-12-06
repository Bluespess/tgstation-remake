'use strict';
const JobType = require('./job.js');

//TODO: config for maint access, for now they have it
//TODO: All the department sec officer crap
//TODO: setup_officer_positions() crap

module.exports.jobs = {};

module.exports.jobs.warden = new JobType({
	title: "Warden",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the head of security",
	selection_color: "#ffeeee",
	department_head: ["hos"],
	departments: ["sec"],
	access: ["security", "brig", "armory", "courtroom", "weapons", "forensics", "morgue", "maint"],
	minimal_access: ["security", "brig", "armory", "courtroom", "weapons", "maint"],
	minimal_player_age: 7,
	exp_requirements: 300,
	exp_type: "crew"
});

let warden_outfit = new JobType.Outfit({
	name: "Warden",
	jobtype: module.exports.jobs.warden,
	slots: {
		iclothing: "jumpsuit_warden_red",
		shoes: "boots_jackboots",
		head: "warden_hat",
		oclothing: "armor_warden_alt"
	},
	backpack: "backpack_security"
});
module.exports.jobs.warden.outfit = warden_outfit;

module.exports.jobs.detective = new JobType({
	title: "Detective",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the head of security",
	selection_color: "#ffeeee",
	department_head: ["hos"],
	departments: ["sec"],
	access: ["security", "brig", "courtroom", "weapons", "forensics", "morgue", "maint"],
	minimal_access: ["security", "brig", "courtroom", "weapons", "forensics", "morgue", "maint"],
	minimal_player_age: 7,
	exp_requirements: 300,
	exp_type: "crew"
});

let detective_outfit = new JobType.Outfit({
	name: "Detective",
	jobtype: module.exports.jobs.detective,
	slots: {
		iclothing: "jumpsuit_detective",
		shoes: "shoes_brown",
		head: "det_hat",
		oclothing: "det_suit"
	}
});
module.exports.jobs.detective.outfit = detective_outfit;

module.exports.jobs.officer = new JobType({
	title: "Security Officer",
	total_positions: 5,
	spawn_positions: 5,
	supervisors: "the head of security",
	selection_color: "#ffeeee",
	department_head: ["hos"],
	departments: ["sec"],
	access: ["security", "brig", "courtroom", "weapons", "forensics", "morgue", "maint"],
	minimal_access: ["security", "brig", "courtroom", "weapons", "maint"],
	minimal_player_age: 7,
	exp_requirements: 300,
	exp_type: "crew"
});

let officer_outfit = new JobType.Outfit({
	name: "Security Officer",
	jobtype: module.exports.jobs.officer,
	slots: {
		iclothing: "jumpsuit_security_red",
		shoes: "boots_jackboots",
		oclothing: "armor_vest_alt",
		belt: "hybrid_taser"
	},
	backpack: "backpack_security"
});
module.exports.jobs.officer.outfit = officer_outfit;
