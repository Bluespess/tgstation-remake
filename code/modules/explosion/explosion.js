'use strict';
const {has_component} = require('bluespess');
const _ = require('underscore');
const combat_defines = require('../../defines/combat_defines.js');

function explosion({epicenter, devastation_range = 0, heavy_impact_range = 0,
	light_impact_range = 0, flash_range = devastation_range,
	flame_range = light_impact_range} = {}) {
	if(!epicenter.dim) // fuck off there's no place to explode into
		return;
	let max_range = Math.max(devastation_range, heavy_impact_range, light_impact_range, flame_range, flash_range);
	let x0 = Math.round(epicenter.x);
	let y0 = Math.round(epicenter.y);
	let z0 = Math.round(epicenter.z);
	let dim = epicenter.dim;
	// word of warning here, the algorithm used here is quite different from byond ss13
	// alright, let's get a bounding box.
	let bbox = [];
	if(max_range == 0)
		bbox.push([0, 0]);
	else {
		for(let i = -max_range + 1; i <= (max_range - 1); i++) {
			bbox.push([i, max_range]);
			bbox.push([i, -max_range]);
			bbox.push([max_range, i]);
			bbox.push([-max_range, i]);
		}
		bbox.push([-max_range,-max_range]);
		bbox.push([-max_range,max_range]);
		bbox.push([max_range,-max_range]);
		bbox.push([max_range,max_range]);
	}
	bbox = _.shuffle(bbox); // shuffle so that it doesn't look tacky if it lags
	let explosion_block_cache = new Map(); // Stores the explosion block for tiles that have already been exploded
	for(let target of bbox) {
		let flip_x = (target[0] < 0);
		let flip_y = (target[1] < 0);
		target[0] = Math.abs(target[0]);
		target[1] = Math.abs(target[1]);
		let flip_xy = (target[1] > target[0]);
		if(flip_xy)
			target = [target[1], target[0]];
		let delta_error = target[1] / target[0];
		let flipped_dy = 0;
		let error = 0;
		let accumulated_explosion_block = 0;
		// alright, time to cast a ray!
		for(let flipped_dx = 0; flipped_dx <= target[0]; flipped_dx++) {
			let dx = flip_xy ? flipped_dy : flipped_dx;
			if(flip_x)
				dx = -dx;
			let dy = flip_xy ? flipped_dx : flipped_dy;
			if(flip_y)
				dy = -dy;
			let tile = dim.location(x0 + dx, y0 + dy, z0);
			if(explosion_block_cache.has(tile)) {
				// This tile has already been done, add explosion block and move on
				accumulated_explosion_block += explosion_block_cache.get(tile);
			} else {
				// first check if it's too far away
				let dist = accumulated_explosion_block + Math.sqrt((dx*dx)+(dy*dy)) - 0.5;
				if(dist > max_range)
					break; // we don't need to cast any more rays.
				let this_explosion_block = 0;
				for(let obj of tile.partial_contents) {
					if(has_component(obj, "Tangible"))
						this_explosion_block += obj.c.Tangible.explosion_block;
				}
				accumulated_explosion_block += this_explosion_block;
				dist += this_explosion_block;
				explosion_block_cache.set(tile, this_explosion_block);
				if(dist > max_range)
					break;
				let explode_power = combat_defines.EXPLODE_NONE;
				if(dist < devastation_range)
					explode_power = combat_defines.EXPLODE_DEVASTATE;
				else if(dist < heavy_impact_range)
					explode_power = combat_defines.EXPLODE_HEAVY;
				else if(dist < light_impact_range)
					explode_power = combat_defines.EXPLODE_LIGHT;

				if(explode_power > combat_defines.EXPLODE_NONE) {
					let sorted_contents = [...tile.contents];
					sorted_contents.sort((a,b) => {return b.layer - a.layer;});
					for(let obj of sorted_contents) {
						if(has_component(obj, "Tangible"))
							obj.c.Tangible.ex_act(explode_power);
					}
				}
			}
			error += delta_error;
			if(error >= 0.5) {
				flipped_dy++;
				error--;
			}
		}
	}
}

module.exports = explosion;
