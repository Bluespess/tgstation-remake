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
	departments: ["command", "command"],
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
		id: "id_gold",
		head: "caphat"
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
		id: "id_silver",
		head: "hopcap",
	},
});
module.exports.jobs.hop.outfit = hop_outfit;

module.exports.jobs.chief_engineer = new JobType({
	title: "Chief Engineer",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the captain",
	selection_color: "#ffeeaa",
	department_head: ["captain"],
	departments: ["eng", "command"],
	access: ["security","engineering","power_equipment","maint","external_airlocks","ai_upload","teleporter","eva","heads","tech_storage","atmospherics","robotics","construction","vault","ce","mineral_storeroom","minisat","network"],
	minimal_access: ["security","engineering","power_equipment","maint","external_airlocks","ai_upload","teleporter","eva","heads","tech_storage","atmospherics","robotics","construction","vault","ce","mineral_storeroom","minisat","network"],
	req_admin_notify: true,
	minimal_player_age: 7,
	exp_requirements: 180,
	exp_type: "crew",
	exp_type_department: "eng"
});

let chief_engineer_outfit = new JobType.Outfit({
	name: "Chief Engineer",
	jobtype: module.exports.jobs.chief_engineer,
	slots: {
		iclothing: "jumpsuit_ce",
		shoes: "shoes_black",
		id: "id_silver"
	},
	backpack: "backpack_industrial"
});
module.exports.jobs.chief_engineer.outfit = chief_engineer_outfit;

module.exports.jobs.hos = new JobType({
	title: "Head of Security",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the captain",
	selection_color: "#ffdddd",
	department_head: ["captain"],
	departments: ["sec", "command"],
	access: all_access,
	minimal_access: all_access,
	req_admin_notify: true,
	minimal_player_age: 14,
	exp_requirements: 300,
	exp_type: "crew",
	exp_type_department: "sec"
});

let hos_outfit = new JobType.Outfit({
	name: "Head of Security",
	jobtype: module.exports.jobs.hos,
	slots: {
		iclothing: "jumpsuit_hos_red",
		shoes: "shoes_black",
		id: "id_silver",
		head: "hos_beret"
	},
	backpack: "backpack_security"
});
module.exports.jobs.hos.outfit = hos_outfit;

module.exports.jobs.cmo = new JobType({
	title: "Chief Medical Officer",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the captain",
	selection_color: "#ffddf0",
	department_head: ["captain"],
	departments: ["med", "command"],
	access: ["security", "medical", "genetics", "morgue", "chemistry", "maint", "external_airlocks", "ai_upload", "teleporter", "eva", "heads", "tech_storage", "virology", "cmo", "surgery", "cloning",],
	minimal_access: ["security", "medical", "genetics", "morgue", "chemistry", "maint", "external_airlocks", "ai_upload", "teleporter", "eva", "heads", "tech_storage", "virology", "cmo", "surgery", "cloning",],
	req_admin_notify: true,
	minimal_player_age: 7,
	exp_requirements: 180,
	exp_type: "crew",
	exp_type_department: "med"
});

let cmo_outfit = new JobType.Outfit({
	name: "Chief Medical Officer",
	jobtype: module.exports.jobs.cmo,
	slots: {
		iclothing: "jumpsuit_cmo",
		shoes: "shoes_white",
		id: "id_silver"
	},
	backpack: "backpack_medic"
});
module.exports.jobs.cmo.outfit = cmo_outfit;

module.exports.jobs.rd = new JobType({
	title: "Research Director",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the captain",
	selection_color: "#ffddff",
	department_head: ["captain"],
	departments: ["sci", "command"],
	access: ["security","rd","rnd","toxins_lab","maint","external_airlocks","ai_upload","teleporter","eva","heads","tech_storage","robotics","science","xenobiology","rc_announce","keycard_auth","tcomsat","gateway","mineral_storeroom","minisat","network"],
	minimal_access: ["security","rd","rnd","toxins_lab","maint","external_airlocks","ai_upload","teleporter","eva","heads","tech_storage","robotics","science","xenobiology","rc_announce","keycard_auth","tcomsat","gateway","mineral_storeroom","minisat","network"],
	req_admin_notify: true,
	minimal_player_age: 7,
	exp_requirements: 180,
	exp_type: "crew",
	exp_type_department: "sci"
});

let rd_outfit = new JobType.Outfit({
	name: "Research Director",
	jobtype: module.exports.jobs.rd,
	slots: {
		iclothing: "jumpsuit_rd_turtleneck",
		shoes: "shoes_white",
		id: "id_silver"
	},
	backpack: "backpack_science"
});
module.exports.jobs.rd.outfit = rd_outfit;
