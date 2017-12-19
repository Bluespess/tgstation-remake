'use strict';
const {ReagentReaction} = require('../reagent.js');
module.exports.reagent_reactions = [];

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Goldschlager": 10},
	required_reagents: {"Vodka": 10, "Gold": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Patron": 10},
	required_reagents: {"Tequila": 10, "Silver": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Bilk": 2},
	required_reagents: {"Milk": 1, "Beer": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"IcedTea": 4},
	required_reagents: {"Ice": 1, "Tea": 3}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"IcedCoffee": 4},
	required_reagents: {"Ice": 1, "Coffee": 3}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"NukaCola": 6},
	required_reagents: {"Uranium": 1, "Cola": 6}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Moonshine": 10},
	required_reagents: {"Nutriment": 5, "Sugar": 5},
	required_catalysts: {"UniversalEnzyme": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Wine": 10},
	required_reagents: {"GrapeJuice": 10},
	required_catalysts: {"UniversalEnzyme": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Beer": 10},
	required_reagents: {"Flour": 10},
	required_catalysts: {"UniversalEnzyme": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Vodka": 10},
	required_reagents: {"PotatoJuice": 10},
	required_catalysts: {"UniversalEnzyme": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Kahlua": 5},
	required_reagents: {"Coffee": 5, "Sugar": 5},
	required_catalysts: {"UniversalEnzyme": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"GinAndTonic": 3},
	required_reagents: {"Gin": 2, "TonicWater": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"CubaLibre": 3},
	required_reagents: {"Rum": 2, "Cola": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ClassicMartini": 3},
	required_reagents: {"Gin": 2, "Vermouth": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"VodkaMartini": 3},
	required_reagents: {"Vodka": 2, "Vermouth": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"WhiteRussian": 5},
	required_reagents: {"BlackRussian": 3, "Cream": 2}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"WhiskeyCola": 3},
	required_reagents: {"Whiskey": 2, "Cola": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Screwdriver": 3},
	required_reagents: {"Vodka": 2, "OrangeJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BloodyMary": 4},
	required_reagents: {"Vodka": 1, "TomatoJuice": 2, "LimeJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"PanGalacticGargleBlaster": 5},
	required_reagents: {"Vodka": 1, "Gin": 1, "Whiskey": 1, "Cognac": 1, "LimeJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BraveBull": 3},
	required_reagents: {"Tequila": 2, "Kahlua": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"TequilaSunrise": 3},
	required_reagents: {"Tequila": 2, "OrangeJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ToxinsSpecial": 5},
	required_reagents: {"Rum": 2, "Vermouth": 1, "Plasma": 2}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BeepskySmash": 4},
	required_reagents: {"LimeJuice": 2, "Whiskey": 2, "Iron": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"TheDoctorsDelight": 5},
	required_reagents: {"LimeJuice": 1, "TomatoJuice": 1, "OrangeJuice": 1, "Cream": 1, "Cryoxadone": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"IrishCream": 3},
	required_reagents: {"Whiskey": 2, "Cream": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"TheManlyDorf": 3},
	required_reagents: {"Beer": 1, "Ale": 2}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"GreenBeer": 10},
	required_reagents: {"GreenCrayonPowder": 1, "Beer": 10}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Hooch": 3},
	required_reagents: {"Ethanol": 2, "WeldingFuel": 1},
	required_catalysts: {"UniversalEnzyme": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"IrishCoffee": 2},
	required_reagents: {"IrishCream": 1, "Coffee": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"B52": 3},
	required_reagents: {"IrishCream": 1, "Kahlua": 1, "Cognac": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"AtomicBomb": 10},
	required_reagents: {"B52": 10, "Uranium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Margarita": 3},
	required_reagents: {"Tequila": 2, "LimeJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"LongIslandIcedTea": 4},
	required_reagents: {"Vodka": 1, "Gin": 1, "Tequila": 1, "CubaLibre": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ThreeMileIslandIcedTea": 10},
	required_reagents: {"LongIslandIcedTea": 10, "Uranium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"WhiskeySoda": 3},
	required_reagents: {"Whiskey": 2, "SodaWater": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BlackRussian": 5},
	required_reagents: {"Vodka": 3, "Kahlua": 2}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Manhattan": 3},
	required_reagents: {"Whiskey": 2, "Vermouth": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ManhattanProject": 10},
	required_reagents: {"Manhattan": 10, "Uranium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"VodkaAndTonic": 3},
	required_reagents: {"Vodka": 2, "TonicWater": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"GinFizz": 4},
	required_reagents: {"Gin": 2, "SodaWater": 1, "LimeJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BahamaMama": 6},
	required_reagents: {"Rum": 2, "OrangeJuice": 2, "LimeJuice": 1, "Ice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Singulo": 10},
	required_reagents: {"Vodka": 5, "Radium": 1, "Wine": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"AlliesCocktail": 2},
	required_reagents: {"ClassicMartini": 1, "Vodka": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"DemonsBlood": 4},
	required_reagents: {"Rum": 1, "SMWind": 1, "Blood": 1, "DrGibb": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Booger": 4},
	required_reagents: {"Cream": 1, "BananaJuice": 1, "Rum": 1, "WatermelonJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"AntiFreeze": 4},
	required_reagents: {"Vodka": 2, "Cream": 1, "Ice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Barefoot": 3},
	required_reagents: {"BerryJuice": 1, "Cream": 1, "Vermouth": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Sbiten": 10},
	required_reagents: {"Vodka": 10, "CapsaicinOil": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"RedMead": 2},
	required_reagents: {"Blood": 1, "Mead": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Mead": 2},
	required_reagents: {"Honey": 2},
	required_catalysts: {"UniversalEnzyme": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"IcedBeer": 6},
	required_reagents: {"Beer": 5, "Ice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Grog": 2},
	required_reagents: {"Rum": 1, "Water": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SoyLatte": 2},
	required_reagents: {"Coffee": 1, "SoyMilk": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"CafeLatte": 2},
	required_reagents: {"Coffee": 1, "Milk": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"AcidSpit": 6},
	required_reagents: {"SAcid": 1, "Wine": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Amasec": 10},
	required_reagents: {"Iron": 1, "Wine": 5, "Vodka": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ChangelingSting": 5},
	required_reagents: {"Screwdriver": 1, "LemonLime": 2}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Aloe": 2},
	required_reagents: {"IrishCream": 1, "WatermelonJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Andalusia": 3},
	required_reagents: {"Rum": 1, "Whiskey": 1, "LemonJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Neurotoxin": 2},
	required_reagents: {"PanGalacticGargleBlaster": 1, "Morphine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SnowWhite": 2},
	required_reagents: {"Beer": 1, "LemonLime": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"IrishCarBomb": 2},
	required_reagents: {"Ale": 1, "IrishCream": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SyndicateBomb": 2},
	required_reagents: {"Beer": 1, "WhiskeyCola": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ErikaSurprise": 5},
	required_reagents: {"Ale": 1, "LimeJuice": 1, "Whiskey": 1, "BananaJuice": 1, "Ice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"DevilsKiss": 3},
	required_reagents: {"Blood": 1, "Kahlua": 1, "Rum": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"HippiesDelight": 2},
	required_reagents: {"MushroomHallucinogen": 1, "PanGalacticGargleBlaster": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BananaHonk": 2},
	required_reagents: {"Laughter": 1, "Cream": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Silencer": 3},
	required_reagents: {"Nothing": 1, "Cream": 1, "Sugar": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"DriestMartini": 2},
	required_reagents: {"Nothing": 1, "Gin": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ThirteenLoko": 3},
	required_reagents: {"Vodka": 1, "Coffee": 1, "LimeJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ChocolatePudding": 20},
	required_reagents: {"CocoPowder": 5, "Milk": 5, "EggYolk": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"VanillaPudding": 20},
	required_reagents: {"VanillaPowder": 5, "Milk": 5, "EggYolk": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"CherryShake": 3},
	required_reagents: {"CherryJelly": 1, "Ice": 1, "Cream": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BlueCherryShake": 3},
	required_reagents: {"BlueCherryJelly": 1, "Ice": 1, "Cream": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"DrunkenBlumpkin": 4},
	required_reagents: {"BlumpkinJuice": 1, "IrishCream": 2, "Ice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"PumpkinLatte": 15},
	required_reagents: {"PumpkinJuice": 5, "Coffee": 5, "Cream": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"GibbFloats": 15},
	required_reagents: {"DrGibb": 5, "Ice": 5, "Cream": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"TripleCitrus": 5},
	required_reagents: {"LemonJuice": 1, "LimeJuice": 1, "OrangeJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"GrapeSoda": 2},
	required_reagents: {"GrapeJuice": 1, "SodaWater": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Grappa": 10},
	required_reagents: {"Wine": 10},
	required_catalysts: {"UniversalEnzyme": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"WhiskeySour": 3},
	required_reagents: {"Whiskey": 1, "LemonJuice": 1, "Sugar": 1},
	mix_message: "The mixture darkens to a rich gold hue.",
	mix_sound: null
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"FetchingFizz": 3},
	required_reagents: {"NukaCola": 1, "Iron": 1},
	mix_message: "The mixture slightly vibrates before settling."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"HeartyPunch": 1},
	required_reagents: {"BraveBull": 5, "SyndicateBomb": 5, "Absinthe": 5},
	mix_message: "The mixture darkens to a healthy crimson.",
	mix_sound: null,
	min_temp: 315
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BacchusBlessing": 4},
	required_reagents: {"Hooch": 1, "Absinthe": 1, "TheManlyDorf": 1, "SyndicateBomb": 1},
	mix_message: "<span class='warning'>The mixture turns to a sickening froth.</span>"
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ArnoldPalmer": 2},
	required_reagents: {"Tea": 1, "LemonJuice": 1},
	mix_message: "The smells of fresh green grass and sand traps waft through the air as the mixture turns a friendly yellow-orange."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ChocolateMilk": 2},
	required_reagents: {"Milk": 1, "CocoPowder": 1},
	mix_message: "The color changes as the mixture blends smoothly."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Eggnog": 15},
	required_reagents: {"Rum": 5, "Cream": 5, "EggYolk": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"SoyMilk": 10},
	required_catalysts: {"UniversalEnzyme": 5},
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"SoyMilk": 2, "CocoPowder": 2, "Sugar": 2}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"ChocolateMilk": 4, "Sugar": 2},
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"HotChocolate": 5},
	required_reagents: {"Water": 5, "CocoPowder": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Coffee": 5},
	required_reagents: {"CoffeeGrounds": 1, "Water": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Tea": 5},
	required_reagents: {"GroundTeaLeaves": 1, "Water": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Soysauce": 5},
	required_reagents: {"SoyMilk": 4, "SAcid": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"CornSyrup": 5},
	required_reagents: {"CornStarch": 1, "SAcid": 1},
	min_temp: 374
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Milk": 40},
	required_catalysts: {"UniversalEnzyme": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Blood": 5, "Cryoxadone": 1},
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"HotRamen": 3},
	required_reagents: {"Water": 1, "DryRamen": 3}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"HellRamen": 6},
	required_reagents: {"CapsaicinOil": 1, "HotRamen": 6}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Carpotoxin": 5},
	mix_message: "The mixture becomes similar to carp meat."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Water": 10, "Flour": 15},
	mix_message: "The ingredients form a dough."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"EggYolk": 15, "Flour": 15, "Sugar": 5},
	mix_message: "The ingredients form a cake batter."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"SoyMilk": 15, "Flour": 15, "Sugar": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Rice": 10, "Water": 10},
	mix_message: "The rice absorbs the water."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Sterilizine": 3},
	required_reagents: {"Ethanol": 1, "Charcoal": 1, "Chlorine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SpaceLube": 4},
	required_reagents: {"Water": 1, "Silicon": 1, "Oxygen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SprayTan": 2},
	required_reagents: {"OrangeJuice": 1, "Oil": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SprayTan": 2},
	required_reagents: {"OrangeJuice": 1, "CornOil": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Impedrezene": 2},
	required_reagents: {"Mercury": 1, "Oxygen": 1, "Sugar": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Cryptobiolin": 3},
	required_reagents: {"Potassium": 1, "Oxygen": 1, "Sugar": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Glycerol": 1},
	required_reagents: {"CornOil": 3, "SAcid": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"TableSalt": 3},
	required_reagents: {"Water": 1, "Sodium": 1, "Chlorine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Iron": 5, "FrostOil": 5, "Plasma": 20},
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"FrostOil": 5, "Gold": 20, "Iron": 1},
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"CondensedCapsaicin": 5},
	required_reagents: {"CapsaicinOil": 1, "Ethanol": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"LiquidGibs": 10, "Lye": 10},
	min_temp: 374,
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"LiquidGibs": 5, "Oxygen": 5},
	min_temp: 374,
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"LiquidGibs": 10, "Nutriment": 10, "Carbon": 10},
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"CarbonDioxide": 3},
	required_reagents: {"Carbon": 1, "Oxygen": 2},
	min_temp: 777
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"NitrousOxide": 5},
	required_reagents: {"Ammonia": 2, "Nitrogen": 1, "Oxygen": 2},
	min_temp: 525
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"StableMutationToxin": 1},
	required_reagents: {"UnstableMutationToxin": 1, "Blood": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"LizardMutationToxin": 1},
	required_reagents: {"UnstableMutationToxin": 1, "Radium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"FlyMutationToxin": 1},
	required_reagents: {"UnstableMutationToxin": 1, "UnstableMutagen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ImperfectMutationToxin": 1},
	required_reagents: {"UnstableMutationToxin": 1, "SlimeJelly": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"AbductorMutationToxin": 1},
	required_reagents: {"UnstableMutationToxin": 1, "Morphine": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"AndroidMutationToxin": 1},
	required_reagents: {"UnstableMutationToxin": 1, "Teslium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"PodpersonMutationToxin": 1},
	required_reagents: {"UnstableMutationToxin": 1, "EZNutrient": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"GolemMutationToxin": 1},
	required_reagents: {"UnstableMutationToxin": 1, "Silver": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SkeletonMutationToxin": 1},
	required_reagents: {"AdvancedMutationToxin": 1, "Milk": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ZombieMutationToxin": 1},
	required_reagents: {"AdvancedMutationToxin": 1, "PeaceborgToxin": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"AshMutationToxin": 1},
	required_reagents: {"AdvancedMutationToxin": 1, "LizardMutationToxin": 1, "Ash": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"PlasmaMutationToxin": 1},
	required_reagents: {"SkeletonMutationToxin": 1, "Plasma": 1, "Uranium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ShadowMutationToxin": 1},
	required_reagents: {"AdvancedMutationToxin": 1, "LiquidDarkMatter": 1, "HolyWater": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"MulliganToxin": 1},
	required_reagents: {"StableMutationToxin": 1, "UnstableMutagen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"VirusFood": 15},
	required_reagents: {"Water": 5, "Milk": 5}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"MutagenicAgar": 1},
	required_reagents: {"UnstableMutagen": 1, "VirusFood": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"VirusRations": 1},
	required_reagents: {"Synaptizine": 1, "VirusFood": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"VirusPlasma": 1},
	required_reagents: {"Plasma": 1, "VirusFood": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"WeakenedVirusPlasma": 2},
	required_reagents: {"Synaptizine": 1, "VirusPlasma": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SucroseAgar": 2},
	required_reagents: {"Sugar": 1, "MutagenicAgar": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SucroseAgar": 2},
	required_reagents: {"SalineGlucoseSolution": 1, "MutagenicAgar": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"DecayingUraniumGel": 1},
	required_reagents: {"Uranium": 1, "VirusFood": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"UnstableUraniumGel": 1},
	required_reagents: {"Uranium": 5, "VirusPlasma": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"StableUraniumGel": 1},
	required_reagents: {"Uranium": 10, "Gold": 10, "Plasma": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"StableUraniumGel": 1},
	required_reagents: {"Uranium": 10, "Silver": 10, "Plasma": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Blood": 1},
	required_reagents: {"VirusFood": 1},
	required_catalysts: {"Blood": 1},
	level_min: 1,
	level_max: 2
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"UnstableMutagen": 1},
	level_min: 2,
	level_max: 4
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Plasma": 1},
	level_min: 4,
	level_max: 6
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Uranium": 1},
	level_min: 5,
	level_max: 6
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"MutagenicAgar": 1},
	level_min: 3,
	level_max: 3
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"SucroseAgar": 1},
	level_min: 4,
	level_max: 4
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"WeakenedVirusPlasma": 1},
	level_min: 5,
	level_max: 5
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"VirusPlasma": 1},
	level_min: 6,
	level_max: 6
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"VirusRations": 1},
	level_min: 1,
	level_max: 1
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"DecayingUraniumGel": 1},
	level_min: 6,
	level_max: 7
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"UnstableUraniumGel": 1},
	level_min: 7,
	level_max: 7
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"StableUraniumGel": 1},
	level_min: 8,
	level_max: 8
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Synaptizine": 1},
	required_catalysts: {"Blood": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Formaldehyde": 1},
	required_catalysts: {"Blood": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Fluorosurfactant": 5},
	required_reagents: {"Fluorine": 2, "Carbon": 2, "SAcid": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Fluorosurfactant": 1, "Water": 1},
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Aluminium": 3, "FoamingAgent": 1, "FAcid": 1},
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Aluminium": 3, "SmartFoamingAgent": 1, "FAcid": 1},
	mob_react: true
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Iron": 3, "FoamingAgent": 1, "FAcid": 1},
	mob_react: false
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"FoamingAgent": 1},
	required_reagents: {"Lithium": 1, "Hydrogen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SmartFoamingAgent": 3},
	required_reagents: {"FoamingAgent": 3, "Acetone": 1, "Iron": 1},
	mix_message: "The solution mixes into a frothy metal foam and conforms to the walls of its container."
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Ammonia": 3},
	required_reagents: {"Hydrogen": 3, "Nitrogen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Diethylamine": 2},
	required_reagents: {"Ammonia": 1, "Ethanol": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"SpaceCleaner": 2},
	required_reagents: {"Ammonia": 1, "Water": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"PlantBGone": 5},
	required_reagents: {"PeaceborgToxin": 1, "Water": 4}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"WeedKiller": 5},
	required_reagents: {"PeaceborgToxin": 1, "Ammonia": 4}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"PestKiller": 5},
	required_reagents: {"PeaceborgToxin": 1, "Ethanol": 4}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"DryingAgent": 3},
	required_reagents: {"StablePlasma": 2, "Ethanol": 1, "Sodium": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Acetone": 3},
	required_reagents: {"Oil": 1, "WeldingFuel": 1, "Oxygen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Carpet": 2},
	required_reagents: {"SpaceDrugs": 1, "Blood": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Oil": 3},
	required_reagents: {"WeldingFuel": 1, "Carbon": 1, "Hydrogen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Phenol": 3},
	required_reagents: {"Water": 1, "Chlorine": 1, "Oil": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Ash": 1},
	required_reagents: {"Oil": 1},
	min_temp: 480
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ColorfulReagent": 5},
	required_reagents: {"StablePlasma": 1, "Radium": 1, "SpaceDrugs": 1, "Cryoxadone": 1, "TripleCitrus": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"StrangeReagent": 1, "Synthflesh": 1, "Blood": 1},
	min_temp: 374
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Nutriment": 1, "ColorfulReagent": 1, "StrangeReagent": 1, "Blood": 1},
	min_temp: 374
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"QuantumHairDye": 5},
	required_reagents: {"ColorfulReagent": 1, "Radium": 1, "SpaceDrugs": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"BarbersAid": 5},
	required_reagents: {"Carpet": 1, "Radium": 1, "SpaceDrugs": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"ConcentratedBarbersAid": 2},
	required_reagents: {"BarbersAid": 1, "UnstableMutagen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Saltpetre": 3},
	required_reagents: {"Potassium": 1, "Nitrogen": 1, "Oxygen": 3}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Lye": 3},
	required_reagents: {"Sodium": 1, "Hydrogen": 1, "Oxygen": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Lye": 2},
	required_reagents: {"Ash": 1, "Water": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"RoyalBeeJelly": 5},
	required_reagents: {"UnstableMutagen": 10, "Honey": 40}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	results: {"Laughter": 10},
	required_reagents: {"Sugar": 1, "BananaJuice": 1}
}));

module.exports.reagent_reactions.push(new ReagentReaction({
	required_reagents: {"Oil": 5, "TableSalt": 2, "Ash": 3},
	min_temp: 374
}));

