'use strict';


module.exports.templates = {
	"clown_shoes": {
		components: ["Squeak", "FootItem"],
		vars: {
			components: {
				"Squeak": {
					squeak_sounds: ['sound/effects/clownstep1.ogg', 'sound/effects/clownstep2.ogg'],
					volume: 0.5
				},
				"Item": {
					inhand_icon_state: "clown_shoes"
				},
				"Examine": {
					desc: "The prankster's standard-issue clowning shoes. Damn, they're huge!"
				}
			},
			name: "clown shoes",
			icon_state: "clown"
		}
	}
};
