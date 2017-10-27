'use strict';

const {Component} = require('bluespess');

const _pulling = Symbol('_pulling');

class Puller extends Component {
	constructor(atom, template) {
		super(atom, template);
		this[_pulling] = null;
		this.atom.on("before_move", this.before_move.bind(this));
		this.atom.on("moved", this.moved.bind(this));
		if(this.atom.components.Mob)
			this.atom.on("click_on", this.click_on.bind(this));
	}

	click_on(e) {
		if(e.ctrlKey && e.atom) {
			if(this.pulling == e.atom)
				this.pulling = null;
			else
				this.pulling = e.atom;
		}
	}

	can_pull(target) {
		return this.atom.server.has_component(target, "Tangible") && !target.components.Tangible.anchored
			&& this.atom.z == target.z && Math.max(Math.abs(this.atom.x - target.x), Math.abs(this.atom.y - target.y)) <= 1;
	}

	before_move(offsetx, offsety) {
		this.pulling = this.pulling; // refresh the pullability;
		if(offsetx == null || offsety == null || this[_pulling] == null)
			return;
	}

	moved(offsetx, offsety) {
		if(offsetx == null || offsety == null || this[_pulling] == null)
			return;
		var oldx = this.atom.x - offsetx;
		var oldy = this.atom.y - offsety;
		if(Math.abs(this[_pulling].x - this.x) > 2.00001 || Math.abs(this[_pulling].y - this.y) > 2.00001) {
			this.pulling = null;
			return;
		}
		// no diagonal drags if you don't need it
		if(this[_pulling].x != oldx && this[_pulling].y != oldy && Math.abs(this[_pulling].x - this.atom.x) <= 1.00001 && Math.abs(this[_pulling].y - this.atom.y) <= 1.00001) {
			return;
		}
		this.pulling.appearance.glide_size = this.atom.appearance.glide_size;
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
