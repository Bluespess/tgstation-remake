'use strict';
class ReagentMeta {
	constructor(obj) {
		Object.assign(this, {
			name: "Reagent",
			description: "",
			taste_description: "metaphorical salt",
			taste_mult: 1,
			glass_name: "glas off ...what?",
			glass_desc: "You can't really tell what this is.",
			glass_icon_state: null,
			shot_glass_icon_state: null,
			reagent_state: "liquid",
			color: "#000000",
			can_synth: true,
			metabolization_rate: 0.2,
			overdose_threshold: 0,
			addiction_threshold: 0
		}, obj);
	}
}

module.exports = {ReagentMeta};
