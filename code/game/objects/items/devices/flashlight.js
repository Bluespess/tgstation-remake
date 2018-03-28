'use strict';

const {Component} = require('bluespess');

class Flashlight extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.LightSource.on("enabled_changed", this.enabled_changed.bind(this));
		this.a.c.Item.attack_self = this.attack_self.bind(this);
	}

	enabled_changed() {
		if(this.a.c.LightSource.enabled) {
			this.a.icon_state = this.a.template.vars.icon_state + "-on";
		} else {
			this.a.icon_state = this.a.template.vars.icon_state;
		}
	}

	attack_self() {
		this.a.c.LightSource.enabled = !this.a.c.LightSource.enabled;
	}
}

Flashlight.depends = ["LightSource", "Item"];
Flashlight.loadBefore = ["LightSource", "Item"];

Flashlight.template = {
	vars: {
		components: {
			"LightSource": {
				enabled: false,
				radius: 4,
				color: "#ffffff"
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/misc/devices_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/misc/devices_righthand.png',
				size: 2
			}
		},
		icon: 'icons/obj/lighting.png'
	}
};

module.exports.templates = {
	"flashlight": {
		components: ["Flashlight", "BeltItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "flashlight"
				},
				"Examine": {
					desc: "A hand-held emergency light."
				}
			},
			name: "flashlight",
			icon_state: "flashlight"
		},
		tree_paths: ["items/flashlight"]
	}
};

module.exports.components = {Flashlight};
