'use strict';

const {Reagent, ReagentReaction} = require('../reagent.js');

module.exports.reagents = {};

class Water extends Reagent {}
module.exports.reagents.Water = Water;
Object.assign(Water.prototype, {
	name: "Water",
	description: "An ubiquitous chemical substance that is composed of hydrogen and oxygen.",
	color: [0.67,0.67,0.67,0.47], // rgb: 170, 170, 170, 77 (alpha)
	taste_description: "water",
	cooling_temperature: 2,
	glass_icon_state: "glass_clear",
	glass_name: "glass of Water",
	glass_desc: "The father of all refreshments.",
	shot_glass_icon_state: "shotglassclear"
});

class Oxygen extends Reagent {}
module.exports.reagents.Oxygen = Oxygen;
Object.assign(Oxygen.prototype, {
	name: "Oxygen",
	description: "A colorless, odorless gas. Grows on trees but is still pretty valuable.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5], // rgb: 128, 128, 128
	taste_mult: 0, // oderless and tasteless
});

class Copper extends Reagent {}
module.exports.reagents.Copper = Copper;
Object.assign(Copper.prototype, {
	name: "Copper",
	description: "A highly ductile metal. Things made out of copper aren't very durable, but it makes a decent material for electrical wiring.",
	reagent_state: "solid",
	color: [0.43,0.23,0.03], // rgb: 110, 59, 8
	taste_description: "metal"
});

class Nitrogen extends Reagent {}
module.exports.reagents.Nitrogen = Nitrogen;
Object.assign(Nitrogen.prototype, {
	name: "Nitrogen",
	description: "A colorless, odorless, tasteless gas. A simple asphyxiant that can silently displace vital oxygen.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5], // rgb: 128, 128, 128
	taste_mult: 0
});

class Hydrogen extends Reagent {}
module.exports.reagents.Hydrogen = Hydrogen;
Object.assign(Hydrogen.prototype, {
	name: "Hydrogen",
	description: "A colorless, odorless, nonmetallic, tasteless, highly combustible diatomic gas.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5], // rgb: 128, 128, 128
	taste_mult: 0
});

class Potassium extends Reagent {}
module.exports.reagents.Potassium = Potassium;
Object.assign(Potassium.prototype, {
	name: "Potassium",
	description: "A soft, low-melting solid that can easily be cut with a knife. Reacts violently with water.",
	reagent_state: "solid",
	color: [0.63,0.63,0.63], // rgb: 160, 160, 160
	taste_description: "sweetness"
});

class Mercury extends Reagent {}
module.exports.reagents.Mercury = Mercury;
Object.assign(Mercury.prototype, {
	name: "Mercury",
	description: "A curious metal that's a liquid at room temperature. Neurodegenerative and very bad for the mind.",
	color: [0.28,0.28,0.28], // rgb: 72, 72, 72A
	taste_mult: 0, // apparently tasteless.
});

class Sulfur extends Reagent {}
module.exports.reagents.Sulfur = Sulfur;
Object.assign(Sulfur.prototype, {
	name: "Sulfur",
	description: "A sickly yellow solid mostly known for its nasty smell. It's actually much more helpful than it looks in biochemisty.",
	reagent_state: "solid",
	color: [0.75,0.55,0], // rgb: 191, 140, 0
	taste_description: "rotten eggs"
});

class Carbon extends Reagent {}
module.exports.reagents.Carbon = Carbon;
Object.assign(Carbon.prototype, {
	name: "Carbon",
	description: "A crumbly black solid that, while unexciting on an physical level, forms the base of all known life. Kind of a big deal.",
	reagent_state: "solid",
	color: [0.11,0.07,0], // rgb: 30, 20, 0
	taste_description: "sour chalk"
});

class Chlorine extends Reagent {}
module.exports.reagents.Chlorine = Chlorine;
Object.assign(Chlorine.prototype, {
	name: "Chlorine",
	description: "A pale yellow gas that's well known as an oxidizer. While it forms many harmless molecules in its elemental form it is far from harmless.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5], // rgb: 128, 128, 128
	taste_description: "chlorine"
});

class Fluorine extends Reagent {}
module.exports.reagents.Fluorine = Fluorine;
Object.assign(Fluorine.prototype, {
	name: "Fluorine",
	description: "A comically-reactive chemical element. The universe does not want this stuff to exist in this form in the slightest.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5], // rgb: 128, 128, 128
	taste_description: "acid"
});

class Sodium extends Reagent {}
module.exports.reagents.Sodium = Sodium;
Object.assign(Sodium.prototype, {
	name: "Sodium",
	description: "A soft silver metal that can easily be cut with a knife. It's not salt just yet, so refrain from putting in on your chips.",
	reagent_state: "solid",
	color: [0.5,0.5,0.5], // rgb: 128, 128, 128
	taste_description: "salty metal"
});

class Phosphorus extends Reagent {}
module.exports.reagents.Phosphorus = Phosphorus;
Object.assign(Phosphorus.prototype, {
	name: "Phosphorus",
	description: "A ruddy red powder that burns readily. Though it comes in many colors, the general theme is always the same.",
	reagent_state: "solid",
	color: [0.51,0.16,0.16], // rgb: 131, 40, 40
	taste_description: "vinegar"
});

class Lithium extends Reagent {}
module.exports.reagents.Lithium = Lithium;
Object.assign(Lithium.prototype, {
	name: "Lithium",
	description: "A silver metal, its claim to fame is its remarkably low density. Using it is a bit too effective in calming oneself down.",
	reagent_state: "solid",
	color: [0.5,0.5,0.5], // rgb: 128, 128, 128
	taste_description: "metal"
});

class Radium extends Reagent {}
module.exports.reagents.Radium = Radium;
Object.assign(Radium.prototype, {
	name: "Radium",
	description: "Radium is an alkaline earth metal. It is extremely radioactive.",
	reagent_state: "solid",
	color: [0.78,0.78,0.78], // rgb: 199,199,199
	taste_description: "the colour blue and regret"
});

class Iron extends Reagent {}
module.exports.reagents.Iron = Iron;
Object.assign(Iron.prototype, {
	name: "Iron",
	description: "Pure iron is a metal.",
	reagent_state: "solid",
	taste_description: "iron",
	color: [0.78,0.65,0.86] // rgb: 200, 165, 220
});

class Silver extends Reagent {}
module.exports.reagents.Silver = Silver;
Object.assign(Silver.prototype, {
	name: "Silver",
	description: "A soft, white, lustrous transition metal, it has the highest electrical conductivity of any element and the highest thermal conductivity of any metal.",
	reagent_state: "solid",
	color: [0.82,0.82,0.82], // rgb: 208, 208, 208
	taste_description: "expensive yet reasonable metal"
});

class Aluminium extends Reagent {}
module.exports.reagents.Aluminium = Aluminium;
Object.assign(Aluminium.prototype, {
	name: "Aluminium",
	description: "A silvery white and ductile member of the boron group of chemical elements.",
	reagent_state: "solid",
	color: [0.66,0.66,0.66], // rgb: 168, 168, 168
	taste_description: "metal"
});

class Silicon extends Reagent {}
module.exports.reagents.Silicon = Silicon;
Object.assign(Silicon.prototype, {
	name: "Silicon",
	description: "A tetravalent metalloid, silicon is less reactive than its chemical analog carbon.",
	reagent_state: "solid",
	color: [0.66,0.66,0.66], // rgb: 168, 168, 168
	taste_mult: 0
});

class WeldingFuel extends Reagent {}
module.exports.reagents.WeldingFuel = WeldingFuel;
Object.assign(WeldingFuel.prototype, {
	name: "Welding fuel",
	description: "Required for welders. Flamable.",
	color: [0.4,0,0], // rgb: 102, 0, 0
	taste_description: "gross metal",
	glass_icon_state: "dr_gibb_glass",
	glass_name: "glass of welder fuel",
	glass_desc: "Unless you're an industrial tool, this is probably not safe for consumption."
});

class StablePlasma extends Reagent {}
module.exports.reagents.StablePlasma = StablePlasma;
Object.assign(StablePlasma.prototype, {
	name: "Stable Plasma",
	description: "Non-flammable plasma locked into a liquid form that cannot ignite or become gaseous/solid.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "bitterness",
	taste_mult: 1.5
});

class Iodine extends Reagent {}
module.exports.reagents.Iodine = Iodine;
Object.assign(Iodine.prototype, {
	name: "Iodine",
	description: "Commonly added to table salt as a nutrient. On its own it tastes far less pleasing.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "metal"
});

class Bromine extends Reagent {}
module.exports.reagents.Bromine = Bromine;
Object.assign(Bromine.prototype, {
	name: "Bromine",
	description: "A brownish liquid that's highly reactive. Useful for stopping free radicals, but not intended for human consumption.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "chemicals"
});

module.exports.reagent_reactions = [
	new ReagentReaction(
		{
			results: {"Bromine": 3},
			required_reagents: {"Carbon": 1, "Oxygen": 1, "Water": 1},
			min_temp: 100
		}
	)
];
