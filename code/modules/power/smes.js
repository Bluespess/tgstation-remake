'use strict';
const {Component, Panel, chain_func, make_watched_property, has_component} = require('bluespess');
const layers = require('../../defines/layers.js');
const {display_kilojoules, display_watts} = require('./helpers.js');

const to_send = ["capacity", "charge",
	"inputting", "input_attempt", "input_level", "input_level_max", "input_available", "total_input_available",
	"outputting", "output_attempt", "output_level", "output_level_max", "output_used"];

class Smes extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.on("outputting_changed", ()=>{this.update_outputting_overlay();});
		this.on("inputting_changed", ()=>{this.update_inputting_overlay();});
		this.on("input_attempt_changed", ()=>{this.update_inputting_overlay();});
		this.on("charge_changed", ()=>{this.update_charge_overlay();});
		this.on("capacity_changed", ()=>{this.update_charge_overlay();});

		for(let varname of to_send) {
			let type = "number";
			if(["input_attempt", "output_attempt", "inputting", "outputting"].includes(varname))
				type = "boolean";
			make_watched_property(this, varname, type);
		}
		this.a.on("moved", () => {this.reconnect_terminal();});
		make_watched_property(this, "terminal");
		this.last_output_used = 0;
		this.new_last_output_used = 0;
		this.last_input_available = 0;
		this.last_input_potential = 0;
		this.did_restore = false;
		this.did_balance = false;
		this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));
		this.a.c.MachineTick.process = chain_func(this.a.c.MachineTick.process, this.process.bind(this));
		this.a.c.PowerNode.on("powernet_changed", this.powernet_changed.bind(this));
	}

	update_outputting_overlay() {
		this.a.overlays.smes_outputting = `[parent]-op${this.outputting ? 1 : 0}`;
	}
	update_inputting_overlay() {
		if(this.inputting)
			this.a.overlays.smes_inputting = {icon_state: `[parent]-oc1`, overlay_layer: 1};
		else if(this.input_attempt)
			this.a.overlays.smes_inputting = {icon_state: `[parent]-oc0`, overlay_layer: 1};
		else
			this.a.overlays.smes_inputting = null;
	}
	update_charge_overlay() {
		let clevel = Math.min(Math.max(Math.ceil(4.001 * this.charge / this.capacity), 0), 5);
		let overlay;
		if(clevel > 0)
			overlay = `[parent]-og${clevel}`;
		else
			overlay = null;
		if(!((overlay == null && this.a.overlays.smes_charge == null) || (this.a.overlays.smes_charge && this.a.overlays.smes_charge.icon_state == overlay))) {
			this.a.overlays.smes_charge = overlay;
		}
	}

	attack_hand(prev, user) {
		if(user.c.Mob.get_panel(this.a, SmesPanel) || !user.c.Mob.can_read_panel(this.a, SmesPanel)) {
			return prev();
		}
		var panel = new SmesPanel(user.c.Mob.client, {title: `${this.a.name}`, width:340, height:440});
		user.c.Mob.bind_panel(this.a, panel);
		panel.open();
	}

	powernet_changed(from) {
		if(from) {
			this.restore(this.last_process_dt || 1, from);
		}
	}

	restore(dt, powernet = this.a.c.PowerNode.powernet) {
		this.did_restore = true;
		let to_restore = Math.min((powernet.avail - powernet.load) * (this.last_output_used / (powernet.smes_output_total || 1)), this.last_output_used, (this.capacity - this.charge) * 1000);
		powernet.smes_output_total -= this.last_output_used;
		if(to_restore <= 0)
			to_restore = 0;
		this.charge += to_restore * 0.001;
		powernet.avail -= to_restore;
		this.output_used = (this.last_output_used - to_restore) / dt;
		this.last_output_used = 0;
	}

	balance_input(dt, powernet = this.terminal.c.PowerNode.powernet) {
		this.did_balance = true;
		let to_charge = Math.min((this.capacity - this.charge) * 1000, this.last_input_potential * (powernet.smes_input_total / powernet.smes_input_potential || 1));
		if(to_charge <= 0)
			to_charge = 0;
		powernet.smes_input_total -= to_charge;
		powernet.smes_input_potential -= this.last_input_potential;
		this.charge += to_charge * 0.001;
		this.last_input_available = 0;
		this.last_input_potential = 0;
		this.input_available = to_charge / dt;
	}

	process(prev, dt) {
		prev();

		this.last_process_dt = dt;
		this.last_output_used = this.new_last_output_used;

		this.total_input_available = (this.terminal && this.terminal.c.PowerNode.powernet) ? (this.terminal.c.PowerNode.surplus + this.terminal.c.PowerNode.powernet.smes_input_total) / dt : 0;
		if(this.terminal && this.terminal.c.PowerNode.powernet && this.input_attempt) {
			let surplus = this.terminal.c.PowerNode.surplus;
			this.inputting = this.charge < this.capacity && (surplus > 0 || this.terminal.c.PowerNode.powernet.smes_input_total > 0);
			this.total_input_available = (surplus + this.terminal.c.PowerNode.powernet.smes_input_total) / dt;
			if(this.inputting) {
				this.last_input_available = Math.min((this.capacity - this.charge) * 1000, this.input_level * dt, surplus);
				this.last_input_potential = Math.min((this.capacity - this.charge) * 1000, this.input_level * dt);
				this.terminal.c.PowerNode.powernet.smes_input_total += this.last_input_available;
				this.terminal.c.PowerNode.powernet.smes_input_potential += this.last_input_potential;
				this.terminal.c.PowerNode.powernet.load += this.last_input_available;
			} else {
				this.last_input_available = 0;
				this.last_input_potential = 0;
			}
		} else {
			this.last_input_available = 0;
			this.last_input_potential = 0;
			this.inputting = false;
		}
		if(this.did_balance)
			this.did_balance = false;
		else
			this.input_available = 0;

		if(this.output_attempt) {
			this.outputting = this.a.c.PowerNode.powernet && this.output_level > 0 && (this.outputting || this.charge * 1000 > this.output_level * dt);
			if(this.outputting) {
				this.new_last_output_used = Math.min(this.charge * 1000, this.output_level * dt);
				this.charge -= this.new_last_output_used * 0.001;
				this.a.c.PowerNode.new_avail += this.new_last_output_used;
				this.a.c.PowerNode.powernet.new_smes_output_total += this.new_last_output_used;
				if(this.new_last_output_used < 0.0001) {
					this.outputting = 0;
				}
			} else {
				this.new_last_output_used = 0;
			}
		} else {
			this.outputting = false;
			this.new_last_output_used = 0;
		}
		if(this.did_restore)
			this.did_restore = false;
		else
			this.output_used = 0;
	}

	reconnect_terminal(target) {
		let original_terminal = this.terminal;
		if(this.terminal) {
			this.terminal.c.SmesTerminal.master = null;
			this.terminal = null;
		}
		if(has_component(target, "SmesTerminal") && target.c.SmesTerminal.does_touch_smes(this.a) && !target.c.SmesTerminal.master) {
			this.terminal = target;
			target.c.SmesTerminal.master = this.a;
		}
		if(!this.terminal) {
			for(let loc of this.a.marginal_locs()) {
				for(let terminal of loc.contents) {
					if(has_component(terminal, "SmesTerminal") && terminal.c.SmesTerminal.does_touch_smes(this.a) && !terminal.c.SmesTerminal.master) {
						this.terminal = terminal;
						terminal.c.SmesTerminal.master = this.a;
					}
				}
			}
		}
		if(original_terminal && !original_terminal.c.SmesTerminal.master)
			original_terminal.c.SmesTerminal.reconnect();
	}
}

Smes.loadBefore = ["Destructible", "PowerNode"];
Smes.depends = ["Destructible", "PowerNode"];

Smes.template = {
	vars: {
		components: {
			"Smes": {
				capacity: 50000,
				// okay little word of warning these are not the same units as on tg smeses because tg coders are really stupid
				// basically 1 kJ = 25 tg-smes-units
				// you can thank the stupidity of tg coders for this.
				charge: 0,

				input_attempt: true,
				input_level: 50000,
				input_level_max: 200000,
				input_available: 0,

				output_attempt: true,
				output_level: 50000,
				output_level_max: 200000,
				output_used: 0
			},
			"Tangible": {
				anchored: true,
			},
			"Examine": {
				desc: "A high-capacity superconducting magnetic energy storage (SMES) unit."
			}
		},
		name: "power storage unit",
		icon: 'icons/obj/power.png',
		icon_state: "smes",
		layer: layers.OBJ_LAYER,
		density: 1
	}
};

class SmesTerminal extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("moved", () => {this.reconnect();});
		this.master = null;
	}

	does_touch_smes(smes) {
		if(!smes.loc || !smes.loc.is_base_loc || !this.a.loc || !this.a.loc.is_base_loc || this.a.z != smes.z)
			return false;
		if((this.a.dir == 1 || this.a.dir == 2) && Math.abs(this.a.x - smes.x) > 0.00001) {
			return false;
		}
		if((this.a.dir == 4 || this.a.dir == 8) && Math.abs(this.a.y - smes.y) > 0.00001) {
			return false;
		}
		if(this.a.dir == 1)
			return Math.abs((this.a.y + this.a.bounds_y + this.a.bounds_height) - (smes.y + smes.bounds_y)) < 0.00001;
		if(this.a.dir == 2)
			return Math.abs((this.a.y + this.a.bounds_y) - (smes.y + smes.bounds_y + smes.bounds_height)) < 0.00001;
		if(this.a.dir == 4)
			return Math.abs((this.a.x + this.a.bounds_x + this.a.bounds_width) - (smes.x + smes.bounds_x)) < 0.00001;
		if(this.a.dir == 8)
			return Math.abs((this.a.x + this.a.bounds_x) - (smes.x + smes.bounds_x + smes.bounds_width)) < 0.00001;
		return false;
	}

	reconnect() {
		if(this.master) {
			this.master.c.Smes.reconnect_terminal(this.a);
			if(this.master)
				return;
		}
		for(let loc of this.a.marginal_locs()) {
			for(let smes of loc.contents) {
				if(has_component(smes, "Smes") && this.does_touch_smes(smes) && !smes.c.Smes.terminal) {
					smes.c.Smes.reconnect_terminal(this.a);
					if(this.master)
						return;
				}
			}
		}
	}
}

SmesTerminal.loadBefore = ["PowerNode", "Destructible"];
SmesTerminal.depends = ["PowerNode", "Destructible"];

SmesTerminal.template = {
	vars: {
		components: {
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "It's an underfloor wiring terminal for powwer equipment."
			}
		},
		name: "terminal",
		icon_state: "term",
		icon: 'icons/obj/power.png',
		layer: layers.WIRE_TERMINAL_LAYER
	}
};

class SmesPanel extends Panel {
	constructor(client, panel_props) {
		super(client, panel_props);
		this.on("open", this.opened.bind(this));
		this.on("close", this.closed.bind(this));
		this.on("message", this.message_handler.bind(this));

		this.update_events = [];
		for(let varname of to_send) {
			this.update_events.push({
				varname,
				listener_function: (from, to) => {
					let msg = {[varname]: to};
					if(varname == "charge")
						msg[`${varname}_display`] = display_kilojoules(to);
					else if(["input_level", "input_available", "output_level", "output_used"].includes(varname))
						msg[`${varname}_display`] = display_watts(to);
					if(["input_level", "output_level"].includes(varname))
						msg[varname] = [from, to];
					this.send_message(msg);
				}
			});
		}
	}

	opened() {
		for(let update_event of this.update_events) {
			this.bound_atom.c.Smes.on(`${update_event.varname}_changed`, update_event.listener_function);
			update_event.listener_function(null, this.bound_atom.c.Smes[update_event.varname]);
		}
	}

	closed() {
		for(let update_event of this.update_events) {
			this.bound_atom.c.Smes.removeListener(`${update_event.varname}_changed`, update_event.listener_function);
		}
	}

	message_handler(msg) {
		if(msg.output_attempt != null) {
			this.bound_atom.c.Smes.output_attempt = !!msg.output_attempt;
		}
		if(msg.input_attempt != null) {
			this.bound_atom.c.Smes.input_attempt = !!msg.input_attempt;
		}
		if(msg.input_level != null) {
			this.bound_atom.c.Smes.input_level = Math.min(this.bound_atom.c.Smes.input_level_max, Math.max(0, (+msg.input_level || 0)));
		}
		if(msg.output_level != null) {
			this.bound_atom.c.Smes.output_level = Math.min(this.bound_atom.c.Smes.output_level_max, Math.max(0, (+msg.output_level || 0)));
		}
	}
}

module.exports.templates = {
	"smes": {
		components: ["Smes"],
		tree_paths: ["machinery/power/smes"]
	},
	"engineering_smes": {
		components: ["Smes"],
		vars: {
			components: {
				"Smes": {
					charge: 30000
				}
			}
		},
		tree_paths: ["machinery/power/smes/engineering"]
	},
	"smes_terminal": {
		components: ["SmesTerminal"],
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [1, 2, 4, 8],
				orientation: "horizontal"
			}
		],
		tree_paths: ["machinery/power/smes_terminal"]
	}
};

module.exports.components = {Smes, SmesTerminal};
