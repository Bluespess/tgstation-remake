'use strict';
const {Component, make_watched_property, chain_func, /*Panel*/} = require('bluespess');
const atmos_defines = require('../../../../../defines/atmos_defines.js');

class Filter extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.AtmosMachineTick.process = chain_func(this.a.c.AtmosMachineTick.process, this.process.bind(this));
		/*this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));*/
		this.on("turned_on_changed", (from, to) => {
			this.a.icon_state = `filter_${to ? "on" : "off"}${this.a.c.TrinaryAtmosMachine.flipped ? "_f" : ""}`;
		});
		make_watched_property(this, "turned_on", "boolean");
		make_watched_property(this, "target_pressure", "number");
	}
	process(prev) {
		if(this.turned_on) {
			let air_0 = this.a.c.AtmosMachine.airs[0];
			let air_1 = this.a.c.AtmosMachine.airs[1];
			let air_2 = this.a.c.AtmosMachine.airs[2];
			let output_starting_pressure = air_2.return_pressure();
			if(output_starting_pressure >= this.target_pressure) {
				return; //Target is full
			}
			//Calculate moles to transfer with PV=nRT
			let pressure_delta = this.target_pressure - output_starting_pressure;
			let transfer_moles = null;
			if(air_0.temperature > 0) {
				transfer_moles = pressure_delta * air_2.volume / (air_0.temperature * atmos_defines.R_IDEAL_GAS_EQUATION);
			}


			//Transfer the gas
			if(transfer_moles > 0) {
				let removed = air_0.remove(transfer_moles);
				if(!removed) {
					return;
				}

				let filtering = true;
				if(!this.filter_type) {
					filtering = false;
				}

				if(filtering && removed[this.filter_type]) {
					let filtered_out = removed[this.filter_type];
					removed.remove(filtered_out);

					let target = (air_1.return_pressure() < this.target_pressure ? air_2 : air_0);
					target.merge(filtered_out);

				}

				air_2.merge(removed);
				this.a.c.AtmosMachine.pipenets[0].update_flag = true;
				this.a.c.AtmosMachine.pipenets[1].update_flag = true;
				this.a.c.AtmosMachine.pipenets[2].update_flag = true;
			}
		}
		return prev();
	}
	/*attack_hand(prev, user) {
		if(user.c.Mob.get_panel(this.a, FilterPanel) || !user.c.Mob.can_read_panel(this.a, FilterPanel)) {
			return prev();
		}
		var panel = new FilterPanel(user.c.Mob.client, {title: `${this.a.name}`, width:550, height:80});
		user.c.Mob.bind_panel(this.a, panel);
		panel.open();
	}*/
}

Filter.loadBefore = ["TrinaryAtmosMachine", "AtmosMachineTick"];
Filter.depends = ["TrinaryAtmosMachine", "AtmosMachineTick"];

Filter.template = {
	vars: {
		components: {
			"Filter": {
				turned_on: false,
				target_pressure: atmos_defines.ONE_ATMOSPHERE,
				filter_type: null
			},
			"AtmosNode": {
				can_unwrench: true
			},
			"Examine": {
				desc: "Very useful for filtering gasses."
			}
		},
		name: "filter",
		icon_state: "filter_off"
	}
};
/*
class FilterPanel extends Panel {
	constructor(client, panel_props) {
		super(client, panel_props);
		this.on("open", this.opened.bind(this));
		this.on("close", this.closed.bind(this));
		this.on("message", this.message_handler.bind(this));
		this.turned_on_changed = this.turned_on_changed.bind(this);
		this.target_pressure_changed = this.target_pressure_changed.bind(this);
	}
	opened() {
		this.bound_atom.c.Filter.on("turned_on_changed", this.turned_on_changed);
		this.bound_atom.c.Filter.on("target_pressure_changed", this.target_pressure_changed);
		this.turned_on_changed(undefined, this.bound_atom.c.GasPump.turned_on);
		this.target_pressure_changed(undefined, this.bound_atom.c.GasPump.target_pressure);
	}
	closed() {
		this.bound_atom.removeListener("turned_on_changed", this.turned_on_changed);
		this.bound_atom.removeListener("target_pressure_changed", this.target_pressure_changed);
	}
	turned_on_changed(from, to) {
		this.send_message({turned_on: to});
	}
	target_pressure_changed(from, to) {
		this.send_message({target_pressure: to});
	}
	message_handler(msg) {
		if(msg.target_pressure != null)
			this.bound_atom.c.GasPump.target_pressure = Math.max(Math.min(+msg.target_pressure || 0, atmos_defines.MAX_OUTPUT_PRESSURE), 0);
		if(msg.turned_on != null)
			this.bound_atom.c.GasPump.turned_on = !!msg.turned_on;
	}
}
*/
module.exports.templates = {
	"filter": {
		components: ["Filter"],
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [1, 2, 4, 8]
			}
		]
	},
	"filter_flipped": {
		parent_template: "filter",
		vars: {
			components: {
				"Filter": {
					flipped: true
				}
			}
		}
	},
	"filter_on": {
		parent_template: "filter",
		vars: {
			components: {
				"Filter": {
					turned_on: true
				}
			}
		}
	},
	"filter_on_flipped": {
		parent_template: "filter",
		vars: {
			components: {
				"Filter": {
					turned_on: true,
					flipped: true
				}
			}
		}
	}
};

module.exports.components = {Filter};
