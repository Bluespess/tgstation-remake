'use strict';
const {Component, turn_dir} = require('bluespess');
const layers = require('../../../../../defines/layers.js');

class TrinaryAtmosMachine extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.AtmosMachine.get_node_index_dirs = this.get_node_index_dirs.bind(this);
	}

	get_node_index_dirs() {
		//Mixer: 0 and 1 are input, 2 is output. If flipped, 1 and 2 are input and 0 is output.
		//Filter: 0 is input, 1 is filtered output, 2 is rest output. If flipped, 2 is input, 1 is filtered output, and 0 is rest output.
		let node_1 = turn_dir(this.a.dir, -180);
		let node_2 = turn_dir(this.a.dir, -90);
		let node_3 = this.a.dir;
		if(this.flipped) {
			node_1 = turn_dir(node_1, 180);
			node_3 = turn_dir(node_3, 180);
		}
		return [node_1, node_2, node_3];
	}
}

TrinaryAtmosMachine.loadBefore = ["AtmosMachine"];
TrinaryAtmosMachine.depends = ["AtmosMachine"];

TrinaryAtmosMachine.template = {
	vars: {
		components: {
			"TrinaryAtmosMachine": {
				flipped: false, // if true, input and non-filter output swap positions
			},
			"AtmosMachine": {
				node_amount: 3
			}
		},
		icon: 'icons/obj/atmospherics/components/trinary_devices.png',
		layer: layers.GAS_FILTER_LAYER
	}
};

module.exports.components = {TrinaryAtmosMachine};
