'use strict';
const {Component, has_component, to_chat, sleep} = require('bluespess');
const pass_flags = require('../../defines/pass_flags.js');

class Tangible extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.fingerprints = [];
		this.fingerprints_hidden = [];
		this.pullers = [];
		this.a.on("bumped_by", this.bumped_by.bind(this));
		this.last_high_pressure_movement_air_cycle = 0;
	}

	bumped_by(atom, offsetx, offsety) {
		if(!this.anchored && has_component(atom, "LivingMob")) {
			this.a.glide_size = atom.glide_size;
			this.a.move(Math.sign(offsetx), Math.sign(offsety), "bumped");
		}
	}

	experience_pressure_difference(difference, dx, dy, pressure_resistance_prob_delta = 0) {
		const PROBABILITY_OFFSET = 25;
		const PROBABILITY_BASE_PERCENT = 75;
		if(this.anchored)
			return false;
		if(this.last_high_pressure_movement_air_cycle < this.a.server.air_controller.ticknum) {
			var move_prob = 100;
			if(this.pressure_resistance > 0) {
				move_prob = (difference / this.pressure_resistance * PROBABILITY_BASE_PERCENT) - PROBABILITY_OFFSET;
			}
			move_prob += pressure_resistance_prob_delta;
			if(move_prob > PROBABILITY_OFFSET && (Math.random() * 100 < move_prob)) {
				this.a.glide_size = 2;
				this.a.move(dx, dy, "pressure_difference");
				this.last_high_pressure_movement_air_cycle = this.a.server.air_controller.ticknum;
			}
		}
	}

	async throw_at({target, range = this.throw_range, speed = this.throw_speed} = {}) {
		try {
			if(!target)
				return;
			this.stop_throw();

			let dist_traveled = 0;
			let last_move = this.a.server.now();
			let still_throwing = true;
			this.a.pass_flags |= pass_flags.LETPASSTHROW;

			this.stop_throw = () => {
				this.a.removeListener("bumped", throw_impact);
				this.a.removeListener("bumped_by", this.stop_throw);
				still_throwing = false;
				this.a.pass_flags &= ~(pass_flags.LETPASSTHROW);
				this.stop_throw = function(){};
			};

			let throw_impact = (target) => {
				this.stop_throw();
				if(speed > 0.5) {
					if(has_component(target, "Tangible"))
						target.c.Tangible.emit("throw_impacted_by", this.a);
					this.emit("throw_impacted", target);
				}
			};

			this.a.on("bumped", throw_impact);
			this.a.on("bumped_by", this.stop_throw);

			let dx, dy;

			if(typeof target == "number") {
				dx = Math.cos(target);
				dy = Math.sin(target);
			} else if(target.x === +target.x && target.y === +target.y) {
				dx = target.x - this.a.x;
				dy = target.y - this.a.y;
				let dist = Math.sqrt(dx*dx + dy*dy);
				dx /= dist;
				dy /= dist;
				range = Math.min(range, dist);
			} else if(target.dx === +target.dx && target.dy === +target.dy) {
				dx = target.dx;
				dy = target.dy;
				let dist = Math.sqrt(dx*dx + dy*dy);
				dx /= dist;
				dy /= dist;
			}

			while(still_throwing) {
				let delta = this.a.server.now() - last_move;
				last_move = this.a.server.now();
				this.a.glide_size = speed * 10;
				let to_move = speed * delta * 0.01;
				if(dist_traveled < range - 0.001) {
					to_move = Math.min(to_move, range - dist_traveled);
				}
				let [oldx, oldy] = [this.a.x, this.a.y];
				this.a.move(dx*to_move, dy*to_move, "throw");
				let this_dx = this.a.x - oldx;
				let this_dy = this.a.y - oldy;
				dist_traveled += Math.sqrt(this_dx*this_dx + this_dy*this_dy);
				let dist_covered_delay = (range > dist_traveled) ? (range - dist_traveled) * 100 / (speed) : 123456789;
				await sleep(Math.max(Math.min(dist_covered_delay, 50), 1));
				if(dist_traveled >= range - 0.001) {
					this.stop_throw();
				}
			}

		} catch(e) {
			console.error(e);
			this.stop_throw();
		}
		this.emit("throw_finished");
	}

	bullet_act(projectile, def_zone) {
		return projectile.c.Projectile.hit(this.a, 0, def_zone);
	}

	stop_throw() {} // This only has actual code once throw_at is called

	drop_location() {
		return this.a.loc;
	}

	ex_act() {

	}

	do_attack_animation() {
		//later
	}

	attacked_by() {
		// This is basically for legit attacks
	}

	adjacent(target) {
		return Math.abs(target.x - this.a.x) <= 1.50001 && Math.abs(target.y - this.a.y) <= 1.50001;
	}
	can_reach(target) {
		return this.adjacent(target);
	}
}

Tangible.depends = ["Examine"];
Tangible.loadBefore = ["Examine"];

Tangible.LAVA_PROOF = -2;
Tangible.FIRE_PROOF = -1;
Tangible.FLAMMABLE = 0;
Tangible.ON_FIRE = 1;

Tangible.template = {
	vars: {
		components: {
			Tangible: {
				anchored: false,
				unacidable: false,
				throw_speed: 2,
				throw_range: 7,
				throw_force: 0,
				burn_state: Tangible.FIRE_PROOF, // LAVA_PROOF, FIRE_PROOF, FLAMMABLE, or ON_FIRE
				burn_time: 10, // How long it takes to burn to ashes, in seconds
				pressure_resistance: 10,
				explosion_block: 0,
			}
		}
	}
};

class Examine extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("shift_clicked", this.shift_clicked.bind(this));
	}

	shift_clicked(e) {
		if(e.mob)
			this.examine(e.mob);
	}

	examine(user) {
		to_chat`That's a ${this.a}`(user);
		if(this.desc)
			to_chat(user, this.desc);
	}
}

module.exports.components = {Tangible, Examine};
