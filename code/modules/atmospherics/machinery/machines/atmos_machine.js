'use strict';
const {Component, has_component} = require('bluespess');
const GasMixture = require('../../gasmixtures/gas_mixture.js');

class AtmosMachine extends Component.Networked {
	constructor(atom, template) {
		super(atom, template);
		this.add_networked_var("node_display");
		this.a.c.AtmosNode.get_node_dirs = this.get_node_dirs.bind(this);
		this.a.c.AtmosNode.update_intact_overlays = this.update_intact_overlays.bind(this);
		this.airs = [];
		for(let i = 0; i < this.node_amount; i++) {
			this.airs.push(new GasMixture(200));
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
		return [];
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
