'use strict';
const {Component, has_component, turn_dir} = require('bluespess');
const layers = require('../../../../defines/layers.js');
const _ = require('underscore');

const pipe_colors = {
	"grey": "rgb(255,255,255)",
	"red": "rgb(255,0,0)",
	"blue": "rgb(0,0,255)",
	"cyan": "rgb(0,256,249)",
	"green": "rgb(30,255,0)",
	"yellow": "rgb(255,198,0)",
	"purple": "rgb(130,43,255)",
	"orange": "rgb(255,129,25)",
	"dark": "rgb(69,69,69)",
	"violet": "rgb(64,0,128)",
	"brown": "rgb(178,100,56)"
};

class Pipe extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.color = pipe_colors[this.pipe_color];
		if(this.above_floor == null) {
			this.a.once("moved", () => {
				if(!this.a.loc)
					return;
				for(let atom of this.a.loc.contents)
					if(has_component(atom, "FloorCover") || has_component(atom, "Wall"))
						this.above_floor = true;
				if(this.above_floor == null)
					this.above_floor = false;
				this.a.layer = this.above_floor ? layers.GAS_PIPE_VISIBLE_LAYER : layers.GAS_PIPE_HIDDEN_LAYER;
			});
		} else {
			this.a.layer = this.above_floor ? layers.GAS_PIPE_VISIBLE_LAYER : layers.GAS_PIPE_HIDDEN_LAYER;
		}
		this.a.on("moved", this.moved.bind(this));
		this.nodes = new Array(9);
	}

	moved() {
		let old_nodes = this.nodes;
		for(let node of old_nodes) {
			if(!node)
				continue;
			for(let i = 0; i < node.c.Pipe.nodes; i++) {
				if(node.c.Pipe.nodes[i] == this.a)
					node.c.Pipe.nodes[i] = null;
			}
		}
		this.nodes = new Array(9);
		if(this.a.loc && this.a.loc.is_base_loc) {
			for(let loc of this.a.marginal_locs()) {
				for(let atom of loc.partial_contents) {
					if(!has_component(atom, "Pipe"))
						continue;
					let node_dir = 0;
					if((atom.dir & 3) && (this.a.dir & 3) && Math.abs(atom.x - this.a.x) < 0.00001) {
						if((atom.dir & 2) && (this.a.dir & 1) && Math.abs((atom.y + atom.bounds_y) - (this.a.y + this.a.bounds_y + this.a.bounds_height)) < 0.0001)
							node_dir = 1;
						if((atom.dir & 1) && (this.a.dir & 2) && Math.abs((atom.y + atom.bounds_y + atom.bounds_height) - (this.a.y + this.a.bounds_y)) < 0.0001)
							node_dir = 2;
					}
					if((atom.dir & 12) && (this.a.dir & 12) && Math.abs(atom.y - this.a.y) < 0.00001) {
						if((atom.dir & 8) && (this.a.dir & 4) && Math.abs((atom.x + atom.bounds_x) - (this.a.x + this.a.bounds_x + this.a.bounds_width)) < 0.0001)
							node_dir = 4;
						if((atom.dir & 4) && (this.a.dir & 8) && Math.abs((atom.x + atom.bounds_x + atom.bounds_width) - (this.a.x + this.a.bounds_x)) < 0.0001)
							node_dir = 8;
					}
					if(node_dir) {
						if(this.nodes[node_dir] == atom)
							continue;
						let opp_node_dir = turn_dir(node_dir, 180);
						if(this.nodes[node_dir] || atom.c.Pipe.nodes[opp_node_dir]) {
							console.warn(`Multiple pipes on one turf around (${this.a.x},${this.a.y},${this.a.z},${this.a.dim})`);
						}
						this.nodes[node_dir] = atom;
						atom.c.Pipe.nodes[opp_node_dir] = this.a;
					}
				}
			}
		}
		this.update_intact_overlays();
		for(let i = 0; i < this.nodes.length; i++) {
			if(this.nodes[i] != old_nodes[i]) {
				if(this.nodes[i])
					this.nodes[i].c.Pipe.update_intact_overlays();
				if(old_nodes[i])
					old_nodes[i].c.Pipe.update_intact_overlays();
			}
		}
	}
	update_intact_overlays() {
		let intact_dirs = 0;
		for(let dir of [1,2,4,8]) {
			if(this.nodes[dir])
				intact_dirs |= dir;
		}
		if(intact_dirs == this.a.dir) {
			this.a.icon_state = this.a.template.vars.icon_state;
			this.a.overlays["pipe_intact"] = null;
		} else {
			this.a.icon_state = this.a.template.vars.icon_state + "_exposed";
			this.a.overlays["pipe_intact"] = {icon_state: "pipe_intact_overlay", dir: intact_dirs};
		}
	}
}

Pipe.loadBefore = ["Destructible"];
Pipe.depends = ["Destructible"];

Pipe.template = {
	vars: {
		components: {
			"Pipe": {
				above_floor: null,
				pipe_color: "grey"
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "A one meter section of regular pipe."
			}
		},
		name: "pipe",
		icon: 'icons/obj/atmospherics/pipes/simple.png',
		icon_state: "pipe",
		layer: layers.GAS_PIPE_VISIBLE_LAYER
	}
};

module.exports.templates = {
	"pipe_visible": {
		components: ["Pipe"],
		vars: {
			components: {
				"Pipe": {
					above_floor: true
				}
			}
		},
		tree_paths: ["basic_structures/pipe/visible"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Pipe", "pipe_color"],
				values: Object.keys(pipe_colors),
				label: true,
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["dir"],
				values: [
					14, 13, 11, 7, 5, 6, 9, 10, 3, 12, 15
				],
				orientation: "horizontal",
				wrap: 4
			}
		]
	},
	"pipe_hidden": {
		parent_template: "pipe_visible",
		vars: {
			components: {
				"Pipe": {
					above_floor: false
				}
			}
		},
		tree_paths: ["basic_structures/pipe/hidden"]
	}
};
module.exports.components = {Pipe};
module.exports.pipe_colors = pipe_colors;
