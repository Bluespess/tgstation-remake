'use strict';

const {Toxin} = require('./other.js').reagents;
module.exports.reagents = {};

class Amatoxin extends Toxin {} // /datum/reagent/toxin/amatoxin
module.exports.reagents.Amatoxin = Amatoxin;
Object.assign(Amatoxin.prototype, {
	name: "Amatoxin",
	description: "A powerful poison derived from certain species of mushroom.",
	color: [0.47,0.14,0],
	toxpwr: 2.5,
	taste_description: "mushroom"
});

class Lexorin extends Toxin {} // /datum/reagent/toxin/lexorin
module.exports.reagents.Lexorin = Lexorin;
Object.assign(Lexorin.prototype, {
	name: "Lexorin",
	description: "A powerful poison used to stop respiration.",
	color: [0.49,0.76,0.63],
	toxpwr: 0,
	taste_description: "acid"
});

class SlimeJelly extends Toxin {} // /datum/reagent/toxin/slimejelly
module.exports.reagents.SlimeJelly = SlimeJelly;
Object.assign(SlimeJelly.prototype, {
	name: "Slime Jelly",
	description: "A gooey semi-liquid produced from one of the deadliest lifeforms in existence. SO REAL.",
	color: [0.5,0.12,0.16],
	toxpwr: 0,
	taste_description: "slime",
	taste_mult: 1.3
});

class MintToxin extends Toxin {} // /datum/reagent/toxin/minttoxin
module.exports.reagents.MintToxin = MintToxin;
Object.assign(MintToxin.prototype, {
	name: "Mint Toxin",
	description: "Useful for dealing with undesirable customers.",
	color: [0.81,0.21,0],
	toxpwr: 0,
	taste_description: "mint"
});

class Carpotoxin extends Toxin {} // /datum/reagent/toxin/carpotoxin
module.exports.reagents.Carpotoxin = Carpotoxin;
Object.assign(Carpotoxin.prototype, {
	name: "Carpotoxin",
	description: "A deadly neurotoxin produced by the dreaded spess carp.",
	color: [0,0.2,0.2],
	toxpwr: 2,
	taste_description: "fish"
});

class ZombiePowder extends Toxin {} // /datum/reagent/toxin/zombiepowder
module.exports.reagents.ZombiePowder = ZombiePowder;
Object.assign(ZombiePowder.prototype, {
	name: "Zombie Powder",
	description: "A strong neurotoxin that puts the subject into a death-like state.",
	reagent_state: "solid",
	color: [0.4,0.6,0],
	toxpwr: 0.5,
	taste_description: "death"
});

class MindbreakerToxin extends Toxin {} // /datum/reagent/toxin/mindbreaker
module.exports.reagents.MindbreakerToxin = MindbreakerToxin;
Object.assign(MindbreakerToxin.prototype, {
	name: "Mindbreaker Toxin",
	description: "A powerful hallucinogen. Not a thing to be messed with.",
	color: [0.7,0.06,0.03],
	toxpwr: 0,
	taste_description: "sourness"
});

class PlantBGone extends Toxin {} // /datum/reagent/toxin/plantbgone
module.exports.reagents.PlantBGone = PlantBGone;
Object.assign(PlantBGone.prototype, {
	name: "Plant-B-Gone",
	description: "A harmful toxic mixture to kill plantlife. Do not ingest!",
	color: [0.29,0,0.18],
	toxpwr: 1,
	taste_mult: 1
});

class WeedKiller extends PlantBGone {} // /datum/reagent/toxin/plantbgone/weedkiller
module.exports.reagents.WeedKiller = WeedKiller;
Object.assign(WeedKiller.prototype, {
	name: "Weed Killer",
	description: "A harmful toxic mixture to kill weeds. Do not ingest!",
	color: [0.29,0,0.29]
});

class PestKiller extends Toxin {} // /datum/reagent/toxin/pestkiller
module.exports.reagents.PestKiller = PestKiller;
Object.assign(PestKiller.prototype, {
	name: "Pest Killer",
	description: "A harmful toxic mixture to kill pests. Do not ingest!",
	color: [0.29,0,0.29],
	toxpwr: 1
});

class SporeToxin extends Toxin {} // /datum/reagent/toxin/spore
module.exports.reagents.SporeToxin = SporeToxin;
Object.assign(SporeToxin.prototype, {
	name: "Spore Toxin",
	description: "A natural toxin produced by blob spores that inhibits vision when ingested.",
	color: [0.6,0.8,0.2],
	toxpwr: 1
});

class BurningSporeToxin extends Toxin {} // /datum/reagent/toxin/spore_burning
module.exports.reagents.BurningSporeToxin = BurningSporeToxin;
Object.assign(BurningSporeToxin.prototype, {
	name: "Burning Spore Toxin",
	description: "A natural toxin produced by blob spores that induces combustion in its victim.",
	color: [0.6,0.8,0.2],
	toxpwr: 0.5,
	taste_description: "burning"
});

class ChloralHydrate extends Toxin {} // /datum/reagent/toxin/chloralhydrate
module.exports.reagents.ChloralHydrate = ChloralHydrate;
Object.assign(ChloralHydrate.prototype, {
	name: "Chloral Hydrate",
	description: "A powerful sedative that induces confusion and drowsiness before putting its target to sleep.",
	reagent_state: "solid",
	color: [0,0,0.4],
	toxpwr: 0,
	metabolization_rate: 0.75
});

class ChloralHydrateDelayed extends Toxin {} // /datum/reagent/toxin/chloralhydratedelayed
module.exports.reagents.ChloralHydrateDelayed = ChloralHydrateDelayed;
Object.assign(ChloralHydrateDelayed.prototype, {
	name: "Chloral Hydrate",
	description: "A powerful sedative that induces confusion and drowsiness before putting its target to sleep.",
	reagent_state: "solid",
	color: [0,0,0.4],
	toxpwr: 0,
	metabolization_rate: 0.75
});

class Beer2 extends Toxin {} // /datum/reagent/toxin/beer2
module.exports.reagents.Beer2 = Beer2;
Object.assign(Beer2.prototype, {
	name: "Beer",
	description: "A specially-engineered sedative disguised as beer. It induces instant sleep in its target.",
	color: [0.4,0.26,0],
	metabolization_rate: 0.75,
	taste_description: "piss water",
	glass_icon_state: "beerglass",
	glass_name: "glass of beer",
	glass_desc: "A freezing pint of beer."
});

class CoffeeGrounds extends Toxin {} // /datum/reagent/toxin/coffeepowder
module.exports.reagents.CoffeeGrounds = CoffeeGrounds;
Object.assign(CoffeeGrounds.prototype, {
	name: "Coffee Grounds",
	description: "Finely ground coffee beans, used to make coffee.",
	reagent_state: "solid",
	color: [0.36,0.18,0.05],
	toxpwr: 0.5
});

class GroundTeaLeaves extends Toxin {} // /datum/reagent/toxin/teapowder
module.exports.reagents.GroundTeaLeaves = GroundTeaLeaves;
Object.assign(GroundTeaLeaves.prototype, {
	name: "Ground Tea Leaves",
	description: "Finely shredded tea leaves, used for making tea.",
	reagent_state: "solid",
	color: [0.5,0.52,0],
	toxpwr: 0.5
});

class MuteToxin extends Toxin {} // /datum/reagent/toxin/mutetoxin
module.exports.reagents.MuteToxin = MuteToxin;
Object.assign(MuteToxin.prototype, {
	name: "Mute Toxin",
	description: "A nonlethal poison that inhibits speech in its victim.",
	color: [0.94,0.97,1],
	toxpwr: 0,
	taste_description: "silence"
});

class Tirizene extends Toxin {} // /datum/reagent/toxin/staminatoxin
module.exports.reagents.Tirizene = Tirizene;
Object.assign(Tirizene.prototype, {
	name: "Tirizene",
	description: "A nonlethal poison that causes extreme fatigue and weakness in its victim.",
	color: [0.43,0.16,0.16],
	toxpwr: 0
});

class Polonium extends Toxin {} // /datum/reagent/toxin/polonium
module.exports.reagents.Polonium = Polonium;
Object.assign(Polonium.prototype, {
	name: "Polonium",
	description: "An extremely radioactive material in liquid form. Ingestion results in fatal irradiation.",
	reagent_state: "liquid",
	color: [0.47,0.47,0.47],
	metabolization_rate: 0.0625,
	toxpwr: 0
});

class Histamine extends Toxin {} // /datum/reagent/toxin/histamine
module.exports.reagents.Histamine = Histamine;
Object.assign(Histamine.prototype, {
	name: "Histamine",
	description: "Histamine's effects become more dangerous depending on the dosage amount. They range from mildly annoying to incredibly lethal.",
	reagent_state: "liquid",
	color: [0.98,0.39,0.39],
	metabolization_rate: 0.125,
	overdose_threshold: 30,
	toxpwr: 0
});

class Formaldehyde extends Toxin {} // /datum/reagent/toxin/formaldehyde
module.exports.reagents.Formaldehyde = Formaldehyde;
Object.assign(Formaldehyde.prototype, {
	name: "Formaldehyde",
	description: "Formaldehyde, on its own, is a fairly weak toxin. It contains trace amounts of Histamine, very rarely making it decay into Histamine..",
	reagent_state: "liquid",
	color: [0.71,0,0.29],
	metabolization_rate: 0.25,
	toxpwr: 1
});

class Venom extends Toxin {} // /datum/reagent/toxin/venom
module.exports.reagents.Venom = Venom;
Object.assign(Venom.prototype, {
	name: "Venom",
	description: "An exotic poison extracted from highly toxic fauna. Causes scaling amounts of toxin damage and bruising depending and dosage. Often decays into Histamine.",
	reagent_state: "liquid",
	color: [0.94,1,0.94],
	metabolization_rate: 0.125,
	toxpwr: 0
});

class Neurotoxin2 extends Toxin {} // /datum/reagent/toxin/neurotoxin2
module.exports.reagents.Neurotoxin2 = Neurotoxin2;
Object.assign(Neurotoxin2.prototype, {
	name: "Neurotoxin",
	description: "Neurotoxin will inhibit brain function and cause toxin damage before eventually knocking out its victim.",
	reagent_state: "liquid",
	color: [0.39,0.57,0.43],
	metabolization_rate: 0.25,
	toxpwr: 0
});

class Cyanide extends Toxin {} // /datum/reagent/toxin/cyanide
module.exports.reagents.Cyanide = Cyanide;
Object.assign(Cyanide.prototype, {
	name: "Cyanide",
	description: "An infamous poison known for its use in assassination. Causes small amounts of toxin damage with a small chance of oxygen damage or a stun.",
	reagent_state: "liquid",
	color: [0,0.71,1],
	metabolization_rate: 0.0625,
	toxpwr: 1.25
});

class BadFood extends Toxin {} // /datum/reagent/toxin/bad_food
module.exports.reagents.BadFood = BadFood;
Object.assign(BadFood.prototype, {
	name: "Bad Food",
	description: "The result of some abomination of cookery, food so bad it's toxic.",
	reagent_state: "liquid",
	color: [0.84,0.84,0.85],
	metabolization_rate: 0.125,
	toxpwr: 0.5,
	taste_description: "bad cooking"
});

class ItchingPowder extends Toxin {} // /datum/reagent/toxin/itching_powder
module.exports.reagents.ItchingPowder = ItchingPowder;
Object.assign(ItchingPowder.prototype, {
	name: "Itching Powder",
	description: "A powder that induces itching upon contact with the skin. Causes the victim to scratch at their itches and has a very low chance to decay into Histamine.",
	reagent_state: "liquid",
	color: [0.78,0.78,0.78],
	metabolization_rate: 0.2,
	toxpwr: 0
});

class Initropidril extends Toxin {} // /datum/reagent/toxin/initropidril
module.exports.reagents.Initropidril = Initropidril;
Object.assign(Initropidril.prototype, {
	name: "Initropidril",
	description: "A powerful poison with insidious effects. It can cause stuns, lethal breathing failure, and cardiac arrest.",
	reagent_state: "liquid",
	color: [0.5,0.06,0.75],
	metabolization_rate: 0.25,
	toxpwr: 2.5
});

class Pancuronium extends Toxin {} // /datum/reagent/toxin/pancuronium
module.exports.reagents.Pancuronium = Pancuronium;
Object.assign(Pancuronium.prototype, {
	name: "Pancuronium",
	description: "An undetectable toxin that swiftly incapacitates its victim. May also cause breathing failure.",
	reagent_state: "liquid",
	color: [0.1,0.31,0.59],
	metabolization_rate: 0.125,
	toxpwr: 0,
	taste_mult: 0
});

class SodiumThiopental extends Toxin {} // /datum/reagent/toxin/sodium_thiopental
module.exports.reagents.SodiumThiopental = SodiumThiopental;
Object.assign(SodiumThiopental.prototype, {
	name: "Sodium Thiopental",
	description: "Sodium Thiopental induces heavy weakness in its target as well as unconsciousness.",
	reagent_state: "liquid",
	color: [0.39,0.59,0.98],
	metabolization_rate: 0.375,
	toxpwr: 0
});

class Sulfonal extends Toxin {} // /datum/reagent/toxin/sulfonal
module.exports.reagents.Sulfonal = Sulfonal;
Object.assign(Sulfonal.prototype, {
	name: "Sulfonal",
	description: "A stealthy poison that deals minor toxin damage and eventually puts the target to sleep.",
	reagent_state: "liquid",
	color: [0.49,0.76,0.63],
	metabolization_rate: 0.0625,
	toxpwr: 0.5
});

class Amanitin extends Toxin {} // /datum/reagent/toxin/amanitin
module.exports.reagents.Amanitin = Amanitin;
Object.assign(Amanitin.prototype, {
	name: "Amanitin",
	description: "A very powerful delayed toxin. Upon full metabolization, a massive amount of toxin damage will be dealt depending on how long it has been in the victim's bloodstream.",
	reagent_state: "liquid",
	color: [1,1,1],
	toxpwr: 0,
	metabolization_rate: 0.25
});

class Lipolicide extends Toxin {} // /datum/reagent/toxin/lipolicide
module.exports.reagents.Lipolicide = Lipolicide;
Object.assign(Lipolicide.prototype, {
	name: "Lipolicide",
	description: "A powerful toxin that will destroy fat cells, massively reducing body weight in a short time. More deadly to those without nutriment in their body.",
	taste_description: "mothballs",
	reagent_state: "liquid",
	color: [0.94,1,0.94],
	metabolization_rate: 0.25,
	toxpwr: 0.5
});

class Coniine extends Toxin {} // /datum/reagent/toxin/coniine
module.exports.reagents.Coniine = Coniine;
Object.assign(Coniine.prototype, {
	name: "Coniine",
	description: "Coniine metabolizes extremely slowly, but deals high amounts of toxin damage and stops breathing.",
	reagent_state: "liquid",
	color: [0.49,0.76,0.63],
	metabolization_rate: 0.03,
	toxpwr: 1.75
});

class Spewium extends Toxin {} // /datum/reagent/toxin/spewium
module.exports.reagents.Spewium = Spewium;
Object.assign(Spewium.prototype, {
	name: "Spewium",
	description: "A powerful emetic, causes uncontrollable vomiting.  May result in vomiting organs at high doses.",
	reagent_state: "liquid",
	color: [0.18,0.4,0.09],
	metabolization_rate: 0.5,
	overdose_threshold: 29,
	toxpwr: 0,
	taste_description: "vomit"
});

class Curare extends Toxin {} // /datum/reagent/toxin/curare
module.exports.reagents.Curare = Curare;
Object.assign(Curare.prototype, {
	name: "Curare",
	description: "Causes slight toxin damage followed by chain-stunning and oxygen damage.",
	reagent_state: "liquid",
	color: [0.1,0.1,0.1],
	metabolization_rate: 0.0625,
	toxpwr: 1
});

class Heparin extends Toxin {} // /datum/reagent/toxin/heparin
module.exports.reagents.Heparin = Heparin;
Object.assign(Heparin.prototype, {
	name: "Heparin",
	description: "A powerful anticoagulant. Victims will bleed uncontrollably and suffer scaling bruising.",
	reagent_state: "liquid",
	color: [0.78,0.78,0.78],
	metabolization_rate: 0.1,
	toxpwr: 0
});

class Rotatium extends Toxin {} // /datum/reagent/toxin/rotatium
module.exports.reagents.Rotatium = Rotatium;
Object.assign(Rotatium.prototype, {
	name: "Rotatium",
	description: "A constantly swirling, oddly colourful fluid. Causes the consumer's sense of direction and hand-eye coordination to become wild.",
	reagent_state: "liquid",
	color: [0.67,0.53,0.79],
	metabolization_rate: 0.3,
	toxpwr: 0.5,
	taste_description: "spinning"
});

class Skewium extends Toxin {} // /datum/reagent/toxin/skewium
module.exports.reagents.Skewium = Skewium;
Object.assign(Skewium.prototype, {
	name: "Skewium",
	description: "A strange, dull coloured liquid that appears to warp back and forth inside its container. Causes any consumer to experience a visual phenomena similar to said warping.",
	reagent_state: "liquid",
	color: [0.68,0.74,0.8],
	metabolization_rate: 0.4,
	toxpwr: 0.25,
	taste_description: "skewing"
});

class Anacea extends Toxin {} // /datum/reagent/toxin/anacea
module.exports.reagents.Anacea = Anacea;
Object.assign(Anacea.prototype, {
	name: "Anacea",
	description: "A toxin that quickly purges medicines and metabolizes very slowly.",
	reagent_state: "liquid",
	color: [0.24,0.32,0.2],
	metabolization_rate: 0.04,
	toxpwr: 0.15
});

class SAcid extends Toxin {} // /datum/reagent/toxin/acid
module.exports.reagents.SAcid = SAcid;
Object.assign(SAcid.prototype, {
	name: "Sulphuric acid",
	description: "A strong mineral acid with the molecular formula H2SO4.",
	color: [0,1,0.2],
	toxpwr: 1,
	acidpwr: 10,
	taste_description: "acid"
});

class FAcid extends SAcid {} // /datum/reagent/toxin/acid/fluacid
module.exports.reagents.FAcid = FAcid;
Object.assign(FAcid.prototype, {
	name: "Fluorosulfuric acid",
	description: "Fluorosulfuric acid is an extremely corrosive chemical substance.",
	color: [0.31,0.31,1],
	toxpwr: 2,
	acidpwr: 42.0
});

class DizzyingSolution extends Toxin {} // /datum/reagent/toxin/peaceborg/confuse
module.exports.reagents.DizzyingSolution = DizzyingSolution;
Object.assign(DizzyingSolution.prototype, {
	name: "Dizzying Solution",
	description: "Makes the target off balance and dizzy",
	toxpwr: 0,
	metabolization_rate: 0.75,
	taste_description: "dizziness"
});

class TiringSolution extends Toxin {} // /datum/reagent/toxin/peaceborg/tire
module.exports.reagents.TiringSolution = TiringSolution;
Object.assign(TiringSolution.prototype, {
	name: "Tiring Solution",
	description: "An extremely weak stamina-toxin that tires out the target. Completely harmless.",
	toxpwr: 0,
	metabolization_rate: 0.75,
	taste_description: "tiredness"
});

class ToxinMicrocapsules extends Toxin {} // /datum/reagent/toxin/delayed
module.exports.reagents.ToxinMicrocapsules = ToxinMicrocapsules;
Object.assign(ToxinMicrocapsules.prototype, {
	name: "Toxin Microcapsules",
	description: "Causes heavy toxin damage after a brief time of inactivity.",
	reagent_state: "liquid",
	metabolization_rate: 0,
	toxpwr: 0
});

class MimesBane extends Toxin {} // /datum/reagent/toxin/mimesbane
module.exports.reagents.MimesBane = MimesBane;
Object.assign(MimesBane.prototype, {
	name: "Mime's Bane",
	description: "A nonlethal neurotoxin that interferes with the victim's ability to gesture.",
	color: [0.94,0.97,1],
	toxpwr: 0,
	taste_description: "stillness"
});
