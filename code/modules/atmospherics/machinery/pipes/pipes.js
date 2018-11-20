'use strict';
const {Component, has_component, turn_dir} = require('bluespess');
const layers = require('../../../../defines/layers.js');

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
		this.a.c.AtmosNode.update_intact_overlays = this.update_intact_overlays.bind(this);
	}

	update_intact_overlays() {
		let intact_dirs = 0;
		for(let dir of [1,2,4,8]) {
			if(this.a.c.AtmosNode.nodes[dir])
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

Pipe.loadBefore = ["Destructible", "AtmosNode"];
Pipe.depends = ["Destructible", "AtmosNode"];

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
