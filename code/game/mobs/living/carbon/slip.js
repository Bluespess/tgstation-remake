'use strict';
const {Component, has_component} = require('bluespess');

class Slippery extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("crossed_by", (mob)=>{this.slip(mob);});
	}

	slip(mob) {
		if(!has_component(mob, "CarbonMob"))
			return;
		if(!this.enabled)
			return;
		mob.c.CarbonMob.slip(this.a);
	}
}

Slippery.template = {
	vars: {
		components: {
			"Slippery": {
				enabled: true,
				knockdown_amount: 6000
			}
		}
	}
};

module.exports.components = {Slippery};
