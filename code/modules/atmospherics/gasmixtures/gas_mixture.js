'use strict';
const atmos_defines = require('../../../defines/atmos_defines.js');
const gas_metas = require('./gas_types.js');

function quantize(val) {
	return Math.round(val * 10000000)/10000000;
}

class Gas {
	constructor(meta) {
		this.gas_meta = meta;
		this.moles = 0;
		this.moles_archived = 0;
		this.id = meta.id;
		// guarantees one virtual class
		Object.seal(this);
	}
}

class GasMixture {
	constructor(volume = atmos_defines.CELL_VOLUME) {
		// Initialize everything now for performance reasons (only one virtual class)
		this.gases = {};
		this.gases_list = []; // Separate list for 4x faster gas iteration
		this.temperature = 0;
		this.temperature_archived = 0;
		this.volume = Math.max(0, volume);
		this.last_share = 0;
		this.reaction_results = {};

		//Hold on to structures for ALL gases. For explanation why, read about
		//hidden classes
		for(let meta of gas_metas) {
			var gas = new Gas(meta);
			this.gases[meta.id] = gas;
			this.gases_list.push(gas);
		}
		// this guarantees that every gas mixture object has an identical structure
		Object.freeze(this.gases);
		Object.freeze(this.gases_list);
		Object.seal(this);
	}
	//PV = nRT
	heat_capacity() { // joules per kelvin
		var capacity = 0;
		var cached_gases_list = this.gases_list;
		for(var i = 0, l = cached_gases_list.length; i < l; i++) {
			var gas = cached_gases_list[i];
			capacity += gas.moles * gas.gas_meta.specific_heat;
		}
		return capacity;
	}

	heat_capacity_archived() { //joules per kelvin
		var capacity = 0;
		var cached_gases_list = this.gases_list;
		for(var i = 0, l = cached_gases_list.length; i < l; i++) {
			var gas = cached_gases_list[i];
			capacity += gas.moles_archived * gas.gas_meta.specific_heat;
		}
		return capacity;
	}

	total_moles() {
		var moles = 0;
		var cached_gases_list = this.gases_list;
		for(var i = 0, l = cached_gases_list.length; i < l; i++) {
			var gas = cached_gases_list[i];
			moles += gas.moles;
		}
		return moles;
	}

	return_pressure() { // kilopascals
		if(this.volume > 0) { // to preventr division by zero
			var total_moles = this.total_moles();
			return total_moles * atmos_defines.R_IDEAL_GAS_EQUATION * this.temperature / this.volume;
		}
		return 0;
	}

	thermal_energy() { // joules
		return this.temperature * this.heat_capacity();
	}

	archive() {
		this.temperature_archived = this.temperature;
		var cached_gases_list = this.gases_list;
		for(var i = 0, l = cached_gases_list.length; i < l; i++) {
			var gas = cached_gases_list[i];
			gas.moles_archived = gas.moles;
		}
		return true;
	}

	merge(giver) {
		if(!giver)
			return false;

		if(Math.abs(this.temperature - giver.temperature) > atmos_defines.MINIMUM_TEMPERATURE_DELTA_TO_CONSIDER) {
			var self_heat_capacity = this.heat_capacity();
			var giver_heat_capacity = giver.heat_capacity();
			var combined_heat_capacity = giver_heat_capacity + self_heat_capacity;
			if(combined_heat_capacity)
				this.temperature = (giver.temperature * giver_heat_capacity + this.temperature * self_heat_capacity) / combined_heat_capacity;
		}
		var cached_gases = this.gases_list;
		var giver_gases = giver.gases_list;
		for(var i = 0, l = giver_gases.length; i < l; i++) {
			cached_gases[i].moles += giver_gases[i].moles;
		}
		return true;
	}

	remove_ratio(percent) {
		percent = Math.min(percent, 1); // Cannot take more air than tile has!
		if(percent <= 0)
			return null;
		var removed = new GasMixture();
		var removed_gases_list = removed.gases_list;

		removed.temperature = this.temperature;
		var cached_gases_list = this.gases_list;
		for(var i = 0, l = cached_gases_list.length; i < l; i++) {
			var gas = cached_gases_list[i];
			var amount_local = quantize(gas.moles * percent);
			removed_gases_list[i].moles = amount_local;
			gas.moles -= amount_local;
		}

		return removed;
	}

	remove(amount) {
		return this.remove_ratio(amount / this.total_moles());
	}

	copy() {
		var copy = new GasMixture(this.volume);
		copy.copy_from(this); // Fuck it I'm not rewriting the same function twice
	}

	copy_from(sample) {

		this.temperature = sample.temperature;
		var cached_gases_list = this.gases_list;
		var sample_gases_list = sample.gases_list;
		for(var i = 0, l = cached_gases_list.length; i < l; i++) {
			cached_gases_list[i].moles = sample_gases_list[i].moles;
		}

		return true;
	}

	//TODO copy_from_turf, see code/modules/atmospherics/gasmixtures/gas_mixture.dm line 270

	parse_gas_string(gases_string) {
		var cached_gases = this.gases;
		var split1 = gases_string.split(";");
		for(var gas_string of split1) {
			var split2 = gas_string.split("=");
			if(split2[0] == "TEMP") {
				this.temperature = +split2[1];
				continue;
			}
			cached_gases[split2[0]].moles = +split2[1];
		}
		return true;
	}

	share(sharer, atmos_adjacent_turfs = 4) {
		if(!sharer)
			return false;


		var temperature_delta = this.temperature_archived - sharer.temperature_archived;
		var abs_temperature_delta = Math.abs(temperature_delta);

		var old_self_heat_capacity = 0;
		var old_sharer_heat_capacity = 0;
		if(abs_temperature_delta > atmos_defines.MINIMUM_TEMPERATURE_DELTA_TO_CONSIDER) {
			old_self_heat_capacity = this.heat_capacity();
			old_sharer_heat_capacity = sharer.heat_capacity();
		}

		var heat_capacity_self_to_sharer = 0;
		var heat_capacity_sharer_to_self = 0;

		var moved_moles = 0;
		var abs_moved_moles = 0;

		var cached_gases_list = this.gases_list;
		var sharer_gases_list = sharer.gases_list;
		for(var i = 0, l = cached_gases_list.length; i < l; i++) {
			var gas = cached_gases_list[i];
			var sharergas = sharer_gases_list[i];

			var delta = quantize(gas.moles_archived - sharergas.moles_archived) / (atmos_adjacent_turfs+1);

			if(delta && abs_temperature_delta > atmos_defines.MINIMUM_TEMPERATURE_DELTA_TO_CONSIDER) {
				var gas_heat_capacity = delta * gas.gas_meta.specific_heat;
				if(delta > 0) {
					heat_capacity_self_to_sharer += gas_heat_capacity;
				} else {
					heat_capacity_sharer_to_self -= gas_heat_capacity;
				}
			}

			gas.moles -= delta;
			sharergas.moles += delta;
			moved_moles += delta;
			abs_moved_moles += Math.abs(delta);
		}
		this.last_share = abs_moved_moles;

		//THERMAL ENERGY TRANSFER
		if(abs_temperature_delta > atmos_defines.MINIMUM_TEMPERATURE_DELTA_TO_CONSIDER) {
			var new_self_heat_capacity = old_self_heat_capacity + heat_capacity_sharer_to_self - heat_capacity_self_to_sharer;
			var new_sharer_heat_capacity = old_sharer_heat_capacity + heat_capacity_self_to_sharer - heat_capacity_sharer_to_self;

			//transfer of thermal energy (via changed heat capacity) between self and sharer
			if(new_self_heat_capacity > atmos_defines.MINIMUM_HEAT_CAPACITY){
				this.temperature = (old_self_heat_capacity*this.temperature - heat_capacity_self_to_sharer*this.temperature_archived + heat_capacity_sharer_to_self*sharer.temperature_archived)/new_self_heat_capacity;
			}

			if(new_sharer_heat_capacity > atmos_defines.MINIMUM_HEAT_CAPACITY) {
				sharer.temperature = (old_sharer_heat_capacity*sharer.temperature-heat_capacity_sharer_to_self*sharer.temperature_archived + heat_capacity_self_to_sharer*this.temperature_archived)/new_sharer_heat_capacity;
				//thermal energy of the system (self and sherer) is unchanged

				if(Math.abs(old_sharer_heat_capacity) > atmos_defines.MINIMUM_HEAT_CAPACITY) {
					if(Math.abs(new_sharer_heat_capacity/old_sharer_heat_capacity - 1) < 0.10) {// <10% change in sharer heat capacity
						this.temperature_share(sharer, atmos_defines.OPEN_HEAT_TRANSFER_COEFFICIENT);
					}
				}
			}
		}

		sharer.after_share(this, atmos_adjacent_turfs);
		if(this.temperature_delta > atmos_defines.MINIMUM_TEMPERATURE_TO_MOVE || Math.abs(moved_moles) > atmos_defines.MINIMUM_MOLES_DELTA_TO_MOVE) {
			var our_moles = this.total_moles();
			var their_moles = sharer.total_moles();
			var delta_pressure = this.temperature_archived * (our_moles + moved_moles) - sharer.temperature_archived * (their_moles - moved_moles);
			return delta_pressure * atmos_defines.R_IDEAL_GAS_EQUATION / this.volume;
		}
	}

	after_share(/*sharer, atmos_adjacent_turfs = 4*/) {
		return;
	}

	temperature_share(sharer, conduction_coefficient, sharer_temperature, sharer_heat_capacity) {
		//transfer of thermal energy (via conduction) between self and sharer
		if(sharer)
			sharer_temperature = sharer.temperature_archived;
		var temperature_delta = this.temperature_archived - sharer_temperature;
		if(Math.abs(temperature_delta) > atmos_defines.MINIMUM_TEMPERATURE_DELTA_TO_CONSIDER) {
			var self_heat_capacity = this.heat_capacity_archived();
			sharer_heat_capacity = sharer_heat_capacity || sharer.heat_capacity_archived();

			if((sharer_heat_capacity > atmos_defines.MINIMUM_HEAT_CAPACITY) && (self_heat_capacity > atmos_defines.MINIMUM_HEAT_CAPACITY)) {
				var heat = conduction_coefficient * temperature_delta * (self_heat_capacity*sharer_heat_capacity/(self_heat_capacity+sharer_heat_capacity));

				this.temperature = Math.max(this.temperature - heat/self_heat_capacity, atmos_defines.TCMB);
				sharer_temperature = Math.max(sharer_temperature + heat / sharer_heat_capacity, atmos_defines.TCMB);
				if(sharer)
					sharer.temperature = sharer_temperature;
			}
		}
		return sharer_temperature;
		// thermal energy of the system (self and sherer) is unchanged
	}

	compare(sample) {
		var cached_gases_list = this.gases_list;
		var sample_gases_list = sample.gases_list;
		for(var i = 0, l = cached_gases_list.length; i < l; i++) {
			var gas = cached_gases_list[i];
			var sample_gas = sample_gases_list[i];
			var delta = Math.abs(gas.moles - sample_gas.moles);
			if(delta > atmos_defines.MINIMUM_MOLES_DELTA_TO_MOVE && delta > gas.moles * atmos_defines.MINIMUM_AIR_RATIO_TO_MOVE)
				return gas.id;
		}

		var our_moles = this.total_moles();
		if(our_moles > atmos_defines.MINIMUM_MOLES_DELTA_TO_MOVE) {
			if(Math.abs(this.temperature - sample.temperature) > atmos_defines.MINIMUM_TEMPERATURE_DELTA_TO_SUSPEND)
				return "temp";
		}
		return "";
	}
}

module.exports = GasMixture;
