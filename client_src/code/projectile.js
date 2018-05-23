'use strict';
const {Component, chain_func} = require('bluespess-client');

class Projectile extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.get_transform = chain_func(this.a.get_transform, this.get_transform.bind(this));
		this.a.get_displacement = chain_func(this.a.get_displacement, this.get_displacement.bind(this));
	}

	get_transform(prev) {
		return prev().rotate((this.angle - 90) * Math.PI / 180);
	}

	get_displacement(prev, timestamp) {
		let dt = timestamp - this.a.client.server_time_to_client - this.last_process;
		let dispx = this.a.x;
		let dispy = this.a.y;
		let dist_to_move = this.speed * dt / 1000;
		let rad_angle = this.angle * Math.PI / 180;
		dispx += Math.cos(rad_angle) * dist_to_move;
		dispy += Math.sin(rad_angle) * dist_to_move;
		return {dispx, dispy};
	}
}

module.exports.components = {Projectile};
