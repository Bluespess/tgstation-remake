'use strict';
const {Component, chain_func, has_component, to_chat, Panel} = require('bluespess');
const {reagent_types} = require('../holder.js');
const ReagentBinding = require('../binding.js');

const _beaker = Symbol('_beaker');
const _dispense_amount = Symbol('_dispense_amount');

class ChemDispenser extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));
		this.a.on("exited", this.exited.bind(this));
	}

	attack_by(prev, item, user) {
		if(has_component(item, "OpenReagentContainer")) {
			if(this.beaker) {
				to_chat`<span class='warning'>A container is already loaded into the ${this.a}</span>`(user);
				return true;
			}

			if(item.c.Item.slot && !item.c.Item.slot.can_unequip())
				return true;
			item.loc = this.a;

			this.beaker = item;
			return true;
		}
		return prev();
	}

	attack_hand(prev, user) {
		if(user.c.Mob.get_panel(this.a, ChemDispenserPanel) || !user.c.Mob.can_read_panel(this.a, ChemDispenserPanel)) {
			return prev();
		}
		var panel = new ChemDispenserPanel(user.c.Mob.client, {title: `${this.a.name}`, width:600, height:600});
		user.c.Mob.bind_panel(this.a, panel);
		panel.open();
	}

	get beaker() {
		return this[_beaker];
	}
	set beaker(val) {
		let old = this[_beaker];
		if(old == val)
			return;
		this[_beaker] = val;
		this.emit("beaker_changed", old, val);
		if(val) {
			this.a.overlays.beaker = {icon_state: "disp_beaker"};
		} else {
			this.a.overlays.beaker = null;
		}
		if(old && old.loc == this.a)
			old.loc = this.a.base_mover.fine_loc;
	}

	get dispense_amount() {
		return this[_dispense_amount];
	}
	set dispense_amount(val) {
		let old = this[_dispense_amount];
		if(old == val)
			return;
		this[_dispense_amount] = val;
		this.emit("dispense_amount_changed", old, val);
	}

	exited(e) {
		if(e.atom == this.beaker)
			this.beaker = null;
	}
}

ChemDispenser.depends = ["Destructible"];
ChemDispenser.loadBefore = ["Destructible"];

ChemDispenser.template = {
	vars: {
		components: {
			"ChemDispenser": {
				dispense_amount: 30,
				dispensable_reagents: [
					"Hydrogen", "Lithium", "Carbon", "Nitrogen", "Oxygen", "Fluorine",
					"Sodium", "Aluminium", "Silicon", "Phosphorus", "Sulfur","Chlorine",
					"Potassium", "Iron", "Copper", "Mercury", "Radium", "Water",
					"Ethanol", "Sugar", "SAcid", "WeldingFuel", "Silver", "Iodine",
					"Bromine", "StablePlasma"
				],
				emagged_reagents: [
					"SpaceDrugs", "Morphine", "Carpotoxin", "MinersSalve", "Toxin"
				]
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "Creates and dispenses chemicals."
			}
		},
		name: "chem dispenser",
		density: 1,
		layer: 2.9,
		icon: 'icons/obj/chemical.png',
		icon_state: "dispenser"
	}
};

class ChemDispenserPanel extends Panel {
	constructor(client, panel_props) {
		super(client, panel_props);
		this.on("open", this.opened.bind(this));
		this.on("close", this.closed.bind(this));
		this.on("message", this.message_handler.bind(this));
		this.container_binding = null;

		this.beaker_changed = this.beaker_changed.bind(this);
		this.dispense_amount_changed = this.dispense_amount_changed.bind(this);
	}

	beaker_changed(old_beaker, new_beaker) {
		if(this.container_binding) {
			this.container_binding.close();
			this.container_binding = null;
		}
		if(new_beaker) {
			this.container_binding = new ReagentBinding(this, new_beaker);
		}
	}

	dispense_amount_changed(old, val) {
		this.send_message({dispense_amount: val});
	}

	opened() {
		this.send_dispensable();
		this.bound_atom.c.ChemDispenser.on("beaker_changed", this.beaker_changed);
		this.bound_atom.c.ChemDispenser.on("dispense_amount_changed", this.dispense_amount_changed);
		this.dispense_amount_changed(null, this.bound_atom.c.ChemDispenser.dispense_amount);
		if(this.bound_atom.c.ChemDispenser.beaker) {
			this.beaker_changed(null, this.bound_atom.c.ChemDispenser.beaker);
		}
	}

	send_dispensable() {
		let d = [];
		for(let item of this.bound_atom.c.ChemDispenser.dispensable_reagents) {
			d.push([item, reagent_types[item].prototype.name]);
		}
		this.send_message({dispensable_reagents: d});
	}

	closed() {
		this.bound_atom.c.ChemDispenser.removeListener("beaker_changed", this.beaker_changed);
		this.bound_atom.c.ChemDispenser.removeListener("dispense_amount_changed", this.dispense_amount_changed);
		if(this.container_binding) {
			this.container_binding.close();
			this.container_binding = null;
		}
	}

	message_handler(msg) {
		if(msg.dispense != null && this.bound_atom.c.ChemDispenser.dispensable_reagents.includes(msg.dispense) && this.bound_atom.c.ChemDispenser.beaker) {
			this.bound_atom.c.ChemDispenser.beaker.c.ReagentHolder.add(msg.dispense, this.bound_atom.c.ChemDispenser.dispense_amount);
		}
		if(msg.eject) {
			this.bound_atom.c.ChemDispenser.beaker = null;
		}
		if(msg.dispense_amount) {
			let da = msg.dispense_amount;
			if(da % 5 != 0 && da != 1)
				return;
			if(da < 1)
				return;
			this.bound_atom.c.ChemDispenser.dispense_amount = da;
		}
	}
}

module.exports.templates = {
	"chem_dispenser": {
		components: ["ChemDispenser"],
		tree_paths: ["machinery/chem_dispenser"]
	}
};

module.exports.components = {ChemDispenser};
