'use strict';
var {Component, to_chat} = require('bluespess');
class Tangible extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.fingerprints = [];
		this.fingerprints_hidden = [];
		this.pullers = [];
		this.a.on("bumped_by", this.bumped_by.bind(this));
		this.last_high_pressure_movement_air_cycle = 0;
	}

	bumped_by(atom, offsetx, offsety, reason) {
		if(!this.anchored && (reason == "walking" || reason == "bumped")) {
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

	ex_act() {

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
				pressure_resistance: 10
			}
		}
	}
};

class Examine extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("clicked", this.clicked.bind(this));
	}

	clicked(e) {
		if(e.shiftKey && e.mob)
			this.examine(e.mob);
	}

	examine(user) {
		to_chat`That's a ${this.a}`(user);
		if(this.desc)
			to_chat(user, this.desc);
	}
}

module.exports.components = {Tangible, Examine};
