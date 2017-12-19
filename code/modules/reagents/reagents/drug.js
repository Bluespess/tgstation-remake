'use strict';

const {Reagent} = require('../reagent.js');
module.exports.reagents = {};

class Drug extends Reagent {} // /datum/reagent/drug
module.exports.reagents.Drug = Drug;
Object.assign(Drug.prototype, {
	name: "Drug",
	metabolization_rate: 0.25,
	taste_description: "bitterness"
});

class SpaceDrugs extends Drug {} // /datum/reagent/drug/space_drugs
module.exports.reagents.SpaceDrugs = SpaceDrugs;
Object.assign(SpaceDrugs.prototype, {
	name: "Space drugs",
	description: "An illegal chemical compound used as drug.",
	color: [0.38,0.65,0.52],
	overdose_threshold: 30
});

class Nicotine extends Drug {} // /datum/reagent/drug/nicotine
module.exports.reagents.Nicotine = Nicotine;
Object.assign(Nicotine.prototype, {
	name: "Nicotine",
	description: "Slightly reduces stun times. If overdosed it will deal toxin and oxygen damage.",
	reagent_state: "liquid",
	color: [0.38,0.65,0.52],
	addiction_threshold: 30,
	taste_description: "smoke"
});

class Menthol extends Drug {} // /datum/reagent/drug/menthol
module.exports.reagents.Menthol = Menthol;
Object.assign(Menthol.prototype, {
	name: "Menthol",
	description: "Tastes naturally minty, and imparts a very mild numbing sensation.",
	taste_description: "mint",
	reagent_state: "liquid",
	color: [0.5,0.69,0.61]
});

class Crank extends Drug {} // /datum/reagent/drug/crank
module.exports.reagents.Crank = Crank;
Object.assign(Crank.prototype, {
	name: "Crank",
	description: "Reduces stun times by about 200%. If overdosed or addicted it will deal significant Toxin, Brute and Brain damage.",
	reagent_state: "liquid",
	color: [0.98,0,0.78],
	overdose_threshold: 20,
	addiction_threshold: 10
});

class Krokodil extends Drug {} // /datum/reagent/drug/krokodil
module.exports.reagents.Krokodil = Krokodil;
Object.assign(Krokodil.prototype, {
	name: "Krokodil",
	description: "Cools and calms you down. If overdosed it will deal significant Brain and Toxin damage. If addicted it will begin to deal fatal amounts of Brute damage as the subject's skin falls off.",
	reagent_state: "liquid",
	color: [0,0.39,0.71],
	overdose_threshold: 20,
	addiction_threshold: 15
});

class Methamphetamine extends Drug {} // /datum/reagent/drug/methamphetamine
module.exports.reagents.Methamphetamine = Methamphetamine;
Object.assign(Methamphetamine.prototype, {
	name: "Methamphetamine",
	description: "Reduces stun times by about 300%, speeds the user up, and allows the user to quickly recover stamina while dealing a small amount of Brain damage. If overdosed the subject will move randomly, laugh randomly, drop items and suffer from Toxin and Brain damage. If addicted the subject will constantly jitter and drool, before becoming dizzy and losing motor control and eventually suffer heavy toxin damage.",
	reagent_state: "liquid",
	color: [0.98,0.98,0.98],
	overdose_threshold: 20,
	addiction_threshold: 10,
	metabolization_rate: 0.375
});

class BathSalts extends Drug {} // /datum/reagent/drug/bath_salts
module.exports.reagents.BathSalts = BathSalts;
Object.assign(BathSalts.prototype, {
	name: "Bath Salts",
	description: "Makes you nearly impervious to stuns and grants a stamina regeneration buff, but you will be a nearly uncontrollable tramp-bearded raving lunatic.",
	reagent_state: "liquid",
	color: [0.98,0.98,0.98],
	overdose_threshold: 20,
	addiction_threshold: 10,
	taste_description: "salt"
});

class Aranesp extends Drug {} // /datum/reagent/drug/aranesp
module.exports.reagents.Aranesp = Aranesp;
Object.assign(Aranesp.prototype, {
	name: "Aranesp",
	description: "Amps you up and gets you going, fixes all stamina damage you might have but can cause toxin and oxygen damage..",
	reagent_state: "liquid",
	color: [0.47,1,0.94]
});

