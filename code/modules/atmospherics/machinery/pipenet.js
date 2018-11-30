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
			this.update_flag = true;
			return prev();
		});
		this.pipes.delete = chain_func(this.pipes.delete, (prev, val) => {
			if(val.c.Pipe.pipenet == this) {
				val.c.Pipe.temporary_air = this.air.remove_ratio(val.c.Pipe.volume / this.air.volume);
				val.c.Pipe.pipenet = null;
				this.air.volume -= val.c.Pipe.volume;
			}
			this.update_flag = true;
			return prev();
		});
		this.pipes.clear = chain_func(this.pipes.clear, (prev) => {
			for(let pipe of this.pipes)
				if(pipe.c.Pipe.pipenet == this) {
					pipe.c.Pipe.temporary_air = this.air.remove_ratio(pipe.c.Pipe.volume / this.air.volume);
					pipe.c.Pipe.pipenet = null;
					this.air.volume -= pipe.c.Pipe.volume;
				}
			this.update_flag = true;
			return prev();
		});
		this.machines = new Set();
		this.other_airs = new Set();
		this.update_flag = true;
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
		this.update_flag = true;
	}
	reconcile_air() {
		let temp_airs = this.other_airs;
		let total_thermal_energy = this.air.thermal_energy();
		let total_heat_capacity = this.air.heat_capacity();
		let original_volume = this.air.volume;
		for(let air of temp_airs) {
			this.air.volume += air.volume;
			this.air.merge(air);
			total_thermal_energy += air.thermal_energy();
			total_heat_capacity += air.heat_capacity();
		}
		this.air.temperature = total_heat_capacity ? total_thermal_energy/total_heat_capacity : 0;
		for(let air of temp_airs) {
			air.temperature = this.air.temperature;
			for(let i = 0; i < air.gases_list.length; i++) {
				air.gases_list[i].moles = this.air.gases_list[i].moles * air.volume / this.air.volume;
			}
		}
		this.air.remove_ratio(1 - (original_volume / this.air.volume));
		this.air.volume = original_volume;
		this.update_flag = false;
	}
	process() {
		if(this.update_flag) {
			this.reconcile_air();
		}
	}
}

module.exports = Pipenet;
