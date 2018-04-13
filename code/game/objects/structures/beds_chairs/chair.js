'use strict';
const {Component, Atom, chain_func} = require('bluespess');
const layers = require('../../../../defines/layers.js');

class Chair extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));
		this.a.c.Buckle.post_buckle_mob = chain_func(this.a.c.Buckle.post_buckle_mob, this.post_buckle_mob.bind(this));
	}

	deconstruct(prev) {
		if(!this.a.c.Destructible.no_deconstruct && this.a.base_loc && this.stack_type) {
			let stack = new Atom(this.a.server, this.stack_type);
			stack.c.Stack.amount = this.stack_amount;
			stack.loc = this.a.base_mover.fine_loc;
		}
		return prev();
	}

	handle_layer() {
		if(this.a.c.Buckle.has_buckled_mobs() && this.a.dir == 1){ //north
			this.layer = layers.ABOVE_MOB_LAYER;
		} else {
			this.layer = layers.OBJ_LAYER;
		}
	}

	post_buckle_mob(prev) {
		this.handle_layer();
		return prev();
	}
}

Chair.loadBefore = ["Destructible", "Item", "Buckle"];
Chair.depends = ["Destructible", "Buckle"];

Chair.template = {
	vars: {
		components: {
			"Chair": {
				stack_type: "metal_sheet",
				stack_amount: 1
			},
			"Destructible": {
				max_integrity: 250,
				integrity_failure: 25
			},
			"Buckle": {
				can_buckle: true
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "You sit in this. Either by will or force."
			}
		},
		name: "chair",
		icon: 'icons/obj/chairs.png',
		icon_state: "chair",
		layer: layers.OBJ_LAYER
	}
};

module.exports.templates = {
	"chair": {
		components: ["Chair"],
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		],
		tree_paths: ["basic_structures/chair"]
	},
	"wooden_chair": {
		parent_template: "chair",
		vars: {
			components: {
				"Examine": {
					desc: "Old is never too old to not be in fashion."
				},
				"Chair": {
					stack_type: "wood_sheet",
					stack_amount: 3
				},
				"Destructible": {
					max_integrity: 70
				},
			},
			name: "wooden chair",
			icon_state: "wooden_chair"
		},
		tree_paths: ["basic_structures/chair/wood"]
	},
	"wooden_chair_wings": {
		parent_template: "wooden_chair",
		vars: {
			name: "wooden chair",
			icon_state: "wooden_chair_wings"
		},
		tree_paths: ["basic_structures/chair/wood/wings"]
	},
	"office_chair_light": {
		parent_template: "chair",
		vars: {
			components: {
				"Chair": {
					stack_amount: 5
				},
				"Tangible": {
					anchored: false
				}
			},
			icon_state: "officechair_white"
		},
		tree_paths: ["basic_structures/chair/office/light"]
	},
	"office_chair_dark": {
		parent_template: "chair",
		vars: {
			components: {
				"Chair": {
					stack_amount: 5
				},
				"Tangible": {
					anchored: false
				}
			},
			icon_state: "officechair_dark"
		},
		tree_paths: ["basic_structures/chair/office/dark"]
	},
	"stool": {
		components: ["Chair"],
		vars: {
			components: {
				"Examine": {
					desc: "Apply butt."
				},
				"Chair": {
					stack_amount: 1
				},
				"Buckle": {
					can_buckle: false
				},
			},
			name: "stool",
			icon_state: "stool"
		},
		tree_paths: ["basic_structures/chair/stool"]
	},
	"bar_stool": {
		parent_template: "stool",
		vars: {
			components: {
				"Examine": {
					desc: "It has some unsavory stains on it..."
				},
			},
			name: "bar stool",
			icon_state: "bar"
		},
		tree_paths: ["basic_structures/chair/stool/bar"]
	},
};

module.exports.components = {Chair};
