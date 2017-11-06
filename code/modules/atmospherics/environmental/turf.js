'use strict';
const {Component} = require('bluespess');
const GasMixture = require('../gasmixtures/gas_mixture.js');
const ExcitedGroup = require('./excited_group.js');
const atmos_defines = require('../../../defines/atmos_defines.js');

class Turf extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.air = new GasMixture();
		this.air.parse_gas_string(this.initial_gas_mix);
		this.a.on("moved", this.moved.bind(this));
		this.moved();
	}

	moved(movement) {
		if(movement && movement.old_fine_loc.loc && movement.old_fine_loc.loc.is_base_loc) {
			movement.old_fine_loc.loc.turf = undefined;
		}
		if(this.a.loc && this.a.loc.is_base_loc) {
			this.a.loc.turf = this.atom;
		}
	}
}

Turf.depends = ["LightingTile"];
Turf.one_per_tile = true;

Turf.template = {
	vars: {
		components: {
			Turf: {
				initial_gas_mix: `o2=${atmos_defines.MOLES_O2STANDARD};n2=${atmos_defines.MOLES_N2STANDARD};TEMP=${atmos_defines.T20C}`
			}
		}
	},
	tile_bound: true, // Integer coordinates only in map editor
};

class SimulatedTurf extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.archived_cycle = -1;
		this.current_cycle = -1;
		this.excited = false;
		this.excited_group = undefined;
		this.recently_active = false;
		this.atmos_cooldown = 0;
	}

	assume_air(giver) {
		if(!giver)
			return false;
		this.a.c.Turf.air.merge(giver);
		this.update_visuals();
		return true;
	}

	remove_air(amount) {
		var removed = this.a.c.Turf.air.remove(amount);
		this.update_visuals();
		return removed;
	}

	copy_air_with_tile(turf) {
		if(this.a.server.has_component(turf, "Turf"))
			this.a.c.Turf.air.copy_from(turf.c.Turf.air);
	}

	copy_air(copy) {
		if(copy)
			this.a.c.Turf.air.copy_from(copy);
	}

	temperature_expose() {

	}

	archive(cycle_num) {
		this.a.c.Turf.air.archive();
		this.archived_cycle = cycle_num;
	}

	update_visuals() {
		for(var gas of this.a.c.Turf.air.gases_list) {
			if(gas.gas_meta.gas_overlay && gas.moles > gas.gas_meta.moles_visible) {
				if(!this.a.overlays[`gas_overlay_${gas.id}`]) {
					this.a.overlays[`gas_overlay_${gas.id}`] = {icon:'icons/effects/tile_effects.png',icon_state:gas.gas_meta.gas_overlay,mouse_opacity:0,layer:5};
				}
			} else {
				this.a.overlays[`gas_overlay_${gas.id}`] = null;
			}
		}
	}

	process_cell(cycle_num) {
		if(this.archived_cycle < cycle_num)
			this.archive(cycle_num);

		this.current_cycle = cycle_num;

		var adjacent_turfs = [];
		for(var i = 1; i <= 8; i <<= 1) {
			var turf = this.a.loc.get_step(i).turf;
			if(this.a.server.has_component(turf, "SimulatedTurf"))
				adjacent_turfs.push(turf);
		}
		var our_excited_group = this.excited_group;
		var adjacent_turfs_length = adjacent_turfs.length;
		var cached_atmos_cooldown = this.atmos_cooldown + 1;

		var our_air = this.a.c.Turf.air;

		for(var enemy_tile of adjacent_turfs) {
			if(!(cycle_num > enemy_tile.c.SimulatedTurf.current_cycle))
				continue;
			enemy_tile.c.SimulatedTurf.archive();
			// GROUP HANDLING START
			var should_share_air = false;
			var enemy_air = enemy_tile.c.Turf.air;
			if(enemy_tile.c.SimulatedTurf.excited) {
				var enemy_excited_group = enemy_tile.c.SimulatedTurf.excited_group;
				if(our_excited_group) {
					if(enemy_excited_group) {
						if(our_excited_group != enemy_excited_group) {
							//combine groups (this also handles updating the excited_group var of all involved turfs)
							our_excited_group.merge_groups(enemy_excited_group);
							our_excited_group = this.excited_group; // update our cache
						}
						should_share_air = true;
					} else {
						if((this.recently_active && enemy_tile.c.SimulatedTurf.recently_active) || our_air.compare(enemy_air)) {
							our_excited_group.add_turf(enemy_tile);
							should_share_air = true;
						}
					}
				} else {
					if(enemy_excited_group) {
						if((this.recently_active && enemy_tile.recently_active) || our_air.compare(enemy_air))
							enemy_excited_group.add_turf(this.atom); //join self to enemy group
						our_excited_group = this.excited_group; //update our cache
						should_share_air = true;
					} else {
						if((this.recently_active && enemy_tile.recently_active) || our_air.compare(enemy_air)) {
							let group = new ExcitedGroup(this.a.server.air_controller); //generate new group
							group.add_turf(this.atom);
							group.add_turf(enemy_tile);
							our_excited_group = this.excited_group; //update our cache
							should_share_air = true;
						}
					}
				}
			} else {
				if(our_air.compare(enemy_air)) { //compare if
					this.a.server.air_controller.add_to_active(enemy_tile); //excite enemy
					if(our_excited_group) {
						our_excited_group.add_turf(enemy_tile); //add enemy to group
					} else {
						let group = new ExcitedGroup(this.a.server.air_controller); //generate new group
						group.add_turf(this.atom);
						group.add_turf(enemy_tile);
						our_excited_group = this.excited_group; //update our cache
					}
					should_share_air = true;
				}
			}

			//air sharing
			if(should_share_air) {
				var difference = our_air.share(enemy_air, adjacent_turfs_length);
				if(difference) {
					if(difference > 0) {
						this.consider_pressure_difference(enemy_tile, difference);
					} else {
						enemy_tile.c.SimulatedTurf.consider_pressure_difference(this.atom, -difference);
					}
				}
				var last_share = our_air.last_share;
				if(last_share > atmos_defines.MINIMUM_AIR_TO_SUSPEND){
					our_excited_group.reset_cooldowns();
					cached_atmos_cooldown = 0;
				} else if(last_share > atmos_defines.MINIMUM_MOLES_DELTA_TO_MOVE) {
					our_excited_group.dismantle_cooldown = 0;
					cached_atmos_cooldown = 0;
				}
			}
		}

		// TODO our_air.react(this);

		this.update_visuals();

		var remove = true;
		// TODO superconductivity

		if((!our_excited_group && remove) || (cached_atmos_cooldown > (atmos_defines.EXCITED_GROUP_DISMANTLE_CYCLES * 2))) {
			this.a.server.air_controller.remove_from_active(this.atom);
		}

		this.atmos_cooldown = cached_atmos_cooldown;
	}

	consider_pressure_difference(turf, difference) {
		// TODO What do you think? This is an empty function, can't you figure it out yourself?
	}
}
SimulatedTurf.depends = ["Turf"];
SimulatedTurf.loadBefore = ["Turf"];

module.exports.components = {Turf, SimulatedTurf};
