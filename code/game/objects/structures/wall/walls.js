'use strict';
const layers = require('../../../../defines/layers.js');
const {Component, Sound, has_component, Atom, chain_func, to_chat} = require('bluespess');

class Wall extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));
		this.a.c.Examine.examine = chain_func(this.a.c.Examine.examine, this.examine.bind(this));
	}

	examine(prev, user) {
		prev();
		this.deconstruction_hints(user);
	}

	deconstruction_hints(user) {
		to_chat`<span class='notice'>The outer plating is <b>welded</b> firmly in place.</span>`(user);
	}

	attack_by(prev, item, user) {
		if(this.try_decon(item, user))
			return true;
		return prev();
	}

	try_decon(item, user) {
		if(has_component(item, "Tool")) {
			if(item.c.Tool.can_use("WeldingTool", user)) {
				item.c.Tool.used("WeldingTool");
				to_chat`<span class='notice'>You begin slicing through the outer plating...</span>`(user);
				user.c.MobInventory.do_after({delay: this.slicing_duration * item.c.Tool.toolspeed, target: this.a}).then((success) => {
					if(!success)
						return;
					new Sound(this.a.server, {path: 'sound/items/welder.ogg', volume: 1, vary: true}).emit_from(this.a);
					this.a.c.Destructible.deconstruct(true);
					to_chat`<span class='notice'>You remove the outer plating.</span>`(user);
				});
				return true;
			}
		}
	}

	deconstruct(prev) {
		if(!this.a.loc)
			return;
		if(!this.a.c.Destructible.no_deconstruct) {
			var girder = new Atom(this.a.server, this.girder_type);
			girder.loc = this.a.loc;

			var sheets = new Atom(this.a.server, this.sheet_type);
			sheets.c.Stack.amount = this.sheet_amount;
			sheets.loc = this.a.fine_loc;
			this.a.destroy();
		}
		prev();
	}
}

Wall.one_per_tile = true;

Wall.depends = ["Destructible", "BlocksAir"];
Wall.loadBefore = ["Destructible", "BlocksAir"];

Wall.template = {
	vars: {
		components: {
			"Wall": {
				slicing_duration: 10000,
				sheet_type: "metal_sheet",
				sheet_amount: 2,
				girder_type: "girder"
			},
			"Tangible": {
				anchored: true,
			},
			"Examine": {
				desc: "A huge chunk of metal used to separate rooms."
			}
		},
		icon: 'icons/turf/walls/wall.png',
		layer: layers.WALL_LAYER,
		density: 1,
		opacity: true
	}
};

module.exports.templates = {
	"wall": {
		components: ["Wall", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "wall"
				},
				"SmoothGroup": {
					groups: ["wall"]
				}
			},
			name: "wall",
			icon_state: "wall"
		},
		tree_paths: ["basic_structures/wall"],
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
	}
};

module.exports.components = {Wall};
