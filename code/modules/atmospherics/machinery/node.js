'use strict';
const {Component, has_component, chain_func, turn_dir, visible_message} = require('bluespess');
// not to be confused with the programming environment.
// wow this is the second file I've named node.js so far.

class AtmosNode extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("moved", this.moved.bind(this));
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.nodes = new Array(9);
	}

	get_node_dirs() {
		return this.a.dir;
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool") && item.c.Tool.can_use("Wrench") && this.check_can_unwrench(user)) {
			item.c.Tool.used("Wrench");
			user.c.MobInventory.do_after({delay: 2000 * item.c.Tool.toolspeed, target: this.a}).then((success) => {
				if(!success)
					return;
				visible_message`The ${user} unfastens the ${this.a}.`
					.self`<span class='notice'>You unfasten the ${this.a}.</span>`
					.blind`<span class='italics'>You hear ratchet.</span>`
					.emit_from(user);
				this.a.c.Destructible.deconstruct(true);
			});
			return true;
		}
		return prev();
	}

	moved() {
		let old_nodes = this.nodes;
		for(let node of old_nodes) {
			if(!node)
				continue;
			for(let i of [1,2,4,8]) {
				if(node.c.AtmosNode.nodes[i] == this.a)
					node.c.AtmosNode.nodes[i] = null;
			}
		}
		this.nodes = new Array(9);
		if(this.a.loc && this.a.loc.is_base_loc) {
			for(let loc of this.a.marginal_locs()) {
				for(let atom of loc.partial_contents) {
					if(!has_component(atom, "AtmosNode"))
						continue;
					let this_dir = this.get_node_dirs();
					let other_dir = atom.c.AtmosNode.get_node_dirs();
					let node_dir = 0;
					if((other_dir & 3) && (this_dir & 3) && Math.abs(atom.x - this.a.x) < 0.00001) {
						if((other_dir & 2) && (this_dir & 1) && Math.abs((atom.y + atom.bounds_y) - (this.a.y + this.a.bounds_y + this.a.bounds_height)) < 0.0001)
							node_dir = 1;
						if((other_dir & 1) && (this_dir & 2) && Math.abs((atom.y + atom.bounds_y + atom.bounds_height) - (this.a.y + this.a.bounds_y)) < 0.0001)
							node_dir = 2;
					}
					if((other_dir & 12) && (this_dir & 12) && Math.abs(atom.y - this.a.y) < 0.00001) {
						if((other_dir & 8) && (this_dir & 4) && Math.abs((atom.x + atom.bounds_x) - (this.a.x + this.a.bounds_x + this.a.bounds_width)) < 0.0001)
							node_dir = 4;
						if((other_dir & 4) && (this_dir & 8) && Math.abs((atom.x + atom.bounds_x + atom.bounds_width) - (this.a.x + this.a.bounds_x)) < 0.0001)
							node_dir = 8;
					}
					if(node_dir) {
						if(this.nodes[node_dir] == atom)
							continue;
						let opp_node_dir = turn_dir(node_dir, 180);
						if(this.nodes[node_dir] || atom.c.AtmosNode.nodes[opp_node_dir]) {
							console.warn(`Multiple pipes on one node around (${this.a.x},${this.a.y},${this.a.z},${this.a.dim})`);
						}
						this.nodes[node_dir] = atom;
						atom.c.AtmosNode.nodes[opp_node_dir] = this.a;
					}
				}
			}
		}
		this.update_intact_overlays();
		for(let i of [1,2,4,8]) {
			if(this.nodes[i] != old_nodes[i]) {
				if(this.nodes[i])
					this.nodes[i].c.AtmosNode.update_intact_overlays();
				if(old_nodes[i])
					old_nodes[i].c.AtmosNode.update_intact_overlays();
			}
		}
		this.update_pipenet(old_nodes, this.nodes);
	}

	check_can_unwrench(/*user*/) {
		return this.can_unwrench;
	}

	update_intact_overlays() {}
	update_pipenet() {}
}

AtmosNode.loadBefore = ["Destructible"];
AtmosNode.depends = ["Destructible"];

AtmosNode.template = {
	vars: {
		components: {
			"AtmosNode": {
				can_unwrench: true
			},
			"Tangible": {
				anchored: true
			}
		}
	}
};

module.exports.components = {AtmosNode};
