'use strict';
const {Component} = require('bluespess');

class StackRod extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Stack.on("amount_changed", this.amount_changed.bind(this));
		this.amount_changed();
	}

	amount_changed() {
		if(this.a.c.Stack.amount <= 5) {
			this.a.icon_state = `rods-${this.a.c.Stack.amount}`;
		} else {
			this.a.icon_state = 'rods';
		}
	}
}

StackRod.template = {
	vars: {
		components: {
			"Item": {
				force: 9,
				throw_force: 10,
				throw_speed: 3,
				throw_range: 7,
				materials: {"metal": 1000},
				attack_verb: ["hit", "bludgeoned", "whacked"],
				inhand_icon_state: "rods"
			},
			"Stack": {
				novariants: true,
				max_amount: 50,
				merge_type: "StackRod",
				singular_name: "rod",
				recipes: [
					{name: "grille", template_name: "grille", cost: 2, time: 1000, cant_cross: ["Grille"], on_floor: true}
				]
			},
			"Examine": {
				desc: "Some rods. Can be used for building, or something."
			}
		},
		name: "metal rod",
		icon_state: "rods"
	}
};

StackRod.depends = ["Stack"];
StackRod.loadBefore = ["Stack"];

module.exports.templates = {
	"stack_rods": {
		components: ["StackRod"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 5, 10, 20, 30, 40, 50],
				label: true,
				orientation: "vertical"
			}
		],
		tree_paths: ["items/stack/rods"]
	}
};

module.exports.components = {StackRod};
