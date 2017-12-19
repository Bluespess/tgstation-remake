'use strict';
const {ReagentReaction} = require('../reagent.js');
module.exports.reagent_reactions = [];

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SpaceDrugs": 3},
	required_reagents: {"Mercury": 1, "Sugar": 1, "Lithium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Crank": 5},
	required_reagents: {"Diphenhydramine": 1, "Ammonia": 1, "Lithium": 1, "SAcid": 1, "WeldingFuel": 1},
	mix_message: "The mixture violently reacts, leaving behind a few crystalline shards.",
	min_temp: 390
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Krokodil": 6},
	required_reagents: {"Diphenhydramine": 1, "Morphine": 1, "SpaceCleaner": 1, "Potassium": 1, "Phosphorus": 1, "WeldingFuel": 1},
	mix_message: "The mixture dries into a pale blue powder.",
	min_temp: 380
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Methamphetamine": 4},
	required_reagents: {"Ephedrine": 1, "Iodine": 1, "Phosphorus": 1, "Hydrogen": 1},
	min_temp: 374
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BathSalts": 7},
	required_reagents: {"BadFood": 1, "Saltpetre": 1, "Nutriment": 1, "SpaceCleaner": 1, "UniversalEnzyme": 1, "Tea": 1, "Mercury": 1},
	min_temp: 374
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Aranesp": 3},
	required_reagents: {"Epinephrine": 1, "Atropine": 1, "Morphine": 1}
}));

