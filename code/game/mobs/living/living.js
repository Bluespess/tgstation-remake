'use strict';
const {Component, Sound, chain_func, format_html, visible_message} = require('bluespess');
const combat_defines = require('../../../defines/combat_defines.js');

const _stat = Symbol('_stat');

class LivingMob extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.damages = {};

		this.add_damage_type("brute");
		this.add_damage_type("burn");
		this.add_damage_type("oxy");
		this.add_damage_type("tox");
		this.add_damage_type("clone");

		this.a.c.Mob.can_interact_with_panel = this.can_interact_with_panel.bind(this);
		this.a.c.Tangible.experience_pressure_difference = chain_func(this.a.c.Tangible.experience_pressure_difference, this.experience_pressure_difference.bind(this));
		this.a.c.Tangible.attacked_by = this.attacked_by.bind(this);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.can_be_crossed = chain_func(this.a.can_be_crossed, this.can_be_crossed.bind(this));
		this.a.move = chain_func(this.a.move, this.move.bind(this));
		this.on("health_changed", this.health_changed.bind(this));
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
		} else if(val < combat_defines.UNCONSCIOUS && oldstat >= combat_defines.UNCONSCIOUS) {
			this.nomove_counter--;
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
	apply_damage(damage = 0, damagetype = "brute", def_zone, blocked = 0) {
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

	life() {

	}

	movement_delay() {
		return 150;
	}

	move(prev, dx, dy, reason) {
		if(reason != "walking")
			return prev();

		if(this.incapacitated())
			return;

		this.a.walk_delay = this.movement_delay();

		return prev();
	}

	incapacitated() {
		if(this.nomove_counter)
			return true;
		return false;
	}

	can_interact_with_panel(target) {
		return target.z == this.a.z && Math.max(Math.abs(target.x - this.a.x), Math.abs(target.y - this.a.y)) < 1;
	}

	experience_pressure_difference(prev, difference) {
		new Sound(this.a.server, {path: 'sound/effects/space_wind.ogg', vary: true, volume: Math.min(difference / 100, 1)}).play_to(this.a);
		prev();
	}

	can_be_crossed(prev, mover) {
		if(mover.density < 1 || this.a.density < 1)
			return true;
		return prev();
	}

	attack_by(prev, item, user) {
		user.c.MobInteract.change_next_move(combat_defines.CLICK_CD_MELEE);
		return prev() || item.c.Item.attack(this.a, user);
	}

	attacked_by(item, user) {
		this.send_item_attack_message(item, user);
		if(item.c.Item.force) {
			this.apply_damage(item.c.Item.force, item.c.Item.damage_type);
			return true; // successful attack
		}
	}

	send_item_attack_message(item, user, hit_area) {
		var message_verb = "attacked";
		if(item.c.Item.attack_verb && item.c.Item.attack_verb.length) {
			message_verb = format_html`${item.c.Item.attack_verb[Math.floor(Math.random() * item.c.Item.attack_verb.length)]}`;
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
}

LivingMob.depends = ["Mob", "Tangible", "MobInteract"];
LivingMob.loadBefore = ["Mob", "Tangible", "MobInteract"];

LivingMob.template = {
	vars: {
		components: {
			LivingMob: {
				status_flags: combat_defines.CANSTUN|combat_defines.CANWEAKEN|combat_defines.CANPARALYSE|combat_defines.CANPUSH,
				max_health: 100,
				stat: combat_defines.CONSCIOUS,
				nomove_counter: 0
			}
		},
		density: 1
	}
};

module.exports.components = {LivingMob};
