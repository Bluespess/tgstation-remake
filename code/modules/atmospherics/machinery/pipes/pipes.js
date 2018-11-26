'use strict';
const {Component, chain_func, has_component} = require('bluespess');
const layers = require('../../../../defines/layers.js');
const Pipenet = require('../pipenet.js');

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
		this.pipenet = null;
		this.temporary_air = null;
		this.a.c.AtmosNode.update_intact_overlays = this.update_intact_overlays.bind(this);
		this.a.c.AtmosNode.update_pipenet = this.update_pipenet.bind(this);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
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

	update_pipenet(old_nodes, new_nodes) {
		old_nodes = old_nodes.filter(i => {return !!i;});
		new_nodes = new_nodes.filter(i => {return !!i;});
		for(let i = 0; i < old_nodes.length; i++) {
			let j = new_nodes.indexOf(old_nodes[i]);
			if(j != -1) {
				old_nodes.splice(i, 1);
				i--;
				new_nodes.splice(j, 1);
			}
		}
		if(!new_nodes.length && !old_nodes.length) {
			if(this.a.loc && !this.pipenet) {
				new Pipenet(this.a.server.air_controller).pipes.add(this.a);
			} else if(!this.a.loc && this.pipenet) {
				this.pipenet.pipes.delete(this.a); // gc better gc mmkay?
			}
			return; // nothing changed. (specifically we're on a shuttle and it moved so fuck off and stop wasting CPU cycles)
		}
		let biggest_pn = this.pipenet;
		for(let node of new_nodes) {
			if(has_component(node, "Pipe")) {
				if(!biggest_pn || (node.c.Pipe.pipenet && node.c.Pipe.pipenet.pipes.size > biggest_pn.pipes.size))
					biggest_pn = node.c.Pipe.pipenet;
			}
		}
		if(new_nodes.length && !old_nodes.length) { // we're just adding, no need to make this more complicated than it has to be.
			if(!biggest_pn) {
				biggest_pn = new Pipenet(this.a.server.air_controller);
			}
			if(!this.pipenet) {
				biggest_pn.pipes.add(this.a);
			} else if(this.pipenet != biggest_pn) {
				biggest_pn.merge(this.pipenet);
			}
			for(let node of new_nodes) {
				if(has_component(node, "Pipe")) {
					if(node.c.Pipe.pipenet && node.c.Pipe.pipenet != biggest_pn) {
						biggest_pn.merge(node.c.Pipe.pipenet);
					} else if(!node.c.Pipe.pipenet) {
						biggest_pn.pipes.add(node);
					}
				}
			}
			return;
		}
		if(this.pipenet)
			this.pipenet.pipes.delete(this.a);
		let pipenet_roots = [];
		if(this.a.loc || new_nodes.length)
			pipenet_roots.push(this.a);
		pipenet_roots.push(...old_nodes);
		let new_pipenets = [];
		while(pipenet_roots.length) {
			let root = pipenet_roots.pop();
			if(!has_component(root, "Pipe")) {
				continue;
			}
			let queue = [root];
			let new_set = new Set();
			while(queue.length) {
				let next = queue.shift();
				for(let pipe of next.c.AtmosNode.nodes) {
					if(!has_component(pipe, "Pipe") || new_set.has(pipe))
						continue;
					let idx = pipenet_roots.indexOf(pipe);
					if(idx != -1) {
						pipenet_roots.splice(idx, 1);
					}
					queue.push(pipe);
				}
				new_set.add(next);
			}
			new_pipenets.push(new_set);
		}
		new_pipenets.sort((a,b)=>{return b.size-a.size;});
		for(let i = biggest_pn ? 1 : 0; i < new_pipenets.length; i++) {
			let pn = new Pipenet(this.a.server.air_controller);
			for(let pipe of new_pipenets[i]) {
				pn.pipes.add(pipe);
			}
		}
		if(new_pipenets[0] && biggest_pn) {
			for(let pipe of new_pipenets[0]) {
				biggest_pn.pipes.add(pipe);
			}
		}
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Analyzer")) {
			if(this.pipenet)
				this.pipenet.air.atmosanalyzer_scan(user, this.a);
			return true;
		}
		return prev();
	}
}

Pipe.loadBefore = ["Destructible", "AtmosNode"];
Pipe.depends = ["Destructible", "AtmosNode"];

Pipe.template = {
	vars: {
		components: {
			"Pipe": {
				above_floor: null,
				pipe_color: "grey",
				volume: 80 // In BYOND ss13, this was based on how many nodes. I think doing that is pointless, soooooo
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
