'use strict';
const {Component, Atom} = require('bluespess');
const _ = require('underscore');
const {cable_colors} = require('../../../../modules/power/cable.js');

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
			"StorageItem": {
				rustle_jimmies: false
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/equipment/toolbox_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/toolbox_righthand.png',
				inhand_icon_state: "toolbox_red",
				force: 12,
				size: 4,
				attack_verb: ["robusted"],
				hitsound: 'sound/weapons/smash.ogg'
			},
			"Tangible": {
				throw_force: 12,
				throw_speed: 2,
				throw_range: 7,
			},
			"Examine": {
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
				},
				"StorageItem": {
					populate_contents() {
						new Atom(this.a.server, "screwdriver", this.a);
						new Atom(this.a.server, "wrench", this.a);
						new Atom(this.a.server, "welding_tool", this.a);
						new Atom(this.a.server, "crowbar", this.a);
						new Atom(this.a.server, "wirecutters", this.a);
					}
				}
			},
			icon_state: "blue",
			name: "mechanical toolbox"
		},
		tree_paths: ["items/storage/toolbox/mechanical"]
	},
	"toolbox_electrical": {
		components: ["Toolbox"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "toolbox_yellow"
				},
				"StorageItem": {
					populate_contents() {
						let picked_color = _.sample(Object.keys(cable_colors));
						new Atom(this.a.server, "screwdriver", this.a);
						//TODO: T-Ray scanner
						new Atom(this.a.server, "wirecutters", this.a);
						new Atom(this.a.server, "crowbar", this.a);
						let cable_template = {components: ["StackCable"], vars: {components: {"StackCable": {cable_color: picked_color }, "Stack": {amount: 30}}}};
						new Atom(this.a.server, cable_template, this.a);
						new Atom(this.a.server, cable_template, this.a);
						if(Math.random() < 0.05) {
							new Atom(this.a.server, "gloves_yellow", this.a);
						} else {
							new Atom(this.a.server, cable_template, this.a);
						}
					}
				}
			},
			icon_state: "yellow",
			name: "electrical toolbox"
		},
		tree_paths: ["items/storage/toolbox/electrical"]
	}
};

module.exports.components = {Toolbox};
