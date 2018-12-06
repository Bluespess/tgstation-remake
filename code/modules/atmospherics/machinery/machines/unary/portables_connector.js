'use strict';
const {Component, make_watched_property, chain_func} = require('bluespess');
const layers = require('../../../../../defines/layers.js');

class PortablesConnector extends Component {
	constructor(atom, template) {
		super(atom, template);
		make_watched_property(this, "connected_device");
		this.on("connected_device_changed", this.connected_device_changed.bind(this));
		this.a.c.AtmosMachine.set_pipenet = chain_func(this.a.c.AtmosMachine.set_pipenet, this.set_pipenet.bind(this));
		this.a.icon_state = "connector";
		this.a.c.AtmosMachine.airs[0].volume = 0;
	}

	connected_device_changed(from, to) {
		if(from && from.c.PortableAtmospherics.connected_port == this.a)
			from.c.PortableAtmospherics.connected_port = null;
		if(to && to.c.PortableAtmospherics.connected_port != this.a)
			to.c.PortableAtmospherics.connected_port = this.a;
		let pipenet = this.a.c.AtmosMachine.pipenets[0];
		if(pipenet) {
			if(from) {
				pipenet.other_airs.delete(from.c.AirHolder.return_air());
			}
			if(to) {
				pipenet.other_airs.add(to.c.AirHolder.return_air());
			}
		}
	}

	set_pipenet(prev, i, val) {
		let old = this.a.c.AtmosMachine.pipenets[i];
		if(old == val)
			return;
		prev();
		if(this.connected_device) {
			if(old) {
				old.other_airs.delete(this.connected_device.c.AirHolder.return_air());
			}
			if(val) {
				val.other_airs.add(this.connected_device.c.AirHolder.return_air());
			}
		}
	}

	destroy() {
		if(this.connected_device)
			this.connected_device = null;
	}
}

PortablesConnector.loadBefore = ["UnaryAtmosMachine", "Destructible"];
PortablesConnector.depends = ["UnaryAtmosMachine", "Destructible"];

PortablesConnector.template = {
	vars: {
		components: {
			"AtmosNode": {
				can_unwrench: true
			},
			"Examine": {
				desc: "For connecting portable devices related to atmospherics control."
			}
		},
		name: "connector port",
		layer: layers.GAS_FILTER_LAYER,
		icon: 'icons/obj/atmospherics/components/unary_devices.png',
		icon_state: "connector_map"
	},
	variants: [
		{
			type: "single",
			var_path: ["dir"],
			values: [1, 2, 4, 8],
			orientation: "horizontal"
		}
	]
};

module.exports.templates = {
	"portables_connector": {
		components: ["PortablesConnector"]
	}
};

module.exports.components = {PortablesConnector};
