'use strict';

/* Diffrent misc types of sheets
 * Contains:
 * Metal
 * Plasteel
 * Wood
 * Cloth
 * Cardboard
 * Plastic
 * Paper Frames
 * Bone
 * TODO: Runed Metal (cult)
 * TODO: Brass (clockwork cult)
 */

//TODO: Most of the recipe items

const {Component} = require('bluespess');

class MetalSheet extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

MetalSheet.depends = ["Stack"];
MetalSheet.loadBefore = ["Stack"];

MetalSheet.template = {
	vars: {
		components: {
			"Stack": {
				full_size: 3,
				singular_name: "metal sheet",
				merge_type: "MetalSheet",
				novariants: false,
				recipes: [
					{name: "closet", template_name: "closet", cost: 2, time: 1500, cant_cross: ["Closet"], on_floor: true},
					{name: "floor tiles", template_name: "plasteel_tile", cost: 1, res_amount: 4, time: 2000},
					{name: "metal rods", template_name: "stack_rods", cost: 1, res_amount: 2, time: 6000}
				]
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/misc/sheets_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/misc/sheets_righthand.png',
				force: 5,
				attack_verb: ["bashed", "battered", "bludgeoned", "thrashed", "smashed"],
				inhand_icon_state: "sheet-metal"
			},
			"Tangible": {
				throw_force: 10,
				throw_speed: 1,
				throw_range: 3
			}
		},
		name: "metal",
		desc: "Sheets made out of metal.",
		icon_state: "sheet-metal",
	}
};

class PlasteelSheet extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

PlasteelSheet.depends = ["Stack"];
PlasteelSheet.loadBefore = ["Stack"];

PlasteelSheet.template = {
	vars: {
		components: {
			"Stack": {
				full_size: 3,
				singular_name: "plasteel sheet",
				merge_type: "PlasteelSheet",
				novariants: false,
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/misc/sheets_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/misc/sheets_righthand.png',
				force: 5,
				attack_verb: ["bashed", "battered", "bludgeoned", "thrashed", "smashed"],
				inhand_icon_state: "sheet-metal"
			},
			"Tangible": {
				throw_force: 10,
				throw_speed: 1,
				throw_range: 3
			}
		},
		name: "plasteel metal",
		desc: "This sheet is an alloy of iron and plasma.",
		icon_state: "sheet-plasteel",
	}
};

class WoodSheet extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

WoodSheet.depends = ["Stack"];
WoodSheet.loadBefore = ["Stack"];

WoodSheet.template = {
	vars: {
		components: {
			"Stack": {
				full_size: 3,
				singular_name: "wooden plank",
				merge_type: "WoodSheet",
				novariants: true,
				recipes: [
					{name: "wood floor tiles", template_name: "wood_tile", cost: 1, res_amount: 4, time: 2000}
				]
			},
			"Item": { //Wood apparently has no inhands.
				force: 5,
				attack_verb: ["bashed", "battered", "bludgeoned", "thrashed", "smashed"],
			},
			"Tangible": {
				throw_force: 10,
				throw_speed: 1,
				throw_range: 3
			}
		},
		name: "wooden plank",
		desc: "One can only guess that this is a bunch of wood.",
		icon_state: "sheet-wood",
	}
};

class ClothSheet extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

ClothSheet.depends = ["Stack"];
ClothSheet.loadBefore = ["Stack"];

ClothSheet.template = {
	vars: {
		components: {
			"Stack": {
				full_size: 3,
				singular_name: "cloth",
				merge_type: "ClothSheet",
				novariants: false,
				recipes: [ //Cloth recipes had no times but that seemed silly so I added some
					{name: "grey jumpsuit", template_name: "jumpsuit_grey", cost: 3, time: 10000},
					{name: "black shoes", template_name: "shoes_black", cost: 2, time: 6000},
					{name: "backpack", template_name: "backpack", cost: 4, time: 8000}
				]
			},
			"Item": { //No inhands for cloth either
				force: 0,
				attack_verb: ["bashed", "battered", "bludgeoned", "thrashed", "smashed"],
			},
			"Tangible": {
				throw_force: 0,
				throw_speed: 1,
				throw_range: 3
			}
		},
		name: "cloth",
		desc: "Is it cotton? Linen? Denim? Burlap? Canvas? You can't tell.",
		icon_state: "sheet-cloth",
	}
};

class CardboardSheet extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

CardboardSheet.depends = ["Stack"];
CardboardSheet.loadBefore = ["Stack"];

CardboardSheet.template = {
	vars: {
		components: {
			"Stack": {
				full_size: 3,
				singular_name: "cardboard",
				merge_type: "CardboardSheet",
				novariants: true,
				recipes: [ //Cardboard recipes had no times but that seemed silly so I added some
					{name: "box", template_name: "box", cost: 3, time: 2000}
				]
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/misc/sheets_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/misc/sheets_righthand.png',
				force: 0,
				attack_verb: ["bashed", "battered", "bludgeoned", "thrashed", "smashed"],
				inhand_icon_state: "sheet-card"
			},
			"Tangible": {
				throw_force: 0,
				throw_speed: 1,
				throw_range: 3
			}
		},
		name: "cardboard",
		desc: "Large sheets of card, like boxes folded flat.",
		icon_state: "sheet-card",
	}
};

class BoneSheet extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

BoneSheet.depends = ["Stack"];
BoneSheet.loadBefore = ["Stack"];

BoneSheet.template = {
	vars: {
		components: {
			"Stack": {
				full_size: 3,
				singular_name: "bone",
				merge_type: "BoneSheet",
				novariants: false,
				icon: 'icons/obj/mining.png'
			},
			"Item": { //No inhands for bone either
				force: 7,
				attack_verb: ["bashed", "battered", "bludgeoned", "thrashed", "smashed"],
			},
			"Tangible": {
				throw_force: 5,
				throw_speed: 1,
				throw_range: 3
			},
		},
		name: "bones",
		desc: "Someone's been drinking their milk.",
		icon_state: "bone"
	}
};

class PlasticSheet extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

PlasticSheet.depends = ["Stack"];
PlasticSheet.loadBefore = ["Stack"];

PlasticSheet.template = {
	vars: {
		components: {
			"Stack": {
				full_size: 3,
				singular_name: "plastic",
				merge_type: "PlasticSheet",
				novariants: false,
			},
			"Item": { //No inhands for plastic either?
				force: 5,
				attack_verb: ["bashed", "battered", "bludgeoned", "thrashed", "smashed"],
			},
			"Tangible": {
				throw_force: 7,
				throw_speed: 1,
				throw_range: 3
			}
		},
		name: "plastic",
		desc: "Compress dinosaur over millions of years, then refine, split and mold, and voila! You have plastic.",
		icon_state: "sheet-plastic",
	}
};

class PaperframeSheet extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

PaperframeSheet.depends = ["Stack"];
PaperframeSheet.loadBefore = ["Stack"];

PaperframeSheet.template = {
	vars: {
		components: {
			"Stack": {
				full_size: 3,
				singular_name: "paper frame",
				merge_type: "PaperframeSheet",
				novariants: false,
			},
			"Item": { //No inhands for paperframes either?
				force: 3,
				attack_verb: ["bashed", "battered", "bludgeoned", "thrashed", "smashed"],
			},
			"Tangible": {
				throw_force: 3,
				throw_speed: 1,
				throw_range: 3
			}
		},
		name: "paper frames",
		desc: "A thin wooden frame with paper attached.",
		icon_state: "sheet-paper",
	}
};

module.exports.templates = {
	"metal_sheet": {
		components: ["MetalSheet"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/sheet/metal"]
	},
	"plasteel_sheet": {
		components: ["PlasteelSheet"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/sheet/plasteel"]
	},
	"wood_sheet": {
		components: ["WoodSheet"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/sheet/mineral/wood"]
	},
	"cloth_sheet": {
		components: ["ClothSheet"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/sheet/cloth"]
	},
	"cardboard_sheet": {
		components: ["CardboardSheet"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/sheet/cardboard"]
	},
	"bone_sheet": {
		components: ["BoneSheet"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/sheet/bone"]
	},
	"plastic_sheet": {
		components: ["PlasticSheet"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/sheet/plastic"]
	},
	"paperframe_sheet": {
		components: ["PaperframeSheet"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/sheet/paperframes"]
	}
};

module.exports.components = {MetalSheet, PlasteelSheet, WoodSheet, ClothSheet, CardboardSheet, BoneSheet, PlasticSheet, PaperframeSheet};
