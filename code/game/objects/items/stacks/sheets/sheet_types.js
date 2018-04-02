'use strict';
const {Component, Atom, has_component, chain_func} = require('bluespess');
const combat_defines = require('../../../../../defines/combat_defines.js');

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
				novariants: true,
				recipes: [
					{name: "closet", template_name: "closet", cost: 2, time: 1500, cant_cross: ["Closet"], on_floor: true},
					{name: "floor tiles", template_name: "titanium_tile", cost: 1, res_amount: 4, time: 2000, on_floor: true},
					{name: "metal rods", template_name: "stack_rods", cost: 1, res_amount: 2, time: 6000, on_floor: true},
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
		desc: "Sheets made out of metal",
		icon_state: "sheet-metal",
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
	}
};

module.exports.components = {MetalSheet};
