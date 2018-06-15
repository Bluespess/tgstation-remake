'use strict';
const {Component, Sound, chain_func, has_component, to_chat, visible_message} = require('bluespess');
const pass_flags = require('../../defines/pass_flags.js');
const combat_defines = require('../../defines/combat_defines.js');
const {random_zone, parse_zone} = require('../../game/mobs/living/carbon/body_parts/helpers.js');

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
		this.permuted = new Set();
		this.starting = null;
		this.a.can_cross = chain_func(this.a.can_cross, this.can_cross.bind(this));
		this.a.on("bumped", this.bumped.bind(this));
	}

	bumped(target, dx, dy, reason) {
		if(reason != "projectile")
			return;
		if(this.collide(target)) {
			this.a.destroy();
		} else {
			this.permuted.add(target);
			this.a.move(dx, dy, "projectile");
		}
	}

	add_spread(amt) { // Adds spread to the projectile using proper normal distribution math
		this.spread = Math.sqrt(this.spread * this.spread + amt * amt);
	}

	fire(angle/*, direct_target*/) {
		this.starting = [this.a.x, this.a.y];
		if(angle != undefined)
			//Does a Box-Muller transform to make the bullet spread a normal distribution.
			// This is to make it easier to have spread from multiple sources work as you would expect.
			this.angle = angle + (Math.sqrt( -2.0 * Math.log( Math.random() || 0.001 ) ) * Math.cos( 2.0 * Math.PI * Math.random() ) * this.spread);
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

	can_cross(prev, target, dx, dy, reason) {
		if(reason != "projectile")
			return prev();
		if(this.permuted.has(target)) // We've already hit the thing, so let's go through it now.
			return true;
		if(target == this.target && (target.density == 1 || has_component(target, "LivingMob")))
			return false; // We aimed at the thing, so clearly we aimed down on it.
		return prev();
	}

	vol_by_damage() {
		if(this.damage) {
			return Math.min(Math.max(this.damage * 0.0067, 30), 100);
		} else {
			return 50;
		}
	}

	prehit(/*target*/) {
		return true;
	}

	hit(target, blocked = 0, def_zone) {
		if(has_component(target, "Wall") && ["brute", "burn"].includes(this.damage_type) && !this.no_damage && Math.random() < 0.75) {
			// TODO the damage decal
		}
		if(!has_component(target, "LivingMob")) {
			return 0;
		}
		if(blocked < 1) {
			// TODO blood splatter
			let organ_hit_text = "";
			if(has_component(target, "MobBodyParts")) {
				organ_hit_text = ` in the ${parse_zone(target.c.MobBodyParts.limbs[def_zone] ? def_zone : "chest")}`;
			}
			if(this.suppressed) {
				if(this.hitsound)
					new Sound(this.a.server, {path: this.hitsound, volume: 0.05, vary: true}).emit_from(target);
				to_chat`<span class='userdanger'>You're shot by a ${this.a}${organ_hit_text}</span>`(target);
			} else {
				if(this.hitsound)
					new Sound(this.a.server, {path: this.hitsound, volume: this.vol_by_damage(), vary: true}).emit_from(target);
				visible_message`<span class='danger'>The ${target} is hit by a ${this.a}${organ_hit_text}</span>`
					.self`<span class='userdanger'>The ${target} is hit by a ${this.a}${organ_hit_text}</span>`
					.range(combat_defines.COMBAT_MESSAGE_RANGE)
					.emit_from(target);
			}
		}
		return 0;
	}

	collide(target) {
		let dist = Math.sqrt((this.starting[0] - this.a.x) ** 2 + (this.starting[1] - this.a.y) ** 2); // Get the distance between the turf shot from and the mob we hit and use that for the calculations.
		this.def_zone = random_zone(this.def_zone, Math.max(1 - (0.07 * dist), 0.05)); //Lower accurancy/longer range tradeoff. 7 is a balanced number to use.
		if(has_component(target, "Wall") && this.hitsound_wall) {
			let volume = Math.min(Math.max(this.vol_by_damage() + 0.2, 0), 1);
			if(this.suppressed)
				volume = 0.05;
			new Sound(this.a.server, {path: this.hitsound_wall, volume, vary: true}).emit_from(target);
		}

		if(!this.prehit(target)) {
			return false;
		}
		if(!has_component(target, "Tangible"))
			return true;

		let permutation = target.c.Tangible.bullet_act(this.a, this.def_zone);
		if(permutation == -1 || this.force_dodge) {
			return false;
		} else {
			let alt = this.select_target(target);
			if(alt) {
				if(!this.prehit(alt))
					return false;
				if(has_component(alt, "Tangible"))
					alt.c.Tangible.bullet_act(this.a, this.def_zone);
			}
		}

		return true;
	}

	select_target() {
		return;
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
				target: null,
				suppressed: false,
				speed: 12.5, // This is in tiles per second. BYOND does deciseconds per 33/32 of a tile (yes really look at the code it's stupid and someone from tg needs to learn basic math)
				// To convert from BYOND to this engine just do 10 / (speed) and ignore the fact that it's in 33/32 of a tile actually.
				// Also, speed 0 in BYOND is equivalent to 100 tiles per second here. So do that.
				force_dodge: false,
				angle: 0,
				spread: 0, // standard deviation of angle in degrees. Use 1/4 of value from byond for approximately correct value.
				nondirectional_sprite: false,

				damage: 10,
				damage_type: "brute",
				no_damage: false,
				armour_penetration: 0,
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
