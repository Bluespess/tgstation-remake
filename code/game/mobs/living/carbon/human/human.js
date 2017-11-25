'use strict';
const {Component} = require('bluespess');

class HumanMob extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

HumanMob.depends = ["CarbonMob"];
HumanMob.loadBefore = ["CarbonMob"];

HumanMob.template = {
	vars: {
		components: {
			"MobInteract": {
				zone_sel_template: "human_zone_sel"
			}
		}
	}
};

module.exports.components = {HumanMob};
