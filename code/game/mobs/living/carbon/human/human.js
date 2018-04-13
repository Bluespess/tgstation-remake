'use strict';
const {Component} = require('bluespess');

const first_names = require('../../../../../../strings/names/first.json');
const last_names = require('../../../../../../strings/names/last.json');

class HumanMob extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(!this.a.name) {
			let first_name = first_names[Math.floor(Math.random() * first_names.length)];
			let last_name = last_names[Math.floor(Math.random() * last_names.length)];
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
				zone_sel_template: "human_zone_sel"
			}
		}
	}
};

module.exports.components = {HumanMob};
