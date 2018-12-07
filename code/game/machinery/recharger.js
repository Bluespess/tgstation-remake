'use strict';
const {Component, has_component, chain_func, to_chat} = require('bluespess');
const layers = require('../../defines/layers.js');

class Recharger extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.attack_hand = this.attack_hand.bind(this);
		this.charging = null;
		this.did_charge = false;
		this.a.c.MachineTick.process = chain_func(this.a.c.MachineTick.process, this.process.bind(this));
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool") && item.c.Tool.can_use("Wrench")) {
			if(this.charging) {
				to_chat`<span class='notice'>Remove the charging item first!</span>`(user);
				return true;
			}
			this.a.c.Tangible.anchored = !this.a.c.Tangible.anchored;
			to_chat`<span class='notice'>You ${this.a.c.Tangible.anchored ? "attach" : "detach"} the ${this.a}.</span>`(user);
			item.c.Tool.used("Wrench");
			return true;
		}
		if(has_component(item, "Rechargeable") && this.a.c.Tangible.anchored) {
			if(!this.a.c.ApcPowered.powered) {
				to_chat`<span class='notice'>The ${this.a} blinks red as you try to insert the ${item}.</span>`(user);
				return true;
			}
			if(!item.c.Rechargeable.check_can_charge(user, this.a))
				return true;
			if(!item.c.Item.slot && item.c.Item.slot.can_unequip())
				return true;
			item.loc = this.a;
			this.charging = item;
			this.did_charge = true;
			this.update_icon();
			return true;
		}
		return prev();
	}

	attack_hand(user) {
		if(this.charging) {
			this.charging.loc = this.a.loc;
			if(has_component(user, "MobInventory"))
				user.c.MobInventory.put_in_hands(this.charging);
			this.charging = null;
			this.update_icon();
		}
	}

	process(prev, dt) {
		if(!this.a.c.ApcPowered.powered || !this.a.c.Tangible.anchored)
			return prev();
		if(this.charging) {
			let result = this.charging.c.Rechargeable.recharge(this.a, dt);
			if(result != this.did_charge) {
				this.did_charge = result;
				this.update_icon();
			}
		}
		return prev();
	}

	update_icon() {
		if(!this.a.c.ApcPowered.powered || !this.a.c.Tangible.anchored) {
			this.a.icon_state = "rechargeroff";
			return;
		}
		if(this.charging) {
			if(this.did_charge) {
				this.a.icon_state = "recharger1";
			} else {
				this.a.icon_state = "recharger2";
			}
			return;
		}
		this.a.icon_state = "recharger0";
	}
}

Recharger.loadBefore = ["ApcPowered", "Destructible"];
Recharger.depends = ["ApcPowered", "Destructible"];

Recharger.template = {
	vars: {
		components: {
			"Recharger": {
				recharge_coeff: 1
			},
			"ApcPowered": {
				power_usage: 4,
				using_idle_power: true
			},
			"Examine": {
				desc: "A charging dock for energy based weaponry."
			},
			"Tangible": {
				anchored: true
			}
		},
		name: "recharger",
		icon: 'icons/obj/stationobjs.png',
		icon_state: "recharger0",
		density: 0,
		layer: layers.OBJ_LAYER
	}
};

class Rechargeable extends Component {
	constructor(atom, template) {
		super(atom, template);
	}

	check_can_charge(/*user, recharger*/) {return false;}
	recharge(/*recharger, dt*/) {}
}

Rechargeable.loadBefore = ["Item"];
Rechargeable.depends = ["Item"];

Rechargeable.template = {
	vars: {
		components: {
			"Rechargeable": {

			}
		}
	}
};

module.exports.templates = {
	"recharger": {
		components: ["Recharger"],
		tree_paths: ["machinery/recharger"]
	}
};

module.exports.components = {Recharger, Rechargeable};
