'use strict';
const {Component, has_component, visible_message, Atom, chain_func, to_chat} = require('bluespess');
const layers = require('../../../defines/layers.js');

const _state = Symbol('_state');

class Girder extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));

		this.on("state_changed", this.state_changed.bind(this));

		this.state_changed();
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool")) {
			if(item.c.Tool.can_use("Screwdriver", user)) {
				if(this.state == "displaced") {
					item.c.Tool.used("Screwdriver");
					to_chat`<span class='notice'>You start disassembling the girder.</span>`(user);
					user.c.MobInventory.do_after({delay: 4000 * item.c.Tool.toolspeed, target: this.a}).then((success) => {
						if(!success || this.state != "displaced")
							return;
						this.a.c.Destructible.deconstruct(true);
						visible_message`<span class='notice'>${user} disassembles the ${this.a}.</span>`
							.self`<span class='notice'>You disassemble the girder.</span>`
							.emit_from(user);
					});
					return true;
				} else if(this.state == "reinf" || this.state == "reinf_struts") {
					item.c.Tool.used("Screwdriver");
					let orig_state = this.state;
					to_chat`<span class='notice'>You start ${this.state == "reinf" ? "unsecuring" : "securing"} support struts...</span>`(user);
					user.c.MobInventory.do_after({delay: 4000 * item.c.Tool.toolspeed, target: this.a}).then((success) => {
						if(!success || this.state != orig_state)
							return;
						to_chat`<span class='notice'>You ${this.state == "reinf" ? "unsecure" : "secure"} the support struts...</span>`(user);
						this.state = (this.state == "reinf") ? "reinf_struts" : "reinf";
					});
					return true;
				}
			} else if(item.c.Tool.can_use("Wrench", user) && (this.state == "displaced" || this.state == "normal")) {
				let orig_state = this.state;
				if(this.state == "normal" && !(this.a.base_loc && this.a.base_loc.turf)) {
					to_chat`<span class='warning'>A floor must be present to secure the girder!</span>`(user);
				}
				item.c.Tool.used("Wrench");
				to_chat`<span class='notice'>You start ${this.state == "displaced" ? `securing` : `unsecuring`} the girder...</span>`(user);
				user.c.MobInventory.do_after({delay: 4000 * item.c.Tool.toolspeed, target: this.a}).then((success) => {
					if(!success || this.state != orig_state)
						return;
					this.state = this.state == "displaced" ? "normal" : "displaced";
					visible_message`<span class='notice'>${user} ${this.state == "displaced" ? "unsecures" : "secures"} the ${this.a}.</span>`
						.self`<span class='notice'>You ${this.state == "displaced" ? `unsecure the ${this.a} from` : `secure the ${this.a} to`} the floor.</span>`
						.emit_from(user);
				});
				return true;
			} else if(item.c.Tool.can_use("Wirecutters") && this.state == "reinf_struts") {
				item.c.Tool.used("Wirecutters");
				to_chat`<span class='notice'>You start removing the inner grille...</span>`(user);
				user.c.MobInventory.do_after({delay: 4000 * item.c.Tool.toolspeed, target: this.a}).then((success) => {
					if(!success || this.state != "reinf_struts")
						return;
					to_chat`<span class='notice'>You remove the inner grille.</span>`(user);
					new Atom(this.a.server, "plasteel_sheet", this.a.loc);
					this.state = "normal";
				});
				return true;
			}
		} else if(this.state == "normal" && has_component(item, "MetalSheet")) { //TODO: False walls
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
				return true;
			} else if(item.c.Stack.amount < 2) {
				to_chat`<span class='notice'>You need two sheets of metal to finish a wall!</span>`(user);
				return true;
			}
		} else if(has_component(item, "PlasteelSheet")) {
			if(this.state == "reinf") {
				to_chat`<span class='notice'>You start finalizing the reinforced wall...</span>`(user);
				user.c.MobInventory.do_after({delay: 5000, target: this.a}).then((success) => {
					if(!success || this.state != "reinf")
						return;
					item.c.Stack.use(1);
					to_chat`<span class='notice'>You fully reinforce the wall.</span>`(user);
					new Atom(this.a.server, "r_wall", this.a.loc);
					this.a.destroy();
				});
				return true;
			} else if(this.state == "normal") {
				to_chat`<span class='notice'>You start reinforcing the girder...</span>`(user);
				user.c.MobInventory.do_after({delay: 6000, target: this.a}).then((success) => {
					if(!success || this.state != "normal")
						return;
					item.c.Stack.use(1);
					to_chat`<span class='notice'>You reinforce the girder.</span>`(user);
					this.state = "reinf";
				});
				return true;
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

	get state() {
		return ""+this[_state];
	}
	set state(val) {
		if(""+this[_state] == ""+val)
			return;
		this[_state] = ""+val;
		this.emit("state_changed");
	}

	state_changed() {
		this.a.c.Tangible.anchored = (this.state != "displaced");
		this.a.icon_state = this.state_states[this.state];
		this.a.c.Destructible.max_integrity = this.state_integrities[this.state];
	}
}

Girder.update_map_instance = function(instobj) { // Make it show up correctly in the map editor
	instobj.client_atom.icon_state = instobj.computed_vars.components.Girder.state_states[instobj.computed_vars.components.Girder.state];
};

Girder.one_per_tile = true;

Girder.depends = ["Destructible"];
Girder.loadBefore = ["Destructible"];

Girder.template = {
	vars: {
		components: {
			"Girder": {
				state: "normal",
				state_states: {
					"normal": "girder",
					"displaced": "displaced",
					"reinf": "reinforced",
					"reinf_struts": "reinforced"
				},
				state_integrities: {
					"normal": 200,
					"displaced": 120,
					"reinf": 350,
					"reinf_struts": 350
				}
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
	},
	"girder_reinforced": {
		components: ["Girder"],
		vars: {
			components: {
				"Girder": {
					state: "reinf"
				}
			}
		},
		tree_paths: ["basic_structures/girder/reinforced"]
	}
};

module.exports.components = {Girder};
