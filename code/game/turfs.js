'use strict';
const layers = require('../defines/layers.js');
const {Component, has_component, Atom, chain_func, to_chat} = require('bluespess');

class Wall extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool")) {
			if(item.c.Tool.can_use("WeldingTool", user)) {
				item.c.Tool.used("WeldingTool");
				to_chat`<span class='notice'>You begin slicing through the outer plating...</span>`(user);
				user.c.MobInventory.do_after({delay: 10000 * item.c.Tool.toolspeed, target: this.a}).then((success) => {
					if(!success)
						return;
					this.a.c.Destructible.deconstruct(true);
					to_chat`<span class='notice'>You remove the outer plating.</span>`(user);
				});
				return true;
			}
		}
		return prev();
	}

	deconstruct(prev) {
		if(!this.a.loc)
			return;
		if(!this.a.c.Destructible.no_deconstruct) {
			var girder = new Atom(this.a.server, "girder");
			girder.loc = this.a.loc

			var sheets = new Atom(this.a.server, "metal_sheet");
			sheets.c.Stack.amount = 2;
			sheets.loc = this.a.fine_loc;
			this.a.destroy();
		}
		prev();
	}
}

Wall.one_per_tile = true;

Wall.depends = ["Destructible"];
Wall.loadBefore = ["Destructible"];

Wall.template = {
	vars: {
		components: {
			"Tangible": {
				anchored: true,
			},
			"Examine": {
				desc: "A huge chunk of metal used to separate rooms."
			}
		},
		name: "wall",
	}
};

module.exports.templates = {
	"wall": {
		components: ["Wall", "BlocksAir", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "wall"
				},
				"SmoothGroup": {
					groups: ["wall"]
				}
			},
			icon: 'icons/turf/walls/wall.png',
			icon_state: "wall",
			layer: layers.WALL_LAYER,
			density: 1,
			opacity: true
		},
		tree_paths: ["basic_structures/wall"],
		requires_under: {
			component: "FloorBase",
			default: "plating"
		}
	},
	"r_wall": {
		components: ["BlocksAir", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "wall"
				},
				"SmoothGroup": {
					groups: ["wall"]
				}
			},
			icon: 'icons/turf/walls/reinforced_wall.png',
			icon_state: "r_wall",
			layer: layers.WALL_LAYER,
			density: 1,
			opacity: true
		},
		tree_paths: ["basic_structures/wall/reinforced"],
		requires_under: {
			component: "FloorBase",
			default: "plating"
		}
	},
	"wall_titanium": {
		components: ["BlocksAir", "TGSmooth"],
		vars: {
			components: {
				"TGSmooth": {
					diagonal: true
				},
				"Smooth": {
					smooth_with: "titanium_wall"
				},
				"SmoothGroup": {
					groups: ["titanium_wall"]
				}
			},
			icon: 'icons/turf/walls/shuttle_wall.png',
			icon_state: "map-shuttle",
			layer: layers.WALL_LAYER,
			density: 1,
			opacity: true
		},
		tree_paths: ["basic_structures/wall/titanium"],
		requires_under: {
			component: "FloorBase",
			default: "plating"
		}
	},
	"crate": {
		components: ["Tangible"],
		vars: {
			icon: 'icons/obj/crates.png',
			icon_state: "crate",
			layer: 2.9,
			density: 1
		}
	},
	"light": {
		components: ["LightSource", "Tangible"],
		vars: {
			name: "light fixture",
			layer: 2.9,
			icon: 'icons/obj/lighting.png',
			icon_state: "tube1",
			components: {
				"LightSource": {
					enabled: true,
					radius: 8,
					color: "#ffffff"
				},
				"Tangible": {
					anchored: true
				}
			}
		},
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		]
	},
	"light_small": {
		components: ["LightSource", "Tangible"],
		vars: {
			name: "light fixture",
			layer: 2.9,
			icon: 'icons/obj/lighting.png',
			icon_state: "bulb1",
			components: {
				"LightSource": {
					enabled: true,
					radius: 4,
					color: "#ccbbaa"
				},
				"Tangible": {
					anchored: true
				}
			}
		},
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		]
	}
};

module.exports.components = {Wall};
