'use strict';
const {Component, has_component, Atom, chain_func, to_chat} = require('bluespess');
const layers = require('../../../defines/layers.js');

/* Table Frames
 * Contains:
 *		Frames
 *		Wooden Frames
 *		TODO: All the other frame types.
 */

class TableFrame extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool")) {
			if(item.c.Tool.can_use("Wrench", user)) {
				item.c.Tool.used("Wrench");
				to_chat`<span class='notice'>You start disassembling the frame.</span>`(user);
				user.c.MobInventory.do_after({delay: 3000 * item.c.Tool.toolspeed, target: this.a}).then((success) => {
					if(!success)
						return;
					this.a.c.Destructible.deconstruct(true);
				});
				return true;
			}
		} else if(has_component(item, "MetalSheet") && this.frame_material == "stack_rods") {
			if(item.c.Stack.amount >= 1) {
				to_chat`<span class='notice'>You start adding ${item} to ${this.a}...</span>`(user);
				user.c.MobInventory.do_after({delay: 2000, target: this.a}).then((success) => {
					if(!success)
						return;
					let table = new Atom(this.a.server, "table");
					table.loc = this.a.loc;
					item.c.Stack.use(1);
					this.a.destroy();
				});
			} else if(item.c.Stack.amount < 1) {
				to_chat`<span class='notice'>You need one sheet of metal to do this!</span>`(user);
			}
		} else if(has_component(item, "PlasteelSheet") && this.frame_material == "stack_rods") {
			if(item.c.Stack.amount >= 1) {
				to_chat`<span class='notice'>You start adding ${item} to ${this.a}...</span>`(user);
				user.c.MobInventory.do_after({delay: 5000, target: this.a}).then((success) => {
					if(!success)
						return;
					let table = new Atom(this.a.server, "reinforced_table");
					table.loc = this.a.loc;
					item.c.Stack.use(1);
					this.a.destroy();
				});
			} else if(item.c.Stack.amount < 1) {
				to_chat`<span class='notice'>You need one sheet of plasteel to do this!</span>`(user);
			}
		} else if(has_component(item, "WoodSheet") && this.frame_material == "wood_sheet") {
			if(item.c.Stack.amount >= 1) {
				to_chat`<span class='notice'>You start adding ${item} to ${this.a}...</span>`(user);
				user.c.MobInventory.do_after({delay: 2000, target: this.a}).then((success) => {
					if(!success)
						return;
					let table = new Atom(this.a.server, "wood_table");
					table.loc = this.a.loc;
					item.c.Stack.use(1);
					this.a.destroy();
				});
			} else if(item.c.Stack.amount < 1) {
				to_chat`<span class='notice'>You need one sheet of wood to do this!</span>`(user);
			}
		}
		return prev();
	}

	deconstruct(prev) {
		if(!this.a.loc)
			return;
		if(!this.a.c.Destructible.no_deconstruct) {
			let mat = new Atom(this.a.server, this.frame_material);
			mat.c.Stack.amount = this.frame_material_amount;
			mat.loc = this.a.base_mover.loc;
			this.a.destroy();
		}
		prev();
	}
}

TableFrame.one_per_tile = true;

TableFrame.depends = ["Destructible"];
TableFrame.loadBefore = ["Destructible"];

TableFrame.template = {
	vars: {
		components: {
			"TableFrame": {
				frame_material: "stack_rods",
				frame_material_amount: 2
			},
			"Destructible": {
				max_integrity: 100
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "Four metal legs with four framing rods for a table. You could easily pass through this."
			}
		},
		name: "table frame",
		icon: 'icons/obj/structures.png',
		icon_state: "table_frame",
		density: false,
		layer: layers.PROJECTILE_HIT_THRESHHOLD_LAYER
	}
};

module.exports.templates = {
	"table_frame": {
		components: ["TableFrame"],
		tree_paths: ["basic_structures/table_frame"]
	},
	"wood_table_frame": {
		components: ["TableFrame"],
		vars: {
			components: {
				"TableFrame": {
					frame_material: "wood_sheet"
				},
				"Examine": {
					desc: "Four wooden legs with four framing wooden rods for a wooden table. You could easily pass through this."
				}
			},
			name: "wooden table frame",
			icon_state: "wood_frame"
		},
		tree_paths: ["basic_structures/table_frame/wood"]
	}
};

module.exports.components = {TableFrame};
