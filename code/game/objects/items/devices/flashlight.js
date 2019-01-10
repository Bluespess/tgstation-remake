'use strict';

const {Component} = require('bluespess');

class Flashlight extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.ItemActions.add_action({name: "Toggle Flashlight"});
		this.a.c.LightSource.on("enabled_changed", this.enabled_changed.bind(this));
		this.a.c.Item.attack_self = this.attack_self.bind(this);
		this.enabled_changed();
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

Flashlight.depends = ["LightSource", "Item", "ItemActions"];
Flashlight.loadBefore = ["LightSource", "Item", "ItemActions"];

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

class DeskLamp extends Component {}

DeskLamp.depends = ["Flashlight", "BeltItem"];
DeskLamp.loadBefore = ["Flashlight", "BeltItem"];

DeskLamp.template = {
	vars: {
		components: {
			"LightSource": {
				radius: 5,
				enabled: true,
				color: "#ffeedd"
			},
			"Item": {
				inhand_icon_state: "lamp",
				inhand_lhand_icon: 'icons/mob/inhands/items_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/items_righthand.png',
				force: 10,
				size: 4
			},
			"Examine": {
				desc: "A desk lamp with an adjustable mount."
			}
		},
		name: "desk lamp",
		icon_state: "lamp"
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
	},
	"desk_lamp": {
		components: ["DeskLamp"],
		tree_paths: ["items/flashlight/lamp"]
	},
	"desk_lamp_green": {
		components: ["DeskLamp"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "lampgreen"
				},
				"Examine": {
					desc: "A classic green-shaded desk lamp."
				}
			},
			icon_state: "lampgreen"
		},
		tree_paths: ["items/flashlight/lamp/green"]
	},
	"desk_lamp_banana": {
		components: ["DeskLamp"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "bananalamp"
				},
				"Examine": {
					desc: "Only a clown would think to make a ghetto banana-shaped lamp. Even has a goofy pullstring."
				}
			},
			icon_state: "bananalamp"
		},
		tree_paths: ["items/flashlight/lamp/banana"]
	},
};

module.exports.components = {Flashlight, DeskLamp};
