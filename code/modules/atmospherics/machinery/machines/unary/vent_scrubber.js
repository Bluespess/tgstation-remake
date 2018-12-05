'use strict';
const {Component, has_component, make_watched_property, chain_func} = require('bluespess');
const {get_air_holder} = require('../../../environmental/air_holder.js');
const GasMixture = require('../../../gasmixtures/gas_mixture.js');
const atmos_defines = require('../../../../../defines/atmos_defines.js');
const layers = require('../../../../../defines/layers.js');

class VentScrubber extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.scrub_list = [...this.scrub_list]; // quick, clone the list!
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
			this.a.icon_state = "scrub_off";
			return;
		}
		if(this.siphoning)
			this.a.icon_state = "scrub_purge";
		else
			this.a.icon_state = "scrub_on";
	}
	process(prev) {
		prev();
		if(!this.turned_on || !this.a.c.AtmosNode.nodes[this.a.dir] || !this.a.c.ApcPowered.powered) {
			return;
		}
		let air_holder = get_air_holder(this.a.loc);
		if(!air_holder)
			return;
		let targets = [];
		if(this.widenet && has_component(air_holder, "SimulatedTurf"))
			targets = air_holder.c.SimulatedTurf.get_adjacent_turfs(true);
		targets.push(air_holder);
		for(let target of targets) {
			this.scrub(target);
		}
	}
	scrub(target) {
		if(!target)
			return;

		let env = target.c.AirHolder.return_air();
		if(!env)
			return; // nothing to see here let's get out.
		let air_contents = this.a.c.AtmosMachine.airs[0];
		if(air_contents.return_pressure() >= 50*atmos_defines.ONE_ATMOSPHERE)
			return false;

		let should_we_scrub = false;
		if(this.siphoning) {
			should_we_scrub = true;
		} else {
			for(let gas of env.gases_list) {
				if(gas.moles > 0 && this.scrub_list.includes(gas.gas_meta.id)) {
					should_we_scrub = true;
					break;
				}
			}
		}
		if(should_we_scrub) {
			let transfer_moles = Math.min(1, this.volume_rate / env.volume)*env.total_moles();

			let removed = target.c.AirHolder.remove_air(transfer_moles);
			if(this.siphoning) {
				air_contents.merge(removed);
			} else {
				let filtered_gases = new GasMixture();
				filtered_gases.temperature = removed.temperature;
				for(let scrub_gas of this.scrub_list) {
					filtered_gases.gases[scrub_gas].moles = removed.gases[scrub_gas].moles;
					removed.gases[scrub_gas].moles = 0;
				}
				target.c.AirHolder.assume_air(removed);
				air_contents.merge(filtered_gases);
			}
			this.a.c.AtmosMachine.pipenets[0].update_flag = true;
		}
	}
}

VentScrubber.loadBefore = ["UnaryAtmosMachine", "AtmosMachineTick", "ApcPowered"];
VentScrubber.depends = ["UnaryAtmosMachine", "AtmosMachineTick", "ApcPowered"];

VentScrubber.template = {
	vars: {
		components: {
			"VentScrubber": {
				turned_on: true,
				siphoning: false,
				scrub_list: ["co2"],
				volume_rate: 200,
				widenet: false
			},
			"AtmosMachine": {
				cap_overlay: {icon: 'icons/obj/atmospherics/components/unary_devices.png', icon_state: "scrub_cap"}
			},
			"AtmosNode": {
				can_unwrench: true
			},
			"ApcPowered": {
				power_usage: 10
			},
			"Examine": {
				desc: "Has a valve and pump attached to it."
			}
		},
		name: "air scrubber",
		icon_state: "scrub_map",
		layer: layers.GAS_SCRUBBER_LAYER
	}
};

module.exports.templates = {
	"vent_scrubber": {
		components: ["VentScrubber"],
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [1, 2, 4, 8],
				orientation: "horizontal"
			}
		]
	},
	"vent_scrubber_on": {
		parent_template: "vent_scrubber",
		vars: {
			components: {
				"VentScrubber": {
					turned_on: true
				}
			},
			icon_state: "scrub_map_on"
		}
	},
};

module.exports.components = {VentScrubber};
