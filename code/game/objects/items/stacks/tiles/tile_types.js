'use strict';
const {Component, Sound, Atom, chain_func, has_component} = require('bluespess');

class StackTile extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.once("moved", () => {
			this.a.move(Math.random() * 0.1875 - 0.09375, Math.random() * 0.1875 - 0.09375);
		});

		this.a.c.Item.pre_attack = chain_func(this.a.c.Item.pre_attack, this.pre_attack.bind(this));
	}

	pre_attack(prev, target) {
		if(has_component(target, "Plating")) {
			for(let atom of target.crosses()) {
				if(has_component(atom, "FloorCover"))
					return false;
			}
			if(!this.a.c.Stack.use(1))
				return;
			let newfloor = new Atom(this.a.server, this.turf_type, target.loc);
			new Sound(this.a.server, {path: 'sound/weapons/genhit.ogg', volume: 0.5, vary: true}).emit_from(newfloor);
		}
		return prev();
	}
}

StackTile.depends = ["Stack"];
StackTile.loadBefore = ["Stack"];

StackTile.template = {
	vars: {
		components: {
			"StackTile": {
				turf_type: "floor",
			},
			"Stack": {
				novariants: true,
				max_amount: 60,
			},
			"Item": {
				size: 3,
				force: 1
			},
			"Tangible": {
				throw_force: 1,
				throw_speed: 3,
				throw_range: 7
			}
		},
		icon: 'icons/obj/tiles.png'
	}
};

class WoodTile extends Component {}

WoodTile.depends = ["StackTile"];
WoodTile.loadBefore = ["StackTile"];

WoodTile.template = {
	vars: {
		components: {
			"StackTile": {
				turf_type: "floor_wood"
			},
			"Stack": {
				merge_type: "WoodTile",
				singular_name: "wood floor tile"
			},
			"Examine": {
				desc: "An easy to fit wood floor tile."
			}
		},
		name: "wood floor tile",
		icon_state: "tile-wood"
	}
};

class CarpetTile extends Component {}

CarpetTile.depends = ["StackTile"];
CarpetTile.loadBefore = ["StackTile"];

CarpetTile.template = {
	vars: {
		components: {
			"StackTile": {
				turf_type: "floor_carpet"
			},
			"Stack": {
				merge_type: "CarpetTile",
				singular_name: "carpet"
			},
			"Examine": {
				desc: "A piece of carpet. It is the same size as a floor tile."
			}
		},
		name: "carpet",
		icon_state: "tile-carpet"
	}
};

class PlasteelTile extends Component {}

PlasteelTile.depends = ["StackTile"];
PlasteelTile.loadBefore = ["StackTile"];

PlasteelTile.template = {
	vars: {
		components: {
			"StackTile": {
				turf_type: "floor"
			},
			"Stack": {
				merge_type: "PlasteelTile",
				singular_name: "floor tile"
			},
			"Item": {
				force: 6
			},
			"Destructible": {
				armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 100, acid: 70}
			},
			"Tangible": {
				throw_force: 10
			},
			"Examine": {
				desc: "These could work as a pretty decent throwing weapon"
			}
		},
		name: "floor tile",
		icon_state: "tile"
	}
};

module.exports.templates = {
	"wood_tile": {
		components: ["WoodTile"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50, 60],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/tile/wood"]
	},
	"carpet_tile": {
		components: ["CarpetTile"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50, 60],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/tile/carpet"]
	},
	"plasteel_tile": {
		components: ["PlasteelTile"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50, 60],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/tile"]
	},
};

module.exports.components = {StackTile, PlasteelTile, WoodTile, CarpetTile};
