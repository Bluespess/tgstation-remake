'use strict';
const {Component, has_component, visible_message, Atom, chain_func, to_chat} = require('bluespess');
const layers = require('../../../defines/layers.js');

const _displaced = Symbol('_displaced');

class Girder extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));

		this.on("displaced_changed", this.displaced_changed.bind(this));

		this.displaced_changed();
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool")) {
			if(item.c.Tool.can_use("Screwdriver", user) && this.displaced) {
				item.c.Tool.used("Screwdriver");
				to_chat`<span class='notice'>You start disassembling the girder.</span>`(user);
				user.c.MobInventory.do_after({delay: 4000 * item.c.Tool.toolspeed, target: this.a}).then((success) => {
					if(!success)
						return;
					this.a.c.Destructible.deconstruct(true);
					visible_message`<span class='notice'>${user} disassembles the ${this.a}.</span>`
						.self`<span class='notice'>You disassemble the girder.</span>`
						.emit_from(user);
				});
				return true;
			} else if(item.c.Tool.can_use("Wrench", user) && (this.a.base_loc && this.a.base_loc.turf)) {
				item.c.Tool.used("Wrench");
				to_chat`<span class='notice'>You start ${this.displaced ? `securing` : `unsecuring`} support struts...</span>`(user);
				user.c.MobInventory.do_after({delay: 4000 * item.c.Tool.toolspeed, target: this.a}).then((success) => {
					if(!success)
						return;
					this.displaced = !this.displaced;
					visible_message`<span class='notice'>${user} ${this.displaced ? "unsecures" : "secures"} the ${this.a}.</span>`
						.self`<span class='notice'>You ${this.displaced ? `unsecure the ${this.a} from` : `secure the ${this.a} to`} the floor.</span>`
						.emit_from(user);
				});
				return true;
			}
		} else if(!this.displaced && has_component(item, "MetalSheet")) { //TODO: False walls
			if(item.c.Stack.amount >= 2) {
				to_chat`<span class='notice'>You start adding plating...</span>`(user);
				user.c.MobInventory.do_after({delay: 4000, target: this.a}).then((success) => {
					if(!success)
						return;
					to_chat`<span class='notice'>You add the plating.</span>`(user);
					let wall = new Atom(this.a.server, "wall");
					wall.loc = this.a.loc;
					item.c.Stack.use(2);
					this.a.destroy();
				});
			} else if(item.c.Stack.amount < 2) {
				to_chat`<span class='notice'>You need two sheets of metal to finish a wall!</span>`(user);
			}
		}
		return prev();
	}

	deconstruct(prev) {
		if(!this.a.loc)
			return;
		if(!this.a.c.Destructible.no_deconstruct) {
			var sheets = new Atom(this.a.server, "metal_sheet");
			sheets.c.Stack.amount = 2;
			sheets.loc = this.a.fine_loc;
			this.a.destroy();
		}
		prev();
	}

	get displaced() {
		return !!this[_displaced];
	}
	set displaced(val) {
		if(!!this[_displaced] == !!val)
			return;
		this[_displaced] = !!val;
		this.emit("displaced_changed");
	}

	displaced_changed() {
		if(this.displaced) {
			this.a.c.Tangible.anchored = false;
			this.a.icon_state = "displaced";
			this.a.c.Destructible.max_integrity = 120;
		} else {
			this.a.c.Tangible.anchored = this.a.template.vars.components.Tangible.anchored;
			this.a.icon_state = this.a.template.vars.icon_state;
			this.a.c.Destructible.max_integrity = this.a.template.vars.components.Destructible.max_integrity;
		}
	}
}

Girder.one_per_tile = true;

Girder.depends = ["Destructible"];
Girder.loadBefore = ["Destructible"];

Girder.template = {
	vars: {
		components: {
			"Girder": {
				displaced: false
			},
			"Destructible": {
				max_integrity: 200,
			},
			"Tangible": {
				anchored: true,
			},
			"Examine": {
				desc: "A large structural assembly made out of metal; It requires a layer of metal before it can be considered a wall."
			}
		},
		name: "girder",
		icon: 'icons/obj/structures.png',
		icon_state: "girder",
		density: true,
		layer: layers.BELOW_OBJ_LAYER
	}
};

module.exports.templates = {
	"girder": {
		components: ["Girder"],
		tree_paths: ["basic_structures/girder"]
	}
};

module.exports.components = {Girder};
