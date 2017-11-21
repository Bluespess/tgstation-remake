'use strict';
const {Component, Sound, chain_func, format_html, visible_message} = require('bluespess');
const combat_defines = require('../../../defines/combat_defines.js');

const _bruteloss = Symbol('_bruteloss');
const _oxyloss = Symbol('_oxyloss');
const _toxloss = Symbol('_toxloss');
const _burnloss = Symbol('_burnloss');
const _cloneloss = Symbol('_cloneloss');
const _brainloss = Symbol('_brainloss');
const _staminaloss = Symbol('_staminaloss');
const _health = Symbol('_health');

class LivingMob extends Component {
	constructor(atom, template) {
		super(atom, template);
		this[_bruteloss] = 0;
		this[_oxyloss] = 0;
		this[_toxloss] = 0;
		this[_burnloss] = 0;
		this[_cloneloss] = 0;
		this[_brainloss] = 0;
		this[_staminaloss] = 0;
		this[_health] = 100;

		this.a.c.Mob.can_interact_with_panel = this.can_interact_with_panel.bind(this);
		this.a.c.Tangible.experience_pressure_difference = chain_func(this.a.c.Tangible.experience_pressure_difference, this.experience_pressure_difference.bind(this));
		this.a.c.Tangible.attacked_by = this.attacked_by.bind(this);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
	}

	// Getters and setters for every type of loss.
	get bruteloss() {return this[_bruteloss];}
	set bruteloss(value) {if(this.status_flags & LivingMob.GODMODE) return true;this[_bruteloss] = value;this[_health] = this.update_health();}

	get oxyloss() {return this[_oxyloss];}
	set oxyloss(value) {if(this.status_flags & LivingMob.GODMODE) return true;this[_oxyloss] = value;this[_health] = this.update_health();}

	get toxloss() {return this[_toxloss];}
	set toxloss(value) {if(this.status_flags & LivingMob.GODMODE) return true;this[_toxloss] = value;this[_health] = this.update_health();}

	get burnloss() {return this[_burnloss];}
	set burnloss(value) {if(this.status_flags & LivingMob.GODMODE) return true;this[_burnloss] = value;this[_health] = this.update_health();}

	get cloneloss() {return this[_cloneloss];}
	set cloneloss(value) {if(this.status_flags & LivingMob.GODMODE) return true;this[_cloneloss] = value;this[_health] = this.update_health();}

	get brainloss() {return this[_brainloss];}
	set brainloss(value) {if(this.status_flags & LivingMob.GODMODE) return true;this[_brainloss] = value;this[_health] = this.update_health();}

	get staminaloss() {return this[_staminaloss];}
	set staminaloss(value) {if(this.status_flags & LivingMob.GODMODE) return true;this[_staminaloss] = value;this[_health] = this.update_health();}

	get health() {return this[_health];}

	update_health() {
		var h = this.max_health - this.bruteloss - this.oxyloss - this.toxloss - this.burnloss - this.cloneloss - this.brainloss - this.staminaloss;
		this.update_stat();
		return h;
	}

	update_stat() {
	}
	//DAMAGE
	apply_damage(damage = 0, damagetype = "brute", def_zone, blocked = 0) {
		var hit_percent = (100-blocked)/100;
		if(!damage || (hit_percent <= 0))
			return false;
		if(this[`${damagetype}loss`] == undefined)
			throw new Error(`Damage type of ${damagetype} does not exist.`);
		this[`${damagetype}loss`] += (damage * hit_percent);
		return true;
	}

	apply_damage_type(damage = 0, damagetype = "brute") {
		if(this[`${damagetype}loss`] == undefined)
			throw new Error(`Damage type of ${damagetype} does not exist.`);
		this[`${damagetype}loss`] += damage;
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

	incapacitated() {
		return false;
	}

	can_interact_with_panel(target) {
		return target.z == this.a.z && Math.max(Math.abs(target.x - this.a.x), Math.abs(target.y - this.a.y)) < 1;
	}

	experience_pressure_difference(prev, difference) {
		new Sound(this.a.server, {path: 'sound/effects/space_wind.ogg', vary: true, volume: Math.min(difference / 100, 1)}).play_to(this.a);
		prev();
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
				status_flags: LivingMob.CANSTUN|LivingMob.CANWEAKEN|LivingMob.CANPARALYSE|LivingMob.CANPUSH,
				max_health: 100,
				stat: LivingMob.CONSCIOUS
			}
		},
		density: 1
	}
};

LivingMob.CANSTUN = 1;
LivingMob.CANWEAKEN = 2;
LivingMob.CANPARALYSE = 4;
LivingMob.CANPUSH = 8;
LivingMob.IGNORESLOWDOWN = 16;
LivingMob.GOTTAGOFAST = 32;
LivingMob.GOTTAGOREALLYFAST = 64;
LivingMob.GODMODE = 4096;
LivingMob.FAKEDEATH = 8192;	//Replaces stuff like changeling.changeling_fakedeath
LivingMob.DISFIGURED = 16384;	//I'll probably move this elsewhere if I ever get wround to writing a bitflag mob-damage system
LivingMob.XENO_HOST = 32768;	//Tracks whether we're gonna be a baby alien's mummy.

LivingMob.CONSCIOUS = 0;
LivingMob.UNCONSCIOUS = 1;
LivingMob.DEAD = 2;

module.exports.components = {LivingMob};
