'use strict';

const {Consumable} = require('./other.js');
module.exports.reagents = {};

class OrangeJuice extends Consumable {} // /datum/reagent/consumable/orangejuice
module.exports.reagents.OrangeJuice = OrangeJuice;
Object.assign(OrangeJuice.prototype, {
	name: "Orange Juice",
	description: "Both delicious AND rich in Vitamin C, what more do you need?",
	color: [0.91,0.51,0.03],
	taste_description: "oranges",
	glass_icon_state: "glass_orange",
	glass_name: "glass of orange juice",
	glass_desc: "Vitamins! Yay!"
});

class TomatoJuice extends Consumable {} // /datum/reagent/consumable/tomatojuice
module.exports.reagents.TomatoJuice = TomatoJuice;
Object.assign(TomatoJuice.prototype, {
	name: "Tomato Juice",
	description: "Tomatoes made into juice. What a waste of big, juicy tomatoes, huh?",
	color: [0.45,0.06,0.03],
	taste_description: "tomatoes",
	glass_icon_state: "glass_red",
	glass_name: "glass of tomato juice",
	glass_desc: "Are you sure this is tomato juice?"
});

class LimeJuice extends Consumable {} // /datum/reagent/consumable/limejuice
module.exports.reagents.LimeJuice = LimeJuice;
Object.assign(LimeJuice.prototype, {
	name: "Lime Juice",
	description: "The sweet-sour juice of limes.",
	color: [0.21,0.37,0.19],
	taste_description: "unbearable sourness",
	glass_icon_state: "glass_green",
	glass_name: "glass of lime juice",
	glass_desc: "A glass of sweet-sour lime juice."
});

class CarrotJuice extends Consumable {} // /datum/reagent/consumable/carrotjuice
module.exports.reagents.CarrotJuice = CarrotJuice;
Object.assign(CarrotJuice.prototype, {
	name: "Carrot Juice",
	description: "It is just like a carrot but without crunching.",
	color: [0.59,0.22,0],
	taste_description: "carrots",
	glass_icon_state: "carrotjuice",
	glass_name: "glass of  carrot juice",
	glass_desc: "It's just like a carrot but without crunching."
});

class BerryJuice extends Consumable {} // /datum/reagent/consumable/berryjuice
module.exports.reagents.BerryJuice = BerryJuice;
Object.assign(BerryJuice.prototype, {
	name: "Berry Juice",
	description: "A delicious blend of several different kinds of berries.",
	color: [0.53,0.2,0.2],
	taste_description: "berries",
	glass_icon_state: "berryjuice",
	glass_name: "glass of berry juice",
	glass_desc: "Berry juice. Or maybe it's jam. Who cares?"
});

class AppleJuice extends Consumable {} // /datum/reagent/consumable/applejuice
module.exports.reagents.AppleJuice = AppleJuice;
Object.assign(AppleJuice.prototype, {
	name: "Apple Juice",
	description: "The sweet juice of an apple, fit for all ages.",
	color: [0.93,1,0.34],
	taste_description: "apples"
});

class PoisonBerryJuice extends Consumable {} // /datum/reagent/consumable/poisonberryjuice
module.exports.reagents.PoisonBerryJuice = PoisonBerryJuice;
Object.assign(PoisonBerryJuice.prototype, {
	name: "Poison Berry Juice",
	description: "A tasty juice blended from various kinds of very deadly and toxic berries.",
	color: [0.53,0.2,0.33],
	taste_description: "berries",
	glass_icon_state: "poisonberryjuice",
	glass_name: "glass of berry juice",
	glass_desc: "Berry juice. Or maybe it's poison. Who cares?"
});

class WatermelonJuice extends Consumable {} // /datum/reagent/consumable/watermelonjuice
module.exports.reagents.WatermelonJuice = WatermelonJuice;
Object.assign(WatermelonJuice.prototype, {
	name: "Watermelon Juice",
	description: "Delicious juice made from watermelon.",
	color: [0.53,0.2,0.2],
	taste_description: "juicy watermelon",
	glass_icon_state: "glass_red",
	glass_name: "glass of watermelon juice",
	glass_desc: "A glass of watermelon juice."
});

class LemonJuice extends Consumable {} // /datum/reagent/consumable/lemonjuice
module.exports.reagents.LemonJuice = LemonJuice;
Object.assign(LemonJuice.prototype, {
	name: "Lemon Juice",
	description: "This juice is VERY sour.",
	color: [0.53,0.2,0.2],
	taste_description: "sourness",
	glass_icon_state: "lemonglass",
	glass_name: "glass of lemon juice",
	glass_desc: "Sour..."
});

class BananaJuice extends Consumable {} // /datum/reagent/consumable/banana
module.exports.reagents.BananaJuice = BananaJuice;
Object.assign(BananaJuice.prototype, {
	name: "Banana Juice",
	description: "The raw essence of a banana. HONK",
	color: [0.53,0.2,0.2],
	taste_description: "banana",
	glass_icon_state: "banana",
	glass_name: "glass of banana juice",
	glass_desc: "The raw essence of a banana. HONK."
});

class Nothing extends Consumable {} // /datum/reagent/consumable/nothing
module.exports.reagents.Nothing = Nothing;
Object.assign(Nothing.prototype, {
	name: "Nothing",
	description: "Absolutely nothing.",
	taste_description: "nothing",
	glass_icon_state: "nothing",
	glass_name: "Nothing",
	glass_desc: "Absolutely nothing.",
	shot_glass_icon_state: "shotglass"
});

class Laughter extends Consumable {} // /datum/reagent/consumable/laughter
module.exports.reagents.Laughter = Laughter;
Object.assign(Laughter.prototype, {
	name: "Laughter",
	description: "Some say that this is the best medicine, but recent studies have proven that to be untrue.",
	metabolization_rate: Infinity,
	color: [1,0.3,0.82],
	taste_description: "laughter"
});

class PotatoJuice extends Consumable {} // /datum/reagent/consumable/potato_juice
module.exports.reagents.PotatoJuice = PotatoJuice;
Object.assign(PotatoJuice.prototype, {
	name: "Potato Juice",
	description: "Juice of the potato. Bleh.",
	nutriment_factor: 1,
	color: [0.19,0.13,0],
	taste_description: "irish sadness",
	glass_icon_state: "glass_brown",
	glass_name: "glass of potato juice",
	glass_desc: "Bleh..."
});

class GrapeJuice extends Consumable {} // /datum/reagent/consumable/grapejuice
module.exports.reagents.GrapeJuice = GrapeJuice;
Object.assign(GrapeJuice.prototype, {
	name: "Grape Juice",
	description: "The juice of a bunch of grapes. Guaranteed non-alcoholic.",
	color: [0.16,0,0.16],
	taste_description: "grape soda"
});

class Milk extends Consumable {} // /datum/reagent/consumable/milk
module.exports.reagents.Milk = Milk;
Object.assign(Milk.prototype, {
	name: "Milk",
	description: "An opaque white liquid produced by the mammary glands of mammals.",
	color: [0.87,0.87,0.87],
	taste_description: "milk",
	glass_icon_state: "glass_white",
	glass_name: "glass of milk",
	glass_desc: "White and nutritious goodness!"
});

class SoyMilk extends Consumable {} // /datum/reagent/consumable/soymilk
module.exports.reagents.SoyMilk = SoyMilk;
Object.assign(SoyMilk.prototype, {
	name: "Soy Milk",
	description: "An opaque white liquid made from soybeans.",
	color: [0.87,0.87,0.78],
	taste_description: "soy milk",
	glass_icon_state: "glass_white",
	glass_name: "glass of soy milk",
	glass_desc: "White and nutritious soy goodness!"
});

class Cream extends Consumable {} // /datum/reagent/consumable/cream
module.exports.reagents.Cream = Cream;
Object.assign(Cream.prototype, {
	name: "Cream",
	description: "The fatty, still liquid part of milk. Why don't you mix this with sum scotch, eh?",
	color: [0.87,0.84,0.69],
	taste_description: "creamy milk",
	glass_icon_state: "glass_white",
	glass_name: "glass of cream",
	glass_desc: "Ewwww..."
});

class Coffee extends Consumable {} // /datum/reagent/consumable/coffee
module.exports.reagents.Coffee = Coffee;
Object.assign(Coffee.prototype, {
	name: "Coffee",
	description: "Coffee is a brewed drink prepared from roasted seeds, commonly called coffee beans, of the coffee plant.",
	color: [0.28,0.13,0],
	nutriment_factor: 0,
	overdose_threshold: 80,
	taste_description: "bitterness",
	glass_icon_state: "glass_brown",
	glass_name: "glass of coffee",
	glass_desc: "Don't drop it, or you'll send scalding liquid and glass shards everywhere."
});

class Tea extends Consumable {} // /datum/reagent/consumable/tea
module.exports.reagents.Tea = Tea;
Object.assign(Tea.prototype, {
	name: "Tea",
	description: "Tasty black tea, it has antioxidants, it's good for you!",
	color: [0.06,0.06,0],
	nutriment_factor: 0,
	taste_description: "tart black tea",
	glass_icon_state: "teaglass",
	glass_name: "glass of tea",
	glass_desc: "Drinking it from here would not seem right."
});

class ArnoldPalmer extends Tea {} // /datum/reagent/consumable/tea/arnold_palmer
module.exports.reagents.ArnoldPalmer = ArnoldPalmer;
Object.assign(ArnoldPalmer.prototype, {
	name: "Arnold Palmer",
	description: "Encourages the patient to go golfing.",
	color: [1,0.72,0.4],
	nutriment_factor: 2,
	taste_description: "bitter tea",
	glass_icon_state: "arnold_palmer",
	glass_name: "Arnold Palmer",
	glass_desc: "You feel like taking a few golf swings after a few swigs of this."
});

class IcedCoffee extends Consumable {} // /datum/reagent/consumable/icecoffee
module.exports.reagents.IcedCoffee = IcedCoffee;
Object.assign(IcedCoffee.prototype, {
	name: "Iced Coffee",
	description: "Coffee and ice, refreshing and cool.",
	color: [0.06,0.16,0.22],
	nutriment_factor: 0,
	taste_description: "bitter coldness",
	glass_icon_state: "icedcoffeeglass",
	glass_name: "Iced Coffee",
	glass_desc: "A drink to perk you up and refresh you!"
});

class IcedTea extends Consumable {} // /datum/reagent/consumable/icetea
module.exports.reagents.IcedTea = IcedTea;
Object.assign(IcedTea.prototype, {
	name: "Iced Tea",
	description: "No relation to a certain rap artist/actor.",
	color: [0.06,0.25,0.22],
	nutriment_factor: 0,
	taste_description: "sweet tea",
	glass_icon_state: "icedteaglass",
	glass_name: "Iced Tea",
	glass_desc: "All natural, antioxidant-rich flavour sensation."
});

class Cola extends Consumable {} // /datum/reagent/consumable/space_cola
module.exports.reagents.Cola = Cola;
Object.assign(Cola.prototype, {
	name: "Cola",
	description: "A refreshing beverage.",
	color: [0.06,0.03,0],
	taste_description: "cola",
	glass_icon_state: "glass_brown",
	glass_name: "glass of space Cola",
	glass_desc: "A glass of refreshing Space Cola."
});

class NukaCola extends Consumable {} // /datum/reagent/consumable/nuka_cola
module.exports.reagents.NukaCola = NukaCola;
Object.assign(NukaCola.prototype, {
	name: "Nuka Cola",
	description: "Cola, cola never changes.",
	color: [0.06,0.03,0],
	taste_description: "the future",
	glass_icon_state: "nuka_colaglass",
	glass_name: "Nuka Cola",
	glass_desc: "Don't cry, Don't raise your eye, It's only nuclear wasteland."
});

class SMWind extends Consumable {} // /datum/reagent/consumable/spacemountainwind
module.exports.reagents.SMWind = SMWind;
Object.assign(SMWind.prototype, {
	name: "SM Wind",
	description: "Blows right through you like a space wind.",
	color: [0.06,0.13,0],
	taste_description: "sweet citrus soda",
	glass_icon_state: "Space_mountain_wind_glass",
	glass_name: "glass of Space Mountain Wind",
	glass_desc: "Space Mountain Wind. As you know, there are no mountains in space, only wind."
});

class DrGibb extends Consumable {} // /datum/reagent/consumable/dr_gibb
module.exports.reagents.DrGibb = DrGibb;
Object.assign(DrGibb.prototype, {
	name: "Dr. Gibb",
	description: "A delicious blend of 42 different flavours.",
	color: [0.06,0.13,0],
	taste_description: "cherry soda",
	glass_icon_state: "dr_gibb_glass",
	glass_name: "glass of Dr. Gibb",
	glass_desc: "Dr. Gibb. Not as dangerous as the glass_name might imply."
});

class SpaceUp extends Consumable {} // /datum/reagent/consumable/space_up
module.exports.reagents.SpaceUp = SpaceUp;
Object.assign(SpaceUp.prototype, {
	name: "Space-Up",
	description: "Tastes like a hull breach in your mouth.",
	color: [0,1,0],
	taste_description: "cherry soda",
	glass_icon_state: "space-up_glass",
	glass_name: "glass of Space-up",
	glass_desc: "Space-up. It helps you keep your cool."
});

class LemonLime extends Consumable {} // /datum/reagent/consumable/lemon_lime
module.exports.reagents.LemonLime = LemonLime;
Object.assign(LemonLime.prototype, {
	name: "Lemon Lime",
	description: "A tangy substance made of 0.5% natural citrus!",
	color: [0.55,1,0],
	taste_description: "tangy lime and lemon soda",
	glass_icon_state: "glass_yellow",
	glass_name: "glass of Lemon-Lime",
	glass_desc: "You're pretty certain a real fruit has never actually touched this."
});

class PwrGame extends Consumable {} // /datum/reagent/consumable/pwr_game
module.exports.reagents.PwrGame = PwrGame;
Object.assign(PwrGame.prototype, {
	name: "Pwr Game",
	description: "The only drink with the PWR that true gamers crave.",
	color: [0.58,0.52,0.75],
	taste_description: "sweet and salty tang",
	glass_icon_state: "glass_red",
	glass_name: "glass of Pwr Game",
	glass_desc: "Goes well with a Vlad's salad."
});

class ShamblersJuice extends Consumable {} // /datum/reagent/consumable/shamblers
module.exports.reagents.ShamblersJuice = ShamblersJuice;
Object.assign(ShamblersJuice.prototype, {
	name: "Shambler's Juice",
	description: "~Shake me up some of that Shambler's Juice!~",
	color: [0.94,0,0.38],
	taste_description: "carbonated metallic soda",
	glass_icon_state: "glass_red",
	glass_name: "glass of Shambler's Juice",
	glass_desc: "Mmm mm, shambly."
});

class SodaWater extends Consumable {} // /datum/reagent/consumable/sodawater
module.exports.reagents.SodaWater = SodaWater;
Object.assign(SodaWater.prototype, {
	name: "Soda Water",
	description: "A can of club soda. Why not make a scotch and soda?",
	color: [0.38,0.58,0.58],
	taste_description: "carbonated water",
	glass_icon_state: "glass_clear",
	glass_name: "glass of Soda Water",
	glass_desc: "Soda water. Why not make a scotch and soda?"
});

class TonicWater extends Consumable {} // /datum/reagent/consumable/tonic
module.exports.reagents.TonicWater = TonicWater;
Object.assign(TonicWater.prototype, {
	name: "Tonic Water",
	description: "It tastes strange but at least the quinine keeps the Space Malaria at bay.",
	color: [0,0.39,0.78],
	taste_description: "tart and fresh",
	glass_icon_state: "glass_clear",
	glass_name: "glass of Tonic Water",
	glass_desc: "Quinine tastes funny, but at least it'll keep that Space Malaria away."
});

class Ice extends Consumable {} // /datum/reagent/consumable/ice
module.exports.reagents.Ice = Ice;
Object.assign(Ice.prototype, {
	name: "Ice",
	description: "Frozen water, your dentist wouldn't like you chewing this.",
	reagent_state: "solid",
	color: [0.38,0.58,0.58],
	taste_description: "ice",
	glass_icon_state: "iceglass",
	glass_name: "glass of ice",
	glass_desc: "Generally, you're supposed to put something else in there too..."
});

class SoyLatte extends Consumable {} // /datum/reagent/consumable/soy_latte
module.exports.reagents.SoyLatte = SoyLatte;
Object.assign(SoyLatte.prototype, {
	name: "Soy Latte",
	description: "A nice and tasty beverage while you are reading your hippie books.",
	color: [0.4,0.26,0],
	taste_description: "creamy coffee",
	glass_icon_state: "soy_latte",
	glass_name: "Soy Latte",
	glass_desc: "A nice and refreshing beverage while you're reading."
});

class CafeLatte extends Consumable {} // /datum/reagent/consumable/cafe_latte
module.exports.reagents.CafeLatte = CafeLatte;
Object.assign(CafeLatte.prototype, {
	name: "Cafe Latte",
	description: "A nice, strong and tasty beverage while you are reading.",
	color: [0.4,0.26,0],
	taste_description: "bitter cream",
	glass_icon_state: "cafe_latte",
	glass_name: "Cafe Latte",
	glass_desc: "A nice, strong and refreshing beverage while you're reading."
});

class TheDoctorsDelight extends Consumable {} // /datum/reagent/consumable/doctor_delight
module.exports.reagents.TheDoctorsDelight = TheDoctorsDelight;
Object.assign(TheDoctorsDelight.prototype, {
	name: "The Doctor's Delight",
	description: "A gulp a day keeps the Medibot away! A mixture of juices that heals most damage types fairly quickly at the cost of hunger.",
	color: [1,0.55,1],
	taste_description: "homely fruit",
	glass_icon_state: "doctorsdelightglass",
	glass_name: "Doctor's Delight",
	glass_desc: "The space doctor's favorite. Guaranteed to restore bodily injury; side effects include cravings and hunger."
});

class ChocolatePudding extends Consumable {} // /datum/reagent/consumable/chocolatepudding
module.exports.reagents.ChocolatePudding = ChocolatePudding;
Object.assign(ChocolatePudding.prototype, {
	name: "Chocolate Pudding",
	description: "A great dessert for chocolate lovers.",
	color: [0.5,0,0],
	nutriment_factor: 2,
	taste_description: "sweet chocolate",
	glass_icon_state: "chocolatepudding",
	glass_name: "Chocolate Pudding",
	glass_desc: "Tasty."
});

class VanillaPudding extends Consumable {} // /datum/reagent/consumable/vanillapudding
module.exports.reagents.VanillaPudding = VanillaPudding;
Object.assign(VanillaPudding.prototype, {
	name: "Vanilla Pudding",
	description: "A great dessert for vanilla lovers.",
	color: [0.98,0.98,0.82],
	nutriment_factor: 2,
	taste_description: "sweet vanilla",
	glass_icon_state: "vanillapudding",
	glass_name: "Vanilla Pudding",
	glass_desc: "Tasty."
});

class CherryShake extends Consumable {} // /datum/reagent/consumable/cherryshake
module.exports.reagents.CherryShake = CherryShake;
Object.assign(CherryShake.prototype, {
	name: "Cherry Shake",
	description: "A cherry flavored milkshake.",
	color: [1,0.71,0.76],
	nutriment_factor: 2,
	taste_description: "creamy cherry",
	glass_icon_state: "cherryshake",
	glass_name: "Cherry Shake",
	glass_desc: "A cherry flavored milkshake."
});

class BlueCherryShake extends Consumable {} // /datum/reagent/consumable/bluecherryshake
module.exports.reagents.BlueCherryShake = BlueCherryShake;
Object.assign(BlueCherryShake.prototype, {
	name: "Blue Cherry Shake",
	description: "An exotic milkshake.",
	color: [0,0.95,1],
	nutriment_factor: 2,
	taste_description: "creamy blue cherry",
	glass_icon_state: "bluecherryshake",
	glass_name: "Blue Cherry Shake",
	glass_desc: "An exotic blue milkshake."
});

class PumpkinLatte extends Consumable {} // /datum/reagent/consumable/pumpkin_latte
module.exports.reagents.PumpkinLatte = PumpkinLatte;
Object.assign(PumpkinLatte.prototype, {
	name: "Pumpkin Latte",
	description: "A mix of pumpkin juice and coffee.",
	color: [0.96,0.64,0.38],
	nutriment_factor: 1.5,
	taste_description: "creamy pumpkin",
	glass_icon_state: "pumpkin_latte",
	glass_name: "Pumpkin Latte",
	glass_desc: "A mix of coffee and pumpkin juice."
});

class GibbFloats extends Consumable {} // /datum/reagent/consumable/gibbfloats
module.exports.reagents.GibbFloats = GibbFloats;
Object.assign(GibbFloats.prototype, {
	name: "Gibb Floats",
	description: "Ice cream on top of a Dr. Gibb glass.",
	color: [0.7,0.13,0.13],
	nutriment_factor: 1.5,
	taste_description: "creamy cherry",
	glass_icon_state: "gibbfloats",
	glass_name: "Gibbfloat",
	glass_desc: "Dr. Gibb with ice cream on top."
});

class PumpkinJuice extends Consumable {} // /datum/reagent/consumable/pumpkinjuice
module.exports.reagents.PumpkinJuice = PumpkinJuice;
Object.assign(PumpkinJuice.prototype, {
	name: "Pumpkin Juice",
	description: "Juiced from real pumpkin.",
	color: [1,0.65,0],
	taste_description: "pumpkin"
});

class BlumpkinJuice extends Consumable {} // /datum/reagent/consumable/blumpkinjuice
module.exports.reagents.BlumpkinJuice = BlumpkinJuice;
Object.assign(BlumpkinJuice.prototype, {
	name: "Blumpkin Juice",
	description: "Juiced from real blumpkin.",
	color: [0,0.75,1],
	taste_description: "a mouthful of pool water"
});

class TripleCitrus extends Consumable {} // /datum/reagent/consumable/triple_citrus
module.exports.reagents.TripleCitrus = TripleCitrus;
Object.assign(TripleCitrus.prototype, {
	name: "Triple Citrus",
	description: "A solution.",
	color: [0.78,0.65,0.86],
	taste_description: "extreme bitterness",
	glass_icon_state: "triplecitrus",
	glass_name: "glass of triple citrus",
	glass_desc: "A mixture of citrus juices. Tangy, yet smooth."
});

class GrapeSoda extends Consumable {} // /datum/reagent/consumable/grape_soda
module.exports.reagents.GrapeSoda = GrapeSoda;
Object.assign(GrapeSoda.prototype, {
	name: "Grape soda",
	description: "Beloved of children and teetotalers.",
	color: [0.9,0.8,1],
	taste_description: "grape soda",
	glass_name: "glass of grape juice",
	glass_desc: "It's grape (soda)!"
});

class ChocolateMilk extends Milk {} // /datum/reagent/consumable/milk/chocolate_milk
module.exports.reagents.ChocolateMilk = ChocolateMilk;
Object.assign(ChocolateMilk.prototype, {
	name: "Chocolate Milk",
	description: "Milk for cool kids.",
	color: [0.49,0.31,0.16],
	taste_description: "chocolate milk"
});
