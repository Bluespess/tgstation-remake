'use strict';
const {Component} = require('bluespess');
const layers = require('../../defines/layers.js');

class Plating extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.floor = this.a;
		this.icon_groups = {};
	}
}

Plating.depends = ["SimulatedTurf", "FloorBase", "SmoothGroup"];
Plating.loadBefore = ["SimulatedTurf", "FloorBase", "SmoothGroup"];

Plating.template = {
	vars: {
		components: {
			"FloorBase": {
				broken_states: ["platingdmg1", "platingdmg2", "platingdmg3"],
				burnt_states: ["panelscorched"]
			},
			"SmoothGroup": {
				groups: ["lattice"]
			},
		},
		name: "plating",
		icon: 'icons/turf/floors.png',
		icon_state: "plating",
		layer: layers.TURF_LAYER
	}
};

module.exports.templates = {
	"plating": {
		components: ["Plating"],
		tree_paths: ["basic_structures/plating"]
	},
	"plating_n2o": {
		parent_template: "plating",
		vars: {
			components: {
				"Turf": {
					initial_gas_mix: "n2o=6000;TEMP=293.15"
				}
			}
		},
		tree_paths: ["basic_structures/plating/n2o"]
	},
	"plating_co2": {
		parent_template: "plating",
		vars: {
			components: {
				"Turf": {
					initial_gas_mix: "co2=50000;TEMP=293.15"
				}
			}
		},
		tree_paths: ["basic_structures/plating/co2"]
	},
	"plating_plasma": {
		parent_template: "plating",
		vars: {
			components: {
				"Turf": {
					initial_gas_mix: "plasma=70000;TEMP=293.15"
				}
			}
		},
		tree_paths: ["basic_structures/plating/plasma"]
	},
	"plating_o2": {
		parent_template: "plating",
		vars: {
			components: {
				"Turf": {
					initial_gas_mix: "o2=100000;TEMP=293.15"
				}
			}
		},
		tree_paths: ["basic_structures/plating/o2"]
	},
	"plating_n2": {
		parent_template: "plating",
		vars: {
			components: {
				"Turf": {
					initial_gas_mix: "n2=100000;TEMP=293.15"
				}
			}
		},
		tree_paths: ["basic_structures/plating/n2"]
	},
	"plating_air": {
		parent_template: "plating",
		vars: {
			components: {
				"Turf": {
					initial_gas_mix: "o2=2644;n2=10580;TEMP=293.15"
				}
			}
		},
		tree_paths: ["basic_structures/plating/n2"]
	},
	"plating_airless": {
		parent_template: "plating",
		vars: {
			components: {
				"Turf": {
					initial_gas_mix: "TEMP=293.15"
				}
			}
		},
		tree_paths: ["basic_structures/plating/airless"]
	}
};

module.exports.components = {Plating};
