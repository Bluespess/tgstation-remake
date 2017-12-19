'use strict';

const {Reagent} = require('../reagent.js');
module.exports.reagents = {};

class BlobReagent extends Reagent {} // /datum/reagent/blob
Object.assign(BlobReagent.prototype, {
	name: "Unknown",
	description: "shouldn't exist and you should adminhelp immediately.",
	color: [1,1,1],
	taste_description: "slime and errors",
	complementary_color: [0,0,0],
	shortdesc: null,
	effectdesc: null,
	analyzerdescdamage: "Unknown. Report this bug to a coder, or just adminhelp.",
	analyzerdesceffect: "N/A",
	blobbernaut_message: "slams",
	message: "The blob strikes you",
	message_living: null,
	can_synth: 0
});

class ReplicatingFoam extends BlobReagent {} // /datum/reagent/blob/replicating_foam
module.exports.reagents.ReplicatingFoam = ReplicatingFoam;
Object.assign(ReplicatingFoam.prototype, {
	name: "Replicating Foam",
	description: "will do medium brute damage and occasionally expand again when expanding.",
	shortdesc: "will do medium brute damage.",
	effectdesc: "will also expand when attacked with burn damage, but takes more brute damage.",
	analyzerdescdamage: "Does medium brute damage.",
	analyzerdesceffect: "Expands when attacked with burn damage, will occasionally expand again when expanding, and is fragile to brute damage.",
	color: [0.48,0.35,0.34],
	complementary_color: [0.34,0.47,0.48]
});

class NetworkedFibers extends BlobReagent {} // /datum/reagent/blob/networked_fibers
module.exports.reagents.NetworkedFibers = NetworkedFibers;
Object.assign(NetworkedFibers.prototype, {
	name: "Networked Fibers",
	description: "will do high brute and burn damage and will generate resources quicker, but can only expand manually.",
	shortdesc: "will do high brute and burn damage.",
	effectdesc: "will move your core when manually expanding near it.",
	analyzerdescdamage: "Does high brute and burn damage.",
	analyzerdesceffect: "Is highly mobile and generates resources rapidly.",
	color: [0.8,0.75,0.69],
	complementary_color: [1,0.96,0.56]
});

class ShiftingFragments extends BlobReagent {} // /datum/reagent/blob/shifting_fragments
module.exports.reagents.ShiftingFragments = ShiftingFragments;
Object.assign(ShiftingFragments.prototype, {
	name: "Shifting Fragments",
	description: "will do medium brute damage.",
	effectdesc: "will also cause blob parts to shift away when attacked.",
	analyzerdescdamage: "Does medium brute damage.",
	analyzerdesceffect: "When attacked, may shift away from the attacker.",
	color: [0.78,0.59,0.24],
	complementary_color: [0.24,0.43,0.78]
});

class BlazingOil extends BlobReagent {} // /datum/reagent/blob/blazing_oil
module.exports.reagents.BlazingOil = BlazingOil;
Object.assign(BlazingOil.prototype, {
	name: "Blazing Oil",
	description: "will do medium burn damage and set targets on fire.",
	effectdesc: "will also release bursts of flame when burnt, but takes damage from water.",
	analyzerdescdamage: "Does medium burn damage and sets targets on fire.",
	analyzerdesceffect: "Releases fire when burnt, but takes damage from water and other extinguishing liquids.",
	color: [0.71,0.55,0],
	complementary_color: [0.75,0.33,0.2],
	blobbernaut_message: "splashes",
	message: "The blob splashes you with burning oil",
	message_living: ", and you feel your skin char and melt"
});

class RegenerativeMateria extends BlobReagent {} // /datum/reagent/blob/regenerative_materia
module.exports.reagents.RegenerativeMateria = RegenerativeMateria;
Object.assign(RegenerativeMateria.prototype, {
	name: "Regenerative Materia",
	description: "will do toxin damage and cause targets to believe they are fully healed.",
	analyzerdescdamage: "Does toxin damage and injects a toxin that causes the target to believe they are fully healed.",
	color: [0.78,0.65,0.86],
	complementary_color: [0.8,0.47,0.58],
	message_living: ", and you feel <i>alive</i>"
});

class ZombifyingPods extends BlobReagent {} // /datum/reagent/blob/zombifying_pods
module.exports.reagents.ZombifyingPods = ZombifyingPods;
Object.assign(ZombifyingPods.prototype, {
	name: "Zombifying Pods",
	description: "will do very low toxin damage and harvest sleeping targets for additional resources and a blob zombie.",
	effectdesc: "will also produce fragile spores when killed and on expanding.",
	shortdesc: "will do very low toxin damage and harvest sleeping targets for additional resources(for your overmind) and a blob zombie.",
	analyzerdescdamage: "Does very low toxin damage and kills unconscious humans, turning them into blob zombies.",
	analyzerdesceffect: "Produces spores when expanding and when killed.",
	color: [0.91,0.55,0.36],
	complementary_color: [0.51,0.23,0.73],
	message_living: ", and you feel tired"
});

class EnergizedJelly extends BlobReagent {} // /datum/reagent/blob/energized_jelly
module.exports.reagents.EnergizedJelly = EnergizedJelly;
Object.assign(EnergizedJelly.prototype, {
	name: "Energized Jelly",
	description: "will cause low stamina and high oxygen damage, and cause targets to be unable to breathe.",
	effectdesc: "will also conduct electricity, but takes damage from EMPs.",
	analyzerdescdamage: "Does low stamina damage, high oxygen damage, and prevents targets from breathing.",
	analyzerdesceffect: "Is immune to electricity and will easily conduct it, but is weak to EMPs.",
	color: [0.94,0.84,0.35],
	complementary_color: [0,0.9,0.69],
	message_living: ", and you feel a horrible tingling sensation"
});

class ExplosiveLattice extends BlobReagent {} // /datum/reagent/blob/explosive_lattice
module.exports.reagents.ExplosiveLattice = ExplosiveLattice;
Object.assign(ExplosiveLattice.prototype, {
	name: "Explosive Lattice",
	description: "will do brute damage in an area around targets.",
	effectdesc: "will also resist explosions, but takes increased damage from fire and other energy sources.",
	analyzerdescdamage: "Does medium brute damage and causes damage to everyone near its targets.",
	analyzerdesceffect: "Is highly resistant to explosions, but takes increased damage from fire and other energy sources.",
	color: [0.55,0.15,0],
	complementary_color: [0,0.4,0.55],
	blobbernaut_message: "blasts",
	message: "The blob blasts you"
});

class CryogenicPoison extends BlobReagent {} // /datum/reagent/blob/cryogenic_poison
module.exports.reagents.CryogenicPoison = CryogenicPoison;
Object.assign(CryogenicPoison.prototype, {
	name: "Cryogenic Poison",
	description: "will inject targets with a freezing poison that does high damage over time.",
	analyzerdescdamage: "Injects targets with a freezing poison that will gradually solidify the target's internal organs.",
	color: [0.55,0.65,0.91],
	complementary_color: [0.49,0.43,0.71],
	blobbernaut_message: "injects",
	message: "The blob stabs you",
	message_living: ", and you feel like your insides are solidifying"
});

class ElectromagneticWeb extends BlobReagent {} // /datum/reagent/blob/electromagnetic_web
module.exports.reagents.ElectromagneticWeb = ElectromagneticWeb;
Object.assign(ElectromagneticWeb.prototype, {
	name: "Electromagnetic Web",
	description: "will do high burn damage and EMP targets.",
	effectdesc: "will also take massively increased damage and release an EMP when killed.",
	analyzerdescdamage: "Does low burn damage and EMPs targets.",
	analyzerdesceffect: "Is fragile to all types of damage, but takes massive damage from brute. In addition, releases a small EMP when killed.",
	color: [0.51,0.93,0.93],
	complementary_color: [0.93,0.51,0.51],
	blobbernaut_message: "lashes",
	message: "The blob lashes you",
	message_living: ", and you hear a faint buzzing"
});

class SynchronousMesh extends BlobReagent {} // /datum/reagent/blob/synchronous_mesh
module.exports.reagents.SynchronousMesh = SynchronousMesh;
Object.assign(SynchronousMesh.prototype, {
	name: "Synchronous Mesh",
	description: "will do massively increased brute damage for each blob near the target.",
	effectdesc: "will also spread damage between each blob near the attacked blob.",
	analyzerdescdamage: "Does brute damage, increasing for each blob near the target.",
	analyzerdesceffect: "When attacked, spreads damage between all blobs near the attacked blob.",
	color: [0.4,0.68,0.64],
	complementary_color: [0.68,0.4,0.44],
	blobbernaut_message: "synchronously strikes",
	message: "The blobs strike you"
});

class ReactiveSpines extends BlobReagent {} // /datum/reagent/blob/reactive_spines
module.exports.reagents.ReactiveSpines = ReactiveSpines;
Object.assign(ReactiveSpines.prototype, {
	name: "Reactive Spines",
	description: "will do medium brute damage through armor and bio resistance.",
	effectdesc: "will also react when attacked with brute damage, attacking all near the attacked blob.",
	analyzerdescdamage: "Does medium brute damage, ignoring armor and bio resistance.",
	analyzerdesceffect: "When attacked with brute damage, will lash out, attacking everything near it.",
	color: [0.6,0.8,0.2],
	complementary_color: [1,0.65,0],
	blobbernaut_message: "stabs",
	message: "The blob stabs you"
});

class PressurizedSlime extends BlobReagent {} // /datum/reagent/blob/pressurized_slime
module.exports.reagents.PressurizedSlime = PressurizedSlime;
Object.assign(PressurizedSlime.prototype, {
	name: "Pressurized Slime",
	description: "will do low brute, oxygen, and stamina damage, and wet tiles under targets.",
	effectdesc: "will also wet tiles near blobs that are attacked or killed.",
	analyzerdescdamage: "Does low brute damage, low oxygen damage, drains stamina, and wets tiles under targets, extinguishing them.",
	analyzerdesceffect: "When attacked or killed, wets nearby tiles, extinguishing anything on them.",
	color: [0.67,0.67,0.73],
	complementary_color: [0.73,0.73,0.67],
	blobbernaut_message: "emits slime at",
	message: "The blob splashes into you",
	message_living: ", and you gasp for breath"
});

