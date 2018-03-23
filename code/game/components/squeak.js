'use strict';
const {Component, Sound, has_component, chain_func} = require('bluespess');

class Squeak extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.play_squeak = this.play_squeak.bind(this);
		this.step_squeak = this.step_squeak.bind(this);
		this.use_squeak = this.use_squeak.bind(this);
		this.a.on("crossed_by", this.play_squeak);
		if(has_component(this.a, "Item")) {
			this.a.c.Item.attack = chain_func(this.a.c.Item.attack, this.play_squeak);
			this.a.c.Item.attack_obj = chain_func(this.a.c.Item.attack_obj, this.play_squeak);
			this.a.c.Item.attack_self = chain_func(this.a.c.Item.attack_self, this.use_squeak);
			this.a.c.Item.on("equipped", this.equipped.bind(this));
			this.a.c.Item.on("unequipped", this.unequipped.bind(this));
		}
	}

	play_squeak(prev) {
		if(Math.random() < this.squeak_chance)
			new Sound(this.a.server, {path: this.squeak_sounds[Math.floor(Math.random() * this.squeak_sounds.length)], vary: true, volume: this.volume});
		if(typeof prev == "function")
			return prev();
	}

	step_squeak() {
		if(this.steps > this.step_delay) {
			this.play_squeak();
			this.steps = 0;
		} else {
			this.steps++;
		}
	}

	use_squeak(prev) {
		if(this.last_use + this.use_delay < this.a.server.now()) {
			this.last_use = this.a.server.now();
			this.play_squeak();
		}
		if(typeof prev == "function")
			return prev();
	}

	equipped(slot) {
		if(slot.id == "shoes")
			slot.mob.on("moved", this.step_squeak);
	}
	unequipped(slot) {
		slot.mob.removeListener("moved", this.step_squeak);
	}
}
Squeak.loadBefore = ["Item"];

Squeak.template = {
	vars: {
		components: {
			"Squeak": {
				squeak_sounds: ['sound/items/toysqueak1.ogg', 'sound/items/toysqueak2.ogg', 'sound/items/toysqueak3.ogg'],
				squeak_chance: 1,
				volume: 0.3,

				steps: 0,
				step_delay: 1,

				last_use: 0,
				use_delay: 2000
			}
		}
	}
};

module.exports.components = {Squeak};
