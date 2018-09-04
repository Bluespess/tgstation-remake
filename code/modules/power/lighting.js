'use strict';
const {Component, make_watched_property} = require('bluespess');

class LightFixture extends Component {
	constructor(atom, template) {
		super(atom, template);
		//TODO add actual tubes
		this.tube = true; // for now, will add actual tubes later™
		this.a.c.ApcPowered.on("powered_changed", this.update_on.bind(this));
		this.on("tube_changed", this.update_on.bind(this));
		this.on("turned_on_changed", this.update_on.bind(this));
		make_watched_property(this, "tube");
		make_watched_property(this, "turned_on");
	}

	update_on() {
		let functional = this.turned_on && this.tube; // TODO add a check for tube broken-ness when I add actual tubes
		this.using_idle_power = functional;
		if(functional && this.a.c.ApcPowered.powered) {
			this.a.icon_state = `${this.base_state}1`;
			this.a.c.LightSource.enabled = true;
		} else {
			this.a.c.LightSource.enabled = false;
			if(!this.tube) {
				this.a.icon_state = `${this.base_state}_empty`;
			} else {
				this.a.icon_state = `${this.base_state}0`;
			}
		}
	}
}

LightFixture.loadBefore = ["ApcPowered", "Destructible", "LightSource"];
LightFixture.depends = ["ApcPowered", "Destructible", "LightSource"];

LightFixture.template = {
	vars: {
		components: {
			"LightFixture": {
				base_state: "tube",
				tube_type: "tube",
				default_tube: "tube",
				turned_on: true
			},
			"LightSource": {
				enabled: true,
				radius: 8,
				color: "#ffffff"
			},
			"ApcPowered": {
				power_usage: 20,
				using_idle_power: true
			},
			"Tangible": {
				anchored: true,
			}
		},
		name: "light fixture",
		layer: 2.9,
		icon: 'icons/obj/lighting.png',
		icon_state: "tube1"
	}
};

module.exports.templates = {
	"light": {
		components: ["LightFixture"],
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
		components: ["LightFixture"],
		vars: {
			icon_state: "bulb1",
			components: {
				"LightSource": {
					radius: 4,
					color: "#ccbbaa"
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

module.exports.components = {LightFixture};
