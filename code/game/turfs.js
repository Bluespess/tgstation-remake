'use strict';

module.exports.templates = {
	"floor": {
		components: ["SimulatedTurf"],
		vars: {
			icon: 'icons/turf/floors.png'
		},
		tree_paths: ["basic_structures/floor"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: ["floor", "white", "dark", "bar", "floorgrime", "delivery", "bot", "barber", "whitebot", "whitedelivery", "cmo", "grimy", "freezerfloor"],
				label: true,
				orientation: "vertical"
			}
		]
	},
	"floor_ss13": {
		components: ["SimulatedTurf"],
		vars: {
			icon: 'icons/turf/floors.png'
		},
		tree_paths: ["basic_structures/floor/ss13"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"L1", "L3", "L5", "L7", "L2", "L4", "L6", "L8", "L9", "L11", "L13", "L7", "L10", "L12", "L14", "L8"
				],
				orientation: "horizontal",
				wrap: 4
			}
		]
	},
	"floor_edge": {
		components: ["SimulatedTurf"],
		vars: {
			icon: 'icons/turf/floors.png'
		},
		tree_paths: ["basic_structures/floor/edge"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"red", "whitered", "blue", "whiteblue", "green", "whitegreen", "yellow", "whiteyellow", "orange", "whitehall", "arrival", "escape", "purple", "whitepurple", "brownold", "brown", "redyellow", "redblue", "bluered", "redgreen", "greenyellow", "greenblue", "blueyellow", "darkpurple", "darkred", "darkblue", "darkgreen", "darkyellow", "darkbrown"
				],
				label:true,
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["dir"],
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
			icon: 'icons/turf/floors.png'
		},
		tree_paths: ["basic_structures/floor/corner"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"redcorner", "whiteredcorner", "bluecorner", "whitebluecorner", "greencorner", "whitegreencorner", "yellowcorner", "whiteyellowcorner", "orangecorner", "arrivalcorner", "escapecorner", "purplecorner", "whitepurplecorner", "browncorner"
				],
				label:true,
				orientation: "vertical"
			},
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
	"floor_plaque": {
		components: ["SimulatedTurf"],
		vars: {
			icon: 'icons/turf/floors.png',
			icon_state: "plaque"
		},
		tree_paths: ["basic_structures/floor/plaque"]
	},
	"floor_wood": {
		components: ["SimulatedTurf"],
		vars: {
			icon: 'icons/turf/floors.png',
			icon_state: "wood"
		},
		tree_paths: ["basic_structures/floor/wood"]
	},
	"floor_carpet": {
		components: ["SimulatedTurf", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "carpet"
				},
				"SmoothGroup": {
					groups: ["carpet"]
				}
			},
			icon: 'icons/turf/floors/carpet.png',
			icon_state: "carpet"
		},
		tree_paths: ["basic_structures/floor/carpet"]
	},
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
			layer: 1,
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
			layer: 1,
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
