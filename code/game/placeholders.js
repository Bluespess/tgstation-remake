'use strict';

module.exports.templates = {
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
					enabled: true,
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
					enabled: true,
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
