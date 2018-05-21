'use strict';

const {sleep, dir_dx, dir_dy} = require('bluespess');
const _ = require('underscore');

class EffectSystem {
	constructor(server, n = 3, c = false, loc) {
		this.server = server;
		if(n > 10)
			n = 10;
		this.number = n;
		this.cardinals = c;
		if(!loc || loc.is_base_loc)
			this.location = loc;
		else
			this.location = loc.base_loc;
		this.total_effects = 0;
		this.holder = null;
	}

	start() {
		for(let i = 0; i < this.number; i++) {
			if(this.total_effects > 20)
				return;
			this.generate_effect();
		}
	}

	async generate_effect() {
		if(this.holder)
			this.location = this.holder.base_loc;
		var effect = this.create_effect_atom(this.location);
		effect.glide_size = 2;
		this.total_effects++;
		var dir;
		if(this.cardinals)
			dir = _.sample([1,2,4,8]);
		else
			dir = _.sample([1,2,4,8,5,6,9,10]);

		var steps_amt = _.random(1, 3);
		for(var j = 0; j < steps_amt; j++) {
			await sleep(500);
			effect.move(dir_dx(dir), dir_dy(dir), "effect");
		}
		await sleep(2000);
		this.total_effects--;
	}

	create_effect_atom() {

	}
}

module.exports = EffectSystem;
