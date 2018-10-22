'use strict';
const {Component, Sound, Atom, chain_func, format_html, visible_message, has_component} = require('bluespess');
const _ = require('underscore');
const GasMixture = require('../../../modules/atmospherics/gasmixtures/gas_mixture');
const Mind = require('../mind/mind.js');
const combat_defines = require('../../../defines/combat_defines.js');
const mob_defines = require('../../../defines/mob_defines.js');
const {random_zone} = require('./carbon/body_parts/helpers.js');

const _stat = Symbol('_stat');

const status_effects = {};

class LivingMob extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.damages = {};
		this.effects = {};

		this.add_damage_type("brute");
		this.add_damage_type("burn");
		this.add_damage_type("oxy");
		this.add_damage_type("tox");
		this.add_damage_type("clone");

		this.mind = null;

		this.a.c.Mob.on("client_changed", this.client_changed.bind(this));
		this.a.c.Mob.can_interact_with_panel = this.can_interact_with_panel.bind(this);
		this.a.c.Tangible.experience_pressure_difference = chain_func(this.a.c.Tangible.experience_pressure_difference, this.experience_pressure_difference.bind(this));
		this.a.c.Tangible.attacked_by = this.attacked_by.bind(this);
		this.a.c.Tangible.bullet_act = this.bullet_act.bind(this);
		this.a.c.Tangible.on("throw_finished", this.throw_finished.bind(this));
		this.a.c.Tangible.on("throw_impacted_by", this.throw_impacted_by.bind(this));
		this.a.c.SpeechEmitter.build_message = chain_func(this.a.c.SpeechEmitter.build_message, this.build_message.bind(this));
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.can_be_crossed = chain_func(this.a.can_be_crossed, this.can_be_crossed.bind(this));
		this.a.move = chain_func(this.a.move, this.move.bind(this));
		this.on("health_changed", this.health_changed.bind(this));
		this.life_timeout = null;
		if(this.stat != combat_defines.DEAD) {
			this.life_timeout = setTimeout(this.run_life.bind(this), 2000);
		}
		this.life_cycle_num = 0;
	}

	add_damage_type(name) {
		let damage_obj = {
			val: 0,
			get: () => {
				return damage_obj.val;
			},
			set: (newval, {health_event = true, force = false} = {}) => {
				if((this.status_flags & combat_defines.GODMODE) &&  !force)
					return false;
				newval = Math.max(0, newval);
				if(newval == damage_obj.val)
					return;
				damage_obj.val = newval;
				this.emit("damage_changed", name);
				if(health_event)
					this.emit("health_changed");
			},
			adjust: (amount, props) => {
				damage_obj.set(damage_obj.get() + amount, props);
			}
		};
		this.damages[name] = damage_obj;
	}

	get_damage(name) {
		let damage = this.damages[name];
		if(damage)
			return damage.get();
		return 0;
	}

	set_damage(name, val, props) {
		let damage = this.damages[name];
		if(damage) {
			damage.set(val, props);
			return true;
		}
		return false;
	}

	adjust_damage(name, val, props) {
		let damage = this.damages[name];
		if(damage) {
			damage.adjust(val, props);
			return true;
		}
		return false;
	}

	get health() {
		let h = this.max_health;
		for(let damage_obj of Object.values(this.damages)) {
			if(damage_obj && damage_obj.get)
				h -= damage_obj.get();
		}
		return h;
	}

	get stat() {
		return this[_stat] || 0;
	}

	set stat(val) {
		let oldstat = this.stat;
		if(val == oldstat)
			return false;
		this[_stat] = val;
		this.emit("stat_changed", oldstat, val);
		if(val >= combat_defines.UNCONSCIOUS && oldstat < combat_defines.UNCONSCIOUS) {
			this.nomove_counter++;
			this.a.c.MobInteract.nointeract_counter++;
		} else if(val < combat_defines.UNCONSCIOUS && oldstat >= combat_defines.UNCONSCIOUS) {
			this.nomove_counter--;
			this.a.c.MobInteract.nointeract_counter--;
		}
		if(val == combat_defines.DEAD && this.life_timeout) {
			clearTimeout(this.life_timeout);
			this.life_timeout = null;
		} else if(val != combat_defines.DEAD && !this.life_timeout) {
			this.life_timeout = setTimeout(this.run_life.bind(this), 2000);
		}
	}

	get in_crit() {
		return this.health <= combat_defines.HEALTH_THRESHOLD_CRIT && (this.stat == combat_defines.SOFT_CRIT || this.stat == combat_defines.UNCONSCIOUS);
	}

	get in_full_crit() {
		return this.health <= combat_defines.HEALTH_THRESHOLD_FULLCRIT && this.stat == combat_defines.UNCONSCIOUS;
	}

	health_changed() {
		this.update_stat();
	}

	update_stat() {
	}

	//DAMAGE
	apply_damage(damage = 0, damagetype = "brute", def_zone, blocked = this.run_armor_check(def_zone, "melee")) {
		var hit_percent = (100-blocked)/100;
		if(!damage || (hit_percent <= 0))
			return false;
		this.adjust_damage(damagetype, damage * hit_percent);
		return true;
	}

	apply_damages(damages, def_zone, blocked) {
		if(blocked >= 100)
			return false;
		for(var key in damages) {
			if(!damages.hasOwnProperty(key))
				continue;
			this.apply_damage(damages[key], key, def_zone, blocked);
		}
		return true;
	}

	run_life() {
		this.life_timeout = null;
		this.life_cycle_num++;
		this.life(this.life_cycle_num);
		if(this.stat != combat_defines.DEAD && !this.life_timeout)
			this.life_timeout = setTimeout(this.run_life.bind(this), 2000);
	}

	life() {
	}

	movement_delay() {
		if(this.a.c.MobInteract.move_mode == mob_defines.MOVE_INTENT_WALK){
			return 400;
		}
		else {
			return 150;
		}
	}

	client_changed(old_client, new_client) {
		if(new_client) {
			if(!this.mind) {
				let mind = new Mind(new_client.key);
				mind.transfer_to(this.a);
			}
		}
	}

	ghostize(can_reenter_corpse = true) {
		let ghost = new Atom(this.a.server, {components: ["Ghost"]});
		ghost.loc = this.a.base_mover.fine_loc;
		ghost.c.Ghost.mind = this.mind;
		ghost.c.Mob.key = this.a.c.Mob.key;
		ghost.c.Ghost.can_reenter_corpse = can_reenter_corpse;
	}

	move(prev, dx, dy, reason) {
		if(reason != "walking")
			return prev();

		if(this.stat == combat_defines.DEAD) {
			this.ghostize(true);
			return;
		}

		if(this.incapacitated())
			return;

		this.a.walk_delay = this.movement_delay();

		if(has_component(this.a.loc, "MovementProxy")) {
			this.a.loc.c.MovementProxy.emit("child_moved", this.a, dx, dy);
			return;
		}
		return prev();
	}

	build_message(prev) {
		let msg = prev();
		if(msg.message.startsWith(";")) {
			msg.mode = "radio";
			msg.range = 1;
			msg.message = msg.message.substring(1);
		}

		if(this.stat >= combat_defines.UNCONSCIOUS)
			return null;

		if(!msg.message || !msg.message.length)
			return null;
		return msg;
	}

	incapacitated() {
		if(this.nomove_counter)
			return true;
		return false;
	}

	can_interact_with_panel(target) {
		return target.z == this.a.z && target.dim == this.a.dim && Math.max(Math.abs(target.x - this.a.x), Math.abs(target.y - this.a.y)) < 1;
	}

	experience_pressure_difference(prev, difference) {
		new Sound(this.a.server, {path: 'sound/effects/space_wind.ogg', vary: true, volume: Math.min(difference / 100, 1)}).play_to(this.a);
		prev();
	}

	can_be_crossed(prev, mover, dx, dy, reason) {
		if((mover.density < 1 || this.a.density < 1) && reason != "throw" && reason != "projectile")
			return true;
		return prev();
	}

	throw_finished() {
		this.a.x = Math.round(this.a.x);
		this.a.y = Math.round(this.a.y);
	}

	attack_by(prev, item, user) {
		user.c.MobInteract.change_next_move(combat_defines.CLICK_CD_MELEE);
		return prev() || item.c.Item.attack(this.a, user);
	}

	throw_impacted_by(item) {
		if(!has_component(item, "Item")) {
			new Sound(this.a.server, {path: 'sound/weapons/genhit.ogg', volume: 0.5, vary: true}).emit_from(this.a);
			return;
		}
		let zone = random_zone("chest", 65);
		let volume = 0;
		if(item.c.Tangible.throw_force && item.c.Item.size)
			volume = Math.min(Math.max((item.c.Tangible.throw_force + item.c.Item.size) * 0.05, 0.3), 1);
		else if(item.c.Item.size)
			volume = Math.min(Math.max((item.c.Item.size) * 0.08, 0.2), 1);
		else
			return;
		if(item.c.Tangible.throw_force > 0) {
			let sound = item.c.Tangible.throwhitsound || item.c.Item.hitsound || 'sound/weapons/genhit.ogg';
			if(!item.c.Tangible.throw_force)
				sound = 'sound/weapons/throwtap.ogg';
			new Sound(this.a.server, {path: sound, volume, vary: true}).emit_from(this.a);
		}
		visible_message`<span class='danger'>The ${this.a} has been hit by the ${item}.</span class='danger'>`
			.self`<span class='userdanger'>The ${this.a} been hit by the ${item}.</span>`
			.emit_from(this.a);
		this.apply_damage(item.c.Tangible.throw_force, item.c.Item.damage_type, zone);
	}

	attacked_by(item, user) {
		let zone = random_zone(user.c.MobInteract.zone_sel);
		let bp = has_component(this.a, "MobBodyParts") && (this.a.c.MobBodyParts.limbs[zone] || this.a.c.MobBodyParts.limbs.chest);
		this.send_item_attack_message(item, user, bp && bp.name);
		if(item.c.Item.force) {
			this.apply_damage(item.c.Item.force, item.c.Item.damage_type, zone);
			return true; // successful attack
		}
	}

	send_item_attack_message(item, user, hit_area) {
		var message_verb = "attacked";
		if(item.c.Item.attack_verb && item.c.Item.attack_verb.length) {
			message_verb = format_html`${_.sample(item.c.Item.attack_verb)}`;
		} else if(!item.c.Item.force) {
			return;
		}
		var message_hit_area = "";
		if(hit_area)
			message_hit_area = format_html` in the ${hit_area}`;
		var attack_message = `${format_html`The ${this.a}`} has been ${message_verb}${message_hit_area} with ${format_html`the ${item}`}.`;
		if(this.a.c.Hearer.in_view(user))
			attack_message = `${format_html`The ${user}`} has ${message_verb} ${format_html`the ${this.a}`}${message_hit_area} with ${format_html`the ${item}`}!`;
		visible_message(`<span class='danger'>${attack_message}</span class='danger'>`)
			.self(`<span class='userdanger'>${attack_message}</span>`)
			.range(combat_defines.COMBAT_MESSAGE_RANGE)
			.emit_from(this.a);
		return true;
	}

	apply_effect(name, props = {}) {
		(new (status_effects[name])()).apply_to(this.a, props);
	}

	get environment() {
		let environment;
		if(this.a.base_loc && this.a.base_loc.turf) {
			environment = this.a.base_loc.turf.c.Turf.air;
			this.a.server.air_controller.add_to_active(this.a.base_loc.turf);
		}
		if(!environment)
			environment = new GasMixture();
		return environment;
	}

	adjust_effect(name, amount) {
		let effect = this.effects[name];
		if(!effect) {
			(new (status_effects[name])()).apply_to(this.a, {});
			effect = this.effects[name];
		}
		if(!effect)
			return;
		effect.adjust(amount);
	}
}

Object.assign(LivingMob.prototype, require('./living_defense.js'));

LivingMob.depends = ["Mob", "Tangible", "MobInteract", "MobHud", "SpeechHearer", "SpeechEmitter"];
LivingMob.loadBefore = ["Mob", "Tangible", "MobInteract", "MobHud", "SpeechHearer", "SpeechEmitter"];

LivingMob.template = {
	vars: {
		components: {
			LivingMob: {
				status_flags: combat_defines.CANSTUN|combat_defines.CANWEAKEN|combat_defines.CANPARALYSE|combat_defines.CANPUSH,
				max_health: 100,
				stat: combat_defines.CONSCIOUS,
				nomove_counter: 0,
				mob_size: mob_defines.MOB_SIZE_HUMAN
			},
			"Tangible": {
				throw_force: 10
			}
		},
		name: "",
		density: 1
	}
};

class MovementProxy extends Component {}

function add_effects(mod = {}) {
	if(mod.status_effects) {
		Object.assign(status_effects, mod.status_effects);
	}
}

add_effects(require('./effects/incapacitating.js'));

module.exports.components = {LivingMob, MovementProxy};
