'use strict';
const {Component, turn_dir} = require('bluespess');
const layers = require('../../../../../defines/layers.js');

class BinaryAtmosMachine extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.AtmosMachine.get_node_index_dirs = this.get_node_index_dirs.bind(this);
	}

	get_node_index_dirs() {
		if(!this.directional) {
			return (this.a.dir & 12) ? [4,8] : [1,2];
		} else {
			return [turn_dir(this.a.dir, 180), this.a.dir];
		}
	}
}

BinaryAtmosMachine.loadBefore = ["AtmosMachine"];
BinaryAtmosMachine.depends = ["AtmosMachine"];

BinaryAtmosMachine.template = {
	vars: {
		components: {
			"BinaryAtmosMachine": {
				directional: true // if true, it points in one of 4 directions (pumps). If false, it's horizontal (12) or vertical (3) (valves)
			},
			"AtmosMachine": {
				node_amount: 2
			}
		},
		icon: 'icons/obj/atmospherics/components/binary_devices.png',
		layer: layers.GAS_PUMP_LAYER
	}
};

module.exports.components = {BinaryAtmosMachine};
