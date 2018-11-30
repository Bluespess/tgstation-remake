'use strict';
const {Component, make_watched_property, chain_func, Panel} = require('bluespess');
const atmos_defines = require('../../../../../defines/atmos_defines.js');

class GasPump extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.AtmosMachineTick.process = chain_func(this.a.c.AtmosMachineTick.process, this.process.bind(this));
		this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));
		this.on("turned_on_changed", (from, to) => {
			this.a.icon_state = `pump_${to ? "on" : "off"}`;
		});
		make_watched_property(this, "turned_on", "boolean");
		make_watched_property(this, "target_pressure", "number");
	}
	process(prev) {
		if(this.turned_on) {
			let input = this.a.c.AtmosMachine.airs[0];
			let output = this.a.c.AtmosMachine.airs[1];
			let pressure_delta = this.target_pressure - output.return_pressure();
			if(pressure_delta < 0.01)
				return; // no need to pump gas if pressure is already reached
			if(input.total_moles() > 0 && input.temperature > 0) {
				let transfer_moles = pressure_delta * output.volume / (input.temperature * atmos_defines.R_IDEAL_GAS_EQUATION);
				output.merge(input.remove(transfer_moles));
				this.a.c.AtmosMachine.pipenets[0].update_flag = true;
				this.a.c.AtmosMachine.pipenets[1].update_flag = true;
			}
		}
		return prev();
	}
	attack_hand(prev, user) {
		if(user.c.Mob.get_panel(this.a, GasPumpPanel) || !user.c.Mob.can_read_panel(this.a, GasPumpPanel)) {
			return prev();
		}
		var panel = new GasPumpPanel(user.c.Mob.client, {title: `${this.a.name}`, width:550, height:80});
		user.c.Mob.bind_panel(this.a, panel);
		panel.open();
	}
}

GasPump.loadBefore = ["BinaryAtmosMachine", "AtmosMachineTick"];
GasPump.depends = ["BinaryAtmosMachine", "AtmosMachineTick"];

GasPump.template = {
	vars: {
		components: {
			"GasPump": {
				turned_on: false,
				target_pressure: atmos_defines.ONE_ATMOSPHERE
			},
			"Examine": {
				desc: "A pump that moves gas by pressure."
			}
		},
		name: "gas pump",
		icon_state: "pump_map"
	}
};

class GasPumpPanel extends Panel {
	constructor(client, panel_props) {
		super(client, panel_props);
		this.on("open", this.opened.bind(this));
		this.on("close", this.closed.bind(this));
		this.on("message", this.message_handler.bind(this));
		this.turned_on_changed = this.turned_on_changed.bind(this);
		this.target_pressure_changed = this.target_pressure_changed.bind(this);
	}
	opened() {
		this.bound_atom.c.GasPump.on("turned_on_changed", this.turned_on_changed);
		this.bound_atom.c.GasPump.on("target_pressure_changed", this.target_pressure_changed);
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

module.exports.templates = {
	"gas_pump": {
		components: ["GasPump"],
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [1, 2, 4, 8],
				orientation: "horizontal"
			}
		]
	},
	"gas_pump_on": {
		parent_template: "gas_pump",
		vars: {
			components: {
				"GasPump": {
					turned_on: true
				}
			}
		}
	}
};

module.exports.components = {GasPump};
