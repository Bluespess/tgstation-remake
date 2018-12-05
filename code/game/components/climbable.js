'use strict';
const {Component, has_component, visible_message, chain_func} = require('bluespess');

class Climbable extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.climbers = [];
		this.a.on("mouse_dropped_by", this.mouse_dropped_by.bind(this));
		this.a.can_be_crossed = chain_func(this.a.can_be_crossed, this.can_be_crossed.bind(this));
	}

	can_be_crossed(prev, atom, dx, dy, reason) {
		if(reason == "climb")
			return true;
		return prev();
	}

	mouse_dropped_by(e) {
		let user = e.mob;
		let from = e.from.atom;
		if(from && from == user && has_component(user, "MobInventory") && has_component(user, "CarbonMob") && user.c.Tangible.adjacent(this.a) && !user.c.LivingMob.nomove_counter) {
			visible_message`<span class='warning'>The ${user} starts climbing onto the ${this.a}.</span>`
				.self`<span class='notice'>You start climbing onto the ${this.a}...</span>`
				.emit_from(user);
			let adjusted_climb_time = this.climb_time;
			this.climbers.push(user);
			user.c.MobInventory.do_after({delay: adjusted_climb_time,target: [user, this.a]}).then(success => {
				let idx = this.climbers.indexOf(user);
				if(idx != -1) this.climbers.splice(idx, 1);
				if(!success)
					return;
				visible_message`<span class='warning'>The ${user} climbs onto the ${this.a}.</span>`
					.self`<span class='notice'>You climb onto the ${this.a}...</span>`
					.emit_from(user);
				let glide_length = Math.max(Math.abs(this.a.x - user.x), Math.abs(this.a.y - user.y));
				let stun_delay = this.climb_stun;
				if(!stun_delay) {
					user.glide_size = 4;
				} else {
					user.glide_size = glide_length * 1000 / stun_delay;
					user.walk_delay = stun_delay;
				}
				user.move(this.a.x - user.x, this.a.y - user.y, "climb");

				if(stun_delay)
					user.c.LivingMob.apply_effect("Stun", {delay: stun_delay});
			});
		}
	}
}

Climbable.loadBefore = ["Tangible"];
Climbable.depends = ["Tangible"];

Climbable.template = {
	vars: {
		components: {
			"Climbable": {
				climb_time: 2000,
				climb_stun: 2000
			}
		}
	}
};

module.exports.components = {Climbable};
