'use strict';
const {Component} = require('bluespess');

let reagent_types = {};
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
	if(mod.reagents) {
		for(let key of Object.keys(mod.reagents)) {
			if(reagent_types[key])
				throw new Error(`Reagent meta '${key}' defined more than once!`);
			reagent_types[key] = mod.reagents[key];
		}
	}
	if(mod.reagent_reactions) {
		for(let reaction of mod.reagent_reactions) {
			reagent_reactions.push(reaction);
		}
	}
}

// Import the reagents and recipes
add_items(require('./reagents/other.js'));

// Cache the reactions for the reagents

for(let reaction of reagent_reactions) {
	let to_cache = {};
	for(let req of Object.keys(reaction.required_reagents)) {
		if(!to_cache[req])
			to_cache[req] = 0;
		to_cache[req] = Math.max(to_cache[req], reaction.required_reagents[req]);
	}
	for(let reagent_name of Object.keys(to_cache)) {
		let amount = to_cache[reagent_name];
		let reagent_type = reagent_types[reagent_name];
		
	}
}

module.exports.components = {ReagentHolder};
module.exports.reagent_types = reagent_types;
