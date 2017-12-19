'use strict';

const {Consumable} = require('./other.js');
module.exports.reagents = {};

class Ethanol extends Consumable {} // /datum/reagent/consumable/ethanol
module.exports.reagents.Ethanol = Ethanol;
Object.assign(Ethanol.prototype, {
	name: "Ethanol",
	description: "A well-known alcohol with a variety of applications.",
	color: [0.25,0.25,0.19],
	nutriment_factor: 0,
	taste_description: "alcohol",
	boozepwr: 65
});

class Beer extends Ethanol {} // /datum/reagent/consumable/ethanol/beer
module.exports.reagents.Beer = Beer;
Object.assign(Beer.prototype, {
	name: "Beer",
	description: "An alcoholic beverage brewed since ancient times on Old Earth. Still popular today.",
	color: [0.4,0.26,0],
	nutriment_factor: 0.5,
	boozepwr: 25,
	taste_description: "piss water",
	glass_name: "glass of beer",
	glass_desc: "A freezing pint of beer."
});

class GreenBeer extends Beer {} // /datum/reagent/consumable/ethanol/beer/green
module.exports.reagents.GreenBeer = GreenBeer;
Object.assign(GreenBeer.prototype, {
	name: "Green Beer",
	description: "An alcoholic beverage brewed since ancient times on Old Earth. This variety is dyed a festive green.",
	color: [0.66,0.9,0.11],
	taste_description: "green piss water",
	glass_icon_state: "greenbeerglass",
	glass_name: "glass of green beer",
	glass_desc: "A freezing pint of green beer. Festive."
});

class Kahlua extends Ethanol {} // /datum/reagent/consumable/ethanol/kahlua
module.exports.reagents.Kahlua = Kahlua;
Object.assign(Kahlua.prototype, {
	name: "Kahlua",
	description: "A widely known, Mexican coffee-flavoured liqueur. In production since 1936!",
	color: [0.4,0.26,0],
	boozepwr: 45,
	glass_icon_state: "kahluaglass",
	glass_name: "glass of RR Coffee Liquor",
	glass_desc: "DAMN, THIS THING LOOKS ROBUST!",
	shot_glass_icon_state: "shotglasscream"
});

class Whiskey extends Ethanol {} // /datum/reagent/consumable/ethanol/whiskey
module.exports.reagents.Whiskey = Whiskey;
Object.assign(Whiskey.prototype, {
	name: "Whiskey",
	description: "A superb and well-aged single-malt whiskey. Damn.",
	color: [0.4,0.26,0],
	boozepwr: 75,
	taste_description: "molasses",
	glass_icon_state: "whiskeyglass",
	glass_name: "glass of whiskey",
	glass_desc: "The silky, smokey whiskey goodness inside the glass makes the drink look very classy.",
	shot_glass_icon_state: "shotglassbrown"
});

class ThirteenLoko extends Ethanol {} // /datum/reagent/consumable/ethanol/thirteenloko
module.exports.reagents.ThirteenLoko = ThirteenLoko;
Object.assign(ThirteenLoko.prototype, {
	name: "Thirteen Loko",
	description: "A potent mixture of caffeine and alcohol.",
	color: [0.06,0.13,0],
	nutriment_factor: 0.5,
	boozepwr: 80,
	taste_description: "jitters and death",
	glass_icon_state: "thirteen_loko_glass",
	glass_name: "glass of Thirteen Loko",
	glass_desc: "This is a glass of Thirteen Loko, it appears to be of the highest quality. The drink, not the glass."
});

class Vodka extends Ethanol {} // /datum/reagent/consumable/ethanol/vodka
module.exports.reagents.Vodka = Vodka;
Object.assign(Vodka.prototype, {
	name: "Vodka",
	description: "Number one drink AND fueling choice for Russians worldwide.",
	color: [0,0.39,0.78],
	boozepwr: 65,
	taste_description: "grain alcohol",
	glass_icon_state: "ginvodkaglass",
	glass_name: "glass of vodka",
	glass_desc: "The glass contain wodka. Xynta.",
	shot_glass_icon_state: "shotglassclear"
});

class Bilk extends Ethanol {} // /datum/reagent/consumable/ethanol/bilk
module.exports.reagents.Bilk = Bilk;
Object.assign(Bilk.prototype, {
	name: "Bilk",
	description: "This appears to be beer mixed with milk. Disgusting.",
	color: [0.54,0.36,0.3],
	nutriment_factor: 1,
	boozepwr: 15,
	taste_description: "desperation and lactate",
	glass_icon_state: "glass_brown",
	glass_name: "glass of bilk",
	glass_desc: "A brew of milk and beer. For those alcoholics who fear osteoporosis."
});

class ThreeMileIslandIcedTea extends Ethanol {} // /datum/reagent/consumable/ethanol/threemileisland
module.exports.reagents.ThreeMileIslandIcedTea = ThreeMileIslandIcedTea;
Object.assign(ThreeMileIslandIcedTea.prototype, {
	name: "Three Mile Island Iced Tea",
	description: "Made for a woman, strong enough for a man.",
	color: [0.4,0.39,0.25],
	boozepwr: 10,
	taste_description: "dryness",
	glass_icon_state: "threemileislandglass",
	glass_name: "Three Mile Island Ice Tea",
	glass_desc: "A glass of this is sure to prevent a meltdown."
});

class Gin extends Ethanol {} // /datum/reagent/consumable/ethanol/gin
module.exports.reagents.Gin = Gin;
Object.assign(Gin.prototype, {
	name: "Gin",
	description: "It's gin. In space. I say, good sir.",
	color: [0.4,0.26,0],
	boozepwr: 45,
	taste_description: "an alcoholic christmas tree",
	glass_icon_state: "ginvodkaglass",
	glass_name: "glass of gin",
	glass_desc: "A crystal clear glass of Griffeater gin."
});

class Rum extends Ethanol {} // /datum/reagent/consumable/ethanol/rum
module.exports.reagents.Rum = Rum;
Object.assign(Rum.prototype, {
	name: "Rum",
	description: "Yohoho and all that.",
	color: [0.4,0.26,0],
	boozepwr: 60,
	taste_description: "spiked butterscotch",
	glass_icon_state: "rumglass",
	glass_name: "glass of rum",
	glass_desc: "Now you want to Pray for a pirate suit, don't you?",
	shot_glass_icon_state: "shotglassbrown"
});

class Tequila extends Ethanol {} // /datum/reagent/consumable/ethanol/tequila
module.exports.reagents.Tequila = Tequila;
Object.assign(Tequila.prototype, {
	name: "Tequila",
	description: "A strong and mildly flavoured, Mexican produced spirit. Feeling thirsty, hombre?",
	color: [1,1,0.57],
	boozepwr: 70,
	taste_description: "paint stripper",
	glass_icon_state: "tequilaglass",
	glass_name: "glass of tequila",
	glass_desc: "Now all that's missing is the weird colored shades!",
	shot_glass_icon_state: "shotglassgold"
});

class Vermouth extends Ethanol {} // /datum/reagent/consumable/ethanol/vermouth
module.exports.reagents.Vermouth = Vermouth;
Object.assign(Vermouth.prototype, {
	name: "Vermouth",
	description: "You suddenly feel a craving for a martini...",
	color: [0.57,1,0.57],
	boozepwr: 45,
	taste_description: "dry alcohol",
	glass_icon_state: "vermouthglass",
	glass_name: "glass of vermouth",
	glass_desc: "You wonder why you're even drinking this straight.",
	shot_glass_icon_state: "shotglassclear"
});

class Wine extends Ethanol {} // /datum/reagent/consumable/ethanol/wine
module.exports.reagents.Wine = Wine;
Object.assign(Wine.prototype, {
	name: "Wine",
	description: "A premium alcoholic beverage made from distilled grape juice.",
	color: [0.49,0.25,0.26],
	boozepwr: 35,
	taste_description: "bitter sweetness",
	glass_icon_state: "wineglass",
	glass_name: "glass of wine",
	glass_desc: "A very classy looking drink.",
	shot_glass_icon_state: "shotglassred"
});

class LizardWine extends Ethanol {} // /datum/reagent/consumable/ethanol/lizardwine
module.exports.reagents.LizardWine = LizardWine;
Object.assign(LizardWine.prototype, {
	name: "Lizard wine",
	description: "An alcoholic beverage from Space China, made by infusing lizard tails in ethanol.",
	color: [0.49,0.25,0.26],
	boozepwr: 45,
	taste_description: "scaley sweetness"
});

class Grappa extends Ethanol {} // /datum/reagent/consumable/ethanol/grappa
module.exports.reagents.Grappa = Grappa;
Object.assign(Grappa.prototype, {
	name: "Grappa",
	description: "A fine Italian brandy, for when regular wine just isn't alcoholic enough for you.",
	color: [0.97,0.92,0.95],
	boozepwr: 45,
	taste_description: "classy bitter sweetness",
	glass_icon_state: "grappa",
	glass_name: "glass of grappa",
	glass_desc: "A fine drink originally made to prevent waste by using the leftovers from winemaking."
});

class Cognac extends Ethanol {} // /datum/reagent/consumable/ethanol/cognac
module.exports.reagents.Cognac = Cognac;
Object.assign(Cognac.prototype, {
	name: "Cognac",
	description: "A sweet and strongly alcoholic drink, made after numerous distillations and years of maturing. Classy as fornication.",
	color: [0.67,0.24,0.02],
	boozepwr: 75,
	taste_description: "angry and irish",
	glass_icon_state: "cognacglass",
	glass_name: "glass of cognac",
	glass_desc: "Damn, you feel like some kind of French aristocrat just by holding this.",
	shot_glass_icon_state: "shotglassbrown"
});

class Absinthe extends Ethanol {} // /datum/reagent/consumable/ethanol/absinthe
module.exports.reagents.Absinthe = Absinthe;
Object.assign(Absinthe.prototype, {
	name: "Absinthe",
	description: "A powerful alcoholic drink. Rumored to cause hallucinations but does not.",
	color: [0.04,0.81,0],
	boozepwr: 80,
	taste_description: "death and licorice",
	glass_icon_state: "absinthe",
	glass_name: "glass of absinthe",
	glass_desc: "It's as strong as it smells.",
	shot_glass_icon_state: "shotglassgreen"
});

class Hooch extends Ethanol {} // /datum/reagent/consumable/ethanol/hooch
module.exports.reagents.Hooch = Hooch;
Object.assign(Hooch.prototype, {
	name: "Hooch",
	description: "Either someone's failure at cocktail making or attempt in alcohol production. In any case, do you really want to drink that?",
	color: [0.4,0.26,0],
	boozepwr: 100,
	taste_description: "pure resignation",
	glass_icon_state: "glass_brown2",
	glass_name: "Hooch",
	glass_desc: "You've really hit rock bottom now... your liver packed its bags and left last night."
});

class Ale extends Ethanol {} // /datum/reagent/consumable/ethanol/ale
module.exports.reagents.Ale = Ale;
Object.assign(Ale.prototype, {
	name: "Ale",
	description: "A dark alcoholic beverage made with malted barley and yeast.",
	color: [0.4,0.26,0],
	boozepwr: 65,
	taste_description: "hearty barley ale",
	glass_icon_state: "aleglass",
	glass_name: "glass of ale",
	glass_desc: "A freezing pint of delicious Ale."
});

class Goldschlager extends Ethanol {} // /datum/reagent/consumable/ethanol/goldschlager
module.exports.reagents.Goldschlager = Goldschlager;
Object.assign(Goldschlager.prototype, {
	name: "Goldschlager",
	description: "100 proof cinnamon schnapps, made for alcoholic teen girls on spring break.",
	color: [1,1,0.57],
	boozepwr: 25,
	taste_description: "burning cinnamon",
	glass_icon_state: "goldschlagerglass",
	glass_name: "glass of Goldschlager",
	glass_desc: "100% proof that teen girls will drink anything with gold in it.",
	shot_glass_icon_state: "shotglassgold"
});

class Patron extends Ethanol {} // /datum/reagent/consumable/ethanol/patron
module.exports.reagents.Patron = Patron;
Object.assign(Patron.prototype, {
	name: "Patron",
	description: "Tequila with silver in it, a favorite of alcoholic women in the club scene.",
	color: [0.35,0.35,0.25],
	boozepwr: 60,
	taste_description: "metallic and expensive",
	glass_icon_state: "patronglass",
	glass_name: "glass of patron",
	glass_desc: "Drinking patron in the bar, with all the subpar ladies.",
	shot_glass_icon_state: "shotglassclear"
});

class GinAndTonic extends Ethanol {} // /datum/reagent/consumable/ethanol/gintonic
module.exports.reagents.GinAndTonic = GinAndTonic;
Object.assign(GinAndTonic.prototype, {
	name: "Gin and Tonic",
	description: "An all time classic, mild cocktail.",
	color: [0.4,0.26,0],
	boozepwr: 25,
	taste_description: "mild and tart",
	glass_icon_state: "gintonicglass",
	glass_name: "Gin and Tonic",
	glass_desc: "A mild but still great cocktail. Drink up, like a true Englishman."
});

class CubaLibre extends Ethanol {} // /datum/reagent/consumable/ethanol/cuba_libre
module.exports.reagents.CubaLibre = CubaLibre;
Object.assign(CubaLibre.prototype, {
	name: "Cuba Libre",
	description: "Rum, mixed with cola. Viva la revolucion.",
	color: [0.24,0.11,0],
	boozepwr: 50,
	taste_description: "cola",
	glass_icon_state: "cubalibreglass",
	glass_name: "Cuba Libre",
	glass_desc: "A classic mix of rum and cola."
});

class WhiskeyCola extends Ethanol {} // /datum/reagent/consumable/ethanol/whiskey_cola
module.exports.reagents.WhiskeyCola = WhiskeyCola;
Object.assign(WhiskeyCola.prototype, {
	name: "Whiskey Cola",
	description: "Whiskey, mixed with cola. Surprisingly refreshing.",
	color: [0.24,0.11,0],
	boozepwr: 70,
	taste_description: "cola",
	glass_icon_state: "whiskeycolaglass",
	glass_name: "Whiskey Cola",
	glass_desc: "An innocent-looking mixture of cola and Whiskey. Delicious."
});

class ClassicMartini extends Ethanol {} // /datum/reagent/consumable/ethanol/martini
module.exports.reagents.ClassicMartini = ClassicMartini;
Object.assign(ClassicMartini.prototype, {
	name: "Classic Martini",
	description: "Vermouth with Gin. Not quite how 007 enjoyed it, but still delicious.",
	color: [0.4,0.26,0],
	boozepwr: 60,
	taste_description: "dry class",
	glass_icon_state: "martiniglass",
	glass_name: "Classic Martini",
	glass_desc: "Damn, the bartender even stirred it, not shook it."
});

class VodkaMartini extends Ethanol {} // /datum/reagent/consumable/ethanol/vodkamartini
module.exports.reagents.VodkaMartini = VodkaMartini;
Object.assign(VodkaMartini.prototype, {
	name: "Vodka Martini",
	description: "Vodka with Gin. Not quite how 007 enjoyed it, but still delicious.",
	color: [0.4,0.26,0],
	boozepwr: 65,
	taste_description: "shaken, not stirred",
	glass_icon_state: "martiniglass",
	glass_name: "Vodka martini",
	glass_desc: "A bastardisation of the classic martini. Still great."
});

class WhiteRussian extends Ethanol {} // /datum/reagent/consumable/ethanol/white_russian
module.exports.reagents.WhiteRussian = WhiteRussian;
Object.assign(WhiteRussian.prototype, {
	name: "White Russian",
	description: "That's just, like, your opinion, man...",
	color: [0.65,0.51,0.25],
	boozepwr: 50,
	taste_description: "bitter cream",
	glass_icon_state: "whiterussianglass",
	glass_name: "White Russian",
	glass_desc: "A very nice looking drink. But that's just, like, your opinion, man."
});

class Screwdriver extends Ethanol {} // /datum/reagent/consumable/ethanol/screwdrivercocktail
module.exports.reagents.Screwdriver = Screwdriver;
Object.assign(Screwdriver.prototype, {
	name: "Screwdriver",
	description: "Vodka, mixed with plain ol' orange juice. The result is surprisingly delicious.",
	color: [0.65,0.51,0.06],
	boozepwr: 55,
	taste_description: "oranges",
	glass_icon_state: "screwdriverglass",
	glass_name: "Screwdriver",
	glass_desc: "A simple, yet superb mixture of Vodka and orange juice. Just the thing for the tired engineer."
});

class Booger extends Ethanol {} // /datum/reagent/consumable/ethanol/booger
module.exports.reagents.Booger = Booger;
Object.assign(Booger.prototype, {
	name: "Booger",
	description: "Ewww...",
	color: [0.55,1,0.55],
	boozepwr: 45,
	taste_description: "sweet 'n creamy",
	glass_icon_state: "booger",
	glass_name: "Booger",
	glass_desc: "Ewww..."
});

class BloodyMary extends Ethanol {} // /datum/reagent/consumable/ethanol/bloody_mary
module.exports.reagents.BloodyMary = BloodyMary;
Object.assign(BloodyMary.prototype, {
	name: "Bloody Mary",
	description: "A strange yet pleasurable mixture made of vodka, tomato and lime juice. Or at least you THINK the red stuff is tomato juice.",
	color: [0.4,0.26,0],
	boozepwr: 55,
	taste_description: "tomatoes with a hint of lime",
	glass_icon_state: "bloodymaryglass",
	glass_name: "Bloody Mary",
	glass_desc: "Tomato juice, mixed with Vodka and a lil' bit of lime. Tastes like liquid murder."
});

class BraveBull extends Ethanol {} // /datum/reagent/consumable/ethanol/brave_bull
module.exports.reagents.BraveBull = BraveBull;
Object.assign(BraveBull.prototype, {
	name: "Brave Bull",
	description: "It's just as effective as Dutch-Courage!",
	color: [0.4,0.26,0],
	boozepwr: 80,
	taste_description: "alcoholic bravery",
	glass_icon_state: "bravebullglass",
	glass_name: "Brave Bull",
	glass_desc: "Tequila and Coffee liqueur, brought together in a mouthwatering mixture. Drink up."
});

class TequilaSunrise extends Ethanol {} // /datum/reagent/consumable/ethanol/tequila_sunrise
module.exports.reagents.TequilaSunrise = TequilaSunrise;
Object.assign(TequilaSunrise.prototype, {
	name: "Tequila Sunrise",
	description: "Tequila and orange juice. Much like a Screwdriver, only Mexican~",
	color: [1,0.89,0.55],
	boozepwr: 45,
	taste_description: "oranges",
	glass_icon_state: "tequilasunriseglass",
	glass_name: "tequila Sunrise",
	glass_desc: "Oh great, now you feel nostalgic about sunrises back on Terra..."
});

class ToxinsSpecial extends Ethanol {} // /datum/reagent/consumable/ethanol/toxins_special
module.exports.reagents.ToxinsSpecial = ToxinsSpecial;
Object.assign(ToxinsSpecial.prototype, {
	name: "Toxins Special",
	description: "This thing is ON FIRE! CALL THE DAMN SHUTTLE!",
	color: [0.4,0.26,0],
	boozepwr: 25,
	taste_description: "spicy toxins",
	glass_icon_state: "toxinsspecialglass",
	glass_name: "Toxins Special",
	glass_desc: "Whoah, this thing is on FIRE!",
	shot_glass_icon_state: "toxinsspecialglass"
});

class BeepskySmash extends Ethanol {} // /datum/reagent/consumable/ethanol/beepsky_smash
module.exports.reagents.BeepskySmash = BeepskySmash;
Object.assign(BeepskySmash.prototype, {
	name: "Beepsky Smash",
	description: "Drink this and prepare for the LAW.",
	color: [0.4,0.26,0],
	boozepwr: 90,
	metabolization_rate: 0.8,
	taste_description: "JUSTICE",
	glass_icon_state: "beepskysmashglass",
	glass_name: "Beepsky Smash",
	glass_desc: "Heavy, hot and strong. Just like the Iron fist of the LAW."
});

class IrishCream extends Ethanol {} // /datum/reagent/consumable/ethanol/irish_cream
module.exports.reagents.IrishCream = IrishCream;
Object.assign(IrishCream.prototype, {
	name: "Irish Cream",
	description: "Whiskey-imbued cream, what else would you expect from the Irish?",
	color: [0.4,0.26,0],
	boozepwr: 70,
	taste_description: "creamy alcohol",
	glass_icon_state: "irishcreamglass",
	glass_name: "Irish Cream",
	glass_desc: "It's cream, mixed with whiskey. What else would you expect from the Irish?"
});

class TheManlyDorf extends Ethanol {} // /datum/reagent/consumable/ethanol/manly_dorf
module.exports.reagents.TheManlyDorf = TheManlyDorf;
Object.assign(TheManlyDorf.prototype, {
	name: "The Manly Dorf",
	description: "Beer and Ale, brought together in a delicious mix. Intended for true men only.",
	color: [0.4,0.26,0],
	boozepwr: 100,
	taste_description: "hair on your chest and your chin",
	glass_icon_state: "manlydorfglass",
	glass_name: "The Manly Dorf",
	glass_desc: "A manly concoction made from Ale and Beer. Intended for true men only."
});

class LongIslandIcedTea extends Ethanol {} // /datum/reagent/consumable/ethanol/longislandicedtea
module.exports.reagents.LongIslandIcedTea = LongIslandIcedTea;
Object.assign(LongIslandIcedTea.prototype, {
	name: "Long Island Iced Tea",
	description: "The liquor cabinet, brought together in a delicious mix. Intended for middle-aged alcoholic women only.",
	color: [0.4,0.26,0],
	boozepwr: 35,
	taste_description: "a mixture of cola and alcohol",
	glass_icon_state: "longislandicedteaglass",
	glass_name: "Long Island Iced Tea",
	glass_desc: "The liquor cabinet, brought together in a delicious mix. Intended for middle-aged alcoholic women only."
});

class Moonshine extends Ethanol {} // /datum/reagent/consumable/ethanol/moonshine
module.exports.reagents.Moonshine = Moonshine;
Object.assign(Moonshine.prototype, {
	name: "Moonshine",
	description: "You've really hit rock bottom now... your liver packed its bags and left last night.",
	color: [0.4,0.26,0],
	boozepwr: 95,
	taste_description: "bitterness",
	glass_icon_state: "glass_clear",
	glass_name: "Moonshine",
	glass_desc: "You've really hit rock bottom now... your liver packed its bags and left last night."
});

class B52 extends Ethanol {} // /datum/reagent/consumable/ethanol/b52
module.exports.reagents.B52 = B52;
Object.assign(B52.prototype, {
	name: "B-52",
	description: "Coffee, Irish Cream, and cognac. You will get bombed.",
	color: [0.4,0.26,0],
	boozepwr: 85,
	taste_description: "angry and irish",
	glass_icon_state: "b52glass",
	glass_name: "B-52",
	glass_desc: "Kahlua, Irish Cream, and cognac. You will get bombed.",
	shot_glass_icon_state: "b52glass"
});

class IrishCoffee extends Ethanol {} // /datum/reagent/consumable/ethanol/irishcoffee
module.exports.reagents.IrishCoffee = IrishCoffee;
Object.assign(IrishCoffee.prototype, {
	name: "Irish Coffee",
	description: "Coffee, and alcohol. More fun than a Mimosa to drink in the morning.",
	color: [0.4,0.26,0],
	boozepwr: 35,
	taste_description: "giving up on the day",
	glass_icon_state: "irishcoffeeglass",
	glass_name: "Irish Coffee",
	glass_desc: "Coffee and alcohol. More fun than a Mimosa to drink in the morning."
});

class Margarita extends Ethanol {} // /datum/reagent/consumable/ethanol/margarita
module.exports.reagents.Margarita = Margarita;
Object.assign(Margarita.prototype, {
	name: "Margarita",
	description: "On the rocks with salt on the rim. Arriba~!",
	color: [0.55,1,0.55],
	boozepwr: 35,
	taste_description: "dry and salty",
	glass_icon_state: "margaritaglass",
	glass_name: "Margarita",
	glass_desc: "On the rocks with salt on the rim. Arriba~!"
});

class BlackRussian extends Ethanol {} // /datum/reagent/consumable/ethanol/black_russian
module.exports.reagents.BlackRussian = BlackRussian;
Object.assign(BlackRussian.prototype, {
	name: "Black Russian",
	description: "For the lactose-intolerant. Still as classy as a White Russian.",
	color: [0.21,0,0],
	boozepwr: 70,
	taste_description: "bitterness",
	glass_icon_state: "blackrussianglass",
	glass_name: "Black Russian",
	glass_desc: "For the lactose-intolerant. Still as classy as a White Russian."
});

class Manhattan extends Ethanol {} // /datum/reagent/consumable/ethanol/manhattan
module.exports.reagents.Manhattan = Manhattan;
Object.assign(Manhattan.prototype, {
	name: "Manhattan",
	description: "The Detective's undercover drink of choice. He never could stomach gin...",
	color: [0.4,0.26,0],
	boozepwr: 30,
	taste_description: "mild dryness",
	glass_icon_state: "manhattanglass",
	glass_name: "Manhattan",
	glass_desc: "The Detective's undercover drink of choice. He never could stomach gin..."
});

class ManhattanProject extends Ethanol {} // /datum/reagent/consumable/ethanol/manhattan_proj
module.exports.reagents.ManhattanProject = ManhattanProject;
Object.assign(ManhattanProject.prototype, {
	name: "Manhattan Project",
	description: "A scientist's drink of choice, for pondering ways to blow up the station.",
	color: [0.4,0.26,0],
	boozepwr: 45,
	taste_description: "death, the destroyer of worlds",
	glass_icon_state: "proj_manhattanglass",
	glass_name: "Manhattan Project",
	glass_desc: "A scientist's drink of choice, for thinking how to blow up the station."
});

class WhiskeySoda extends Ethanol {} // /datum/reagent/consumable/ethanol/whiskeysoda
module.exports.reagents.WhiskeySoda = WhiskeySoda;
Object.assign(WhiskeySoda.prototype, {
	name: "Whiskey Soda",
	description: "For the more refined griffon.",
	color: [0.4,0.26,0],
	boozepwr: 70,
	taste_description: "soda",
	glass_icon_state: "whiskeysodaglass2",
	glass_name: "Whiskey Soda",
	glass_desc: "Ultimate refreshment."
});

class AntiFreeze extends Ethanol {} // /datum/reagent/consumable/ethanol/antifreeze
module.exports.reagents.AntiFreeze = AntiFreeze;
Object.assign(AntiFreeze.prototype, {
	name: "Anti-freeze",
	description: "The ultimate refreshment. Not what it sounds like.",
	color: [0.4,0.26,0],
	boozepwr: 35,
	taste_description: "Jack Frost's piss",
	glass_icon_state: "antifreeze",
	glass_name: "Anti-freeze",
	glass_desc: "The ultimate refreshment."
});

class Barefoot extends Ethanol {} // /datum/reagent/consumable/ethanol/barefoot
module.exports.reagents.Barefoot = Barefoot;
Object.assign(Barefoot.prototype, {
	name: "Barefoot",
	description: "Barefoot and pregnant.",
	color: [0.4,0.26,0],
	boozepwr: 45,
	taste_description: "creamy berries",
	glass_icon_state: "b&p",
	glass_name: "Barefoot",
	glass_desc: "Barefoot and pregnant."
});

class SnowWhite extends Ethanol {} // /datum/reagent/consumable/ethanol/snowwhite
module.exports.reagents.SnowWhite = SnowWhite;
Object.assign(SnowWhite.prototype, {
	name: "Snow White",
	description: "A cold refreshment.",
	color: [1,1,1],
	boozepwr: 35,
	taste_description: "refreshing cold",
	glass_icon_state: "snowwhite",
	glass_name: "Snow White",
	glass_desc: "A cold refreshment."
});

class DemonsBlood extends Ethanol {} // /datum/reagent/consumable/ethanol/demonsblood
module.exports.reagents.DemonsBlood = DemonsBlood;
Object.assign(DemonsBlood.prototype, {
	name: "Demon's Blood",
	description: "AHHHH!!!!",
	color: [0.51,0,0],
	boozepwr: 75,
	taste_description: "sweet tasting iron",
	glass_icon_state: "demonsblood",
	glass_name: "Demons Blood",
	glass_desc: "Just looking at this thing makes the hair at the back of your neck stand up."
});

class DevilsKiss extends Ethanol {} // /datum/reagent/consumable/ethanol/devilskiss
module.exports.reagents.DevilsKiss = DevilsKiss;
Object.assign(DevilsKiss.prototype, {
	name: "Devil's Kiss",
	description: "Creepy time!",
	color: [0.65,0.51,0.06],
	boozepwr: 70,
	taste_description: "bitter iron",
	glass_icon_state: "devilskiss",
	glass_name: "Devils Kiss",
	glass_desc: "Creepy time!"
});

class VodkaAndTonic extends Ethanol {} // /datum/reagent/consumable/ethanol/vodkatonic
module.exports.reagents.VodkaAndTonic = VodkaAndTonic;
Object.assign(VodkaAndTonic.prototype, {
	name: "Vodka and Tonic",
	description: "For when a gin and tonic isn't Russian enough.",
	color: [0,0.39,0.78],
	boozepwr: 70,
	taste_description: "tart bitterness",
	glass_icon_state: "vodkatonicglass",
	glass_name: "Vodka and Tonic",
	glass_desc: "For when a gin and tonic isn't Russian enough."
});

class GinFizz extends Ethanol {} // /datum/reagent/consumable/ethanol/ginfizz
module.exports.reagents.GinFizz = GinFizz;
Object.assign(GinFizz.prototype, {
	name: "Gin Fizz",
	description: "Refreshingly lemony, deliciously dry.",
	color: [0.4,0.26,0],
	boozepwr: 45,
	taste_description: "dry, tart lemons",
	glass_icon_state: "ginfizzglass",
	glass_name: "Gin Fizz",
	glass_desc: "Refreshingly lemony, deliciously dry."
});

class BahamaMama extends Ethanol {} // /datum/reagent/consumable/ethanol/bahama_mama
module.exports.reagents.BahamaMama = BahamaMama;
Object.assign(BahamaMama.prototype, {
	name: "Bahama Mama",
	description: "Tropical cocktail.",
	color: [1,0.5,0.23],
	boozepwr: 35,
	taste_description: "lime and orange",
	glass_icon_state: "bahama_mama",
	glass_name: "Bahama Mama",
	glass_desc: "Tropical cocktail."
});

class Singulo extends Ethanol {} // /datum/reagent/consumable/ethanol/singulo
module.exports.reagents.Singulo = Singulo;
Object.assign(Singulo.prototype, {
	name: "Singulo",
	description: "A blue-space beverage!",
	color: [0.18,0.4,0.44],
	boozepwr: 35,
	taste_description: "concentrated matter",
	glass_icon_state: "singulo",
	glass_name: "Singulo",
	glass_desc: "A blue-space beverage."
});

class Sbiten extends Ethanol {} // /datum/reagent/consumable/ethanol/sbiten
module.exports.reagents.Sbiten = Sbiten;
Object.assign(Sbiten.prototype, {
	name: "Sbiten",
	description: "A spicy Vodka! Might be a little hot for the little guys!",
	color: [0.4,0.26,0],
	boozepwr: 70,
	taste_description: "hot and spice",
	glass_icon_state: "sbitenglass",
	glass_name: "Sbiten",
	glass_desc: "A spicy mix of Vodka and Spice. Very hot."
});

class RedMead extends Ethanol {} // /datum/reagent/consumable/ethanol/red_mead
module.exports.reagents.RedMead = RedMead;
Object.assign(RedMead.prototype, {
	name: "Red Mead",
	description: "The true Viking drink! Even though it has a strange red color.",
	color: [0.78,0.24,0],
	boozepwr: 51,
	taste_description: "sweet and salty alcohol",
	glass_icon_state: "red_meadglass",
	glass_name: "Red Mead",
	glass_desc: "A True Viking's Beverage, though its color is strange."
});

class Mead extends Ethanol {} // /datum/reagent/consumable/ethanol/mead
module.exports.reagents.Mead = Mead;
Object.assign(Mead.prototype, {
	name: "Mead",
	description: "A Viking drink, though a cheap one.",
	color: [0.4,0.26,0],
	nutriment_factor: 0.5,
	boozepwr: 50,
	taste_description: "sweet, sweet alcohol",
	glass_icon_state: "meadglass",
	glass_name: "Mead",
	glass_desc: "A Viking's Beverage, though a cheap one."
});

class IcedBeer extends Ethanol {} // /datum/reagent/consumable/ethanol/iced_beer
module.exports.reagents.IcedBeer = IcedBeer;
Object.assign(IcedBeer.prototype, {
	name: "Iced Beer",
	description: "A beer which is so cold the air around it freezes.",
	color: [0.4,0.26,0],
	boozepwr: 15,
	taste_description: "refreshingly cold",
	glass_icon_state: "iced_beerglass",
	glass_name: "Iced Beer",
	glass_desc: "A beer so frosty, the air around it freezes."
});

class Grog extends Ethanol {} // /datum/reagent/consumable/ethanol/grog
module.exports.reagents.Grog = Grog;
Object.assign(Grog.prototype, {
	name: "Grog",
	description: "Watered down rum, Nanotrasen approves!",
	color: [0.4,0.26,0],
	boozepwr: 1,
	taste_description: "a poor excuse for alcohol",
	glass_icon_state: "grogglass",
	glass_name: "Grog",
	glass_desc: "A fine and cepa drink for Space."
});

class Aloe extends Ethanol {} // /datum/reagent/consumable/ethanol/aloe
module.exports.reagents.Aloe = Aloe;
Object.assign(Aloe.prototype, {
	name: "Aloe",
	description: "So very, very, very good.",
	color: [0.4,0.26,0],
	boozepwr: 35,
	taste_description: "sweet 'n creamy",
	glass_icon_state: "aloe",
	glass_name: "Aloe",
	glass_desc: "Very, very, very good."
});

class Andalusia extends Ethanol {} // /datum/reagent/consumable/ethanol/andalusia
module.exports.reagents.Andalusia = Andalusia;
Object.assign(Andalusia.prototype, {
	name: "Andalusia",
	description: "A nice, strangely named drink.",
	color: [0.4,0.26,0],
	boozepwr: 40,
	taste_description: "lemons",
	glass_icon_state: "andalusia",
	glass_name: "Andalusia",
	glass_desc: "A nice, strangely named drink."
});

class AlliesCocktail extends Ethanol {} // /datum/reagent/consumable/ethanol/alliescocktail
module.exports.reagents.AlliesCocktail = AlliesCocktail;
Object.assign(AlliesCocktail.prototype, {
	name: "Allies Cocktail",
	description: "A drink made from your allies. Not as sweet as those made from your enemies.",
	color: [0.4,0.26,0],
	boozepwr: 45,
	taste_description: "bitter yet free",
	glass_icon_state: "alliescocktail",
	glass_name: "Allies cocktail",
	glass_desc: "A drink made from your allies."
});

class AcidSpit extends Ethanol {} // /datum/reagent/consumable/ethanol/acid_spit
module.exports.reagents.AcidSpit = AcidSpit;
Object.assign(AcidSpit.prototype, {
	name: "Acid Spit",
	description: "A drink for the daring, can be deadly if incorrectly prepared!",
	color: [0.21,0.31,0],
	boozepwr: 80,
	taste_description: "stomach acid",
	glass_icon_state: "acidspitglass",
	glass_name: "Acid Spit",
	glass_desc: "A drink from Nanotrasen. Made from live aliens."
});

class Amasec extends Ethanol {} // /datum/reagent/consumable/ethanol/amasec
module.exports.reagents.Amasec = Amasec;
Object.assign(Amasec.prototype, {
	name: "Amasec",
	description: "Official drink of the Nanotrasen Gun-Club!",
	color: [0.4,0.26,0],
	boozepwr: 35,
	taste_description: "dark and metallic",
	glass_icon_state: "amasecglass",
	glass_name: "Amasec",
	glass_desc: "Always handy before COMBAT!!!"
});

class ChangelingSting extends Ethanol {} // /datum/reagent/consumable/ethanol/changelingsting
module.exports.reagents.ChangelingSting = ChangelingSting;
Object.assign(ChangelingSting.prototype, {
	name: "Changeling Sting",
	description: "You take a tiny sip and feel a burning sensation...",
	color: [0.18,0.4,0.44],
	boozepwr: 95,
	taste_description: "your brain coming out your nose",
	glass_icon_state: "changelingsting",
	glass_name: "Changeling Sting",
	glass_desc: "A stingy drink."
});

class IrishCarBomb extends Ethanol {} // /datum/reagent/consumable/ethanol/irishcarbomb
module.exports.reagents.IrishCarBomb = IrishCarBomb;
Object.assign(IrishCarBomb.prototype, {
	name: "Irish Car Bomb",
	description: "Mmm, tastes like chocolate cake...",
	color: [0.18,0.4,0.44],
	boozepwr: 25,
	taste_description: "delicious anger",
	glass_icon_state: "irishcarbomb",
	glass_name: "Irish Car Bomb",
	glass_desc: "An Irish car bomb."
});

class SyndicateBomb extends Ethanol {} // /datum/reagent/consumable/ethanol/syndicatebomb
module.exports.reagents.SyndicateBomb = SyndicateBomb;
Object.assign(SyndicateBomb.prototype, {
	name: "Syndicate Bomb",
	description: "Tastes like terrorism!",
	color: [0.18,0.4,0.44],
	boozepwr: 90,
	taste_description: "purified antagonism",
	glass_icon_state: "syndicatebomb",
	glass_name: "Syndicate Bomb",
	glass_desc: "A syndicate bomb."
});

class ErikaSurprise extends Ethanol {} // /datum/reagent/consumable/ethanol/erikasurprise
module.exports.reagents.ErikaSurprise = ErikaSurprise;
Object.assign(ErikaSurprise.prototype, {
	name: "Erika Surprise",
	description: "The surprise is, it's green!",
	color: [0.18,0.4,0.44],
	boozepwr: 35,
	taste_description: "tartness and bananas",
	glass_icon_state: "erikasurprise",
	glass_name: "Erika Surprise",
	glass_desc: "The surprise is, it's green!"
});

class DriestMartini extends Ethanol {} // /datum/reagent/consumable/ethanol/driestmartini
module.exports.reagents.DriestMartini = DriestMartini;
Object.assign(DriestMartini.prototype, {
	name: "Driest Martini",
	description: "Only for the experienced. You think you see sand floating in the glass.",
	nutriment_factor: 0.5,
	color: [0.18,0.4,0.44],
	boozepwr: 65,
	taste_description: "a beach",
	glass_icon_state: "driestmartiniglass",
	glass_name: "Driest Martini",
	glass_desc: "Only for the experienced. You think you see sand floating in the glass."
});

class BananaHonk extends Ethanol {} // /datum/reagent/consumable/ethanol/bananahonk
module.exports.reagents.BananaHonk = BananaHonk;
Object.assign(BananaHonk.prototype, {
	name: "Banana Honk",
	description: "A drink from Clown Heaven.",
	nutriment_factor: 0.5,
	color: [1,1,0.57],
	boozepwr: 60,
	taste_description: "a bad joke",
	glass_icon_state: "bananahonkglass",
	glass_name: "Banana Honk",
	glass_desc: "A drink from Clown Heaven."
});

class Silencer extends Ethanol {} // /datum/reagent/consumable/ethanol/silencer
module.exports.reagents.Silencer = Silencer;
Object.assign(Silencer.prototype, {
	name: "Silencer",
	description: "A drink from Mime Heaven.",
	nutriment_factor: 0.5,
	color: [0.4,0.26,0],
	boozepwr: 59,
	taste_description: "a pencil eraser",
	glass_icon_state: "silencerglass",
	glass_name: "Silencer",
	glass_desc: "A drink from Mime Heaven."
});

class DrunkenBlumpkin extends Ethanol {} // /datum/reagent/consumable/ethanol/drunkenblumpkin
module.exports.reagents.DrunkenBlumpkin = DrunkenBlumpkin;
Object.assign(DrunkenBlumpkin.prototype, {
	name: "Drunken Blumpkin",
	description: "A weird mix of whiskey and blumpkin juice.",
	color: [0.12,0.63,1],
	boozepwr: 50,
	taste_description: "molasses and a mouthful of pool water",
	glass_icon_state: "drunkenblumpkin",
	glass_name: "Drunken Blumpkin",
	glass_desc: "A drink for the drunks."
});

class WhiskeySour extends Ethanol {} // /datum/reagent/consumable/ethanol/whiskey_sour
module.exports.reagents.WhiskeySour = WhiskeySour;
Object.assign(WhiskeySour.prototype, {
	name: "Whiskey Sour",
	description: "Lemon juice/whiskey/sugar mixture. Moderate alcohol content.",
	color: [1,0.79,0.19],
	boozepwr: 35,
	taste_description: "sour lemons",
	glass_icon_state: "whiskey_sour",
	glass_name: "Whiskey Sour",
	glass_desc: "Lemon juice mixed with whiskey and a dash of sugar. Surprisingly satisfying."
});

class HardCider extends Ethanol {} // /datum/reagent/consumable/ethanol/hcider
module.exports.reagents.HardCider = HardCider;
Object.assign(HardCider.prototype, {
	name: "Hard Cider",
	description: "Apple juice, for adults.",
	color: [0.8,0.41,0.22],
	nutriment_factor: 0.5,
	boozepwr: 25,
	taste_description: "apples",
	glass_icon_state: "whiskeyglass",
	glass_name: "Hard Cider",
	glass_desc: "Tastes like autumn.",
	shot_glass_icon_state: "shotglassbrown"
});

class FetchingFizz extends Ethanol {} // /datum/reagent/consumable/ethanol/fetching_fizz
module.exports.reagents.FetchingFizz = FetchingFizz;
Object.assign(FetchingFizz.prototype, {
	name: "Fetching Fizz",
	description: "Whiskey sour/iron/uranium mixture resulting in a highly magnetic slurry. Mild alcohol content.",
	color: [1,0.36,0.06],
	boozepwr: 10,
	metabolization_rate: 0.05,
	taste_description: "charged metal",
	glass_icon_state: "fetching_fizz",
	glass_name: "Fetching Fizz",
	glass_desc: "Induces magnetism in the imbiber. Started as a barroom prank but evolved to become popular with miners and scrappers. Metallic aftertaste."
});

class HeartyPunch extends Ethanol {} // /datum/reagent/consumable/ethanol/hearty_punch
module.exports.reagents.HeartyPunch = HeartyPunch;
Object.assign(HeartyPunch.prototype, {
	name: "Hearty Punch",
	description: "Brave bull/syndicate bomb/absinthe mixture resulting in an energizing beverage. Mild alcohol content.",
	color: [0.55,0,0],
	boozepwr: 10,
	metabolization_rate: 0.05,
	taste_description: "bravado in the face of disaster",
	glass_icon_state: "hearty_punch",
	glass_name: "Hearty Punch",
	glass_desc: "Aromatic beverage served piping hot. According to folk tales it can almost wake the dead."
});

class BacchusBlessing extends Ethanol {} // /datum/reagent/consumable/ethanol/bacchus_blessing
module.exports.reagents.BacchusBlessing = BacchusBlessing;
Object.assign(BacchusBlessing.prototype, {
	name: "Bacchus' Blessing",
	description: "Unidentifiable mixture. Unmeasurably high alcohol content.",
	color: [0.2,0.07,0.01],
	boozepwr: 300,
	taste_description: "a wall of bricks",
	glass_icon_state: "glass_brown2",
	glass_name: "Bacchus' Blessing",
	glass_desc: "You didn't think it was possible for a liquid to be so utterly revolting. Are you sure about this...?"
});

class AtomicBomb extends Ethanol {} // /datum/reagent/consumable/ethanol/atomicbomb
module.exports.reagents.AtomicBomb = AtomicBomb;
Object.assign(AtomicBomb.prototype, {
	name: "Atomic Bomb",
	description: "Nuclear proliferation never tasted so good.",
	color: [0.4,0.39,0],
	boozepwr: 0,
	taste_description: "da bomb",
	glass_icon_state: "atomicbombglass",
	glass_name: "Atomic Bomb",
	glass_desc: "Nanotrasen cannot take legal responsibility for your actions after imbibing."
});

class PanGalacticGargleBlaster extends Ethanol {} // /datum/reagent/consumable/ethanol/gargle_blaster
module.exports.reagents.PanGalacticGargleBlaster = PanGalacticGargleBlaster;
Object.assign(PanGalacticGargleBlaster.prototype, {
	name: "Pan-Galactic Gargle Blaster",
	description: "Whoah, this stuff looks volatile!",
	color: [0.4,0.26,0],
	boozepwr: 0,
	taste_description: "your brains smashed out by a lemon wrapped around a gold brick",
	glass_icon_state: "gargleblasterglass",
	glass_name: "Pan-Galactic Gargle Blaster",
	glass_desc: "Like having your brain smashed out by a slice of lemon wrapped around a large gold brick."
});

class Neurotoxin extends Ethanol {} // /datum/reagent/consumable/ethanol/neurotoxin
module.exports.reagents.Neurotoxin = Neurotoxin;
Object.assign(Neurotoxin.prototype, {
	name: "Neurotoxin",
	description: "A strong neurotoxin that puts the subject into a death-like state.",
	color: [0.18,0.18,0.38],
	boozepwr: 0,
	taste_description: "a numbing sensation",
	glass_icon_state: "neurotoxinglass",
	glass_name: "Neurotoxin",
	glass_desc: "A drink that is guaranteed to knock you silly."
});

class HippiesDelight extends Ethanol {} // /datum/reagent/consumable/ethanol/hippies_delight
module.exports.reagents.HippiesDelight = HippiesDelight;
Object.assign(HippiesDelight.prototype, {
	name: "Hippie's Delight",
	description: "You just don't get it maaaan.",
	color: [0.4,0.26,0],
	nutriment_factor: 0,
	boozepwr: 0,
	metabolization_rate: 0.1,
	taste_description: "giving peace a chance",
	glass_icon_state: "hippiesdelightglass",
	glass_name: "Hippie's Delight",
	glass_desc: "A drink enjoyed by people during the 1960's."
});

class Eggnog extends Ethanol {} // /datum/reagent/consumable/ethanol/eggnog
module.exports.reagents.Eggnog = Eggnog;
Object.assign(Eggnog.prototype, {
	name: "Eggnog",
	description: "For enjoying the most wonderful time of the year.",
	color: [0.99,0.99,0.78],
	nutriment_factor: 1,
	boozepwr: 1,
	taste_description: "custard and alcohol",
	glass_icon_state: "glass_yellow",
	glass_name: "Eggnog",
	glass_desc: "For enjoying the most wonderful time of the year."
});
