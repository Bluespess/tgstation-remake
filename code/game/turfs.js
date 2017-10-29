'use strict';

module.exports.templates = {
	"plating": {
		components: ["SimulatedTurf"],
		vars: {
			appearance: {
				icon: 'icons/turf/floors.png',
				icon_state: "plating"
			}
		},
		tree_paths: ["basic_structures/plating"]
	},
	"floor": {
		components: ["SimulatedTurf"],
		vars: {
			appearance: {
				icon: 'icons/turf/floors.png'
			}
		},
		tree_paths: ["basic_structures/floor"],
		variants: [
			{
				type: "single",
				var_path: ["appearance", "icon_state"],
				values: ["floor", "white", "dark", "bar", "floorgrime", "delivery", "bot", "barber", "whitebot", "whitedelivery", "cmo"],
				label: true,
				orientation: "vertical"
			}
		]
	},
	"floor_edge": {
		components: ["SimulatedTurf"],
		vars: {
			appearance: {
				icon: 'icons/turf/floors.png'
			}
		},
		tree_paths: ["basic_structures/floor/edge"],
		variants: [
			{
				type: "single",
				var_path: ["appearance", "icon_state"],
				values: [
					"red", "whitered", "blue", "whiteblue", "green", "whitegreen", "yellow", "whiteyellow", "orange", "whitehall", "arrival", "escape", "purple", "whitepurple", "brownold", "brown", "redyellow", "redblue", "bluered", "redgreen", "greenyellow", "greenblue", "blueyellow", "darkpurple", "darkred", "darkblue", "darkgreen", "darkyellow", "darkbrown"
				],
				label:true,
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["appearance", "dir"],
				values: [
					2, 1, 4, 8, 5, 6, 9, 10
				],
				orientation: "horizontal",
				wrap: 4
			}
		]
	},
	"floor_corner": {
		components: ["SimulatedTurf"],
		vars: {
			appearance: {
				icon: 'icons/turf/floors.png'
			}
		},
		tree_paths: ["basic_structures/floor/corner"],
		variants: [
			{
				type: "single",
				var_path: ["appearance", "icon_state"],
				values: [
					"redcorner", "whiteredcorner", "bluecorner", "whitebluecorner", "greencorner", "whitegreencorner", "yellowcorner", "whiteyellowcorner", "orangecorner", "arrivalcorner", "escapecorner", "purplecorner", "whitepurplecorner", "browncorner"
				],
				label:true,
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["appearance", "dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		]
	},
	"floor_plaque": {
		components: ["SimulatedTurf"],
		vars: {
			appearance: {
				icon: 'icons/turf/floors.png',
				icon_state: "plaque"
			}
		},
		tree_paths: ["basic_structures/floor/plaque"]
	},
	"wall": {
		components: [],
		vars: {
			appearance: {
				icon: 'icons/turf/walls/wall.png',
				icon_state: "wall",
				layer: 1
			},
			density: 1,
			opacity: true
		},
		tree_paths: ["basic_structures/wall"],
		require_under: {
			component: "Turf",
			default: "floor"
		}
	},
	"r-wall": {
		components: [],
		vars: {
			appearance: {
				icon: 'icons/turf/walls/reinforced_wall.png',
				icon_state: "r_wall",
				layer: 1
			},
			density: 1,
			opacity: true
		},
		tree_paths: ["basic_structures/wall/reinforced"],
		require_under: {
			component: "Turf",
			default: "floor"
		}
	},
	"crate": {
		components: ["Tangible"],
		vars: {
			appearance: {
				icon: 'icons/obj/crates.png',
				icon_state: "crate",
				layer: 2.9
			},
			density: 1
		}
	},
	"light": {
		components: ["LightingObject", "Tangible"],
		vars: {
			layer: 10,
			icon: 'icons/obj/lighting.png',
			icon_state: "flashlight-on",
			components: {
				"LightingObject": {
					on: true,
					radius: 5,
					color: "#ffffff"
				}
			}
		}
	}
};
