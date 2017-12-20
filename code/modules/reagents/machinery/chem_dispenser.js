'use strict';
const {Component, chain_func, has_component, to_chat, Panel} = require('bluespess');

const _beaker = Symbol('_beaker');

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

			if(item.slot && !item.slot.can_unequip())
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
		var panel = new ChemDispenserPanel(user.c.Mob.client, {title: `${this.a.name}`});
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
				amount: 30,
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

		this.beaker_changed = this.beaker_changed.bind(this);
		this.reagent_changed = this.reagents_changed.bind(this);
	}

	beaker_changed(old_beaker, new_beaker) {
		let msg = {reagents: {}};
		if(old_beaker) {
			old_beaker.c.ReagentHolder.removeListener("added", this.reagent_changed);
			old_beaker.c.ReagentHolder.removeListener("removed", this.reagent_changed);
			for(let reagentid of old_beaker.c.ReagentHolder.reagents.keys()) {
				msg.reagents[reagentid] = 0;
			}
			msg.beaker = null;
		}
		if(new_beaker) {
			new_beaker.c.ReagentHolder.on("added", this.reagent_changed);
			new_beaker.c.ReagentHolder.on("removed", this.reagent_changed);
			for(let [reagentid, reagent] of new_beaker.c.ReagentHolder.reagents) {
				msg.reagents[reagentid] = reagent.volume;
			}
			msg.beaker = {maximum_volume: new_beaker.c.ReagentHolder.maximum_volume, total_volume: new_beaker.c.ReagentHolder.total_volume};
		}
		this.send_message(msg);
	}

	reagents_changed(reagent) {
		this.send_message({reagents: {[reagent.constructor.name]: reagent.volume}});
	}

	opened() {

		this.send_message({dispensable_reagents: this.bound_atom.c.ChemDispenser.dispensable_reagents});
		this.bound_atom.c.ChemDispenser.on("beaker_changed", this.beaker_changed);
		if(this.bound_atom.c.ChemDispenser.beaker) {
			this.beaker_changed(null, this.bound_atom.c.ChemDispenser.beaker);
		}
	}

	closed() {
		this.bound_atom.c.ChemDispenser.removeListener("beaker_changed", this.beaker_changed);
		if(this.bound_atom.c.ChemDispenser.beaker) {
			let beaker = this.bound_atom.c.ChemDispenser.beaker;
			beaker.c.ReagentHolder.removeListener("added", this.reagent_changed);
			beaker.c.ReagentHolder.removeListener("removed", this.reagent_changed);
		}
	}

	message_handler(msg) {
		if(msg.dispense != null && this.bound_atom.c.ChemDispenser.dispensable_reagents.includes(msg.dispense) && this.bound_atom.c.ChemDispenser.beaker) {
			this.bound_atom.c.ChemDispenser.beaker.c.ReagentHolder.add(msg.dispense, this.bound_atom.c.ChemDispenser.amount);
		}
		if(msg.eject) {
			this.bound_atom.c.ChemDispenser.beaker = null;
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
