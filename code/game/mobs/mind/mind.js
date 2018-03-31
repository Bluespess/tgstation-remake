'use strict';
const {has_component} = require('bluespess');
const {EventEmitter} = require('events');

class Mind extends EventEmitter {
	constructor(key) {
		super();
		this.key = key;
		this.current = null;
	}

	transfer_to(new_character) {
		if(!has_component(new_character, "LivingMob"))
			throw new TypeError(`New character ${new_character} is not a living mob!`);
		let old_character = this.current;
		if(this.current) {
			this.current.c.LivingMob.mind = null;
		}
		if(this.key) {
			if(new_character.c.Mob.key != this.key)
				new_character.c.LivingMob.ghostize(true);
		} else {
			this.key = new_character.c.Mob.key;
		}

		if(new_character.c.LivingMob.mind)
			new_character.c.LivingMob.mind.current = null;

		this.current = new_character;
		new_character.c.LivingMob.mind = this;
		new_character.c.Mob.key = this.key;
		this.emit("transferred", old_character);
	}
}

module.exports = Mind;
