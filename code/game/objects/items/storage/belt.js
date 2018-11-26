'use strict';
const {Component, Atom, has_component} = require('bluespess');
const _ = require('underscore');

class Belt extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("entered", this.entered.bind(this));
		this.a.on("exited", this.exited.bind(this));
	}

	entered(movement) {
		let item = movement.atom;
		if(has_component(item, "Item") && this.content_overlays)
			item.c.Item.apply_belt_overlay(this.a);
	}
	exited(movement) {
		let item = movement.atom;
		if(has_component(item, "Item") && this.content_overlays)
			item.c.Item.unapply_belt_overlay(this.a);
	}
}

Belt.loadBefore = ["StorageItem", "BeltItem"];
Belt.depends = ["StorageItem", "BeltItem"];

Belt.template = {
	vars: {
		components: {
			"Belt": {
				content_overlays: false //If this is true, the belt will gain overlays based on what it's holding
			},
			"Item": {
				inhand_icon_state: "utility",
				attack_verb: ["whipped", "lashed", "disciplined"]
			},
			"Destructible": {
				max_integrity: 300
			},
			"Examine": {
				desc: "Can hold various things."
			}
		},
		name: "belt",
		icon: 'icons/obj/clothing/belts.png',
		icon_state: "utilitybelt"
	}
};

module.exports.templates = {
	"utility_belt": {
		components: ["Belt"],
		vars: {
			components: {
				"Belt": {
					content_overlays: true
				},
				"StorageItem": {
					can_hold: ["Tool", "Analyzer", "Flashlight", "StackCable", "HandItem"]
				}
			}
		},
		tree_paths: ["items/storage/belt/utility"]
	},
	"utility_belt_full": {
		parent_template: "utility_belt",
		vars: {
			components: {
				StorageItem: {
					populate_contents() {
						new Atom(this.a.server, "screwdriver", this.a);
						new Atom(this.a.server, "wrench", this.a);
						new Atom(this.a.server, "welding tool", this.a);
						new Atom(this.a.server, "crowbar", this.a);
						new Atom(this.a.server, "wirecutters", this.a);
						new Atom(this.a.server, "multitool", this.a);
						new Atom(this.a.server, {components: ["StackCable"], vars: {components: {"StackCable": {cable_color: _.sample(["red","yellow","orange"])}, "Stack": {amount: 30}}}}, this.a);
					}
				}
			}
		},
		tree_paths: ["items/storage/belt/utility/full"]
	},
	"utility_belt_engi": {
		parent_template: "utility_belt",
		vars: {
			components: {
				StorageItem: {
					populate_contents() {
						new Atom(this.a.server, "screwdriver", this.a);
						new Atom(this.a.server, "wrench", this.a);
						new Atom(this.a.server, "industrial_welding_tool", this.a);
						new Atom(this.a.server, "crowbar", this.a);
						new Atom(this.a.server, "wirecutters", this.a);
						new Atom(this.a.server, "multitool", this.a);
						new Atom(this.a.server, {components: ["StackCable"], vars: {components: {"StackCable": {cable_color: _.sample(["red","yellow","orange"])}, "Stack": {amount: 30}}}}, this.a);
					}
				}
			}
		},
		tree_paths: ["items/storage/belt/utility/engi"]
	},
};

module.exports.components = {Belt};
