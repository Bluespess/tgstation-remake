'use strict';
const {ReagentReaction} = require('../reagent.js');
module.exports.reagent_reactions = [];

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Leporazine": 2},
	required_reagents: {"Silicon": 1, "Copper": 1},
	required_catalysts: {"Plasma": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Rezadone": 3},
	required_reagents: {"Carpotoxin": 1, "Cryptobiolin": 1, "Copper": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Spaceacillin": 2},
	required_reagents: {"Cryptobiolin": 1, "Epinephrine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Inacusiate": 2},
	required_reagents: {"Water": 1, "Carbon": 1, "Charcoal": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Synaptizine": 3},
	required_reagents: {"Sugar": 1, "Lithium": 1, "Water": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Charcoal": 2},
	required_reagents: {"Ash": 1, "TableSalt": 1},
	mix_message: "The mixture yields a fine black powder.",
	min_temp: 380
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SilverSulfadiazine": 5},
	required_reagents: {"Ammonia": 1, "Silver": 1, "Sulfur": 1, "Oxygen": 1, "Chlorine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SalineGlucoseSolution": 3},
	required_reagents: {"TableSalt": 1, "Water": 1, "Sugar": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"MinersSalve": 3},
	required_reagents: {"Oil": 1, "Water": 1, "Iron": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"MinersSalve": 15},
	required_reagents: {"Plasma": 5, "Iron": 5, "Sugar": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Synthflesh": 3},
	required_reagents: {"Blood": 1, "Carbon": 1, "StypticPowder": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"StypticPowder": 4},
	required_reagents: {"Aluminium": 1, "Hydrogen": 1, "Oxygen": 1, "SAcid": 1},
	mix_message: "The solution yields an astringent powder."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Calomel": 2},
	required_reagents: {"Mercury": 1, "Chlorine": 1},
	min_temp: 374
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"PotassiumIodide": 2},
	required_reagents: {"Potassium": 1, "Iodine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"PenteticAcid": 6},
	required_reagents: {"WeldingFuel": 1, "Chlorine": 1, "Ammonia": 1, "Formaldehyde": 1, "Sodium": 1, "Cyanide": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SalicyclicAcid": 5},
	required_reagents: {"Sodium": 1, "Phenol": 1, "Carbon": 1, "Oxygen": 1, "SAcid": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Oxandrolone": 6},
	required_reagents: {"Carbon": 3, "Phenol": 1, "Hydrogen": 1, "Oxygen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Salbutamol": 5},
	required_reagents: {"SalicyclicAcid": 1, "Lithium": 1, "Aluminium": 1, "Bromine": 1, "Ammonia": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Perfluorodecalin": 3},
	required_reagents: {"Hydrogen": 1, "Fluorine": 1, "Oil": 1},
	min_temp: 370,
	mix_message: "The mixture rapidly turns into a dense pink liquid."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Ephedrine": 4},
	required_reagents: {"Sugar": 1, "Oil": 1, "Hydrogen": 1, "Diethylamine": 1},
	mix_message: "The solution fizzes and gives off toxic fumes."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Diphenhydramine": 4},
	required_reagents: {"Oil": 1, "Carbon": 1, "Bromine": 1, "Diethylamine": 1, "Ethanol": 1},
	mix_message: "The mixture dries into a pale blue powder."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Oculine": 3},
	required_reagents: {"Charcoal": 1, "Carbon": 1, "Hydrogen": 1},
	mix_message: "The mixture sputters loudly and becomes a pale pink color."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Atropine": 5},
	required_reagents: {"Ethanol": 1, "Acetone": 1, "Diethylamine": 1, "Phenol": 1, "SAcid": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Epinephrine": 6},
	required_reagents: {"Phenol": 1, "Acetone": 1, "Diethylamine": 1, "Oxygen": 1, "Chlorine": 1, "Hydrogen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"StrangeReagent": 3},
	required_reagents: {"Omnizine": 1, "HolyWater": 1, "UnstableMutagen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Mannitol": 3},
	required_reagents: {"Sugar": 1, "Hydrogen": 1, "Water": 1},
	mix_message: "The solution slightly bubbles, becoming thicker."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Mutadone": 3},
	required_reagents: {"UnstableMutagen": 1, "Acetone": 1, "Bromine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Antihol": 3},
	required_reagents: {"Ethanol": 1, "Charcoal": 1, "Copper": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Cryoxadone": 3},
	required_reagents: {"StablePlasma": 1, "Acetone": 1, "UnstableMutagen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Clonexadone": 2},
	required_reagents: {"Cryoxadone": 1, "Sodium": 1},
	required_catalysts: {"Plasma": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Haloperidol": 5},
	required_reagents: {"Chlorine": 1, "Fluorine": 1, "Aluminium": 1, "PotassiumIodide": 1, "Oil": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Bicaridine": 3},
	required_reagents: {"Carbon": 1, "Oxygen": 1, "Sugar": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Kelotane": 2},
	required_reagents: {"Carbon": 1, "Silicon": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"AntiToxin": 3},
	required_reagents: {"Nitrogen": 1, "Silicon": 1, "Potassium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Tricordrazine": 3},
	required_reagents: {"Bicaridine": 1, "Kelotane": 1, "AntiToxin": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Corazone": 3},
	required_reagents: {"Phenol": 2, "Lithium": 1}
}));

