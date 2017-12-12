'use strict';

const EventEmitter = require('events');

class Reagent extends EventEmitter {
}
Object.assign(Reagent.prototype, {
	name: "Reagent",
	description: "",
	taste_description: "metaphorical salt",
	taste_mult: 1,
	glass_name: "glass off ...what?",
	glass_desc: "You can't really tell what this is.",
	glass_icon_state: null,
	shot_glass_icon_state: null,
	reagent_state: "liquid",
	color: "#000000",
	can_synth: true,
	metabolization_rate: 0.2,
	overdose_threshold: 0,
	addiction_threshold: 0
});

class ReagentReaction {
	constructor(obj) {
		Object.assign(this, {
			results: {},
			required_reagents: {},
			required_catalysts: {},

			required_container: null,
			mob_react: true,

			min_temp: null,
			max_temp: null,

			mix_message: "The solution begins to bubble.",
			mix_sound: 'sounds/effects/bubbles.ogg'
		}, obj);
	}
}

module.exports = {Reagent, ReagentReaction};
