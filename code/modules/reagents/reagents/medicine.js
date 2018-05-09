'use strict';

const {Reagent} = require('../reagent.js');
module.exports.reagents = {};

class Medicine extends Reagent {} // /datum/reagent/medicine
Object.assign(Medicine.prototype, {
	name: "Medicine",
	taste_description: "bitterness"
});

class Leporazine extends Medicine {} // /datum/reagent/medicine/leporazine
module.exports.reagents.Leporazine = Leporazine;
Object.assign(Leporazine.prototype, {
	name: "Leporazine",
	description: "Leporazine will effectively regulate a patient's body temperature, ensuring it never leaves safe levels.",
	color: [0.78,0.65,0.86]
});

class Adminordrazine extends Medicine {} // /datum/reagent/medicine/adminordrazine
module.exports.reagents.Adminordrazine = Adminordrazine;
Object.assign(Adminordrazine.prototype, {
	name: "Adminordrazine",
	description: "It's magic. We don't have to explain it.",
	color: [0.78,0.65,0.86],
	can_synth: 0,
	taste_description: "badmins"
});

class Nanites extends Adminordrazine {} // /datum/reagent/medicine/adminordrazine/nanites
module.exports.reagents.Nanites = Nanites;
Object.assign(Nanites.prototype, {
	name: "Nanites",
	description: "Tiny nanomachines capable of rapid cellular regeneration.",
	taste_description: "sludge"
});

class Synaptizine extends Medicine {} // /datum/reagent/medicine/synaptizine
module.exports.reagents.Synaptizine = Synaptizine;
Object.assign(Synaptizine.prototype, {
	name: "Synaptizine",
	description: "Increases resistance to stuns as well as reducing drowsiness and hallucinations.",
	color: [1,0,1]
});

class DiphenSynaptizine extends Medicine {} // /datum/reagent/medicine/synaphydramine
module.exports.reagents.DiphenSynaptizine = DiphenSynaptizine;
Object.assign(DiphenSynaptizine.prototype, {
	name: "Diphen-Synaptizine",
	description: "Reduces drowsiness, hallucinations, and Histamine from body.",
	color: [0.93,0.33,0.43]
});

class Inacusiate extends Medicine {} // /datum/reagent/medicine/inacusiate
module.exports.reagents.Inacusiate = Inacusiate;
Object.assign(Inacusiate.prototype, {
	name: "Inacusiate",
	description: "Instantly restores all hearing to the patient, but does not cure deafness.",
	color: [0.4,0,1]
});

class Cryoxadone extends Medicine {} // /datum/reagent/medicine/cryoxadone
module.exports.reagents.Cryoxadone = Cryoxadone;
Object.assign(Cryoxadone.prototype, {
	name: "Cryoxadone",
	description: "A chemical mixture with almost magical healing powers. Its main limitation is that the patient's body temperature must be under 270K for it to metabolise correctly.",
	color: [0,0,0.78],
	taste_description: "sludge"
});

class Clonexadone extends Medicine {} // /datum/reagent/medicine/clonexadone
module.exports.reagents.Clonexadone = Clonexadone;
Object.assign(Clonexadone.prototype, {
	name: "Clonexadone",
	description: "A chemical that derives from Cryoxadone. It specializes in healing clone damage, but nothing else. Requires very cold temperatures to properly metabolize, and metabolizes quicker than cryoxadone.",
	color: [0,0,0.78],
	taste_description: "muscle",
	metabolization_rate: 0.75
});

class Rezadone extends Medicine {} // /datum/reagent/medicine/rezadone
module.exports.reagents.Rezadone = Rezadone;
Object.assign(Rezadone.prototype, {
	name: "Rezadone",
	description: "A powder derived from fish toxin, Rezadone can effectively treat genetic damage as well as restoring minor wounds. Overdose will cause intense nausea and minor toxin damage.",
	reagent_state: "solid",
	color: [0.4,0.6,0],
	overdose_threshold: 30,
	taste_description: "fish"
});

class Spaceacillin extends Medicine {} // /datum/reagent/medicine/spaceacillin
module.exports.reagents.Spaceacillin = Spaceacillin;
Object.assign(Spaceacillin.prototype, {
	name: "Spaceacillin",
	description: "Spaceacillin will prevent a patient from conventionally spreading any diseases they are currently infected with.",
	color: [0.78,0.65,0.86],
	metabolization_rate: 0.25
});

class SilverSulfadiazine extends Medicine {} // /datum/reagent/medicine/silver_sulfadiazine
module.exports.reagents.SilverSulfadiazine = SilverSulfadiazine;
Object.assign(SilverSulfadiazine.prototype, {
	name: "Silver Sulfadiazine",
	description: "If used in touch-based applications, immediately restores burn wounds as well as restoring more over time. If ingested through other means, deals minor toxin damage.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86]
});

class Oxandrolone extends Medicine {} // /datum/reagent/medicine/oxandrolone
module.exports.reagents.Oxandrolone = Oxandrolone;
Object.assign(Oxandrolone.prototype, {
	name: "Oxandrolone",
	description: "Stimulates the healing of severe burns. Extremely rapidly heals severe burns and slowly heals minor ones. Overdose will worsen existing burns.",
	reagent_state: "liquid",
	color: [0.97,1,0.65],
	metabolization_rate: 0.25,
	overdose_threshold: 25
});

class StypticPowder extends Medicine {} // /datum/reagent/medicine/styptic_powder
module.exports.reagents.StypticPowder = StypticPowder;
Object.assign(StypticPowder.prototype, {
	name: "Styptic Powder",
	description: "If used in touch-based applications, immediately restores bruising as well as restoring more over time. If ingested through other means, deals minor toxin damage.",
	reagent_state: "liquid",
	color: [1,0.59,0.59]
});

class SalineGlucoseSolution extends Medicine {} // /datum/reagent/medicine/salglu_solution
module.exports.reagents.SalineGlucoseSolution = SalineGlucoseSolution;
Object.assign(SalineGlucoseSolution.prototype, {
	name: "Saline-Glucose Solution",
	description: "Has a 33% chance per metabolism cycle to heal brute and burn damage. Can be used as a temporary blood substitute.",
	reagent_state: "liquid",
	color: [0.86,0.86,0.86],
	metabolization_rate: 0.25,
	overdose_threshold: 60,
	taste_description: "sweetness and salt",
	last_added: 0,
	maximum_reachable: 490
});

class MinersSalve extends Medicine {} // /datum/reagent/medicine/mine_salve
module.exports.reagents.MinersSalve = MinersSalve;
Object.assign(MinersSalve.prototype, {
	name: "Miner's Salve",
	description: "A powerful painkiller. Restores bruising and burns in addition to making the patient believe they are fully healed.",
	reagent_state: "liquid",
	color: [0.43,0.39,0.45],
	metabolization_rate: 0.2
});

class Synthflesh extends Medicine {} // /datum/reagent/medicine/synthflesh
module.exports.reagents.Synthflesh = Synthflesh;
Object.assign(Synthflesh.prototype, {
	name: "Synthflesh",
	description: "Has a 100% chance of instantly healing brute and burn damage. One unit of the chemical will heal one point of damage. Touch application only.",
	reagent_state: "liquid",
	color: [1,0.92,0.92]
});

class Charcoal extends Medicine {} // /datum/reagent/medicine/charcoal
module.exports.reagents.Charcoal = Charcoal;
Object.assign(Charcoal.prototype, {
	name: "Charcoal",
	description: "Heals toxin damage as well as slowly removing any other chemicals the patient has in their bloodstream.",
	reagent_state: "liquid",
	color: [0,0,0],
	metabolization_rate: 0.25,
	taste_description: "ash"
});

class Omnizine extends Medicine {} // /datum/reagent/medicine/omnizine
module.exports.reagents.Omnizine = Omnizine;
Object.assign(Omnizine.prototype, {
	name: "Omnizine",
	description: "Slowly heals all damage types. Overdose will cause damage in all types instead.",
	reagent_state: "liquid",
	color: [0.86,0.86,0.86],
	metabolization_rate: 0.125,
	overdose_threshold: 30
});

class Calomel extends Medicine {} // /datum/reagent/medicine/calomel
module.exports.reagents.Calomel = Calomel;
Object.assign(Calomel.prototype, {
	name: "Calomel",
	description: "Quickly purges the body of all chemicals. Toxin damage is dealt if the patient is in good condition.",
	reagent_state: "liquid",
	color: [0.1,0.78,0.2],
	metabolization_rate: 0.25,
	taste_description: "acid"
});

class PotassiumIodide extends Medicine {} // /datum/reagent/medicine/potass_iodide
module.exports.reagents.PotassiumIodide = PotassiumIodide;
Object.assign(PotassiumIodide.prototype, {
	name: "Potassium Iodide",
	description: "Efficiently restores low radiation damage.",
	reagent_state: "liquid",
	color: [0.08,1,0.24],
	metabolization_rate: 1
});

class PenteticAcid extends Medicine {} // /datum/reagent/medicine/pen_acid
module.exports.reagents.PenteticAcid = PenteticAcid;
Object.assign(PenteticAcid.prototype, {
	name: "Pentetic Acid",
	description: "Reduces massive amounts of radiation and toxin damage while purging other chemicals from the body.",
	reagent_state: "liquid",
	color: [0.9,1,0.94],
	metabolization_rate: 0.25
});

class SalicyclicAcid extends Medicine {} // /datum/reagent/medicine/sal_acid
module.exports.reagents.SalicyclicAcid = SalicyclicAcid;
Object.assign(SalicyclicAcid.prototype, {
	name: "Salicyclic Acid",
	description: "Stimulates the healing of severe bruises. Extremely rapidly heals severe bruising and slowly heals minor ones. Overdose will worsen existing bruising.",
	reagent_state: "liquid",
	color: [0.82,0.82,0.82],
	metabolization_rate: 0.25,
	overdose_threshold: 25
});

class Salbutamol extends Medicine {} // /datum/reagent/medicine/salbutamol
module.exports.reagents.Salbutamol = Salbutamol;
Object.assign(Salbutamol.prototype, {
	name: "Salbutamol",
	description: "Rapidly restores oxygen deprivation as well as preventing more of it to an extent.",
	reagent_state: "liquid",
	color: [0,1,1],
	metabolization_rate: 0.125
});

class Perfluorodecalin extends Medicine {} // /datum/reagent/medicine/perfluorodecalin
module.exports.reagents.Perfluorodecalin = Perfluorodecalin;
Object.assign(Perfluorodecalin.prototype, {
	name: "Perfluorodecalin",
	description: "Extremely rapidly restores oxygen deprivation, but inhibits speech. May also heal small amounts of bruising and burns.",
	reagent_state: "liquid",
	color: [1,0.39,0.39],
	metabolization_rate: 0.125
});

class Ephedrine extends Medicine {} // /datum/reagent/medicine/ephedrine
module.exports.reagents.Ephedrine = Ephedrine;
Object.assign(Ephedrine.prototype, {
	name: "Ephedrine",
	description: "Increases stun resistance and movement speed. Overdose deals toxin damage and inhibits breathing.",
	reagent_state: "liquid",
	color: [0.82,1,0.98],
	metabolization_rate: 0.25,
	overdose_threshold: 45,
	addiction_threshold: 30
});

class Diphenhydramine extends Medicine {} // /datum/reagent/medicine/diphenhydramine
module.exports.reagents.Diphenhydramine = Diphenhydramine;
Object.assign(Diphenhydramine.prototype, {
	name: "Diphenhydramine",
	description: "Rapidly purges the body of Histamine and reduces jitteriness. Slight chance of causing drowsiness.",
	reagent_state: "liquid",
	color: [0.39,1,0.9],
	metabolization_rate: 0.25
});

class Morphine extends Medicine {} // /datum/reagent/medicine/morphine
module.exports.reagents.Morphine = Morphine;
Object.assign(Morphine.prototype, {
	name: "Morphine",
	description: "A painkiller that allows the patient to move at full speed even in bulky objects. Causes drowsiness and eventually unconsciousness in high doses. Overdose will cause a variety of effects, ranging from minor to lethal.",
	reagent_state: "liquid",
	color: [0.66,0.98,0.98],
	metabolization_rate: 0.25,
	overdose_threshold: 30,
	addiction_threshold: 25
});

class Oculine extends Medicine {} // /datum/reagent/medicine/oculine
module.exports.reagents.Oculine = Oculine;
Object.assign(Oculine.prototype, {
	name: "Oculine",
	description: "Quickly restores eye damage, cures nearsightedness, and has a chance to restore vision to the blind.",
	reagent_state: "liquid",
	color: [1,1,1],
	metabolization_rate: 0.125,
	taste_description: "dull toxin"
});

class Atropine extends Medicine {} // /datum/reagent/medicine/atropine
module.exports.reagents.Atropine = Atropine;
Object.assign(Atropine.prototype, {
	name: "Atropine",
	description: "If a patient is in critical condition, rapidly heals all damage types as well as regulating oxygen in the body. Excellent for stabilizing wounded patients.",
	reagent_state: "liquid",
	color: [0,0,0],
	metabolization_rate: 0.125,
	overdose_threshold: 35
});

class Epinephrine extends Medicine {} // /datum/reagent/medicine/epinephrine
module.exports.reagents.Epinephrine = Epinephrine;
Object.assign(Epinephrine.prototype, {
	name: "Epinephrine",
	description: "Minor boost to stun resistance. Slowly heals damage if a patient is in critical condition, as well as regulating oxygen loss. Overdose causes weakness and toxin damage.",
	reagent_state: "liquid",
	color: [0.82,1,0.98],
	metabolization_rate: 0.125,
	overdose_threshold: 30
});

class StrangeReagent extends Medicine {} // /datum/reagent/medicine/strange_reagent
module.exports.reagents.StrangeReagent = StrangeReagent;
Object.assign(StrangeReagent.prototype, {
	name: "Strange Reagent",
	description: "A miracle drug capable of bringing the dead back to life. Only functions if the target has less than 100 brute and burn damage (independent of one another), and causes slight damage to the living.",
	reagent_state: "liquid",
	color: [0.63,0.91,0.37],
	metabolization_rate: 0.25,
	taste_description: "magnets"
});

class Mannitol extends Medicine {} // /datum/reagent/medicine/mannitol
module.exports.reagents.Mannitol = Mannitol;
Object.assign(Mannitol.prototype, {
	name: "Mannitol",
	description: "Efficiently restores brain damage.",
	color: [0.86,0.86,1]
});

class Mutadone extends Medicine {} // /datum/reagent/medicine/mutadone
module.exports.reagents.Mutadone = Mutadone;
Object.assign(Mutadone.prototype, {
	name: "Mutadone",
	description: "Removes jitteriness and restores genetic defects.",
	color: [0.31,0.59,0.78],
	taste_description: "acid"
});

class Antihol extends Medicine {} // /datum/reagent/medicine/antihol
module.exports.reagents.Antihol = Antihol;
Object.assign(Antihol.prototype, {
	name: "Antihol",
	description: "Purges alcoholic substance from the patient's body and eliminates its side effects.",
	color: [0,0.71,0.78],
	taste_description: "raw egg"
});

class Stimulants extends Medicine {} // /datum/reagent/medicine/stimulants
module.exports.reagents.Stimulants = Stimulants;
Object.assign(Stimulants.prototype, {
	name: "Stimulants",
	description: "Increases stun resistance and movement speed in addition to restoring minor damage and weakness. Overdose causes weakness and toxin damage.",
	color: [0.47,0,0.55],
	metabolization_rate: 0.25,
	overdose_threshold: 60
});

class Insulin extends Medicine {} // /datum/reagent/medicine/insulin
module.exports.reagents.Insulin = Insulin;
Object.assign(Insulin.prototype, {
	name: "Insulin",
	description: "Increases sugar depletion rates.",
	reagent_state: "liquid",
	color: [1,1,0.94],
	metabolization_rate: 0.25
});

class Bicaridine extends Medicine {} // /datum/reagent/medicine/bicaridine
module.exports.reagents.Bicaridine = Bicaridine;
Object.assign(Bicaridine.prototype, {
	name: "Bicaridine",
	description: "Restores bruising. Overdose causes it instead.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	overdose_threshold: 30
});

class Dexalin extends Medicine {} // /datum/reagent/medicine/dexalin
module.exports.reagents.Dexalin = Dexalin;
Object.assign(Dexalin.prototype, {
	name: "Dexalin",
	description: "Restores oxygen loss. Overdose causes it instead.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	overdose_threshold: 30
});

class Kelotane extends Medicine {} // /datum/reagent/medicine/kelotane
module.exports.reagents.Kelotane = Kelotane;
Object.assign(Kelotane.prototype, {
	name: "Kelotane",
	description: "Restores fire damage. Overdose causes it instead.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	overdose_threshold: 30
});

class AntiToxin extends Medicine {} // /datum/reagent/medicine/antitoxin
module.exports.reagents.AntiToxin = AntiToxin;
Object.assign(AntiToxin.prototype, {
	name: "Anti-Toxin",
	description: "Heals toxin damage and removes toxins in the bloodstream. Overdose causes toxin damage.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	overdose_threshold: 30,
	taste_description: "a roll of gauze"
});

class Inaprovaline extends Medicine {} // /datum/reagent/medicine/inaprovaline
module.exports.reagents.Inaprovaline = Inaprovaline;
Object.assign(Inaprovaline.prototype, {
	name: "Inaprovaline",
	description: "Stabilizes the breathing of patients. Good for those in critical condition.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86]
});

class Tricordrazine extends Medicine { // /datum/reagent/medicine/tricordrazine
	mob_life(dt) {
		if(Math.random() < 0.8) {
			this.holder.c.LivingMob.adjust_damage("brute", -0.5 * dt);
			this.holder.c.LivingMob.adjust_damage("burn", -0.5 * dt);
			this.holder.c.LivingMob.adjust_damage("oxy", -0.5 * dt);
			this.holder.c.LivingMob.adjust_damage("tox", -0.5 * dt);
		}
		super.mob_life(...arguments);
	}
	overdose_process(dt) {
		this.holder.c.LivingMob.adjust_damage("brute", 1 * dt);
		this.holder.c.LivingMob.adjust_damage("burn", 1 * dt);
		this.holder.c.LivingMob.adjust_damage("oxy", 1 * dt);
		this.holder.c.LivingMob.adjust_damage("tox", 1 * dt);
		super.overdose_process(...arguments);
	}
}
module.exports.reagents.Tricordrazine = Tricordrazine;
Object.assign(Tricordrazine.prototype, {
	name: "Tricordrazine",
	description: "Has a high chance to heal all types of damage. Overdose instead causes it.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	overdose_threshold: 30,
	taste_description: "grossness"
});

class RestorativeNanites extends Medicine {} // /datum/reagent/medicine/syndicate_nanites
module.exports.reagents.RestorativeNanites = RestorativeNanites;
Object.assign(RestorativeNanites.prototype, {
	name: "Restorative Nanites",
	description: "Miniature medical robots that swiftly restore bodily damage.",
	reagent_state: "solid",
	color: [0.33,0.33,0.33]
});

class Earthsblood extends Medicine {} // /datum/reagent/medicine/earthsblood
module.exports.reagents.Earthsblood = Earthsblood;
Object.assign(Earthsblood.prototype, {
	name: "Earthsblood",
	description: "Ichor from an extremely powerful plant. Great for restoring wounds, but it's a little heavy on the brain.",
	color: [1,0.69,0],
	overdose_threshold: 25
});

class Haloperidol extends Medicine {} // /datum/reagent/medicine/haloperidol
module.exports.reagents.Haloperidol = Haloperidol;
Object.assign(Haloperidol.prototype, {
	name: "Haloperidol",
	description: "Increases depletion rates for most stimulating/hallucinogenic drugs. Reduces druggy effects and jitteriness. Severe stamina regeneration penalty, causes drowsiness. Small chance of brain damage.",
	reagent_state: "liquid",
	color: [0.15,0.53,0.04],
	metabolization_rate: 0.2
});

class MiningNanites extends Medicine {} // /datum/reagent/medicine/miningnanites
module.exports.reagents.MiningNanites = MiningNanites;
Object.assign(MiningNanites.prototype, {
	name: "Nanites",
	description: "It's mining magic. We don't have to explain it.",
	color: [0.78,0.65,0.86],
	overdose_threshold: 3,
	can_synth: 0
});

class ChangelingAdrenaline extends Medicine {} // /datum/reagent/medicine/changelingAdrenaline
module.exports.reagents.ChangelingAdrenaline = ChangelingAdrenaline;
Object.assign(ChangelingAdrenaline.prototype, {
	name: "Adrenaline",
	description: "Reduces stun times. Also deals toxin damage at high amounts.",
	color: [0.78,0.65,0.86],
	overdose_threshold: 30
});

class ChangelingAdrenaline2 extends Medicine {} // /datum/reagent/medicine/changelingAdrenaline2
module.exports.reagents.ChangelingAdrenaline2 = ChangelingAdrenaline2;
Object.assign(ChangelingAdrenaline2.prototype, {
	name: "Adrenaline",
	description: "Drastically increases movement speed.",
	color: [0.78,0.65,0.86],
	metabolization_rate: 1
});

class Corazone extends Medicine {} // /datum/reagent/medicine/corazone
module.exports.reagents.Corazone = Corazone;
Object.assign(Corazone.prototype, {
	name: "Corazone",
	description: "A medication used to treat pain, fever, and inflammation, along with heart attacks.",
	color: [0.96,0.96,0.96]
});
