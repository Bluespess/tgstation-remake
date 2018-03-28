'use strict';

const {Component, has_component} = require('bluespess');

const _pulling = Symbol('_pulling');

class Puller extends Component {
	constructor(atom, template) {
		super(atom, template);
		this[_pulling] = null;
		this.a.on("before_move", this.before_move.bind(this));
		this.a.on("moved", this.moved.bind(this));
		if(this.a.c.Mob)
			this.a.c.Mob.on("ctrl_click_on", this.ctrl_click_on.bind(this));
	}

	ctrl_click_on(e) {
		if(e.atom) {
			if(this.pulling == e.atom)
				this.pulling = null;
			else
				this.pulling = e.atom;
		}
	}

	can_pull(target) {
		return target != this.a && has_component(target, "Tangible") && !target.c.Tangible.anchored
			&& this.a.z == target.z && Math.max(Math.abs(this.a.x - target.x), Math.abs(this.a.y - target.y)) <= 1.50001
			&& this.a.loc && this.a.loc.is_base_loc && target.loc && target.loc.is_base_loc;
	}

	before_move() {
		this.pulling = this.pulling; // refresh the pullability;
	}

	moved(movement) {
		if(this[_pulling] == null || !this.a.loc || !this.a.loc.is_base_loc || !this.pulling.loc || !this.pulling.loc.is_base_loc
			|| !movement.offset || movement.offset.z != 0 || this[_pulling] == null)
			return;
		var oldx = this.a.x - movement.offset.x;
		var oldy = this.a.y - movement.offset.y;
		if(Math.abs(this[_pulling].x - this.a.x) > 2.50001 || Math.abs(this[_pulling].y - this.a.y) > 2.50001) {
			this.pulling = null;
			return;
		}
		// no diagonal drags if you don't need it
		if(Math.abs(this[_pulling].x - oldx) < 0.00001 && Math.abs(this[_pulling].y - oldy) < 0.00001 && Math.abs(this[_pulling].x - this.a.x) <= 1.50001 && Math.abs(this[_pulling].y - this.a.y) <= 1.50001) {
			return;
		}
		// No pulls if moving toward object
		if((Math.abs(this[_pulling].x - this.a.x) + Math.abs(this[_pulling].y - this.a.y)) < (Math.abs(this[_pulling].x - oldx) + Math.abs(this[_pulling].y - oldy))) {
			return;
		}
		this.pulling.glide_size = this.a.glide_size;
		this.pulling.move(oldx - this.pulling.x, oldy - this.pulling.y, "pulled");
	}

	get pulling() {
		return this[_pulling];
	}

	set pulling(val) {
		if(val != null && !this.can_pull(val)) {
			if(val != this[_pulling])
				return;
			val = null;
		}
		if(val == this[_pulling])
			return;
		this[_pulling] = val;
		this.emit("pulling_changed", val);
	}
}

Puller.loadBefore = ["Mob"];

module.exports.components = {Puller};
