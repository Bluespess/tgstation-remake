'use strict';

module.exports.templates = {
	"caution": {
		components: ["Item"],
		vars: {
			components: {
				"Item": {
					inhand_lhand_icon: 'icons/mob/inhands/equipment/custodial_lefthand.png',
					inhand_rhand_icon: 'icons/mob/inhands/equipment/custodial_righthand.png',
					size: 2,
					force: 1,
					attack_verb: ["warned", "cautioned", "smashed"],
				},
				"Examine": {
					desc: "Caution! Wet Floor!"
				},
				"Tangible": {
					throw_force: 1,
					throw_speed: 2,
					throw_range: 5,
				}
			},
			icon: 'icons/obj/janitor.png',
			icon_state: 'caution',
			name: "wet floor sign",
			tree_paths: ["items/item/caution"]
		}
	}
};
