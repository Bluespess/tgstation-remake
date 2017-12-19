'use strict';

const {Reagent} = require('../reagent.js');
const {Consumable} = require('./other.js');
module.exports.reagents = {};

class Nutriment extends Consumable {} // /datum/reagent/consumable/nutriment
module.exports.reagents.Nutriment = Nutriment;
Object.assign(Nutriment.prototype, {
	name: "Nutriment",
	description: "All the vitamins, minerals, and carbohydrates the body needs in pure form.",
	reagent_state: "solid",
	nutriment_factor: 7.5,
	color: [0.4,0.26,0.19],
	brute_heal: 1,
	burn_heal: 0
});

class Vitamin extends Nutriment {} // /datum/reagent/consumable/nutriment/vitamin
module.exports.reagents.Vitamin = Vitamin;
Object.assign(Vitamin.prototype, {
	name: "Vitamin",
	description: "All the best vitamins, minerals, and carbohydrates the body needs in pure form.",
	brute_heal: 1,
	burn_heal: 1
});

class Sugar extends Consumable {} // /datum/reagent/consumable/sugar
module.exports.reagents.Sugar = Sugar;
Object.assign(Sugar.prototype, {
	name: "Sugar",
	description: "The organic compound commonly known as table sugar and sometimes called saccharose. This white, odorless, crystalline powder has a pleasing, sweet taste.",
	reagent_state: "solid",
	color: [1,1,1],
	taste_mult: 1.5,
	nutriment_factor: 5,
	metabolization_rate: 1,
	overdose_threshold: 200,
	taste_description: "sweetness"
});

class VirusFood extends Consumable {} // /datum/reagent/consumable/virus_food
module.exports.reagents.VirusFood = VirusFood;
Object.assign(VirusFood.prototype, {
	name: "Virus Food",
	description: "A mixture of water and milk. Virus cells can use this mixture to reproduce.",
	nutriment_factor: 1,
	color: [0.54,0.59,0.07],
	taste_description: "watery milk"
});

class Soysauce extends Consumable {} // /datum/reagent/consumable/soysauce
module.exports.reagents.Soysauce = Soysauce;
Object.assign(Soysauce.prototype, {
	name: "Soysauce",
	description: "A salty sauce made from the soy plant.",
	nutriment_factor: 1,
	color: [0.47,0.14,0],
	taste_description: "umami"
});

class Ketchup extends Consumable {} // /datum/reagent/consumable/ketchup
module.exports.reagents.Ketchup = Ketchup;
Object.assign(Ketchup.prototype, {
	name: "Ketchup",
	description: "Ketchup, catsup, whatever. It's tomato paste.",
	nutriment_factor: 2.5,
	color: [0.45,0.06,0.03],
	taste_description: "ketchup"
});

class CapsaicinOil extends Consumable {} // /datum/reagent/consumable/capsaicin
module.exports.reagents.CapsaicinOil = CapsaicinOil;
Object.assign(CapsaicinOil.prototype, {
	name: "Capsaicin Oil",
	description: "This is what makes chilis hot.",
	color: [0.7,0.06,0.03],
	taste_description: "hot peppers",
	taste_mult: 1.5
});

class FrostOil extends Consumable {} // /datum/reagent/consumable/frostoil
module.exports.reagents.FrostOil = FrostOil;
Object.assign(FrostOil.prototype, {
	name: "Frost Oil",
	description: "A special oil that noticably chills the body. Extracted from Icepeppers and slimes.",
	color: [0.55,0.65,0.91],
	taste_description: "mint"
});

class CondensedCapsaicin extends Consumable {} // /datum/reagent/consumable/condensedcapsaicin
module.exports.reagents.CondensedCapsaicin = CondensedCapsaicin;
Object.assign(CondensedCapsaicin.prototype, {
	name: "Condensed Capsaicin",
	description: "A chemical agent used for self-defense and in police work.",
	color: [0.7,0.06,0.03],
	taste_description: "scorching agony"
});

class TableSalt extends Consumable {} // /datum/reagent/consumable/sodiumchloride
module.exports.reagents.TableSalt = TableSalt;
Object.assign(TableSalt.prototype, {
	name: "Table Salt",
	description: "A salt made of sodium chloride. Commonly used to season food.",
	reagent_state: "solid",
	color: [1,1,1],
	taste_description: "salt"
});

class BlackPepper extends Consumable {} // /datum/reagent/consumable/blackpepper
module.exports.reagents.BlackPepper = BlackPepper;
Object.assign(BlackPepper.prototype, {
	name: "Black Pepper",
	description: "A powder ground from peppercorns. *AAAACHOOO*",
	reagent_state: "solid",
	taste_description: "pepper"
});

class CocoPowder extends Consumable {} // /datum/reagent/consumable/coco
module.exports.reagents.CocoPowder = CocoPowder;
Object.assign(CocoPowder.prototype, {
	name: "Coco Powder",
	description: "A fatty, bitter paste made from coco beans.",
	reagent_state: "solid",
	nutriment_factor: 2.5,
	color: [0.19,0.13,0],
	taste_description: "bitterness"
});

class HotChocolate extends Consumable {} // /datum/reagent/consumable/hot_coco
module.exports.reagents.HotChocolate = HotChocolate;
Object.assign(HotChocolate.prototype, {
	name: "Hot Chocolate",
	description: "Made with love! And coco beans.",
	nutriment_factor: 1.5,
	color: [0.25,0.19,0.06],
	taste_description: "creamy chocolate",
	glass_icon_state: "chocolateglass",
	glass_name: "glass of chocolate",
	glass_desc: "Tasty."
});

class MushroomHallucinogen extends Reagent {} // /datum/reagent/mushroomhallucinogen
module.exports.reagents.MushroomHallucinogen = MushroomHallucinogen;
Object.assign(MushroomHallucinogen.prototype, {
	name: "Mushroom Hallucinogen",
	description: "A strong hallucinogenic drug derived from certain species of mushroom.",
	color: [0.91,0,0.91],
	metabolization_rate: 0.1,
	taste_description: "mushroom"
});

class Sprinkles extends Consumable {} // /datum/reagent/consumable/sprinkles
module.exports.reagents.Sprinkles = Sprinkles;
Object.assign(Sprinkles.prototype, {
	name: "Sprinkles",
	description: "Multi-colored little bits of sugar, commonly found on donuts. Loved by cops.",
	color: [1,0,1],
	taste_description: "childhood whimsy"
});

class CornOil extends Consumable {} // /datum/reagent/consumable/cornoil
module.exports.reagents.CornOil = CornOil;
Object.assign(CornOil.prototype, {
	name: "Corn Oil",
	description: "An oil derived from various types of corn.",
	nutriment_factor: 10,
	color: [0.19,0.13,0],
	taste_description: "slime"
});

class UniversalEnzyme extends Consumable {} // /datum/reagent/consumable/enzyme
module.exports.reagents.UniversalEnzyme = UniversalEnzyme;
Object.assign(UniversalEnzyme.prototype, {
	name: "Universal Enzyme",
	description: "A universal enzyme used in the preperation of certain chemicals and foods.",
	color: [0.21,0.37,0.19],
	taste_description: "sweetness"
});

class DryRamen extends Consumable {} // /datum/reagent/consumable/dry_ramen
module.exports.reagents.DryRamen = DryRamen;
Object.assign(DryRamen.prototype, {
	name: "Dry Ramen",
	description: "Space age food, since August 25, 1958. Contains dried noodles, vegetables, and chemicals that boil in contact with water.",
	reagent_state: "solid",
	color: [0.19,0.13,0],
	taste_description: "dry and cheap noodles"
});

class HotRamen extends Consumable {} // /datum/reagent/consumable/hot_ramen
module.exports.reagents.HotRamen = HotRamen;
Object.assign(HotRamen.prototype, {
	name: "Hot Ramen",
	description: "The noodles are boiled, the flavors are artificial, just like being back in school.",
	nutriment_factor: 2.5,
	color: [0.19,0.13,0],
	taste_description: "wet and cheap noodles"
});

class HellRamen extends Consumable {} // /datum/reagent/consumable/hell_ramen
module.exports.reagents.HellRamen = HellRamen;
Object.assign(HellRamen.prototype, {
	name: "Hell Ramen",
	description: "The noodles are boiled, the flavors are artificial, just like being back in school.",
	nutriment_factor: 2.5,
	color: [0.19,0.13,0],
	taste_description: "wet and cheap noodles on fire"
});

class Flour extends Consumable {} // /datum/reagent/consumable/flour
module.exports.reagents.Flour = Flour;
Object.assign(Flour.prototype, {
	name: "Flour",
	description: "This is what you rub all over yourself to pretend to be a ghost.",
	reagent_state: "solid",
	color: [1,1,1],
	taste_description: "chalky wheat"
});

class CherryJelly extends Consumable {} // /datum/reagent/consumable/cherryjelly
module.exports.reagents.CherryJelly = CherryJelly;
Object.assign(CherryJelly.prototype, {
	name: "Cherry Jelly",
	description: "Totally the best. Only to be spread on foods with excellent lateral symmetry.",
	color: [0.5,0.12,0.16],
	taste_description: "cherry"
});

class BlueCherryJelly extends Consumable {} // /datum/reagent/consumable/bluecherryjelly
module.exports.reagents.BlueCherryJelly = BlueCherryJelly;
Object.assign(BlueCherryJelly.prototype, {
	name: "Blue Cherry Jelly",
	description: "Blue and tastier kind of cherry jelly.",
	color: [0,0.94,1],
	taste_description: "blue cherry"
});

class Rice extends Consumable {} // /datum/reagent/consumable/rice
module.exports.reagents.Rice = Rice;
Object.assign(Rice.prototype, {
	name: "Rice",
	description: "tiny nutritious grains",
	reagent_state: "solid",
	nutriment_factor: 1.5,
	color: [1,1,1],
	taste_description: "rice"
});

class VanillaPowder extends Consumable {} // /datum/reagent/consumable/vanilla
module.exports.reagents.VanillaPowder = VanillaPowder;
Object.assign(VanillaPowder.prototype, {
	name: "Vanilla Powder",
	description: "A fatty, bitter paste made from vanilla pods.",
	reagent_state: "solid",
	nutriment_factor: 2.5,
	color: [1,0.98,0.8],
	taste_description: "vanilla"
});

class EggYolk extends Consumable {} // /datum/reagent/consumable/eggyolk
module.exports.reagents.EggYolk = EggYolk;
Object.assign(EggYolk.prototype, {
	name: "Egg Yolk",
	description: "It's full of protein.",
	color: [1,0.71,0],
	taste_description: "egg"
});

class CornStarch extends Consumable {} // /datum/reagent/consumable/corn_starch
module.exports.reagents.CornStarch = CornStarch;
Object.assign(CornStarch.prototype, {
	name: "Corn Starch",
	description: "A slippery solution.",
	color: [0.78,0.65,0.86],
	taste_description: "slime"
});

class CornSyrup extends Consumable {} // /datum/reagent/consumable/corn_syrup
module.exports.reagents.CornSyrup = CornSyrup;
Object.assign(CornSyrup.prototype, {
	name: "Corn Syrup",
	description: "Decays into sugar.",
	color: [0.78,0.65,0.86],
	metabolization_rate: 1.5,
	taste_description: "sweet slime"
});

class Honey extends Consumable {} // /datum/reagent/consumable/honey
module.exports.reagents.Honey = Honey;
Object.assign(Honey.prototype, {
	name: "honey",
	description: "Sweet sweet honey, decays into sugar and has natural healing properties.",
	color: [0.83,0.64,0.03],
	nutriment_factor: 7.5,
	metabolization_rate: 0.5,
	taste_description: "sweetness"
});

class Mayonnaise extends Consumable {} // /datum/reagent/consumable/mayonnaise
module.exports.reagents.Mayonnaise = Mayonnaise;
Object.assign(Mayonnaise.prototype, {
	name: "Mayonnaise",
	description: "An white and oily mixture of mixed egg yolks.",
	color: [0.87,0.87,0.87],
	taste_description: "mayonnaise"
});

class TearJuice extends Consumable {} // /datum/reagent/consumable/tearjuice
module.exports.reagents.TearJuice = TearJuice;
Object.assign(TearJuice.prototype, {
	name: "Tear Juice",
	description: "A blinding substance extracted from certain onions.",
	color: [0.75,0.79,0.63],
	taste_description: "bitterness"
});

class EntropicPolypnium extends Consumable {} // /datum/reagent/consumable/entpoly
module.exports.reagents.EntropicPolypnium = EntropicPolypnium;
Object.assign(EntropicPolypnium.prototype, {
	name: "Entropic Polypnium",
	description: "An ichor, derived from a certain mushroom, makes for a bad time.",
	color: [0.11,0.02,0.24],
	taste_description: "bitter mushroom"
});

class TineaLuxor extends Consumable {} // /datum/reagent/consumable/tinlux
module.exports.reagents.TineaLuxor = TineaLuxor;
Object.assign(TineaLuxor.prototype, {
	name: "Tinea Luxor",
	description: "A stimulating ichor which causes luminescent fungi to grow on the skin. ",
	color: [0.71,0.64,0.07],
	taste_description: "tingling mushroom"
});

class VitriumFroth extends Consumable {} // /datum/reagent/consumable/vitfro
module.exports.reagents.VitriumFroth = VitriumFroth;
Object.assign(VitriumFroth.prototype, {
	name: "Vitrium Froth",
	description: "A bubbly paste that heals wounds of the skin.",
	color: [0.83,0.64,0.03],
	nutriment_factor: 1.5,
	taste_description: "fruity mushroom"
});
