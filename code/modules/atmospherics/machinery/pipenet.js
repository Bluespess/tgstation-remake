'use strict';
const {chain_func} = require('bluespess');
const GasMixture = require('../gasmixtures/gas_mixture.js');

const enable_debug_colors = false;

class Pipenet {
	constructor(controller) {
		this.controller = controller;
		this.controller.pipenets.add(this);

		this.air = new GasMixture(0);
		this.pipes = new Set();
		this.pipes.add = chain_func(this.pipes.add, (prev, val) => {
			let old_pn = val.c.Pipe.pipenet;
			if(old_pn == this)
				return prev();
			if(old_pn) {
				old_pn.pipes.delete(val);
			}
			if(val.c.Pipe.temporary_air) {
				this.air.merge(val.c.Pipe.temporary_air);
				val.c.Pipe.temporary_air = null;
			}
			this.air.volume += val.c.Pipe.volume;
			val.c.Pipe.pipenet = this;
			if(enable_debug_colors)
				val.color = this.debug_color;
			return prev();
		});
		this.pipes.delete = chain_func(this.pipes.delete, (prev, val) => {
			if(val.c.Pipe.pipenet == this) {
				val.c.Pipe.temporary_air = this.air.remove_ratio(val.c.Pipe.volume / this.air.volume);
				val.c.Pipe.pipenet = null;
				this.air.volume -= val.c.Pipe.volume;
			}
			return prev();
		});
		this.pipes.clear = chain_func(this.pipes.clear, (prev) => {
			for(let pipe of this.pipes)
				if(pipe.c.Pipe.pipenet == this) {
					pipe.c.Pipe.temporary_air = this.air.remove_ratio(pipe.c.Pipe.volume / this.air.volume);
					pipe.c.Pipe.pipenet = null;
					this.air.volume -= pipe.c.Pipe.volume;
				}
			return prev();
		});
		this.machines = new Set();
		this.other_airs = new Set();
	}
	merge(other) {
		for(let pipe of [...other.pipes]) {
			this.pipes.add(pipe);
		}
		other.pipes.clear();
		for(let machine of [...other.machines]) {
			let index_dirs = machine.c.AtmosMachine.get_node_index_dirs();
			for(let i = 0; i < index_dirs.length; i++) {
				if(machine.c.AtmosMachine.pipenets[i] == other)
					machine.c.AtmosMachine.set_pipenet(i, this);
			}
		}
		other.machines.clear();
		other.other_airs.clear();
	}
}

module.exports = Pipenet;
