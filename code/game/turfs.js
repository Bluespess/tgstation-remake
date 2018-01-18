'use strict';
const layers = require('../defines/layers.js');

module.exports.templates = {
	"wall": {
		components: ["BlocksAir", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "wall"
				},
				"SmoothGroup": {
					groups: ["wall"]
				}
			},
			icon: 'icons/turf/walls/wall.png',
			icon_state: "wall",
			layer: layers.WALL_LAYER,
			density: 1,
			opacity: true
		},
		tree_paths: ["basic_structures/wall"],
		requires_under: {
			component: "FloorBase",
			default: "plating"
		}
	},
	"r-wall": {
		components: ["BlocksAir", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "wall"
				},
				"SmoothGroup": {
					groups: ["wall"]
				}
			},
			icon: 'icons/turf/walls/reinforced_wall.png',
			icon_state: "r_wall",
			layer: layers.WALL_LAYER,
			density: 1,
			opacity: true
		},
		tree_paths: ["basic_structures/wall/reinforced"],
		requires_under: {
			component: "FloorBase",
			default: "plating"
		}
	},
	"crate": {
		components: ["Tangible"],
		vars: {
			icon: 'icons/obj/crates.png',
			icon_state: "crate",
			layer: 2.9,
			density: 1
		}
	},
	"light": {
		components: ["LightSource", "Tangible"],
		vars: {
			name: "light fixture",
			layer: 2.9,
			icon: 'icons/obj/lighting.png',
			icon_state: "tube1",
			components: {
				"LightSource": {
					on: true,
					radius: 8,
					color: "#ffffff"
				},
				"Tangible": {
					anchored: true
				}
			}
		},
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		]
	},
	"light_small": {
		components: ["LightSource", "Tangible"],
		vars: {
			name: "light fixture",
			layer: 2.9,
			icon: 'icons/obj/lighting.png',
			icon_state: "bulb1",
			components: {
				"LightSource": {
					on: true,
					radius: 4,
					color: "#ccbbaa"
				},
				"Tangible": {
					anchored: true
				}
			}
		},
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		]
	}
};
