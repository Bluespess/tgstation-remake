'use strict';
const {Component, Atom, chain_func, has_component, to_chat} = require('bluespess');
const layers = require('../../defines/layers.js');

class FloorCover extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.once("moved", () => {
			if(!this.icon_group)
				return;
			if(!this.a.loc)
				return;
			let plating = this.a.loc.turf;
			if(!has_component(plating, "Plating"))
				return;
			if(plating.c.Plating.icon_groups[this.icon_group]) {
				let g = plating.c.Plating.icon_groups[this.icon_group];
				this.a.icon = g.icon;
				this.a.icon_state = g.icon_state;
				this.a.name = g.name;
				this.a.c.Examine.desc = g.desc;
				this.a.dir = g.dir;
			} else {
				let g = {};
				g.icon = this.a.icon;
				g.icon_state = this.a.icon_state;
				g.name = this.a.name;
				g.desc = this.a.c.Examine.desc;
				g.dir = this.a.dir;
				plating.c.Plating.icon_groups[this.icon_group] = g;
			}
		});

		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
	}

	attack_by(prev, item, user) {
		if(this.try_pry(item, user))
			return true;
		return prev();
	}

	try_pry(item, user) {
		if(has_component(item, "Tool") && item.c.Tool.can_use("Crowbar")) {
			item.c.Tool.used("Crowbar");
			this.remove_tile({user});
		}
	}

	remove_tile({user, silent = false, make_tile = true} = {}) {
		if(user && !silent)
			to_chat`<span class='notice'>You remove the floor tile.</span>`(user);
		if(this.floor_tile && make_tile) {
			new Atom(this.a.server, this.floor_tile, this.a.loc);
		}
		this.a.destroy();
	}
}

FloorCover.depends = ["FloorBase"];
FloorCover.loadBefore = ["FloorBase"];

FloorCover.template = {
	vars: {
		components: {
			"FloorCover": {
				floor_tile: "plasteel_tile",
				icon_group: "floor"
			}
		},
		layer: layers.FLOOR_LAYER,
		icon: 'icons/turf/floors.png'
	},
	requires_under: {
		component: "Plating",
		default: "plating"
	}
};

module.exports.templates = {
	"floor": {
		components: ["FloorCover"],
		tree_paths: ["basic_structures/floor"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: ["floor", "white", "dark", "bar", "floorgrime", "delivery", "bot", "barber", "whitebot", "whitedelivery", "cmo", "grimy", "freezerfloor"],
				label: true,
				orientation: "vertical"
			}
		]
	},
	"floor_ss13": {
		components: ["FloorCover"],
		tree_paths: ["basic_structures/floor/ss13"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"L1", "L3", "L5", "L7", "L2", "L4", "L6", "L8", "L9", "L11", "L13", "L7", "L10", "L12", "L14", "L8"
				],
				orientation: "horizontal",
				wrap: 4
			}
		]
	},
	"floor_edge": {
		components: ["FloorCover"],
		tree_paths: ["basic_structures/floor/edge"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"red", "whitered", "blue", "whiteblue", "green", "whitegreen", "yellow", "whiteyellow", "orange", "whitehall", "arrival", "escape", "purple", "whitepurple", "brownold", "brown", "redyellow", "redblue", "bluered", "redgreen", "greenyellow", "greenblue", "blueyellow", "darkpurple", "darkred", "darkblue", "darkgreen", "darkyellow", "darkbrown"
				],
				label:true,
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8, 5, 6, 9, 10
				],
				orientation: "horizontal",
				wrap: 4
			}
		]
	},
	"floor_corner": {
		components: ["FloorCover"],
		tree_paths: ["basic_structures/floor/corner"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"redcorner", "whiteredcorner", "bluecorner", "whitebluecorner", "greencorner", "whitegreencorner", "yellowcorner", "whiteyellowcorner", "orangecorner", "arrivalcorner", "escapecorner", "purplecorner", "whitepurplecorner", "browncorner"
				],
				label:true,
				orientation: "vertical"
			},
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
	"floor_plaque": {
		components: ["FloorCover"],
		vars: {
			icon_state: "plaque"
		},
		tree_paths: ["basic_structures/floor/plaque"]
	},
	"floor_wood": {
		components: ["FloorCover"],
		vars: {
			components: {
				"FloorCover": {
					floor_tile: "wood_tile",
					icon_group: null
				}
			},
			icon_state: "wood"
		},
		tree_paths: ["basic_structures/floor/wood"]
	},
	"floor_carpet": {
		components: ["FloorCover", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "carpet"
				},
				"SmoothGroup": {
					groups: ["carpet"]
				},
				"FloorCover": {
					floor_tile: "carpet_tile",
					icon_group: null
				}
			},
			icon: 'icons/turf/floors/carpet.png',
			icon_state: "carpet"
		},
		tree_paths: ["basic_structures/floor/carpet"]
	}
};

module.exports.components = {FloorCover};
