'use strict';

const {Reagent} = require('../reagent.js');
module.exports.reagents = {};

class Thermite extends Reagent {} // /datum/reagent/thermite
module.exports.reagents.Thermite = Thermite;
Object.assign(Thermite.prototype, {
	name: "Thermite",
	description: "Thermite produces an aluminothermic reaction known as a thermite reaction. Can be used to melt walls.",
	reagent_state: "solid",
	color: [0.33,0,0],
	taste_description: "sweet tasting metal"
});

class Nitroglycerin extends Reagent {} // /datum/reagent/nitroglycerin
module.exports.reagents.Nitroglycerin = Nitroglycerin;
Object.assign(Nitroglycerin.prototype, {
	name: "Nitroglycerin",
	description: "Nitroglycerin is a heavy, colorless, oily, explosive liquid obtained by nitrating glycerol.",
	color: [0.5,0.5,0.5],
	taste_description: "oil"
});

class StabilizingAgent extends Reagent {} // /datum/reagent/stabilizing_agent
module.exports.reagents.StabilizingAgent = StabilizingAgent;
Object.assign(StabilizingAgent.prototype, {
	name: "Stabilizing Agent",
	description: "Keeps unstable chemicals stable. This does not work on everything.",
	reagent_state: "liquid",
	color: [1,1,0],
	taste_description: "metal"
});

class ChlorineTrifluoride extends Reagent {} // /datum/reagent/clf3
module.exports.reagents.ChlorineTrifluoride = ChlorineTrifluoride;
Object.assign(ChlorineTrifluoride.prototype, {
	name: "Chlorine Trifluoride",
	description: "Makes a temporary 3x3 fireball when it comes into existence, so be careful when mixing. ClF3 applied to a surface burns things that wouldn't otherwise burn, sometimes through the very floors of the station and exposing it to the vacuum of space.",
	reagent_state: "liquid",
	color: [1,0.78,0.78],
	metabolization_rate: 4,
	taste_description: "burning"
});

class Sorium extends Reagent {} // /datum/reagent/sorium
module.exports.reagents.Sorium = Sorium;
Object.assign(Sorium.prototype, {
	name: "Sorium",
	description: "Sends everything flying from the detonation point.",
	reagent_state: "liquid",
	color: [0.35,0.39,0.78],
	taste_description: "air and bitterness"
});

class LiquidDarkMatter extends Reagent {} // /datum/reagent/liquid_dark_matter
module.exports.reagents.LiquidDarkMatter = LiquidDarkMatter;
Object.assign(LiquidDarkMatter.prototype, {
	name: "Liquid Dark Matter",
	description: "Sucks everything into the detonation point.",
	reagent_state: "liquid",
	color: [0.13,0,0.13],
	taste_description: "compressed bitterness"
});

class BlackPowder extends Reagent {} // /datum/reagent/blackpowder
module.exports.reagents.BlackPowder = BlackPowder;
Object.assign(BlackPowder.prototype, {
	name: "Black Powder",
	description: "Explodes. Violently.",
	reagent_state: "liquid",
	color: [0,0,0],
	metabolization_rate: 0.05,
	taste_description: "salt"
});

class FlashPowder extends Reagent {} // /datum/reagent/flash_powder
module.exports.reagents.FlashPowder = FlashPowder;
Object.assign(FlashPowder.prototype, {
	name: "Flash Powder",
	description: "Makes a very bright flash.",
	reagent_state: "liquid",
	color: [0.78,0.78,0.78],
	taste_description: "salt"
});

class SmokePowder extends Reagent {} // /datum/reagent/smoke_powder
module.exports.reagents.SmokePowder = SmokePowder;
Object.assign(SmokePowder.prototype, {
	name: "Smoke Powder",
	description: "Makes a large cloud of smoke that can carry reagents.",
	reagent_state: "liquid",
	color: [0.78,0.78,0.78],
	taste_description: "smoke"
});

class SonicPowder extends Reagent {} // /datum/reagent/sonic_powder
module.exports.reagents.SonicPowder = SonicPowder;
Object.assign(SonicPowder.prototype, {
	name: "Sonic Powder",
	description: "Makes a deafening noise.",
	reagent_state: "liquid",
	color: [0.78,0.78,0.78],
	taste_description: "loud noises"
});

class Phlogiston extends Reagent {} // /datum/reagent/phlogiston
module.exports.reagents.Phlogiston = Phlogiston;
Object.assign(Phlogiston.prototype, {
	name: "Phlogiston",
	description: "Catches you on fire and makes you ignite.",
	reagent_state: "liquid",
	color: [0.98,0,0.69],
	taste_description: "burning"
});

class Napalm extends Reagent {} // /datum/reagent/napalm
module.exports.reagents.Napalm = Napalm;
Object.assign(Napalm.prototype, {
	name: "Napalm",
	description: "Very flammable.",
	reagent_state: "liquid",
	color: [0.98,0,0.69],
	taste_description: "burning"
});

class Cryostylane extends Reagent {} // /datum/reagent/cryostylane
module.exports.reagents.Cryostylane = Cryostylane;
Object.assign(Cryostylane.prototype, {
	name: "Cryostylane",
	description: "Comes into existence at 20K. As long as there is sufficient oxygen for it to react with, Cryostylane slowly cools all other reagents in the container 0K.",
	color: [0,0,0.86],
	metabolization_rate: 0.25,
	taste_description: "bitterness"
});

class Pyrosium extends Reagent {} // /datum/reagent/pyrosium
module.exports.reagents.Pyrosium = Pyrosium;
Object.assign(Pyrosium.prototype, {
	name: "Pyrosium",
	description: "Comes into existence at 20K. As long as there is sufficient oxygen for it to react with, Pyrosium slowly heats all other reagents in the container.",
	color: [0.39,0.98,0.78],
	metabolization_rate: 0.25,
	taste_description: "bitterness"
});

class Teslium extends Reagent {} // /datum/reagent/teslium
module.exports.reagents.Teslium = Teslium;
Object.assign(Teslium.prototype, {
	name: "Teslium",
	description: "An unstable, electrically-charged metallic slurry. Periodically electrocutes its victim, and makes electrocutions against them more deadly. Excessively heating teslium results in dangerous destabilization. Do not allow to come into contact with water.",
	reagent_state: "liquid",
	color: [0.13,0.2,0.3],
	metabolization_rate: 0.25,
	taste_description: "charged metal",
	shock_timer: 0
});

