'use strict';
const {Component} = require('bluespess');

let reagent_metas = {};
let reagent_reactions = [];

class ReagentHolder extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.reagents = {};
	}
}

ReagentHolder.template = {
	vars: {
		components: {
			"ReagentHolder": {
				maximum_volume: 100,
				temperature: 150,
				react: true,
				init_reagents: null
			}
		}
	}
};

function add_items(mod) {
	if(mod.reagent_metas) {
		for(let key of Object.keys(mod.reagent_metas)) {
			if(reagent_metas[key])
				throw new Error(`Reagent meta '${key}' defined more than once!`);
			reagent_metas[key] = mod.reagent_metas[key];
		}
	}
	if(mod.reagent_reactions) {
		for(let reaction of mod.reagent_reactions) {
			reagent_reactions.push(reaction);
		}
	}
}

module.exports.components = {ReagentHolder};
