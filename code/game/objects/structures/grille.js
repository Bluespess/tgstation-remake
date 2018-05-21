'use strict';
const {Component, Sound, has_component, visible_message, Atom, chain_func, to_chat} = require('bluespess');
const layers = require('../../../defines/layers.js');

const _broken = Symbol('_broken');

class Grille extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));
		this.a.c.Destructible.play_attack_sound = this.play_attack_sound.bind(this);
		this.a.c.Destructible.obj_break = this.obj_break.bind(this);

		this.on("broken_changed", this.broken_changed.bind(this));

		if(this.broken)
			this.a.c.Destructible.obj_integrity = this.a.c.Destructible.integrity_failure;
	}

	obj_break() {
		if(this.a.base_loc && this.rods_broken) {
			var rods = new Atom(this.a.server, this.rods_type);
			rods.c.Stack.amount = this.rods_broken;
			rods.loc = this.a.base_mover.fine_loc;
		}
		this.broken = true;
	}

	play_attack_sound(damage_amount, damage_type = "brute") {
		if(damage_type == "brute") {
			if(damage_amount)
				new Sound(this.a.server, {path: 'sound/effects/grillehit.ogg', volume: 0.8, vary: true}).emit_from(this.a);
			else
				new Sound(this.a.server, {path: 'sound/weapons/tap.ogg', volume: 0.5, vary: true}).emit_from(this.a);
		} else if(damage_type == "burn") {
			new Sound(this.a.server, {path: 'sound/items/welder.ogg', volume: 0.8, vary: true}).emit_from(this.a);
		}
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool")) {
			if(item.c.Tool.can_use("Wirecutters", user)) {
				item.c.Tool.used("Wirecutters");
				this.a.c.Destructible.deconstruct(true);
				return true;
			} else if(item.c.Tool.can_use("Screwdriver", user) && ((this.a.base_loc && this.a.base_loc.turf) || !this.a.c.Tangible.anchored)) {
				item.c.Tool.used("Screwdriver");
				this.a.c.Tangible.anchored = !this.a.c.Tangible.anchored;
				visible_message`<span class='notice'>${user} ${this.a.c.Tangible.anchored ? "fastens" : "unfastens"} the ${this.a}.</span>`
					.self`<span class='notice'>You ${this.a.c.Tangible.anchored ? `fasten the ${this.a} to` : `unfasten the ${this.a} from`} the floor.</span>`
					.emit_from(user);
				return true;
			}
		} else if(this.broken && has_component(item, "StackRod")) {
			visible_message`<span class='notice'>${user} rebuilds the broken grille.</span>`
				.self`<span class='notice'>You rebuild the broken grille</span>`
				.emit_from(user);
			item.c.Stack.use(1);
			this.broken = false;
			this.obj_integrity = 50;
		} else if(has_component(item, "GlassSheet")) {
			if(item.c.Stack.amount < 2) {
				to_chat`<span class='warning'>You need at least two sheets of glass for that!</span>`(user);
				return;
			}
			to_chat`<span class='notice'>You start placing the window...</span>`(user);
			user.c.MobInventory.do_after({delay: 2000, target: this.a}).then((success) => {
				if(!success || !this.a.loc)
					return;
				for(let atom of this.a.crosses()) {
					if(has_component(atom, "Window"))
						return;
				}
				let window = new Atom(this.a.server, "window");
				window.loc = this.a.loc;
				window.c.Tangible.anchored = false;
				item.c.Stack.use(2);
				to_chat`<span class='notice'>You place the ${window} on the ${this.a}.</span>`(user);
			});
		} else if(has_component(item, "RGlassSheet")) {
			if(item.c.Stack.amount < 2) {
				to_chat`<span class='warning'>You need at least two sheets of glass for that!</span>`(user);
				return;
			}
			to_chat`<span class='notice'>You start placing the window...</span>`(user);
			user.c.MobInventory.do_after({delay: 2000, target: this.a}).then((success) => {
				if(!success || !this.a.loc)
					return;
				for(let atom of this.a.crosses()) {
					if(has_component(atom, "Window"))
						return;
				}
				let window = new Atom(this.a.server, "r_window");
				window.loc = this.a.loc;
				window.c.Tangible.anchored = false;
				item.c.Stack.use(2);
				to_chat`<span class='notice'>You place the ${window} on the ${this.a}.</span>`(user);
			});
		}
		return prev();
	}

	deconstruct(prev) {
		if(!this.a.loc)
			return;
		if(!this.a.c.Destructible.no_deconstruct) {
			var rods = new Atom(this.a.server, this.a.server.templates[this.rods_type]);
			rods.c.Stack.amount = this.rods_amount;
			rods.loc = this.a.fine_loc;
			this.a.destroy();
		}
		prev();
	}

	get broken() {
		return !!this[_broken];
	}
	set broken(val) {
		if(!!this[_broken] == !!val)
			return;
		this[_broken] = !!val;
		this.emit("broken_changed");
	}

	broken_changed() {
		if(this.broken) {
			this.a.density = 0;
			this.rods_amount = 1;
			this.rods_broken = 0;
			this.a.icon_state = "brokengrille";
		} else {
			this.a.density = this.a.template.vars.density;
			this.rods_amount = this.a.template.vars.components.Grille.rods_amount;
			this.rods_broken = this.a.template.vars.components.Grille.rods_broken;
			this.a.icon_state = this.a.template.vars.icon_state;
		}
	}
}

Grille.one_per_tile = true;

Grille.depends = ["Destructible"];
Grille.loadBefore = ["Destructible"];

Grille.template = {
	vars: {
		components: {
			"Grille": {
				rods_type: "stack_rods",
				rods_amount: 2,
				rods_broken: 1,
				grille_type: null,
				broken: false
			},
			"Destructible": {
				max_integrity: 50,
				integrity_failure: 20,
				armor: {melee: 50, bullet: 70, laser: 70, energy: 100, bomb: 10, bio: 100, rad: 100, fire: 0, acid: 0}
			},
			"Tangible": {
				anchored: true,
				pressure_resistance: 510
			},
			"Examine": {
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
