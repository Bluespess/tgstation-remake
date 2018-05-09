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
	},
	"boots_work": {
		components: ["FootItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.15,
					strip_delay: 4000,
					put_on_delay: 4000
				},
				"Item": {
					inhand_icon_state: "jackboots",
					inhand_lhand_icon: 'icons/mob/inhands/equipment/security_lefthand.png',
					inhand_rhand_icon: 'icons/mob/inhands/equipment/security_righthand.png'
				},
				"Examine": {
					desc: "Nanotrasen-issue Engineering lace-up work boots for the especially blue-collar."
				}
			},
			name: "work boots",
			icon_state: "workboots"
		}
	},
	"boots_jackboots": {
		components: ["FootItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.05,
					strip_delay: 5000,
					put_on_delay: 5000
				},
				"Item": {
					inhand_icon_state: "jackboots",
					inhand_lhand_icon: 'icons/mob/inhands/equipment/security_lefthand.png',
					inhand_rhand_icon: 'icons/mob/inhands/equipment/security_righthand.png'
				},
				"Examine": {
					desc: "Nanotrasen-issue Security combat boots for combat scenarios or combat situations. All combat, all the time."
				}
			},
			name: "jackboots",
			icon_state: "jackboots"
			//TODO resistance_flags: 0
			//TODO item_color: "hosred"
		}
	},
	"boots_mining": {
		components: ["FootItem"],
		vars: {
			components: {
				"WearableItem": {
					permeability_coefficient: 0.15,
					strip_delay: 4000,
					put_on_delay: 4000
				},
				"Item": {
					inhand_icon_state: "jackboots",
					inhand_lhand_icon: 'icons/mob/inhands/equipment/security_lefthand.png',
					inhand_rhand_icon: 'icons/mob/inhands/equipment/security_righthand.png'
				},
				"Examine": {
					desc: "Steel-toed mining boots for mining in hazardous environments. Very good at keeping toes uncrushed."
				}
			},
			name: "mining boots",
			icon_state: "explorer"
			//TODO resistance_flags: FIRE_PROOF
		}
	}
};
