'use strict';
const layers = require('../../../defines/layers.js');

module.exports.templates = {
	"lattice": {
		components: ["Destructible", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "lattice"
				},
				"SmoothGroup": {
					groups: ["lattice"]
				},
				"Destructible": {
					armor: {melee: 50, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 80, acid: 50},
					max_integrity: 50
				},
				"Tangible": {
					anchored: true
				},
				"Examine": {
					desc: "A lightweight support lattice. These hold our station together."
				}
			},
			name: "lattice",
			icon: 'icons/obj/smooth_structures/lattice.png',
			icon_state: "lattice",
			density: 0,
			layer: layers.LATTICE_LAYER
		}
	}
};
