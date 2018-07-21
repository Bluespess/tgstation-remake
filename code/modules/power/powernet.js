'use strict';
const {chain_func, has_component} = require('bluespess');
const _ = require('underscore');

const enable_debug_colors = false;

class Powernet {
	constructor(power_controller) {
		this.controller = power_controller;
		power_controller.powernets.add(this);
		this.debug_color = "#" + Math.floor(Math.random() * 0x1000000).toString(16);

		this.cables = new Set();
		this.cables.add = chain_func(this.cables.add, (prev, val) => {
			let old_pn = val.c.Cable.powernet;
			if(old_pn && old_pn != this) {
				old_pn.cables.delete(val);
			}
			val.c.Cable.powernet = this;
			if(enable_debug_colors)
				val.color = this.debug_color;
			return prev();
		});
		this.cables.delete = chain_func(this.cables.delete, (prev, val) => {
			if(val.c.Cable.powernet == this)
				val.c.Cable.powernet = null;
			return prev();
		});
		this.cables.clear = chain_func(this.cables.clear, (prev) => {
			for(let cable of this.cables)
				if(cable.c.Cable.powernet == this)
					cable.c.Cable.powernet = null;
			return prev();
		});
		this.nodes = new Set();
		this.nodes.add = chain_func(this.nodes.add, (prev, val) => {
			let old_pn = val.c.PowerNode.powernet;
			if(old_pn && old_pn != this) {
				old_pn.nodes.delete(val);
			}
			val.c.PowerNode.powernet = this;
			return prev();
		});
		this.nodes.delete = chain_func(this.nodes.delete, (prev, val) => {
			if(val.c.PowerNode.powernet == this)
				val.c.PowerNode.powernet = null;
			return prev();
		});
		this.nodes.clear = chain_func(this.nodes.clear, (prev) => {
			for(let cable of this.nodes)
				if(cable.c.PowerNode.powernet == this)
					cable.c.PowerNode.powernet = null;
			return prev();
		});

		// Okay things are gonna be a bit different here
		// These are all in joules instead of watts. It's not a major difference
		// but that means that if you have something use an instantaneous amount of
		// "watts" (like press a button it uses 100 watts) that 100 watts is over 1 ss13 tick (2 secounds)
		// so it's really 200 joules. However something that constantly uses 100 watts is using 100 joules every second.
		this.load = 0;
		this.new_avail = 0;
		this.avail = 0;
		this.view_avail = 0;
		this.view_load = 0;

		this.smes_output_total = 0;
		this.smes_input_total = 0;
		this.smes_input_potential = 0;
		this.new_smes_output_total = 0;
	}

	merge(powernet) {
		let new_cables = [...powernet.cables];
		let new_nodes = [...powernet.nodes];
		powernet.cables.clear();
		powernet.nodes.clear();

		for(let cable of new_cables)
			this.cables.add(cable);
		for(let node of new_nodes)
			this.nodes.add(node);
		this.load += powernet.load;
		this.new_avail += powernet.new_avail;
		this.avail += powernet.avail;
		this.view_avail += powernet.view_avail;
		this.view_load += powernet.view_load;

		this.smes_output_total += powernet.smes_output_total;
		this.smes_input_total += powernet.smes_input_total;
		this.smes_input_potential += powernet.smes_input_potential;
		this.new_smes_output_total += powernet.new_smes_output_total;
	}

	//handles the power changes in the powernet
	//called every tick by the powernet controller
	reset(dt) {
		this.view_avail = this.new_avail/dt;
		this.view_load = this.load/dt;

		for(let smes of this.nodes) {
			if(has_component(smes, "Smes"))
				smes.c.Smes.restore(dt);
			if(has_component(smes, "SmesTerminal") && smes.c.SmesTerminal.master)
				smes.c.SmesTerminal.master.c.Smes.balance_input(dt);
		}

		// reset the powernet
		this.load = 0;
		this.avail = this.new_avail;
		this.new_avail = 0;

		this.smes_output_total = this.new_smes_output_total;
		this.new_smes_output_total = 0;
		this.smes_input_potential = 0;
		this.smes_input_potential = 0;
	}

	get_electrocute_damage() {
		if(this.avail >= 1000)
			return Math.min(Math.max(Math.round(this.avail / 10000), 10), 90) + _.rand(-5, 5);
		else
			return 0;
	}
}

module.exports = Powernet;
