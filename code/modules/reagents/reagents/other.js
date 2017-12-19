'use strict';

const {Reagent} = require('../reagent.js');
const {Synaptizine, Omnizine} = require('./medicine.js').reagents;
module.exports.reagents = {};

class FlightPotion extends Reagent {} // /datum/reagent/flightpotion
module.exports.reagents.FlightPotion = FlightPotion;
Object.assign(FlightPotion.prototype, {
	name: "Flight Potion",
	description: "Strange mutagenic compound of unknown origins.",
	reagent_state: "liquid",
	color: [1,0.92,0.92]
});

class Toxin extends Reagent {} // /datum/reagent/toxin
module.exports.reagents.Toxin = Toxin;
Object.assign(Toxin.prototype, {
	name: "Toxin",
	description: "A toxic chemical.",
	color: [0.81,0.21,0],
	taste_description: "bitterness",
	taste_mult: 1.2,
	toxpwr: 1.5
});

class LeaperVenom extends Toxin {} // /datum/reagent/toxin/leaper_venom
module.exports.reagents.LeaperVenom = LeaperVenom;
Object.assign(LeaperVenom.prototype, {
	name: "Leaper venom",
	description: "A toxin spat out by leapers that, while harmless in small doses, quickly creates a toxic reaction if too much is in the body.",
	color: [0.5,0.12,0.16],
	toxpwr: 0,
	taste_description: "french cuisine",
	taste_mult: 1.3
});

class Consumable extends Reagent {} // /datum/reagent/consumable
module.exports.Consumable = Consumable;
Object.assign(Consumable.prototype, {
	name: "Consumable",
	taste_description: "generic food",
	taste_mult: 4,
	nutriment_factor: 0.5
});

class Blood extends Reagent {} // /datum/reagent/blood
module.exports.reagents.Blood = Blood;
Object.assign(Blood.prototype, {
	name: "Blood",
	color: [0.78,0,0],
	metabolization_rate: 5,
	taste_description: "iron",
	taste_mult: 1.3,
	glass_icon_state: "glass_red",
	glass_name: "glass of tomato juice",
	glass_desc: "Are you sure this is tomato juice?",
	shot_glass_icon_state: "shotglassred"
});

class LiquidGibs extends Reagent {} // /datum/reagent/liquidgibs
module.exports.reagents.LiquidGibs = LiquidGibs;
Object.assign(LiquidGibs.prototype, {
	name: "Liquid gibs",
	color: [1,0.6,0.4],
	description: "You don't even want to think about what's in here.",
	taste_description: "gross iron",
	shot_glass_icon_state: "shotglassred"
});

class Vaccine extends Reagent {} // /datum/reagent/vaccine
module.exports.reagents.Vaccine = Vaccine;
Object.assign(Vaccine.prototype, {
	name: "Vaccine",
	color: [0.78,0.06,0.25],
	taste_description: "slime"
});

class Water extends Reagent {} // /datum/reagent/water
module.exports.reagents.Water = Water;
Object.assign(Water.prototype, {
	name: "Water",
	description: "An ubiquitous chemical substance that is composed of hydrogen and oxygen.",
	color: [0.67,0.67,0.67,0.47],
	taste_description: "water",
	cooling_temperature: 2,
	glass_icon_state: "glass_clear",
	glass_name: "glass of Water",
	glass_desc: "The father of all refreshments.",
	shot_glass_icon_state: "shotglassclear"
});

class HolyWater extends Water {} // /datum/reagent/water/holywater
module.exports.reagents.HolyWater = HolyWater;
Object.assign(HolyWater.prototype, {
	name: "Holy Water",
	description: "Water blessed by some deity.",
	color: [0.88,0.91,0.94],
	glass_icon_state: "glass_clear",
	glass_name: "glass of Holy Water",
	glass_desc: "A glass of holy water."
});

class WeldingFuel extends Reagent {} // /datum/reagent/fuel
module.exports.reagents.WeldingFuel = WeldingFuel;
Object.assign(WeldingFuel.prototype, {
	name: "Welding fuel",
	description: "Required for welders. Flamable.",
	color: [0.4,0,0],
	taste_description: "gross metal",
	glass_icon_state: "dr_gibb_glass",
	glass_name: "glass of welder fuel",
	glass_desc: "Unless you're an industrial tool, this is probably not safe for consumption."
});

class UnholyWater extends WeldingFuel {} // /datum/reagent/fuel/unholywater
module.exports.reagents.UnholyWater = UnholyWater;
Object.assign(UnholyWater.prototype, {
	name: "Unholy Water",
	description: "Something that shouldn't exist on this plane of existence.",
	taste_description: "suffering"
});

class HellWater extends Reagent {} // /datum/reagent/hellwater
module.exports.reagents.HellWater = HellWater;
Object.assign(HellWater.prototype, {
	name: "Hell Water",
	description: "YOUR FLESH! IT BURNS!",
	taste_description: "burning"
});

class Godblood extends Omnizine {} // /datum/reagent/medicine/omnizine/godblood
module.exports.reagents.Godblood = Godblood;
Object.assign(Godblood.prototype, {
	name: "Godblood",
	description: "Slowly heals all damage types. Has a rather high overdose threshold. Glows with mysterious power.",
	overdose_threshold: 150
});

class SpaceLube extends Reagent {} // /datum/reagent/lube
module.exports.reagents.SpaceLube = SpaceLube;
Object.assign(SpaceLube.prototype, {
	name: "Space Lube",
	description: "Lubricant is a substance introduced between two moving surfaces to reduce the friction and wear between them. giggity.",
	color: [0,0.61,0.66],
	taste_description: "cherry"
});

class SprayTan extends Reagent {} // /datum/reagent/spraytan
module.exports.reagents.SprayTan = SprayTan;
Object.assign(SprayTan.prototype, {
	name: "Spray Tan",
	description: "A substance applied to the skin to darken the skin.",
	color: [1,0.75,0.5],
	metabolization_rate: 5,
	overdose_threshold: 11,
	taste_description: "sour oranges"
});

class StableMutationToxin extends Reagent {} // /datum/reagent/stableslimetoxin
module.exports.reagents.StableMutationToxin = StableMutationToxin;
Object.assign(StableMutationToxin.prototype, {
	name: "Stable Mutation Toxin",
	description: "A humanizing toxin produced by slimes.",
	color: [0.37,1,0.23],
	metabolization_rate: Infinity,
	taste_description: "slime",
	mutationtext: "<span class='danger'>The pain subsides. You feel... human.</span>"
});

class MutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/classic
module.exports.reagents.MutationToxin = MutationToxin;
Object.assign(MutationToxin.prototype, {
	name: "Mutation Toxin",
	description: "A corruptive toxin produced by slimes.",
	color: [0.07,0.74,0.37],
	mutationtext: "<span class='danger'>The pain subsides. Your whole body feels like slime.</span>"
});

class LizardMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/lizard
module.exports.reagents.LizardMutationToxin = LizardMutationToxin;
Object.assign(LizardMutationToxin.prototype, {
	name: "Lizard Mutation Toxin",
	description: "A lizarding toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... scaly.</span>"
});

class FlyMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/fly
module.exports.reagents.FlyMutationToxin = FlyMutationToxin;
Object.assign(FlyMutationToxin.prototype, {
	name: "Fly Mutation Toxin",
	description: "An insectifying toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... buzzy.</span>"
});

class PodpersonMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/pod
module.exports.reagents.PodpersonMutationToxin = PodpersonMutationToxin;
Object.assign(PodpersonMutationToxin.prototype, {
	name: "Podperson Mutation Toxin",
	description: "A vegetalizing toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... plantlike.</span>"
});

class ImperfectMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/jelly
module.exports.reagents.ImperfectMutationToxin = ImperfectMutationToxin;
Object.assign(ImperfectMutationToxin.prototype, {
	name: "Imperfect Mutation Toxin",
	description: "An jellyfying toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... wobbly.</span>"
});

class GolemMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/golem
module.exports.reagents.GolemMutationToxin = GolemMutationToxin;
Object.assign(GolemMutationToxin.prototype, {
	name: "Golem Mutation Toxin",
	description: "A crystal toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... rocky.</span>"
});

class AbductorMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/abductor
module.exports.reagents.AbductorMutationToxin = AbductorMutationToxin;
Object.assign(AbductorMutationToxin.prototype, {
	name: "Abductor Mutation Toxin",
	description: "An alien toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... alien.</span>"
});

class AndroidMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/android
module.exports.reagents.AndroidMutationToxin = AndroidMutationToxin;
Object.assign(AndroidMutationToxin.prototype, {
	name: "Android Mutation Toxin",
	description: "A robotic toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... artificial.</span>"
});

class SkeletonMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/skeleton
module.exports.reagents.SkeletonMutationToxin = SkeletonMutationToxin;
Object.assign(SkeletonMutationToxin.prototype, {
	name: "Skeleton Mutation Toxin",
	description: "A scary toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... spooky.</span>"
});

class ZombieMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/zombie
module.exports.reagents.ZombieMutationToxin = ZombieMutationToxin;
Object.assign(ZombieMutationToxin.prototype, {
	name: "Zombie Mutation Toxin",
	description: "An undead toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... undead.</span>"
});

class AshMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/ash
module.exports.reagents.AshMutationToxin = AshMutationToxin;
Object.assign(AshMutationToxin.prototype, {
	name: "Ash Mutation Toxin",
	description: "An ashen toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... savage.</span>"
});

class ShadowMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/shadow
module.exports.reagents.ShadowMutationToxin = ShadowMutationToxin;
Object.assign(ShadowMutationToxin.prototype, {
	name: "Shadow Mutation Toxin",
	description: "A dark toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... darker.</span>"
});

class PlasmaMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/plasma
module.exports.reagents.PlasmaMutationToxin = PlasmaMutationToxin;
Object.assign(PlasmaMutationToxin.prototype, {
	name: "Plasma Mutation Toxin",
	description: "A plasma-based toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... flammable.</span>"
});

class UnstableMutationToxin extends StableMutationToxin {} // /datum/reagent/stableslimetoxin/unstable
module.exports.reagents.UnstableMutationToxin = UnstableMutationToxin;
Object.assign(UnstableMutationToxin.prototype, {
	name: "Unstable Mutation Toxin",
	description: "An unstable and unpredictable corruptive toxin produced by slimes.",
	color: [0.37,1,0.23],
	mutationtext: "<span class='danger'>The pain subsides. You feel... different.</span>"
});

class MulliganToxin extends Reagent {} // /datum/reagent/mulligan
module.exports.reagents.MulliganToxin = MulliganToxin;
Object.assign(MulliganToxin.prototype, {
	name: "Mulligan Toxin",
	description: "This toxin will rapidly change the DNA of human beings. Commonly used by Syndicate spies and assassins in need of an emergency ID change.",
	color: [0.37,1,0.23],
	metabolization_rate: Infinity,
	taste_description: "slime"
});

class AdvancedMutationToxin extends Reagent {} // /datum/reagent/aslimetoxin
module.exports.reagents.AdvancedMutationToxin = AdvancedMutationToxin;
Object.assign(AdvancedMutationToxin.prototype, {
	name: "Advanced Mutation Toxin",
	description: "An advanced corruptive toxin produced by slimes.",
	color: [0.07,0.74,0.37],
	taste_description: "slime"
});

class GluttonysBlessing extends Reagent {} // /datum/reagent/gluttonytoxin
module.exports.reagents.GluttonysBlessing = GluttonysBlessing;
Object.assign(GluttonysBlessing.prototype, {
	name: "Gluttony's Blessing",
	description: "An advanced corruptive toxin produced by something terrible.",
	color: [0.37,1,0.23],
	can_synth: 0,
	taste_description: "decay"
});

class Serotrotium extends Reagent {} // /datum/reagent/serotrotium
module.exports.reagents.Serotrotium = Serotrotium;
Object.assign(Serotrotium.prototype, {
	name: "Serotrotium",
	description: "A chemical compound that promotes concentrated production of the serotonin neurotransmitter in humans.",
	color: [0.13,0.13,0.25],
	metabolization_rate: 0.125,
	taste_description: "bitterness"
});

class Oxygen extends Reagent {} // /datum/reagent/oxygen
module.exports.reagents.Oxygen = Oxygen;
Object.assign(Oxygen.prototype, {
	name: "Oxygen",
	description: "A colorless, odorless gas. Grows on trees but is still pretty valuable.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5],
	taste_mult: 0
});

class Copper extends Reagent {} // /datum/reagent/copper
module.exports.reagents.Copper = Copper;
Object.assign(Copper.prototype, {
	name: "Copper",
	description: "A highly ductile metal. Things made out of copper aren't very durable, but it makes a decent material for electrical wiring.",
	reagent_state: "solid",
	color: [0.43,0.23,0.03],
	taste_description: "metal"
});

class Nitrogen extends Reagent {} // /datum/reagent/nitrogen
module.exports.reagents.Nitrogen = Nitrogen;
Object.assign(Nitrogen.prototype, {
	name: "Nitrogen",
	description: "A colorless, odorless, tasteless gas. A simple asphyxiant that can silently displace vital oxygen.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5],
	taste_mult: 0
});

class Hydrogen extends Reagent {} // /datum/reagent/hydrogen
module.exports.reagents.Hydrogen = Hydrogen;
Object.assign(Hydrogen.prototype, {
	name: "Hydrogen",
	description: "A colorless, odorless, nonmetallic, tasteless, highly combustible diatomic gas.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5],
	taste_mult: 0
});

class Potassium extends Reagent {} // /datum/reagent/potassium
module.exports.reagents.Potassium = Potassium;
Object.assign(Potassium.prototype, {
	name: "Potassium",
	description: "A soft, low-melting solid that can easily be cut with a knife. Reacts violently with water.",
	reagent_state: "solid",
	color: [0.63,0.63,0.63],
	taste_description: "sweetness"
});

class Mercury extends Reagent {} // /datum/reagent/mercury
module.exports.reagents.Mercury = Mercury;
Object.assign(Mercury.prototype, {
	name: "Mercury",
	description: "A curious metal that's a liquid at room temperature. Neurodegenerative and very bad for the mind.",
	color: [0.28,0.28,0.28],
	taste_mult: 0
});

class Sulfur extends Reagent {} // /datum/reagent/sulfur
module.exports.reagents.Sulfur = Sulfur;
Object.assign(Sulfur.prototype, {
	name: "Sulfur",
	description: "A sickly yellow solid mostly known for its nasty smell. It's actually much more helpful than it looks in biochemisty.",
	reagent_state: "solid",
	color: [0.75,0.55,0],
	taste_description: "rotten eggs"
});

class Carbon extends Reagent {} // /datum/reagent/carbon
module.exports.reagents.Carbon = Carbon;
Object.assign(Carbon.prototype, {
	name: "Carbon",
	description: "A crumbly black solid that, while unexciting on an physical level, forms the base of all known life. Kind of a big deal.",
	reagent_state: "solid",
	color: [0.11,0.07,0],
	taste_description: "sour chalk"
});

class Chlorine extends Reagent {} // /datum/reagent/chlorine
module.exports.reagents.Chlorine = Chlorine;
Object.assign(Chlorine.prototype, {
	name: "Chlorine",
	description: "A pale yellow gas that's well known as an oxidizer. While it forms many harmless molecules in its elemental form it is far from harmless.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5],
	taste_description: "chlorine"
});

class Fluorine extends Reagent {} // /datum/reagent/fluorine
module.exports.reagents.Fluorine = Fluorine;
Object.assign(Fluorine.prototype, {
	name: "Fluorine",
	description: "A comically-reactive chemical element. The universe does not want this stuff to exist in this form in the slightest.",
	reagent_state: "gas",
	color: [0.5,0.5,0.5],
	taste_description: "acid"
});

class Sodium extends Reagent {} // /datum/reagent/sodium
module.exports.reagents.Sodium = Sodium;
Object.assign(Sodium.prototype, {
	name: "Sodium",
	description: "A soft silver metal that can easily be cut with a knife. It's not salt just yet, so refrain from putting in on your chips.",
	reagent_state: "solid",
	color: [0.5,0.5,0.5],
	taste_description: "salty metal"
});

class Phosphorus extends Reagent {} // /datum/reagent/phosphorus
module.exports.reagents.Phosphorus = Phosphorus;
Object.assign(Phosphorus.prototype, {
	name: "Phosphorus",
	description: "A ruddy red powder that burns readily. Though it comes in many colors, the general theme is always the same.",
	reagent_state: "solid",
	color: [0.51,0.16,0.16],
	taste_description: "vinegar"
});

class Lithium extends Reagent {} // /datum/reagent/lithium
module.exports.reagents.Lithium = Lithium;
Object.assign(Lithium.prototype, {
	name: "Lithium",
	description: "A silver metal, its claim to fame is its remarkably low density. Using it is a bit too effective in calming oneself down.",
	reagent_state: "solid",
	color: [0.5,0.5,0.5],
	taste_description: "metal"
});

class Glycerol extends Reagent {} // /datum/reagent/glycerol
module.exports.reagents.Glycerol = Glycerol;
Object.assign(Glycerol.prototype, {
	name: "Glycerol",
	description: "Glycerol is a simple polyol compound. Glycerol is sweet-tasting and of low toxicity.",
	color: [0.5,0.5,0.5],
	taste_description: "sweetness"
});

class Radium extends Reagent {} // /datum/reagent/radium
module.exports.reagents.Radium = Radium;
Object.assign(Radium.prototype, {
	name: "Radium",
	description: "Radium is an alkaline earth metal. It is extremely radioactive.",
	reagent_state: "solid",
	color: [0.78,0.78,0.78],
	taste_description: "the colour blue and regret"
});

class SpaceCleaner extends Reagent {} // /datum/reagent/space_cleaner
module.exports.reagents.SpaceCleaner = SpaceCleaner;
Object.assign(SpaceCleaner.prototype, {
	name: "Space cleaner",
	description: "A compound used to clean things. Now with 50% more sodium hypochlorite!",
	color: [0.65,0.94,0.93],
	taste_description: "sourness"
});

class Sterilizine extends SpaceCleaner {} // /datum/reagent/space_cleaner/sterilizine
module.exports.reagents.Sterilizine = Sterilizine;
Object.assign(Sterilizine.prototype, {
	name: "Sterilizine",
	description: "Sterilizes wounds in preparation for surgery.",
	color: [0.78,0.65,0.86],
	taste_description: "bitterness"
});

class Iron extends Reagent {} // /datum/reagent/iron
module.exports.reagents.Iron = Iron;
Object.assign(Iron.prototype, {
	name: "Iron",
	description: "Pure iron is a metal.",
	reagent_state: "solid",
	taste_description: "iron",
	color: [0.78,0.65,0.86]
});

class Gold extends Reagent {} // /datum/reagent/gold
module.exports.reagents.Gold = Gold;
Object.assign(Gold.prototype, {
	name: "Gold",
	description: "Gold is a dense, soft, shiny metal and the most malleable and ductile metal known.",
	reagent_state: "solid",
	color: [0.97,0.77,0.19],
	taste_description: "expensive metal"
});

class Silver extends Reagent {} // /datum/reagent/silver
module.exports.reagents.Silver = Silver;
Object.assign(Silver.prototype, {
	name: "Silver",
	description: "A soft, white, lustrous transition metal, it has the highest electrical conductivity of any element and the highest thermal conductivity of any metal.",
	reagent_state: "solid",
	color: [0.82,0.82,0.82],
	taste_description: "expensive yet reasonable metal"
});

class Uranium extends Reagent {} // /datum/reagent/uranium
module.exports.reagents.Uranium = Uranium;
Object.assign(Uranium.prototype, {
	name: "Uranium",
	description: "A silvery-white metallic chemical element in the actinide series, weakly radioactive.",
	reagent_state: "solid",
	color: [0.72,0.72,0.75],
	taste_description: "the inside of a reactor"
});

class BluespaceDust extends Reagent {} // /datum/reagent/bluespace
module.exports.reagents.BluespaceDust = BluespaceDust;
Object.assign(BluespaceDust.prototype, {
	name: "Bluespace Dust",
	description: "A dust composed of microscopic bluespace crystals, with minor space-warping properties.",
	reagent_state: "solid",
	color: [0,0,0.8],
	taste_description: "fizzling blue"
});

class Aluminium extends Reagent {} // /datum/reagent/aluminium
module.exports.reagents.Aluminium = Aluminium;
Object.assign(Aluminium.prototype, {
	name: "Aluminium",
	description: "A silvery white and ductile member of the boron group of chemical elements.",
	reagent_state: "solid",
	color: [0.66,0.66,0.66],
	taste_description: "metal"
});

class Silicon extends Reagent {} // /datum/reagent/silicon
module.exports.reagents.Silicon = Silicon;
Object.assign(Silicon.prototype, {
	name: "Silicon",
	description: "A tetravalent metalloid, silicon is less reactive than its chemical analog carbon.",
	reagent_state: "solid",
	color: [0.66,0.66,0.66],
	taste_mult: 0
});

class EZClean extends SpaceCleaner {} // /datum/reagent/space_cleaner/ez_clean
module.exports.reagents.EZClean = EZClean;
Object.assign(EZClean.prototype, {
	name: "EZ Clean",
	description: "A powerful, acidic cleaner sold by Waffle Co. Affects organic matter while leaving other objects unaffected.",
	metabolization_rate: 0.75,
	taste_description: "acid"
});

class Cryptobiolin extends Reagent {} // /datum/reagent/cryptobiolin
module.exports.reagents.Cryptobiolin = Cryptobiolin;
Object.assign(Cryptobiolin.prototype, {
	name: "Cryptobiolin",
	description: "Cryptobiolin causes confusion and dizziness.",
	color: [0.78,0.65,0.86],
	metabolization_rate: 0.75,
	taste_description: "sourness"
});

class Impedrezene extends Reagent {} // /datum/reagent/impedrezene
module.exports.reagents.Impedrezene = Impedrezene;
Object.assign(Impedrezene.prototype, {
	name: "Impedrezene",
	description: "Impedrezene is a narcotic that impedes one's ability by slowing down the higher brain cell functions.",
	color: [0.78,0.65,0.86],
	taste_description: "numbness"
});

class Nanomachines extends Reagent {} // /datum/reagent/nanites
module.exports.reagents.Nanomachines = Nanomachines;
Object.assign(Nanomachines.prototype, {
	name: "Nanomachines",
	description: "Microscopic construction robots.",
	color: [0.33,0.37,0.4],
	can_synth: 0,
	taste_description: "sludge"
});

class Xenomicrobes extends Reagent {} // /datum/reagent/xenomicrobes
module.exports.reagents.Xenomicrobes = Xenomicrobes;
Object.assign(Xenomicrobes.prototype, {
	name: "Xenomicrobes",
	description: "Microbes with an entirely alien cellular structure.",
	color: [0.33,0.37,0.4],
	can_synth: 0,
	taste_description: "sludge"
});

class TubercleBacillusCosmosisMicrobes extends Reagent {} // /datum/reagent/fungalspores
module.exports.reagents.TubercleBacillusCosmosisMicrobes = TubercleBacillusCosmosisMicrobes;
Object.assign(TubercleBacillusCosmosisMicrobes.prototype, {
	name: "Tubercle bacillus Cosmosis microbes",
	description: "Active fungal spores.",
	color: [0.57,0.82,0.49],
	taste_description: "slime"
});

class Fluorosurfactant extends Reagent {} // /datum/reagent/fluorosurfactant
module.exports.reagents.Fluorosurfactant = Fluorosurfactant;
Object.assign(Fluorosurfactant.prototype, {
	name: "Fluorosurfactant",
	description: "A perfluoronated sulfonic acid that forms a foam when mixed with water.",
	color: [0.62,0.42,0.22],
	taste_description: "metal"
});

class FoamingAgent extends Reagent {} // /datum/reagent/foaming_agent
module.exports.reagents.FoamingAgent = FoamingAgent;
Object.assign(FoamingAgent.prototype, {
	name: "Foaming agent",
	description: "An agent that yields metallic foam when mixed with light metal and a strong acid.",
	reagent_state: "solid",
	color: [0.4,0.29,0.39],
	taste_description: "metal"
});

class SmartFoamingAgent extends Reagent {} // /datum/reagent/smart_foaming_agent
module.exports.reagents.SmartFoamingAgent = SmartFoamingAgent;
Object.assign(SmartFoamingAgent.prototype, {
	name: "Smart foaming agent",
	description: "An agent that yields metallic foam which conforms to area boundaries when mixed with light metal and a strong acid.",
	reagent_state: "solid",
	color: [0.4,0.29,0.39],
	taste_description: "metal"
});

class Ammonia extends Reagent {} // /datum/reagent/ammonia
module.exports.reagents.Ammonia = Ammonia;
Object.assign(Ammonia.prototype, {
	name: "Ammonia",
	description: "A caustic substance commonly used in fertilizer or household cleaners.",
	reagent_state: "gas",
	color: [0.25,0.25,0.19],
	taste_description: "mordant"
});

class Diethylamine extends Reagent {} // /datum/reagent/diethylamine
module.exports.reagents.Diethylamine = Diethylamine;
Object.assign(Diethylamine.prototype, {
	name: "Diethylamine",
	description: "A secondary amine, mildly corrosive.",
	color: [0.38,0.25,0.19],
	taste_description: "iron"
});

class CarbonDioxide extends Reagent {} // /datum/reagent/carbondioxide
module.exports.reagents.CarbonDioxide = CarbonDioxide;
Object.assign(CarbonDioxide.prototype, {
	name: "Carbon Dioxide",
	reagent_state: "gas",
	description: "A gas commonly produced by burning carbon fuels. You're constantly producing this in your lungs.",
	color: [0.69,0.69,0.69],
	taste_description: "something unknowable"
});

class NitrousOxide extends Reagent {} // /datum/reagent/nitrous_oxide
module.exports.reagents.NitrousOxide = NitrousOxide;
Object.assign(NitrousOxide.prototype, {
	name: "Nitrous Oxide",
	description: "A potent oxidizer used as fuel in rockets and as an anaesthetic during surgery.",
	reagent_state: "liquid",
	metabolization_rate: 0.75,
	color: [0.5,0.5,0.5],
	taste_description: "sweetness"
});

class Stimulum extends Reagent {} // /datum/reagent/stimulum
module.exports.reagents.Stimulum = Stimulum;
Object.assign(Stimulum.prototype, {
	name: "Stimulum",
	description: "An unstable experimental gas that greatly increases the energy of those that inhale it",
	reagent_state: "gas",
	metabolization_rate: 0.75,
	color: "E1A116",
	taste_description: "sourness"
});

class Nitryl extends Reagent {} // /datum/reagent/nitryl
module.exports.reagents.Nitryl = Nitryl;
Object.assign(Nitryl.prototype, {
	name: "Nitryl",
	description: "A highly reactive gas that makes you feel faster",
	reagent_state: "gas",
	metabolization_rate: 0.5,
	color: "90560B",
	taste_description: "burning"
});

class ColorfulReagent extends Reagent {} // /datum/reagent/colorful_reagent
module.exports.reagents.ColorfulReagent = ColorfulReagent;
Object.assign(ColorfulReagent.prototype, {
	name: "Colorful Reagent",
	description: "Thoroughly sample the rainbow.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "rainbows"
});

class CrayonPowder extends ColorfulReagent {} // /datum/reagent/colorful_reagent/crayonpowder
module.exports.reagents.CrayonPowder = CrayonPowder;
Object.assign(CrayonPowder.prototype, {
	name: "Crayon Powder",
	description: "A powder made by grinding down crayons, good for colouring chemical reagents.",
	reagent_state: "solid",
	color: [1,1,1],
	taste_description: "the back of class"
});

class RedCrayonPowder extends CrayonPowder {} // /datum/reagent/colorful_reagent/crayonpowder/red
module.exports.reagents.RedCrayonPowder = RedCrayonPowder;
Object.assign(RedCrayonPowder.prototype, {
	name: "Red Crayon Powder",
	color: [0.85,0,0]
});

class OrangeCrayonPowder extends CrayonPowder {} // /datum/reagent/colorful_reagent/crayonpowder/orange
module.exports.reagents.OrangeCrayonPowder = OrangeCrayonPowder;
Object.assign(OrangeCrayonPowder.prototype, {
	name: "Orange Crayon Powder",
	color: [1,0.58,0]
});

class YellowCrayonPowder extends CrayonPowder {} // /datum/reagent/colorful_reagent/crayonpowder/yellow
module.exports.reagents.YellowCrayonPowder = YellowCrayonPowder;
Object.assign(YellowCrayonPowder.prototype, {
	name: "Yellow Crayon Powder",
	color: [1,0.95,0]
});

class GreenCrayonPowder extends CrayonPowder {} // /datum/reagent/colorful_reagent/crayonpowder/green
module.exports.reagents.GreenCrayonPowder = GreenCrayonPowder;
Object.assign(GreenCrayonPowder.prototype, {
	name: "Green Crayon Powder",
	color: [0.66,0.9,0.11]
});

class BlueCrayonPowder extends CrayonPowder {} // /datum/reagent/colorful_reagent/crayonpowder/blue
module.exports.reagents.BlueCrayonPowder = BlueCrayonPowder;
Object.assign(BlueCrayonPowder.prototype, {
	name: "Blue Crayon Powder",
	color: [0,0.72,0.94]
});

class PurpleCrayonPowder extends CrayonPowder {} // /datum/reagent/colorful_reagent/crayonpowder/purple
module.exports.reagents.PurpleCrayonPowder = PurpleCrayonPowder;
Object.assign(PurpleCrayonPowder.prototype, {
	name: "Purple Crayon Powder",
	color: [0.85,0,1]
});

class InvisibleCrayonPowder extends CrayonPowder {} // /datum/reagent/colorful_reagent/crayonpowder/invisible
module.exports.reagents.InvisibleCrayonPowder = InvisibleCrayonPowder;
Object.assign(InvisibleCrayonPowder.prototype, {
	name: "Invisible Crayon Powder",
	color: [1,1,1,0]
});

class BlackCrayonPowder extends CrayonPowder {} // /datum/reagent/colorful_reagent/crayonpowder/black
module.exports.reagents.BlackCrayonPowder = BlackCrayonPowder;
Object.assign(BlackCrayonPowder.prototype, {
	name: "Black Crayon Powder",
	color: [0.11,0.11,0.11]
});

class WhiteCrayonPowder extends CrayonPowder {} // /datum/reagent/colorful_reagent/crayonpowder/white
module.exports.reagents.WhiteCrayonPowder = WhiteCrayonPowder;
Object.assign(WhiteCrayonPowder.prototype, {
	name: "White Crayon Powder",
	color: [1,1,1]
});

class PlantNutriment extends Reagent {} // /datum/reagent/plantnutriment
module.exports.reagents.PlantNutriment = PlantNutriment;
Object.assign(PlantNutriment.prototype, {
	name: "Generic nutriment",
	description: "Some kind of nutriment. You can't really tell what it is. You should probably report it, along with how you obtained it.",
	color: [0,0,0],
	tox_prob: 0,
	taste_description: "plant food"
});

class EZNutrient extends PlantNutriment {} // /datum/reagent/plantnutriment/eznutriment
module.exports.reagents.EZNutrient = EZNutrient;
Object.assign(EZNutrient.prototype, {
	name: "E-Z-Nutrient",
	description: "Cheap and extremely common type of plant nutriment.",
	color: [0.22,0.39,0],
	tox_prob: 10
});

class Left4Zed extends PlantNutriment {} // /datum/reagent/plantnutriment/left4zednutriment
module.exports.reagents.Left4Zed = Left4Zed;
Object.assign(Left4Zed.prototype, {
	name: "Left 4 Zed",
	description: "Unstable nutriment that makes plants mutate more often than usual.",
	color: [0.1,0.12,0.3],
	tox_prob: 25
});

class RobustHarvest extends PlantNutriment {} // /datum/reagent/plantnutriment/robustharvestnutriment
module.exports.reagents.RobustHarvest = RobustHarvest;
Object.assign(RobustHarvest.prototype, {
	name: "Robust Harvest",
	description: "Very potent nutriment that prevents plants from mutating.",
	color: [0.62,0.62,0],
	tox_prob: 15
});

class Oil extends Reagent {} // /datum/reagent/oil
module.exports.reagents.Oil = Oil;
Object.assign(Oil.prototype, {
	name: "Oil",
	description: "Burns in a small smoky fire, mostly used to get Ash.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "oil"
});

class StablePlasma extends Reagent {} // /datum/reagent/stable_plasma
module.exports.reagents.StablePlasma = StablePlasma;
Object.assign(StablePlasma.prototype, {
	name: "Stable Plasma",
	description: "Non-flammable plasma locked into a liquid form that cannot ignite or become gaseous/solid.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "bitterness",
	taste_mult: 1.5
});

class Iodine extends Reagent {} // /datum/reagent/iodine
module.exports.reagents.Iodine = Iodine;
Object.assign(Iodine.prototype, {
	name: "Iodine",
	description: "Commonly added to table salt as a nutrient. On its own it tastes far less pleasing.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "metal"
});

class Carpet extends Reagent {} // /datum/reagent/carpet
module.exports.reagents.Carpet = Carpet;
Object.assign(Carpet.prototype, {
	name: "Carpet",
	description: "For those that need a more creative way to roll out a red carpet.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "carpet"
});

class Bromine extends Reagent {} // /datum/reagent/bromine
module.exports.reagents.Bromine = Bromine;
Object.assign(Bromine.prototype, {
	name: "Bromine",
	description: "A brownish liquid that's highly reactive. Useful for stopping free radicals, but not intended for human consumption.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "chemicals"
});

class Phenol extends Reagent {} // /datum/reagent/phenol
module.exports.reagents.Phenol = Phenol;
Object.assign(Phenol.prototype, {
	name: "Phenol",
	description: "An aromatic ring of carbon with a hydroxyl group. A useful precursor to some medicines, but has no healing properties on its own.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "acid"
});

class Ash extends Reagent {} // /datum/reagent/ash
module.exports.reagents.Ash = Ash;
Object.assign(Ash.prototype, {
	name: "Ash",
	description: "Supposedly phoenixes rise from these, but you've never seen it.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "ash"
});

class Acetone extends Reagent {} // /datum/reagent/acetone
module.exports.reagents.Acetone = Acetone;
Object.assign(Acetone.prototype, {
	name: "Acetone",
	description: "A slick, slightly carcinogenic liquid. Has a multitude of mundane uses in everyday life.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "acid"
});

class QuantumHairDye extends Reagent {} // /datum/reagent/hair_dye
module.exports.reagents.QuantumHairDye = QuantumHairDye;
Object.assign(QuantumHairDye.prototype, {
	name: "Quantum Hair Dye",
	description: "Has a high chance of making you look like a mad scientist.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "sourness"
});

class BarbersAid extends Reagent {} // /datum/reagent/barbers_aid
module.exports.reagents.BarbersAid = BarbersAid;
Object.assign(BarbersAid.prototype, {
	name: "Barber's Aid",
	description: "A solution to hair loss across the world.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "sourness"
});

class ConcentratedBarbersAid extends Reagent {} // /datum/reagent/concentrated_barbers_aid
module.exports.reagents.ConcentratedBarbersAid = ConcentratedBarbersAid;
Object.assign(ConcentratedBarbersAid.prototype, {
	name: "Concentrated Barber's Aid",
	description: "A concentrated solution to hair loss across the world.",
	reagent_state: "liquid",
	color: [0.78,0.65,0.86],
	taste_description: "sourness"
});

class Saltpetre extends Reagent {} // /datum/reagent/saltpetre
module.exports.reagents.Saltpetre = Saltpetre;
Object.assign(Saltpetre.prototype, {
	name: "Saltpetre",
	description: "Volatile. Controversial. Third Thing.",
	reagent_state: "liquid",
	color: [0.38,0.65,0.52],
	taste_description: "cool salt"
});

class Lye extends Reagent {} // /datum/reagent/lye
module.exports.reagents.Lye = Lye;
Object.assign(Lye.prototype, {
	name: "Lye",
	description: "Also known as sodium hydroxide. As a profession making this is somewhat underwhelming.",
	reagent_state: "liquid",
	color: [1,1,0.84],
	taste_description: "acid"
});

class DryingAgent extends Reagent {} // /datum/reagent/drying_agent
module.exports.reagents.DryingAgent = DryingAgent;
Object.assign(DryingAgent.prototype, {
	name: "Drying agent",
	description: "A desiccant. Can be used to dry things.",
	reagent_state: "liquid",
	color: [0.65,0.06,1],
	taste_description: "dryness"
});

class UnstableMutagen extends Toxin {} // /datum/reagent/toxin/mutagen
module.exports.reagents.UnstableMutagen = UnstableMutagen;
Object.assign(UnstableMutagen.prototype, {
	name: "Unstable mutagen",
	description: "Might cause unpredictable mutations. Keep away from children.",
	color: [0,1,0],
	toxpwr: 0,
	taste_description: "slime",
	taste_mult: 0.9
});

class MutagenicAgar extends UnstableMutagen {} // /datum/reagent/toxin/mutagen/mutagenvirusfood
module.exports.reagents.MutagenicAgar = MutagenicAgar;
Object.assign(MutagenicAgar.prototype, {
	name: "mutagenic agar",
	color: [0.64,0.75,0.06],
	taste_description: "sourness"
});

class SucroseAgar extends MutagenicAgar {} // /datum/reagent/toxin/mutagen/mutagenvirusfood/sugar
module.exports.reagents.SucroseAgar = SucroseAgar;
Object.assign(SucroseAgar.prototype, {
	name: "sucrose agar",
	color: [0.25,0.69,0.75],
	taste_description: "sweetness"
});

class VirusRations extends Synaptizine {} // /datum/reagent/medicine/synaptizine/synaptizinevirusfood
module.exports.reagents.VirusRations = VirusRations;
Object.assign(VirusRations.prototype, {
	name: "virus rations",
	color: [0.82,0.54,0.65],
	taste_description: "bitterness"
});

class Plasma extends Toxin {} // /datum/reagent/toxin/plasma
module.exports.reagents.Plasma = Plasma;
Object.assign(Plasma.prototype, {
	name: "Plasma",
	description: "Plasma in its liquid form.",
	taste_description: "bitterness",
	taste_mult: 1.5,
	color: [0.51,0.16,0.63],
	toxpwr: 3
});

class VirusPlasma extends Plasma {} // /datum/reagent/toxin/plasma/plasmavirusfood
module.exports.reagents.VirusPlasma = VirusPlasma;
Object.assign(VirusPlasma.prototype, {
	name: "virus plasma",
	color: [0.65,0.62,0.66],
	taste_description: "bitterness",
	taste_mult: 1.5
});

class WeakenedVirusPlasma extends VirusPlasma {} // /datum/reagent/toxin/plasma/plasmavirusfood/weak
module.exports.reagents.WeakenedVirusPlasma = WeakenedVirusPlasma;
Object.assign(WeakenedVirusPlasma.prototype, {
	name: "weakened virus plasma",
	color: [0.81,0.76,0.78],
	taste_description: "bitterness",
	taste_mult: 1.5
});

class DecayingUraniumGel extends Uranium {} // /datum/reagent/uranium/uraniumvirusfood
module.exports.reagents.DecayingUraniumGel = DecayingUraniumGel;
Object.assign(DecayingUraniumGel.prototype, {
	name: "decaying uranium gel",
	color: [0.4,0.68,0.73],
	taste_description: "the inside of a reactor"
});

class UnstableUraniumGel extends DecayingUraniumGel {} // /datum/reagent/uranium/uraniumvirusfood/unstable
module.exports.reagents.UnstableUraniumGel = UnstableUraniumGel;
Object.assign(UnstableUraniumGel.prototype, {
	name: "unstable uranium gel",
	color: [0.18,0.95,0.8],
	taste_description: "the inside of a reactor"
});

class StableUraniumGel extends DecayingUraniumGel {} // /datum/reagent/uranium/uraniumvirusfood/stable
module.exports.reagents.StableUraniumGel = StableUraniumGel;
Object.assign(StableUraniumGel.prototype, {
	name: "stable uranium gel",
	color: [0.02,0.31,0.42],
	taste_description: "the inside of a reactor"
});

class RoyalBeeJelly extends Reagent {} // /datum/reagent/royal_bee_jelly
module.exports.reagents.RoyalBeeJelly = RoyalBeeJelly;
Object.assign(RoyalBeeJelly.prototype, {
	name: "royal bee jelly",
	description: "Royal Bee Jelly, if injected into a Queen Space Bee said bee will split into two bees.",
	color: [0,1,0.5],
	taste_description: "strange honey"
});

class Romerol extends Reagent {} // /datum/reagent/romerol
module.exports.reagents.Romerol = Romerol;
Object.assign(Romerol.prototype, {
	name: "Romerol",
	description: "Romerol is a highly experimental bioterror agent which causes dormant nodules to be etched into the grey matter of the subject. These nodules only become active upon death of the host, upon which, the secondary structures activate and take control of the host body.",
	color: [0.07,0.21,0.14],
	metabolization_rate: Infinity,
	can_synth: 0,
	taste_description: "brains"
});

class Magillitis extends Reagent {} // /datum/reagent/magillitis
module.exports.reagents.Magillitis = Magillitis;
Object.assign(Magillitis.prototype, {
	name: "Magillitis",
	description: "An experimental serum which causes rapid muscular growth in Hominidae. Side-affects may include hypertrichosis, violent outbursts, and an unending affinity for bananas.",
	reagent_state: "liquid",
	color: [0,0.94,0.25]
});

class GrowthSerum extends Reagent {} // /datum/reagent/growthserum
module.exports.reagents.GrowthSerum = GrowthSerum;
Object.assign(GrowthSerum.prototype, {
	name: "Growth Serum",
	description: "A commercial chemical designed to help older men in the bedroom.",
	color: [1,0,0],
	taste_description: "bitterness"
});

class PlasticPolymers extends Reagent {} // /datum/reagent/plastic_polymers
module.exports.reagents.PlasticPolymers = PlasticPolymers;
Object.assign(PlasticPolymers.prototype, {
	name: "plastic polymers",
	description: "the petroleum based components of plastic.",
	color: [0.97,0.93,0.93],
	taste_description: "plastic"
});

class Glitter extends Reagent {} // /datum/reagent/glitter
module.exports.reagents.Glitter = Glitter;
Object.assign(Glitter.prototype, {
	name: "generic glitter",
	description: "if you can see this description, contact a coder.",
	color: [1,1,1],
	taste_description: "plastic",
	reagent_state: "solid"
});

class PinkGlitter extends Glitter {} // /datum/reagent/glitter/pink
module.exports.reagents.PinkGlitter = PinkGlitter;
Object.assign(PinkGlitter.prototype, {
	name: "pink glitter",
	description: "pink sparkles that get everywhere",
	color: [1,0.5,0.5]
});

class WhiteGlitter extends Glitter {} // /datum/reagent/glitter/white
module.exports.reagents.WhiteGlitter = WhiteGlitter;
Object.assign(WhiteGlitter.prototype, {
	name: "white glitter",
	description: "white sparkles that get everywhere"
});

class BlueGlitter extends Glitter {} // /datum/reagent/glitter/blue
module.exports.reagents.BlueGlitter = BlueGlitter;
Object.assign(BlueGlitter.prototype, {
	name: "blue glitter",
	description: "blue sparkles that get everywhere",
	color: [0.25,0.25,1]
});

class PeaceborgToxin extends Toxin {} // /datum/reagent/toxin/peaceborg
module.exports.reagents.PeaceborgToxin = PeaceborgToxin;
Object.assign(PeaceborgToxin.prototype, {
});
