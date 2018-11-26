'use strict';
const {Component} = require('bluespess');

class Analyzer extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

Analyzer.loadBefore = ["Item"];
Analyzer.depends = ["Item"];

Analyzer.template = {
	vars: {
		components: {
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/equipment/tools_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/tools_righthand.png',
				inhand_icon_state: "analyzer",
				size:2,
				no_bludgeon: true
			},
			"Tangible": {
				throw_force: 0,
				throw_speed: 3,
				throw_range: 7
			},
			"Examine": {
				desc: "A hand-held environmental scanner which reports current gas levels."
			}
		},
		name: "analyzer",
		icon: 'icons/obj/device.png',
		icon_state: "atmos"
	}
};

module.exports.templates = {
	"analyzer": {
		components: ["Analyzer"],
		tree_paths: ["items/tools/analyzer"]
	}
};

module.exports.components = {Analyzer};
