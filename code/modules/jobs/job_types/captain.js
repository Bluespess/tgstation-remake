'use strict';
const JobType = require('./job.js');
const {all_access} = require('../../../defines/access.js');

module.exports.jobs = {};

module.exports.jobs.captain = new JobType({
	title: "Captain",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "Nanotrasen officials and Space Law",
	selection_color: "#ccccff",
	department_head: ["CentCom"],
	departments: ["command"],
	access: all_access,
	minimal_access: all_access,
	req_admin_notify: true,
	minimal_player_age: 14,
	exp_requirements: 180,
	exp_type: "crew",
});

let captain_outfit = new JobType.Outfit({
	name: "Captain",
	jobtype: module.exports.jobs.captain,
	slots: {
		iclothing: "jumpsuit_captain",
		shoes: "shoes_brown",
		id: "id_gold"
	},
	backpack: "backpack_captain",
});
module.exports.jobs.captain.outfit = captain_outfit;

module.exports.jobs.hop = new JobType({
	title: "Head of Personnel",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the captain",
	selection_color: "#ddddff",
	department_head: ["captain"],
	departments: ["command"],
	access: ["security", "courtroom", "weapons", "medical", "engine", "change_ids", "ai_upload", "eva", "heads", "personal_lockers", "maint", "bar", "janitor", "construction", "morgue", "crematorium", "kitchen", "cargo", "cargo_office", "qm", "hydroponics", "lawyer", "theatre", "chapel_office", "library", "research", "mining", "vault", "mining_station", "hop", "rc_announce", "keycard_auth", "gateway", "mineral_storeroom"],
	minimal_access: ["security", "courtroom", "weapons", "medical", "engine", "change_ids", "ai_upload", "eva", "heads", "personal_lockers", "maint", "bar", "janitor", "construction", "morgue", "crematorium", "kitchen", "cargo", "cargo_office", "qm", "hydroponics", "lawyer", "theatre", "chapel_office", "library", "research", "mining", "vault", "mining_station", "hop", "rc_announce", "keycard_auth", "gateway", "mineral_storeroom"],
	req_admin_notify: true,
	minimal_player_age: 10,
	exp_requirements: 180,
	exp_type: "crew",
	exp_type_department: "supply"
});

let hop_outfit = new JobType.Outfit({
	name: "Head of Personnel",
	jobtype: module.exports.jobs.hop,
	slots: {
		iclothing: "jumpsuit_hop",
		shoes: "shoes_brown",
		id: "id_silver"
	},
});
module.exports.jobs.hop.outfit = hop_outfit;
