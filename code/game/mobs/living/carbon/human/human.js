'use strict';
const {Component} = require('bluespess');
const _ = require('underscore');

const first_names = require('../../../../../../strings/names/first.json');
const last_names = require('../../../../../../strings/names/last.json');

class HumanMob extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(!this.a.name) {
			let first_name = _.sample(first_names);
			let last_name = _.sample(last_names);
			this.a.name = `${first_name} ${last_name}`;
		}
	}
}

HumanMob.depends = ["CarbonMob", "MobBodyParts"];
HumanMob.loadBefore = ["CarbonMob", "MobBodyParts"];

HumanMob.template = {
	vars: {
		components: {
			"MobInteract": {
				zone_sel_template: "human_zone_sel",
				advanced_tool_user: true
			}
		}
	}
};

module.exports.components = {HumanMob};
