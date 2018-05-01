'use strict';
const {Component, chain_func, has_component, to_chat, make_watched_property, Panel} = require('bluespess');
const ReagentBinding = require('../binding.js');
const layers = require('../../../defines/layers.js');

class ChemHeater extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));

		this.on("enabled_changed", this.enabled_changed.bind(this));
		this.on("beaker_changed", this.beaker_changed.bind(this));
		this.heat_timeout = null;

		make_watched_property(this, "enabled", "boolean");
		make_watched_property(this, "beaker");
		make_watched_property(this, "target_temperature", "number");
	}

	enabled_changed() {
		if(this.enabled && !this.heat_timeout) {
			this.heat_timeout = setInterval(this.process_heat.bind(this), 2000);
		}
	}
	beaker_changed(from, to) {
		if(from) {
			from.loc = this.a.base_mover.fine_loc;
			this.a.icon_state = "mixer0b";
		}
		if(to) {
			to.loc = this.a;
			this.a.icon_state = "mixer1b";
		}
	}

	process_heat() {
		if(!this.enabled || this.a.destroyed) {
			clearInterval(this.heat_timeout);
			this.heat_timeout = null;
			return;
		}
		if(this.beaker) {
			let difference = this.target_temperature - this.beaker.c.ReagentHolder.temperature;
			difference *= this.heater_coefficient;
			difference = (difference > 0) ? Math.ceil(difference) : Math.floor(difference);
			this.beaker.c.ReagentHolder.temperature += difference;
		}
	}

	attack_hand(prev, user) {
		if(user.c.Mob.get_panel(this.a, ChemHeaterPanel) || !user.c.Mob.can_read_panel(this.a, ChemHeaterPanel)) {
			return prev();
		}
		var panel = new ChemHeaterPanel(user.c.Mob.client, {title: `${this.a.name}`, width:275, height:400});
		user.c.Mob.bind_panel(this.a, panel);
		panel.open();
	}

	attack_by(prev, item, user) {
		if(has_component(item, "OpenReagentContainer")) {
			if(this.beaker) {
				to_chat`<span class='warning'>A container is already loaded into the ${this.a}!</span>`(user);
				return true;
			}
			if(item.c.Item.slot && !item.c.Item.slot.can_unequip())
				return true;
			this.beaker = item;
			to_chat`<span class='notice'>You add the ${item} to the ${this.a}.</span>`(user);
			return true;
		}
		return prev();
	}
}

ChemHeater.loadBefore = ["Destructible"];
ChemHeater.depends = ["Destructible"];

ChemHeater.template = {
	vars: {
		components: {
			"ChemHeater": {
				beaker: null,
				enabled: false,
				target_temperature: 300,
				heater_coefficient: 0.1
			},
			"Tangible": {
				anchored: true
			}
		},
		name: "chemical heater",
		density: 1,
		layer: layers.BELOW_OBJ_LAYER,
		icon: 'icons/obj/chemical.png',
		icon_state: "mixer0b"
	}
};

class ChemHeaterPanel extends Panel {
	constructor(client, panel_props) {
		super(client, panel_props);
		this.on("open", this.opened.bind(this));
		this.on("close", this.closed.bind(this));
		this.on("message", this.message_handler.bind(this));

		this.beaker_changed = this.beaker_changed.bind(this);
		this.target_temperature_changed = this.target_temperature_changed.bind(this);
		this.enabled_changed = this.enabled_changed.bind(this);
	}

	beaker_changed(old_beaker, new_beaker) {
		if(this.container_binding) {
			this.container_binding.close();
			this.container_binding = null;
		}
		if(new_beaker) {
			this.container_binding = new ReagentBinding(this, new_beaker, {include_temperature: true});
		}
	}

	target_temperature_changed(old, val) {
		this.send_message({target_temperature: val});
	}

	enabled_changed(old, val) {
		this.send_message({enabled: val});
	}

	opened() {
		this.bound_atom.c.ChemHeater.on("beaker_changed", this.beaker_changed);
		this.bound_atom.c.ChemHeater.on("target_temperature_changed", this.target_temperature_changed);
		this.bound_atom.c.ChemHeater.on("enabled_changed", this.enabled_changed);
		this.target_temperature_changed(null, this.bound_atom.c.ChemHeater.target_temperature);
		if(this.bound_atom.c.ChemHeater.beaker) {
			this.beaker_changed(null, this.bound_atom.c.ChemHeater.beaker);
		}
		if(this.bound_atom.c.ChemHeater.enabled) {
			this.enabled_changed(null, true);
		}
	}

	closed() {
		this.bound_atom.c.ChemHeater.removeListener("beaker_changed", this.beaker_changed);
		this.bound_atom.c.ChemHeater.removeListener("target_temperature_changed", this.target_temperature_changed);
		this.bound_atom.c.ChemHeater.removeListener("enabled_changed", this.enabled_changed);
		if(this.container_binding) {
			this.container_binding.close();
			this.container_binding = null;
		}
	}

	message_handler(msg) {
		if(msg.dispense != null && this.bound_atom.c.ChemHeater.dispensable_reagents.includes(msg.dispense) && this.bound_atom.c.ChemHeater.beaker) {
			this.bound_atom.c.ChemHeater.beaker.c.ReagentHolder.add(msg.dispense, this.bound_atom.c.ChemHeater.dispense_amount);
		}
		if(msg.eject) {
			this.bound_atom.c.ChemHeater.beaker = null;
		}
		if(msg.target_temperature) {
			let da = +msg.target_temperature || 0;
			da = Math.min(da, 1000);
			da = Math.max(da, 0);
			this.bound_atom.c.ChemHeater.target_temperature = da;
		}
		if(msg.enabled != null) {
			this.bound_atom.c.ChemHeater.enabled = msg.enabled;
		}
	}
}

module.exports.templates = {
	"chem_heater": {
		components: ["ChemHeater"],
		tree_paths: ["machinery/chem_heater"]
	}
};

module.exports.components = {ChemHeater};
