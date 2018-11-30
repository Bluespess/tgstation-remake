'use strict';
const {Component, has_component, turn_dir} = require('bluespess');
const GasMixture = require('../../gasmixtures/gas_mixture.js');
const Pipenet = require('../pipenet.js');

class AtmosMachine extends Component.Networked {
	constructor(atom, template) {
		super(atom, template);
		this.add_networked_var("node_display");
		this.a.c.AtmosNode.get_node_dirs = this.get_node_dirs.bind(this);
		this.a.c.AtmosNode.update_intact_overlays = this.update_intact_overlays.bind(this);
		this.a.c.AtmosNode.update_pipenet = this.update_pipenet.bind(this);
		this.airs = [];
		this.pipenets = new Array(this.node_amount.length);
		for(let i = 0; i < this.node_amount; i++) {
			this.airs.push(new GasMixture(200));
		}

	}
	set_pipenet(i, val) {
		let old = this.pipenets[i];
		if(old == val)
			return;
		this.pipenets[i] = val;
		if(old) {
			old.other_airs.delete(this.airs[i]);
			if(!this.pipenets.includes(old))
				old.machines.delete(this.a);
			old.update_flag = true;
		}
		if(val) {
			val.machines.add(this.a);
			val.other_airs.add(this.airs[i]);
			val.update_flag = true;
		}
	}
	update_pipenet(old_nodes, new_nodes) {
		let index_dirs = this.get_node_index_dirs();
		for(let i = 0; i < index_dirs.length; i++) {
			let dir = index_dirs[i];
			let from = old_nodes[i];
			let to = new_nodes[i];
			if(from == to)
				continue; // nothing to see here, move on
			if(has_component(from, "AtmosMachine")) { // we need to delete the other machine from the pipenet because it now has a floating node.
				let odir = turn_dir(dir, 180);
				let other_index_dirs = from.c.AtmosMachine.get_node_index_dirs();
				for(let j = 0; j < other_index_dirs.length; j++) {
					if(other_index_dirs[j] == odir) {
						from.c.AtmosMachine.set_pipenet(j, null);
						break;
					}
				}
			}
			if(has_component(to, "AtmosMachine")) {
				let odir = turn_dir(dir, 180);
				let other_index_dirs = to.c.AtmosMachine.get_node_index_dirs();
				for(let j = 0; j < other_index_dirs.length; j++) {
					if(other_index_dirs[j] == odir) {
						let pipenet = new Pipenet(this.a.server.air_controller);
						to.c.AtmosMachine.set_pipenet(j, pipenet);
						this.set_pipenet(i, pipenet);
						break;
					}
				}
			} else if(has_component(to, "Pipe") && to.c.Pipe.pipenet) {
				this.set_pipenet(i, to.c.Pipe.pipenet);
			} else {
				this.set_pipenet(i, null);
			}
		}
	}
	update_intact_overlays() {
		let new_node_display = [];
		let node_dirs = this.a.c.AtmosNode.get_node_dirs();
		for(let i = 0; i < 4; i++) {
			let dir = 1 << i;
			let node = this.a.c.AtmosNode.nodes[dir];
			if(!(node_dirs & dir))
				new_node_display.push(null);
			else if(!node)
				new_node_display.push(["#fff",false,true]);
			else
				new_node_display.push([node.color,true,has_component(node, "Pipe") ? node.c.Pipe.visible : true]);
		}
		this.node_display = new_node_display;
	}
	get_node_dirs() {
		let index_dirs = this.get_node_index_dirs();
		let dirs = 0;
		for(let dir of index_dirs)
			dirs |= dir;
		return dirs;
	}
	get_node_index_dirs() {
		return []; // the length of this array should *always* be the same as `node_amount`
	}
}

AtmosMachine.loadBefore = ["AtmosNode", "Destructible"];
AtmosMachine.depends = ["AtmosNode", "Destructible"];

AtmosMachine.template = {
	vars: {
		components: {
			"AtmosMachine": {
				node_display: [],
				node_amount: 0
			}
		},
		layer: 2.49
	}
};

module.exports.components = {AtmosMachine};
