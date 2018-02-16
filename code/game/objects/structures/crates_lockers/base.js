'use strict';
const {Component, Sound, has_component, to_chat, chain_func} = require('bluespess');
const mob_defines = require('../../../../defines/mob_defines.js');

class LargeContainer extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));
		this.a.c.Examine.examine = chain_func(this.a.c.Examine.examine, this.examine.bind(this));

		let do_close = false;
		if(!this.opened) {
			do_close = true;
			this.opened = true;
		} else {
			this.opened = false;
		}
		process.nextTick(() => {
			if(!do_close)
				this.populate_contents();
			if(do_close)
				this.close();
			else
				this.open();
			if(do_close)
				this.populate_contents();
		});
	}
	populate_contents() {}

	examine(prev, user) {
		prev();
		if(this.a.c.Tangible.anchored)
			to_chat`<span class='notice'>It is <b>bolted</b> to the ground.</span>`(user);
		if(this.opened)
			to_chat`<span class='notice'>The parts are <b>welded</b> together.</span>`(user);
	}

	can_open(user) {
		for(let atom of this.a.crosses()) {
			if(!has_component(atom, "LivingMob"))
				continue;
			if(atom.c.Tangible.anchored || this.horizontal && atom.c.LivingMob.mob_size > mob_defines.MOB_SIZE_TINY && atom.density > 0) {
				if(user)
					to_chat`<span class='danger'>There's something large on top of the ${this.a}, preventing it from opening.</span>`(user);
				return false;
			}
		}
		return true;
	}

	can_close(user) {
		for(let atom of this.a.crosses()) {
			if(!has_component(atom, "LivingMob"))
				continue;
			if(atom.c.Tangible.anchored || this.horizontal && atom.c.LivingMob.mob_size > mob_defines.MOB_SIZE_TINY && atom.density > 0) {
				if(user)
					to_chat`<span class='danger'>There's something large on top of the ${this.a}, preventing it from closing.</span>`(user);
				return false;
			}
		}
		return true;
	}

	dump_contents() {
		let droploc = this.a.c.Tangible.drop_location();
		for(let atom of this.a.contents) {
			atom.loc = droploc;
		}
	}

	take_contents() {
		for(let atom of this.a.crosses()) {
			if(this.insert(atom) == -1)
				break;
		}
	}

	open(user) {
		if(this.opened || !this.can_open(user))
			return;
		new Sound(this.a.server, {path: this.open_sound, volume: 0.15, vary: true}).emit_from(this.a);
		this.opened = true;
		this.a.density = this.dense_when_open ? 1 : 0;
		this.dump_contents();
		return true;
	}

	insert(atom) {
		if(this.a.contents.length >= this.storage_capacity)
			return -1;
		if(has_component(atom, "LivingMob")) {
			if(atom.c.Tangible.anchored)
				return;
			if(atom.c.LivingMob.mob_size > mob_defines.MOB_SIZE_TINY) {
				if(this.horizontal && atom.density > 0)
					return;
				if(atom.c.LivingMob.mob_size > this.max_mob_size)
					return;
				let mobs_stored = 0;
				for(let item of this.a.contents) {
					if(!has_component(item, "LivingMob"))
						continue;
					if(++mobs_stored >= this.mob_storage_capacity)
						return;
				}
			}
		} else if(has_component(atom, "LargeContainer")) {
			return;
		} else if(has_component(atom, "Tangible")) {
			if(!this.allow_objects && !has_component(atom, "Item"))
				return;
			if(!this.allow_dense && atom.density > 0)
				return;
			if(atom.c.Tangible.anchored)
				return;
		} else {
			return;
		}
		atom.loc = this.a;
	}

	close(user) {
		if(!this.opened || !this.can_close(user))
			return;
		this.take_contents();
		new Sound(this.a.server, {path: this.close_sound, volume: 0.15, vary: true}).emit_from(this.a);
		this.opened = false;
		this.a.density = this.dense_when_closed ? 1 : 0;
		return true;
	}

	toggle(user) {
		if(this.opened)
			return this.close(user);
		else
			return this.open(user);
	}

	attack_hand(prev, user) {
		prev();
		this.toggle(user);
	}
}

LargeContainer.depends = ["Destructible"];
LargeContainer.loadBefore = ["Destructible"];

LargeContainer.template = {
	vars: {
		components: {
			"LargeContainer": {
				open_sound: 'sound/machines/click.ogg',
				close_sound: 'sound/machines/click.ogg',
				delivery_icon: "deliverycloset",
				dense_when_open: false,
				dense_when_closed: true,
				max_mob_size: mob_defines.MOB_SIZE_HUMAN,
				horizontal: false,
				mob_storage_capacity: 3,
				storage_capacity: 30,
				allow_objects: false,
				allow_dense: false,
				breakout_time: 120000,
				opened: false
			},
			"Destructible": {
				max_integrity: 200,
				integrity_failure: 50,
				armor: {melee: 20, bullet: 10, laser: 10, energy: 0, bomb: 10, bio: 0, rad: 0, fire: 70, acid: 60}
			}
		},
		density: true,

	}
};

module.exports.components = {LargeContainer};
