'use strict';
const {Component, make_watched_property, chain_func} = require('bluespess');
const {get_air_holder} = require('../../../environmental/air_holder.js');
const atmos_defines = require('../../../../../defines/atmos_defines.js');
const layers = require('../../../../../defines/layers.js');

class VentPump extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.on("turned_on_changed", (from, to) => {
			this.a.c.ApcPowered.using_idle_power = to;
			this.update_icon();
		});
		this.a.c.ApcPowered.on("powered_changed", () => {this.update_icon();});
		this.on("siphoning_changed", () => {this.update_icon();});
		this.a.c.AtmosMachineTick.process = chain_func(this.a.c.AtmosMachineTick.process, this.process.bind(this));
		make_watched_property(this, "turned_on", "boolean");
		make_watched_property(this, "siphoning", "boolean");
	}
	update_icon() {
		if(!this.a.c.AtmosNode.nodes[this.a.dir] || !this.turned_on || !this.a.c.ApcPowered.powered) {
			this.a.icon_state = "vent_off";
			return;
		}
		if(this.siphoning)
			this.a.icon_state = "vent_in";
		else
			this.a.icon_state = "vent_out";
	}
	process(prev) {
		prev();
		if(!this.turned_on || !this.a.c.AtmosNode.nodes[this.a.dir] || !this.a.c.ApcPowered.powered) {
			return;
		}
		let air_contents = this.a.c.AtmosMachine.airs[0];
		let air_holder = get_air_holder(this.a.loc);
		let environment;
		let env_pressure = 0;
		if(air_holder) {
			environment = air_holder.c.AirHolder.return_air();
			if(environment) {
				env_pressure = environment.return_pressure();
			}
		}

		if(!this.siphoning) { // internal -> external
			let pressure_delta = 10000;
			if(this.do_check_external) {
				pressure_delta = Math.min(pressure_delta, (this.external_pressure_bound - env_pressure));
			}
			if(this.do_check_internal) {
				pressure_delta = Math.min(pressure_delta, (air_contents.return_pressure() - this.internal_pressure_bound));
			}

			if(pressure_delta > 0 && air_contents.temperature > 0) {
				let transfer_moles = pressure_delta * (environment ? environment.volume : atmos_defines.CELL_VOLUME) / (air_contents.temperature * atmos_defines.R_IDEAL_GAS_EQUATION);
				let removed = air_contents.remove(transfer_moles);
				this.a.c.AtmosMachine.pipenets[0].update_flag = true;
				if(air_holder)
					air_holder.c.AirHolder.assume_air(removed); // we still want to be able to pump our valuable air into space. No better way of wasting all of your air than placing an air vent in space!
			}
		} else if(environment) { // only suck air if we're not in space
			let pressure_delta = 10000;
			if(this.do_check_external) {
				pressure_delta = Math.min(pressure_delta, (env_pressure - this.external_pressure_bound));
			}
			if(this.do_check_internal) {
				pressure_delta = Math.min(pressure_delta, (this.internal_pressure_bound) - air_contents.return_pressure());
			}
			if(pressure_delta > 0 && environment.temperature > 0) {
				let transfer_moles = pressure_delta * air_contents.volume / (environment.temperature * atmos_defines.R_IDEAL_GAS_EQUATION);
				let removed = air_holder.c.AirHolder.remove_air(transfer_moles);
				if(removed == null)
					return;
				air_contents.merge(removed);
				this.a.c.AtmosMachine.pipenets[0].update_flag = true;
			}
		}
	}
}

VentPump.loadBefore = ["UnaryAtmosMachine", "AtmosMachineTick", "ApcPowered"];
VentPump.depends = ["UnaryAtmosMachine", "AtmosMachineTick", "ApcPowered"];

VentPump.template = {
	vars: {
		components: {
			"VentPump": {
				turned_on: false,
				siphoning: false,
				external_pressure_bound: atmos_defines.ONE_ATMOSPHERE,
				do_check_external: true,
				internal_pressure_bound: 0,
				do_check_internal: false
			},
			"AtmosMachine": {
				cap_overlay: {icon: 'icons/obj/atmospherics/components/unary_devices.png', icon_state: "vent_cap"}
			},
			"AtmosNode": {
				can_unwrench: true
			},
			"ApcPowered": {
				power_usage: 5
			},
			"Examine": {
				desc: "Has a valve and pump attached to it."
			}
		},
		name: "air vent",
		icon_state: "vent_map",
		layer: layers.GAS_SCRUBBER_LAYER
	}
};

module.exports.templates = {
	"vent_pump": {
		components: ["VentPump"],
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [1, 2, 4, 8],
				orientation: "horizontal"
			}
		]
	},
	"vent_pump_on": {
		parent_template: "vent_pump",
		vars: {
			components: {
				"VentPump": {
					turned_on: true
				}
			},
			icon_state: "vent_map_on"
		}
	},
	"vent_pump_siphoning": {
		parent_template: "vent_pump",
		vars: {
			components: {
				"VentPump": {
					siphoning: true,
					external_pressure_bound: 0,
					do_check_external: false,
					internal_pressure_bound: 4000,
					do_check_internal: true
				}
			}
		}
	},
	"vent_pump_siphoning_on": {
		parent_template: "vent_pump_siphoning",
		vars: {
			components: {
				"VentPump": {
					turned_on: true
				}
			},
			icon_state: "vent_map_siphon_on"
		}
	},
};

module.exports.components = {VentPump};
