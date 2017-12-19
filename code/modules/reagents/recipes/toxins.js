'use strict';
const {ReagentReaction} = require('../reagent.js');
module.exports.reagent_reactions = [];

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Formaldehyde": 3},
	required_reagents: {"Ethanol": 1, "Oxygen": 1, "Silver": 1},
	min_temp: 420
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Neurotoxin": 1},
	required_reagents: {"SpaceDrugs": 1},
	min_temp: 674
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Cyanide": 3},
	required_reagents: {"Oil": 1, "Ammonia": 1, "Oxygen": 1},
	min_temp: 380
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ItchingPowder": 3},
	required_reagents: {"WeldingFuel": 1, "Ammonia": 1, "Charcoal": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"FAcid": 4},
	required_reagents: {"SAcid": 1, "Fluorine": 1, "Hydrogen": 1, "Potassium": 1},
	min_temp: 380
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Sulfonal": 3},
	required_reagents: {"Acetone": 1, "Diethylamine": 1, "Sulfur": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Lipolicide": 3},
	required_reagents: {"Mercury": 1, "Diethylamine": 1, "Ephedrine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"UnstableMutagen": 3},
	required_reagents: {"Radium": 1, "Phosphorus": 1, "Chlorine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Lexorin": 3},
	required_reagents: {"Plasma": 1, "Hydrogen": 1, "Nitrogen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ChloralHydrate": 1},
	required_reagents: {"Ethanol": 1, "Chlorine": 3, "Water": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"MuteToxin": 2},
	required_reagents: {"Uranium": 2, "Water": 1, "Carbon": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ZombiePowder": 2},
	required_reagents: {"Carpotoxin": 5, "Morphine": 5, "Copper": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"MindbreakerToxin": 5},
	required_reagents: {"Silicon": 1, "Hydrogen": 1, "Charcoal": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Heparin": 4},
	required_reagents: {"Formaldehyde": 1, "Sodium": 1, "Chlorine": 1, "Lithium": 1},
	mix_message: "<span class='danger'>The mixture thins and loses all color.</span>"
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Rotatium": 3},
	required_reagents: {"MindbreakerToxin": 1, "Teslium": 1, "Neurotoxin": 1},
	mix_message: "<span class='danger'>After sparks, fire, and the smell of mindbreaker, the mix is constantly spinning with no stop in sight.</span>"
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Skewium": 5},
	required_reagents: {"Rotatium": 2, "Plasma": 2, "SAcid": 1},
	mix_message: "<span class='danger'>Wow! it turns out if you mix rotatium with some plasma and sulphuric acid, it gets even worse!</span>"
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Anacea": 3},
	required_reagents: {"Haloperidol": 1, "Impedrezene": 1, "Radium": 1}
}));

