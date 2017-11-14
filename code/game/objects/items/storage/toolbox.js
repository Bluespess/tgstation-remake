'use strict';
const {Component, Atom} = require('bluespess');

class Toolbox extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(this.has_latches) {
			var latches = "single_latch";
			if(Math.random() < 0.1) {
				latches = "double_latch";
				if(Math.random() < 0.01) {
					latches = "triple_latch";
				}
			}
			this.a.overlays.toolbox_latches = latches;
		}
	}
}

Toolbox.depends = ["StorageItem"];
Toolbox.loadBefore = ["StorageItem"];

Toolbox.template = {
	vars: {
		components: {
			"Toolbox": {
				has_latches: true
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/equipment/toolbox_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/toolbox_righthand.png',
				inhand_icon_state: "toolbox_red",
				force: 12,
				throwforce: 12,
				throw_speed: 2,
				throw_range: 7,
				size: 4,
				attack_verb: ["robusted"],
				hitsound: 'sound/weapons/smash.ogg'
			},
			"Describe": {
				desc: "Danger. Very robust."
			}
		},
		icon_state: "red",
		name: "toolbox"
	}
};

module.exports.templates = {
	"toolbox_mechanical": {
		components: ["Toolbox"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "toolbox_blue"
				}, "StorageItem": {
					populate_contents() {
						new Atom(this.a.server, "screwdriver", this.a);
						new Atom(this.a.server, "wrench", this.a);
						new Atom(this.a.server, "crowbar", this.a);
						new Atom(this.a.server, "wirecutters", this.a);
					}
				}
			},
			icon_state: "blue",
			name: "mechanical toolbox"
		}
	}
};

module.exports.components = {Toolbox};
