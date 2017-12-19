'use strict';
const {ReagentReaction} = require('../reagent.js');
module.exports.reagent_reactions = [];

module.exports.reagent_reactions.push(new ReagentReaction({
	strengthdiv: 10,
	modifier: 0
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Nitroglycerin": 2},
	required_reagents: {"Glycerol": 1, "FAcid": 1, "SAcid": 1},
	strengthdiv: 2
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Nitroglycerin": 1},
	min_temp: 474,
	strengthdiv: 2
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Water": 1, "Potassium": 1},
	strengthdiv: 10
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"HolyWater": 1, "Potassium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BlackPowder": 3},
	required_reagents: {"Saltpetre": 1, "Charcoal": 1, "Sulfur": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"BlackPowder": 1},
	min_temp: 474,
	strengthdiv: 6,
	modifier: 1,
	mix_message: "<span class='boldannounce'>Sparks start flying around the black powder!</span>"
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Thermite": 3},
	required_reagents: {"Aluminium": 1, "Iron": 1, "Oxygen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Uranium": 1, "Iron": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"StabilizingAgent": 3},
	required_reagents: {"Iron": 1, "Oxygen": 1, "Hydrogen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ChlorineTrifluoride": 4},
	required_reagents: {"Chlorine": 1, "Fluorine": 3},
	min_temp: 424
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"?": 1},
	min_temp: 380,
	required_reagents: {"Methamphetamine": 1},
	strengthdiv: 6,
	modifier: 1,
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Diethylamine": 1, "Iodine": 1, "Phosphorus": 1, "Hydrogen": 1},
	min_temp: 300,
	results: {"?": 4}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Sorium": 4},
	required_reagents: {"Mercury": 1, "Oxygen": 1, "Nitrogen": 1, "Carbon": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Sorium": 1},
	min_temp: 474
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"LiquidDarkMatter": 3},
	required_reagents: {"StablePlasma": 1, "Radium": 1, "Carbon": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"LiquidDarkMatter": 1},
	min_temp: 474
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"FlashPowder": 3},
	required_reagents: {"Aluminium": 1, "Potassium": 1, "Sulfur": 1 }
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"FlashPowder": 1},
	min_temp: 374
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SmokePowder": 3},
	required_reagents: {"Potassium": 1, "Sugar": 1, "Phosphorus": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"SmokePowder": 1},
	min_temp: 374,
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SonicPowder": 3},
	required_reagents: {"Oxygen": 1, "Cola": 1, "Phosphorus": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"SonicPowder": 1},
	min_temp: 374
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Phlogiston": 3},
	required_reagents: {"Phosphorus": 1, "SAcid": 1, "StablePlasma": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Napalm": 3},
	required_reagents: {"Oil": 1, "WeldingFuel": 1, "Ethanol": 1 }
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Cryostylane": 3},
	required_reagents: {"Water": 1, "StablePlasma": 1, "Nitrogen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Cryostylane": 1},
	required_reagents: {"Cryostylane": 1, "Oxygen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Pyrosium": 1},
	required_reagents: {"Pyrosium": 1, "Oxygen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Pyrosium": 3},
	required_reagents: {"StablePlasma": 1, "Radium": 1, "Phosphorus": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Teslium": 3},
	required_reagents: {"StablePlasma": 1, "Silver": 1, "BlackPowder": 1},
	mix_message: "<span class='danger'>A jet of sparks flies from the mixture as it merges into a flickering slurry.</span>",
	min_temp: 400
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Teslium": 1, "Water": 1},
	results: {"?": 1},
	strengthdiv: 100,
	modifier: -100,
	mix_message: "<span class='boldannounce'>The teslium starts to spark as electricity arcs away from it!</span>",
	mix_sound: 'sound/machines/defib_zap.ogg'
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	min_temp: 474,
	required_reagents: {"Teslium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"NitrousOxide": 1},
	strengthdiv: 7,
	min_temp: 575,
	modifier: 1
}));

