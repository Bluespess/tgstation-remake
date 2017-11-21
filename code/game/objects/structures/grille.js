'use strict';
const {Component, has_component, visible_message, Atom, chain_func} = require('bluespess');
const layers = require('../../../defines/layers.js');

class Grille extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool")) {
			if(item.c.Tool.can_use("Wirecutters", user)) {
				item.c.Tool.used("Wirecutters");
				this.a.c.Tangible.deconstruct(true);
				return true;
			}
			if(item.c.Tool.can_use("Screwdriver", user) && ((this.a.base_loc && this.a.base_loc.turf) || !this.a.c.Tangible.anchored)) {
				item.c.Tool.used("Screwdriver");
				this.a.c.Tangible.anchored = !this.a.c.Tangible.anchored;
				visible_message`<span class='notice'>${user} ${this.a.c.Tangible.anchored ? "fastens" : "unfastens"} the ${this.a}.</span>`
					.self`<span class='notice'>You ${this.a.c.Tangible.anchored ? `fasten the ${this.a} to` : `unfasten the ${this.a} from`} the floor.</span>`
					.emit_from(user);
				return true;
			}
		}
		return prev();
	}

	deconstruct(prev) {
		if(!this.a.loc)
			return;
		if(!this.a.c.Tangible.no_deconstruct) {
			var rods = new Atom(this.a.server, this.a.server.templates[this.rods_type]);
			rods.c.Stack.amount = this.rods_amount;
			rods.loc = this.a.fine_loc;
			this.a.destroy();
		}
		prev();
	}
}

Grille.one_per_turf = true;

Grille.depends = ["Destructible"];
Grille.loadBefore = ["Destructible"];

Grille.template = {
	vars: {
		components: {
			"Grille": {
				rods_type: "stack_rods",
				rods_amount: 2,
				rods_broken: true,
				grille_type: null
			},
			"Tangible": {
				anchored: true,
				pressure_resistance: 510
			},
			"Describe": {
				desc: "A flimsy framework of metal rods."
			}
		},
		name: "grille",
		icon: 'icons/obj/structures.png',
		icon_state: "grille",
		density: true,
		layer: layers.BELOW_OBJ_LAYER
	}
};

module.exports.templates = {
	"grille": {
		components: ["Grille"],
		tree_paths: ["basic_structures/grille"]
	}
};

module.exports.components = {Grille};
