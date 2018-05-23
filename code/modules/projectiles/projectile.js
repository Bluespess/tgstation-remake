'use strict';
const {Component} = require('bluespess');
const pass_flags = require('../../defines/pass_flags');

class Projectile extends Component.Networked {
	constructor(atom, template) {
		super(atom, template);
		this.add_networked_var("angle");
		this.add_networked_var("speed");
		this.add_networked_var("nondirectional_sprite");
		this.add_networked_var("fired");
		this.add_networked_var("paused");
		this.add_networked_var("last_process");
		this.process = this.process.bind(this);
		this.process_timer = null;
		this.last_process = -1;
	}

	fire(angle/*, direct_target*/) {
		if(angle != undefined)
			this.angle = angle + (Math.random() - 0.5) * 2 * this.spread;
		else
			this.angle = this.angle || 0;
		this.paused = false;
		if(!this.process_timer) {
			this.process_timer = setInterval(this.process, 50);
		}
		this.last_process = this.a.server.now();
	}

	process() {
		if(this.paused) {
			this.last_process = -1;
			return;
		}
		let now = this.a.server.now();
		if(this.last_process == -1) {
			this.last_process = now;
			return;
		}
		let dt = now - this.last_process;
		this.last_process = now;

		let dist_to_move = this.speed * dt / 1000;
		let rad_angle = this.angle * Math.PI / 180;
		this.a.move(Math.cos(rad_angle) * dist_to_move, Math.sin(rad_angle) * dist_to_move, "projectile");
		this.range -= dist_to_move;
		if(this.range <= 0) {
			this.a.destroy();
			return;
		}
	}

	destroy() {
		if(this.process_timer)
			clearInterval(this.process_timer);
		super.destroy();
	}
}

Projectile.template = {
	vars: {
		components: {
			"Projectile": {
				hitsound: 'sound/weapons/pierce.ogg',
				hitsound_wall: null,

				def_zone: "",
				firer: null,
				suppressed: false,
				speed: 12.5, // This is in tiles per second. BYOND does deciseconds per 33/32 of a tile (yes really look at the code it's stupid and someone from tg needs to learn basic math)
				// To convert from BYOND to this engine just do 10 / (speed) and ignore the fact that it's in 33/32 of a tile actually.
				// Also, speed 0 in BYOND is equivalent to 100 tiles per second here. So do that.
				angle: 0,
				spread: 0, // amount (in degrees) of projectile spread. Halve the value from BYOND though, because tgcoders are idiots.
				nondirectional_sprite: false,

				damage: 10,
				damage_type: "brute",
				no_damage: false,
				flag: "bullet", // Defines what armor to use when it hits things.  Must be set to bullet, laser, energy,or bomb
				status_effects: {}, // Example: {"Knockdown": {delay: 3000}}

				fired: false,
				paused: false,
				range: 50 //Autodeletes projectile after this many tiles have been moved to stop the forever-moving bullet.
			}
		},
		name: "projectile",
		icon: 'icons/obj/projectiles.png',
		icon_state: "bullet",
		layer: 3,
		density: 0,
		pass_flags: pass_flags.PASSTABLE,
		mouse_opacity: 0,
		bounds_x: 0.375,
		bounds_y: 0.375,
		bounds_width: 0.125,
		bounds_height: 0.125
	}
};

module.exports.components = {Projectile};
