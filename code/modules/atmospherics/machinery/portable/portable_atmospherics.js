'use strict';
const {Component, has_component, chain_func, make_watched_property, visible_message, to_chat} = require('bluespess');
const GasMixture = require('../../gasmixtures/gas_mixture.js');
const layers = require('../../../../defines/layers.js');

class PortableAtmospherics extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.air_contents = new GasMixture(this.volume);
		make_watched_property(this, "connected_port");
		make_watched_property(this, "holding");
		this.a.c.AtmosMachineTick.process = chain_func(this.a.c.AtmosMachineTick.process, this.process.bind(this));
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.AirHolder.assume_air = this.assume_air.bind(this);
		this.a.c.AirHolder.return_air = this.return_air.bind(this);
		this.a.c.AirHolder.remove_air = this.remove_air.bind(this);
		this.on("connected_port_changed", this.connected_port_changed.bind(this));
	}
	process() {
		if(this.connected_port) {
			this.emit("air_updated");
		} else {
			let result = this.air_contents.react();
			if(result)
				this.emit("air_updated");
		}
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool") && item.c.Tool.can_use("Wrench", user)) {
			if(this.connected_port) {
				this.disconnect();
				item.c.Tool.used("Wrench");
				visible_message`The ${user} disconnects the ${this.a}.`
					.self`<span class='notice'>You unfasten the ${this.a} from the port.</span>`
					.blind`<span class='italics'>You hear a ratchet.</span>`
					.emit_from(user);
				return true;
			} else {
				let possible_port = null;
				for(let obj of this.a.crosses()) {
					if(has_component(obj, "PortablesConnector")) {
						possible_port = obj;
						break;
					}
				}
				if(!possible_port) {
					to_chat`<span class='notice'>Nothing happens.</span>`(user);
					return true;
				}
				if(!this.connect(possible_port)) {
					to_chat`<span class='notice'>The ${this.a} failed to connect to the port.</span>`(user);
					return true;
				}
				item.c.Tool.used("Wrench");
				visible_message`The ${user} connects the ${this.a}.`
					.self`<span class='notice'>You fasten the ${this.a} to the port.</span>`
					.blind`<span class='italics'>You hear a ratchet.</span>`
					.emit_from(user);
				return true;
			}
		} else if(has_component(item, "Analyzer")) {
			this.air_contents.atmosanalyzer_scan(user, this.a);
		}
		return prev();
	}

	assume_air(air) {
		this.air_contents.merge(air);
		this.emit("air_updated");
	}
	remove_air(amount) {
		let removed = this.air_contents.remove(amount);
		this.emit("air_updated");
		return removed;
	}
	return_air() {
		return this.air_contents;
	}
	connected_port_changed(from, to) {
		if(from) {
			from.c.PortablesConnector.connected_device = null;
			this.a.c.Tangible.anchored = false;
		}
		if(to) {
			this.a.loc = to.fine_loc;
			to.c.PortablesConnector.connected_device = this.a;
			if(to.c.AtmosMachine.pipenets[0])
				to.c.AtmosMachine.pipenets[0].reconcile_air(); // get that shit in *instantly*
			this.emit("air_updated");

			this.a.c.Tangible.anchored = true;
		}
	}
	connect(new_port) {
		// make sure not already connected to something else
		if(this.connected_port || !new_port || new_port.c.PortablesConnector.connected_device)
			return false;

		// make sure we're close enough
		if(!this.a.does_cross(new_port))
			return false;
		this.connected_port = new_port;
		return true;
	}
	disconnect() {
		this.connected_port = null;
	}
}

PortableAtmospherics.loadBefore = ["AirHolder", "Destructible", "AtmosMachineTick"];
PortableAtmospherics.depends = ["AirHolder", "Destructible", "AtmosMachineTick"];

PortableAtmospherics.template = {
	vars: {
		components: {
			"PortableAtmospherics": {
				volume: 1000
			},
			"Tangible": {
				anchored: false
			}
		},
		icon: 'icons/obj/atmos.png',
		density: 1,
		layer: layers.OBJ_LAYER
	}
};

module.exports.components = {PortableAtmospherics};
