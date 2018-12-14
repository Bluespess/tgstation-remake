'use strict';
const {Component, chain_func} = require('bluespess-client');

class TransitHelper extends Component {
	constructor(atom, template) {
		super(atom, template);
		let target_vel = 150;
		this.target_dx = 0;
		this.target_dy = 0;
		if(this.a.dir & 1)
			this.target_dy += target_vel;
		if(this.a.dir & 2)
			this.target_dy -= target_vel;
		if(this.a.dir & 4)
			this.target_dx += target_vel;
		if(this.a.dir & 8)
			this.target_dx -= target_vel;
		this.a.get_plane_id = ()=>{return "parallax";};
		this.a.del = chain_func(this.a.del, this.del.bind(this));
		this.a.on_render_tick = this.on_render_tick.bind(this);
		this.a.draw = ()=>{};
	}

	on_render_tick(timestamp) {
		let plane = this.a.get_plane();
		if(this.last_timestamp && plane && plane.parallax_velocity != null) {
			let dt = timestamp - this.last_timestamp;
			if(plane.parallax_velocity[0] > this.target_dx) {
				plane.parallax_velocity[0] = Math.max(plane.parallax_velocity[0] - dt / 10, this.target_dx);
			}
			if(plane.parallax_velocity[1] > this.target_dy) {
				plane.parallax_velocity[1] = Math.max(plane.parallax_velocity[1] - dt / 10, this.target_dy);
			}
			if(plane.parallax_velocity[0] < this.target_dx) {
				plane.parallax_velocity[0] = Math.min(plane.parallax_velocity[0] + dt / 10, this.target_dx);
			}
			if(plane.parallax_velocity[1] < this.target_dy) {
				plane.parallax_velocity[1] = Math.min(plane.parallax_velocity[1] + dt / 10, this.target_dy);
			}
		}
		this.last_timestamp = timestamp;
	}

	del(prev) {
		let plane = this.a.get_plane();
		if(plane)
			plane.parallax_velocity = [0,0];
		prev();

	}
}

module.exports.components = {TransitHelper};
