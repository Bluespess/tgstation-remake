'use strict';
const JobType = require('./job.js');

module.exports.jobs = {};

module.exports.jobs.doctor = new JobType({
	title: "Medical Doctor",
	total_positions: 5,
	spawn_positions: 3,
	supervisors: "the chief medical officer",
	selection_color: "#ffeef0",
	department_head: ["cmo"],
	departments: ["med"],
	access: ["medical", "genetics", "morgue", "chemistry","virology", "surgery", "cloning", "mineral_storeroom"],
	minimal_access: ["medical","morgue","surgery","cloning"]
});

let doctor_outfit = new JobType.Outfit({
	name: "Medical Doctor",
	jobtype: module.exports.jobs.doctor,
	slots: {
		iclothing: "jumpsuit_medical_doctor",
		shoes: "shoes_white",
		oclothing: "toggle_labcoat"
	},
	backpack: "backpack_medic"
});
module.exports.jobs.doctor.outfit = doctor_outfit;

module.exports.jobs.chemist = new JobType({
	title: "Chemist",
	total_positions: 2,
	spawn_positions: 2,
	supervisors: "the chief medical officer",
	selection_color: "#ffeef0",
	department_head: ["cmo"],
	departments: ["med"],
	access: ["medical", "genetics", "morgue", "chemistry","virology", "surgery", "cloning", "mineral_storeroom"],
	minimal_access: ["medical","chemistry","mineral_storeroom"],
	exp_requirements: 60,
	exp_type: "crew",
});

let chemist_outfit = new JobType.Outfit({
	name: "Chemist",
	jobtype: module.exports.jobs.chemist,
	slots: {
		iclothing: "jumpsuit_chemist",
		shoes: "shoes_white",
		oclothing: "toggle_labcoat_chemist"
	},
	backpack: "backpack_chemistry"
});
module.exports.jobs.chemist.outfit = chemist_outfit;

module.exports.jobs.geneticist = new JobType({
	title: "Geneticist",
	total_positions: 2,
	spawn_positions: 2,
	supervisors: "the chief medical officer and research director",
	selection_color: "#ffeef0",
	department_head: ["cmo", "rd"],
	departments: ["med"],
	access: ["medical", "genetics", "morgue", "chemistry", "cloning", "mineral_storeroom", "rnd", "robotics", "tech_storage", "xenobiology"],
	minimal_access: ["medical","morgue","genetics","cloning", "rnd"],
	exp_requirements: 60,
	exp_type: "crew",
});

let geneticist_outfit = new JobType.Outfit({
	name: "Geneticist",
	jobtype: module.exports.jobs.doctor,
	slots: {
		iclothing: "jumpsuit_geneticist",
		shoes: "shoes_white",
		oclothing: "toggle_labcoat_genetics"
	},
	backpack: "backpack_genetics"
});
module.exports.jobs.geneticist.outfit = geneticist_outfit;

module.exports.jobs.virologist = new JobType({
	title: "Virologist",
	total_positions: 1,
	spawn_positions: 1,
	supervisors: "the chief medical officer",
	selection_color: "#ffeef0",
	department_head: ["cmo"],
	departments: ["med"],
	access: ["medical", "genetics", "morgue", "chemistry","virology", "surgery", "cloning", "mineral_storeroom"],
	minimal_access: ["medical","virology","mineral_storeroom"],
	exp_requirements: 60,
	exp_type: "crew",
});

let virologist_outfit = new JobType.Outfit({
	name: "Virologist",
	jobtype: module.exports.jobs.virologist,
	slots: {
		iclothing: "jumpsuit_virologist",
		shoes: "shoes_white",
		oclothing: "toggle_labcoat_virologist"
	},
	backpack: "backpack_medic"
});
module.exports.jobs.virologist.outfit = virologist_outfit;
