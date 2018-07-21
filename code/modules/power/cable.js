'use strict';
const {Component, Atom, to_chat, has_component, chain_func, dir_to} = require('bluespess');
const layers = require('../../defines/layers.js');
const _ = require('underscore');
const Powernet = require('./powernet.js');
const {display_watts} = require('./helpers.js');

const cable_colors = {
	red: "#ff0000",
	yellow: "#ffff00",
	green: "#00aa00",
	blue: "#18558c",
	pink: "#ff3cc8",
	orange: "#ff8000",
	cyan: "#00ffff",
	white: "#ffffff"
};

class Cable extends Component {
	constructor(atom, template) {
		super(atom, template);
		let match = /^([0-9]+)-([0-9]+)$/.exec(this.a.icon_state);
		let d1 = +match[1];
		let d2 = +match[2];
		if(![0,1,2,4,5,6,8,9].includes(d1)
			|| ![1,2,4,5,6,8,9,10].includes(d2)
			|| d1 >= d2) {
			console.warn(new Error(`Invalid cable icon_state ${this.a.icon_state}`));
		}
		this.d1 = d1;
		this.d2 = d2;
		this.a.color = cable_colors[this.cable_color];

		this.cables = [];
		this.nodes = [];

		this.a.on("moved", this.connect.bind(this));

		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool") && item.c.Tool.can_use("Wirecutters", user)) {
			item.c.Tool.used("Wirecutters");
			this.a.c.Destructible.deconstruct(true);
			return true;
		}
		if(has_component(item, "Tool") && item.c.Tool.can_use("Multitool", user)) {
			if(this.powernet && this.powernet.avail > 0)
				to_chat`<span class='danger'>${display_watts(this.powernet.view_avail)} in power network.`(user);
			else
				to_chat`<span class='danger'>This cable is not powered.</span>`(user);
			return true;
		}
		return prev();
	}

	deconstruct(prev) {
		if(!this.a.c.Destructible.no_deconstruct && this.a.loc) {
			let amount = this.d1 == 0 ? 1 : 2;
			let newstack = new Atom(this.a.server, {components: ["StackCable"], vars: {components: {"StackCable": {cable_color: this.cable_color }, "Stack": {amount}}}});
			newstack.loc = this.a.fine_loc;
		}
		prev();
	}

	get_end(n) { // where n is 1 or 2 for d1 and d2
		if(n != 1 && n != 2)
			throw new Error(`Invalid n value ${n}, should be 1 or 2`);
		let dn = n == 2 ? this.d2 : this.d1;

		let x = this.a.x;
		let y = this.a.y;
		if(dn & 1)
			y += this.a.bounds_y + this.a.bounds_height - 0.5;
		if(dn & 2)
			y += this.a.bounds_y - 0.5;
		if(dn & 4)
			x += this.a.bounds_x + this.a.bounds_width - 0.5;
		if(dn & 8)
			x += this.a.bounds_x - 0.5;

		return [x,y];
	}

	disconnect() {
		for(let cable of this.cables) {
			let idx = cable.c.Cable.cables.indexOf(this.a);
			if(idx != -1)
				cable.c.Cable.cables.splice(idx, 1);
		}
		for(let node of this.nodes) {
			if(node.c.PowerNode.cable != this.a)
				continue;
			if(this.powernet)
				this.powernet.nodes.delete(node);
			if(node.powernet == this.powernet)
				node.powernet = null;
			node.c.PowerNode.cable = null;
		}
		let cables_to_recalculate = [...this.cables];
		this.cables.length = 0;
		this.nodes.length = 0;
		if(this.powernet)
			this.powernet.cables.delete(this.a);
		this.powernet = null;
		if(cables_to_recalculate.length < 2)
			return; // there's nothing that could possibly have gotten disconnected.
		// Alright let's repropogate all the cables!
		while(cables_to_recalculate.length > 1) {
			let stack = [cables_to_recalculate.pop()];
			let connected = new Set();
			while(stack.length) { // just a basic flood fill
				let next = stack.pop();
				connected.add(next);
				for(let cable of next.c.Cable.cables) {
					if(!connected.has(cable))
						stack.push(cable);
				}
				let idx = cables_to_recalculate.indexOf(next);
				if(idx != -1) {
					// Ooooh there's a loop. Let's take that out of the list.
					cables_to_recalculate.splice(idx, 1);
					if(!cables_to_recalculate.length)
						return; // Nice, we're done here.
				}
			}
			// Alrighty, we've done the whole thing without loops.
			// Let's make a new powernet now.
			let new_powernet = new Powernet(this.a.server.power_controller);
			for(let cable of connected) {
				new_powernet.cables.add(cable);
				for(let node of cable.c.Cable.nodes)
					new_powernet.nodes.add(node);
			}
		}
	}

	connect() {
		this.disconnect();
		let new_powernet = null;
		for(let loc of this.a.marginal_locs()) {
			for(let cable of loc.partial_contents) {
				if(this.does_connect_to(cable)) {
					if(this.cables.includes(cable))
						continue;
					this.cables.push(cable);
					cable.c.Cable.cables.push(this.a);
					let other_powernet = cable.c.Cable.powernet;
					if(other_powernet == new_powernet)
						continue;
					if(!new_powernet) {
						new_powernet = other_powernet;
					} else if(other_powernet.cables.size > new_powernet.cables.size) {
						other_powernet.merge(new_powernet);
						new_powernet = other_powernet;
					} else {
						new_powernet.merge(other_powernet);
					}
				}
			}
		}
		if(this.d1 == 0) {
			for(let crosser of this.a.crosses()) {
				if(!has_component(crosser, "PowerNode"))
					continue;
				if(crosser.c.PowerNode.cable)
					continue;
				this.nodes.push(crosser);
				crosser.c.PowerNode.cable = this.a;
			}
		}
		if(!new_powernet)
			new_powernet = new Powernet(this.a.server.power_controller);
		new_powernet.cables.add(this.a);
		for(let node of this.nodes)
			new_powernet.nodes.add(node);
	}

	does_connect_to(other) {
		if(other == this.a)
			return false;
		if(!has_component(other, "Cable"))
			return false;
		for(let n_this of [1,2]) {
			for(let n_other of [1,2]) {
				let end_this = this.get_end(n_this);
				let end_other = other.c.Cable.get_end(n_other);
				if(Math.abs(end_this[0] - end_other[0]) < 0.00001 && Math.abs(end_this[1] - end_other[1]) < 0.00001)
					return true;
			}
		}
		return false;
	}
}

Cable.loadBefore = ["Destructible"];
Cable.depends = ["Destructible"];

Cable.template = {
	vars: {
		components: {
			"Cable": {
				cable_color: "red"
			},
			"Destructible": {
				max_integrity: 300
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "A flexible, superconducting insulated cable for heavy-duty power transfer."
			}
		},
		name: "power cable",
		icon: 'icons/obj/power_cond/cables.png',
		icon_state: "0-1",
		layer: layers.WIRE_LAYER
	}
};

Cable.update_map_instance = function(instobj) {
	instobj.client_atom.color = cable_colors[instobj.computed_vars.components.Cable.cable_color];
};

class StackCable extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Stack.on("amount_changed", this.amount_changed.bind(this));
		this.amount_changed();
		if(this.cable_color == "random")
			this.cable_color = _.sample([...Object.keys(cable_colors)]);
		this.a.color = cable_colors[this.cable_color];
		this.a.c.Item.pre_attack = chain_func(this.a.c.Item.pre_attack, this.pre_attack.bind(this));
		this.a.c.Item.inhand_icon_state = `coil_${this.cable_color}`;
	}

	pre_attack(prev, target, user) {
		if(this.a.c.Stack.amount < 1)
			return true;
		// The cable we will be merging with
		let target_cable = null;
		// Get the dir from turf to user, but if that's 0 (they're the same location) just use the user's dir
		let plating_merge = true;
		let target_dir = dir_to(user.x - target.x, user.y - target.y);
		if(!target_dir) {
			plating_merge = false;
			target_dir = user.dir;
		}
		if(has_component(target, "Cable"))
			target_cable = target;
		else if(has_component(target, "Plating")) {
			if(plating_merge) {
				for(let cable of target.loc.contents) {
					if(!has_component(cable, "Cable"))
						continue;
					if(cable.c.Cable.d1 == 0) {
						if(cable.c.Cable.d2 == target_dir) {
							to_chat`<span class='warning'>There's already a cable at that position!</span>`(user);
							return true;
						}
						target_cable = cable;
						break;
					}
				}
			}
			if(!target_cable) {
				let new_cable = new Atom(this.a.server, {
					components: ["Cable"],
					vars: {
						components: {
							"Cable": {
								cable_color: this.cable_color
							}
						},
						icon_state: `0-${target_dir}`
					}
				});
				new_cable.loc = target.fine_loc;
				this.a.c.Stack.use(1);
				return true;
			}
		}
		if(target_cable && target_cable.c.Cable.d1 == 0 && target_dir != target_cable.c.Cable.d2) {
			let orig_dir = target_cable.c.Cable.d2;
			let target_cable_loc = target_cable.fine_loc;
			target_cable.destroy();
			let new_cable = new Atom(this.a.server, {
				components: ["Cable"],
				vars: {
					components: {
						"Cable": {
							cable_color: this.cable_color
						}
					},
					icon_state: `${Math.min(orig_dir, target_dir)}-${Math.max(orig_dir, target_dir)}`
				}
			});
			new_cable.loc = target_cable_loc;
			this.a.c.Stack.use(1);
			return true;
		}
	}

	amount_changed() {
		this.a.icon_state = `${this.a.template.vars.icon_state}${this.a.c.Stack.amount < 3 ? this.a.c.Stack.amount : ""}`;
		this.a.name = `cable ${this.a.c.Stack.amount < 3 ? "piece" : "coil"}`;
	}
}

StackCable.template = {
	vars: {
		components: {
			"StackCable": {
				cable_color: "red"
			},
			"Item": {
				materials: {"metal": 10, "glass":  5},
				attack_verb: ["whipped", "lashed", "disciplined", "flogged"],
				conduct: true,
				size: 2,
				inhand_lhand_icon: 'icons/mob/inhands/equipment/tools_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/tools_righthand.png',
				inhand_icon_state: "coil"
			},
			"Stack": {
				novariants: true,
				max_amount: 30,
				merge_type: "StackCable",
				singular_name: "cable piece"
			},
			"Tangible": {
				throw_force: 0,
				throw_speed: 3,
				throw_range: 5
			},
			"Examine": {
				desc: "A coil of insulated power cable"
			}
		},
		name: "cable coil",
		gender: "neutral",
		icon_state: "coil",
		icon: 'icons/obj/power.png'
	}
};

StackCable.depends = ["Stack", "BeltItem"];
StackCable.loadBefore = ["Stack", "BeltItem"];

StackCable.update_map_instance = function(instobj) {
	let cc = instobj.computed_vars.components.StackCable.cable_color;
	if(cc != "random")
		instobj.client_atom.color = cable_colors[cc];
	else {
		instobj.client_atom.color = "#000000";
	}
};


module.exports.templates = {
	"cable": {
		components: ["Cable"],
		variants: [
			{
				type: "single",
				var_path: ["components", "Cable", "cable_color"],
				values: [...Object.keys(cable_colors), "random"],
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["icon_state"],
				values: [
					"0-1", "0-2", "0-4", "0-8",
					"1-2", "4-8", "1-4", "2-4", "1-8", "2-8",
					"0-5", "0-6", "0-9", "0-10",
					"1-5", "1-6", "1-9", "1-10",
					"2-5", "2-6", "2-9", "2-10",
					"4-5", "4-6", "4-9", "4-10",
					"5-6", "5-8", "5-9", "5-10",
					"6-8", "6-9", "6-10",
					"8-9", "8-10",
					"9-10"
				],
				label: true,
				orientation: "horizontal",
				wrap: 4
			}
		],
		tree_paths: ["basic_structures/cable"]
	},
	"stack_cable": {
		components: ["StackCable"],
		variants: [
			{
				type: "single",
				var_path: ["components", "StackCable", "cable_color"],
				values: [...Object.keys(cable_colors), "random"],
				orientation: "vertical"
			},
			{
				type: "single",
				var_path: ["components", "Stack", "amount"],
				values: [1, 2, 5, 10, 20, 30],
				label: true,
				orientation: "horizontal",
				wrap: 4
			}
		],
		tree_paths: ["items/stack/rods"]
	}
};

module.exports.components = {Cable, StackCable};
