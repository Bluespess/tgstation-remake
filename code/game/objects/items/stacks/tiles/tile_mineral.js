'use strict';
const {Component} = require('bluespess');

class TitaniumTile extends Component {}

TitaniumTile.depends = ["StackTile"];
TitaniumTile.loadBefore = ["StackTile"];

TitaniumTile.template = {
	vars: {
		components: {
			"StackTile": {
				turf_type: "floor_titanium"
			},
			"Stack": {
				merge_type: "TitaniumTile",
				singular_name: "titanium floor tile"
			},
			"Examine": {
				desc: "A tile made of titanium, used for shuttles."
			}
		},
		name: "titanium tile",
		icon_state: "tile_shuttle"
	}
};

module.exports.templates = {
	"titanium_tile": {
		components: ["TitaniumTile"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50, 60],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/tile/titanium"]
	},
};

module.exports.components = {TitaniumTile};
