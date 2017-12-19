'use strict';
const {Component, has_component} = require('bluespess');

const _temperature = Symbol('_temperature');

let reagent_types = {};
let reagent_reactions = [];

class ReagentHolder extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.reagents = new Map();
		this.held_reactions = new Set();
		this.on("added", this.added.bind(this));
		this.on("removed", this.removed.bind(this));
		this.on("temperature_changed", this.update_reactions.bind(this));

		if(this.init_reagents) {
			for(let [reagent, amount] of Object.entries(this.init_reagents)) {
				this.add(reagent, amount);
			}
		}
	}

	add(reagent, amount, {temp} = {}) {
		let reagent_name = typeof reagent == "string" ? reagent : reagent.constructor.name;
		return this.assume_reagent(reagent_name).add(amount, {reagent: typeof reagent == "object" ? reagent : null, temp});
	}

	remove(reagent, amount) {
		if(!reagent)
			return 0;
		if(typeof reagent == "string")
			reagent = this.reagents.get(reagent);
		return reagent.remove(amount);
	}

	assume_reagent(reagent_name) {
		if(!this.reagents.has(reagent_name)) {
			let reagent = new reagent_types[reagent_name]();
			reagent.holder = this.a;
			this.reagents.set(reagent_name, reagent);
		}
		return this.reagents.get(reagent_name);
	}

	get total_volume() {
		let v = 0;
		for(let reagent of this.reagents.values()) {
			v += reagent.volume;
		}
		return v;
	}

	added(reagent, amount) {
		let reactions = reagent.constructor.reactions;
		if(!reactions)
			return;
		for(let [reaction, min_amount] of reactions) {
			if(amount >= min_amount) {
				reaction.update(this.a);
			}
		}
	}

	removed(reagent) {
		for(let reaction of this.held_reactions) {
			if(reagent.reactions && reagent.reactions.get(reagent) && reagent.reactions.get(reagent) < reagent.volume)
				this.held_reactions.delete(reaction);
		}
		if(reagent.volume <= 0) {
			this.reagents.delete(reagent.constructor.name);
		}
	}

	update_reactions() {
		for(let reaction of this.held_reactions) {
			reaction.update(this.a);
		}
	}

	volume_of(reagent) {
		if(typeof reagent == "string")
			reagent = this.reagents.get(reagent);
		if(reagent)
			return reagent.volume;
		else
			return 0;
	}

	get temperature() {
		return this[_temperature];
	}
	set temperature(val) {
		let old = this[_temperature];
		if(val == old)
			return;
		this[_temperature] = val;

		this.emit("temperature_changed", old, val);
	}

	remove_any(amount = 1) {
		if(amount <= 0)
			return 0;
		let total_transferred = 0;

		let reagents_list = [...this.reagents.values()];

		while(total_transferred < amount) {
			if(!reagents_list.length)
				break;
			let rand_idx = Math.floor(Math.random() * reagents_list.length);
			let reagent = reagents_list[rand_idx];
			total_transferred += reagent.remove(amount - total_transferred);
			reagents_list.splice(rand_idx, 1);
		}

		return total_transferred;
	}

	remove_all(amount = 1) {
		if(amount <= 0)
			return 0;
		let ratio = amount / this.total_volume;
		let removed = 0;
		for(let reagent of this.reagents.values()) {
			removed += reagent.remove(reagent.volume * ratio);
		}
		return removed;
	}

	get_master_reagent() {
		let master = null;
		let master_amount = 0;
		for(let reagent of this.reagents.values()) {
			if(reagent.volume > master_amount) {
				master_amount = reagent.volume;
				master = reagent;
			}
		}
		return master;
	}

	transfer_percent_to(target, percent = 1) {
		if(!has_component(target, "ReagentHolder"))
			return 0;
		percent = Math.min(percent, 1);
		percent = Math.min(percent, (this.maximum_volume - this.total_volume) / (target.c.ReagentHolder.maximum_volume - target.c.ReagentHolder.total_volume));
		if(percent <= 0)
			return 0;
		let amount_transferred = 0;
		for(let reagent of this.reagents.values()) {
			amount_transferred += target.c.ReagentHolder.add(reagent, reagent.volume * percent);
		}
		return amount_transferred;
	}

	transfer_to(target, amount) {
		let percent = amount / this.total_volume;
		return this.transfer_percent_to(target, percent);
	}

	react_atom(atom, method = "touch", {volume_modifier = 1, show_message = true}) {
		let react_function = "reaction_obj";
		if(has_component(atom, "LivingMob"))
			react_function = "reaction_mob";
		else if(has_component(atom, "Turf"))
			react_function = "reaction_turf";
		for(let reagent of this.reagents.values()) {
			reagent[react_function](atom, {method, volume: reagent.volume * volume_modifier, show_message});
		}
	}

	can_be_injected() {
		return this.injectable;
	}
	can_be_drawn() {
		return this.drawable;
	}
	can_see_reagents() {
		return this.reagents_visible;
	}
}

ReagentHolder.template = {
	vars: {
		components: {
			"ReagentHolder": {
				maximum_volume: 100,
				temperature: 150,
				react: true,
				init_reagents: null,
				injectable: false,
				drawable: false,
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
add_items(require('./reagents/alcohol.js'));
add_items(require('./reagents/blob.js'));
add_items(require('./reagents/drink.js'));
add_items(require('./reagents/drug.js'));
add_items(require('./reagents/food.js'));
add_items(require('./reagents/medicine.js'));
add_items(require('./reagents/pyrotechnic.js'));
add_items(require('./reagents/toxin.js'));
add_items(require('./recipes/others.js'));
add_items(require('./recipes/drugs.js'));
add_items(require('./recipes/medicine.js'));
add_items(require('./recipes/pyrotechnics.js'));
add_items(require('./recipes/toxins.js'));

// Cache the reactions for the reagents

for(let reaction of reagent_reactions) {
	let to_cache = {};
	for(let [req, amount] of Object.entries(reaction.required_reagents)) {
		if(!to_cache[req])
			to_cache[req] = 0;
		to_cache[req] = Math.max(to_cache[req], amount);
	}
	for(let [reagent_name, amount] of Object.entries(to_cache)) {
		let reagent_type = reagent_types[reagent_name];
		if(!reagent_type)
			throw new Error(`Reaction ${JSON.stringify(reaction.results)} references unknown reagent ${reagent_name}`);
		if(!reagent_type.reactions)
			reagent_type.reactions = new Map();
		reagent_type.reactions.set(reaction, amount);
	}
}

module.exports.components = {ReagentHolder};
module.exports.reagent_types = reagent_types;
