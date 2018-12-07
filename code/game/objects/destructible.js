'use strict';
const {Component, Sound, has_component, chain_func, visible_message} = require('bluespess');
const combat_defines = require('../../defines/combat_defines.js');
const _ = require('underscore');

class Destructible extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(this.obj_integrity == null)
			this.obj_integrity = this.max_integrity;
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Tangible.bullet_act = chain_func(this.a.c.Tangible.bullet_act, this.bullet_act.bind(this));
		this.a.c.Tangible.ex_act = chain_func(this.a.c.Tangible.ex_act, this.ex_act.bind(this));
		this.a.c.Tangible.attacked_by = this.attacked_by.bind(this);
		this.a.c.Tangible.on("throw_impacted_by", this.throw_impacted_by.bind(this));
	}

	take_damage(damage_amount, damage_type = "brute", damage_flag, sound_effect = true, attack_dir) {
		if(sound_effect)
			this.play_attack_sound(damage_amount, damage_type, damage_flag);
		if(this.indestructible || this.obj_integrity <= 0)
			return;

		damage_amount = this.run_obj_armor(damage_amount, damage_type, damage_flag, attack_dir);
		if(damage_amount < 0.1)
			return;
		var old_integ = this.obj_integrity;
		this.obj_integrity = Math.max(old_integ - damage_amount, 0);
		if(this.obj_integrity <= 0) {
			if(this.integrity_failure && old_integ > this.integrity_failure)
				this.obj_break(damage_flag);
			this.obj_destruction(damage_flag);
		} else if(this.integrity_failure) {
			if(this.obj_integrity <= this.integrity_failure)
				this.obj_break(damage_flag);
		}
	}

	run_obj_armor(damage_amount, damage_type, damage_flag) {
		if(damage_type != "brute" && damage_type != "burn")
			return 0;
		var protection = 0;
		if(damage_flag && this.armor)
			protection = this.armor[damage_flag] || 0;
		return Math.floor(damage_amount * (100 - protection) * 0.1) * 0.1;
	}

	play_attack_sound(damage_amount, damage_type = "brute") {
		if(damage_type == "brute")
			if(damage_amount)
				new Sound(this.a.server, {path:'sound/weapons/smash.ogg', volume: 0.5, vary: true}).emit_from(this.a);
			else
				new Sound(this.a.server, {path:'sound/weapons/tap.ogg', volume: 0.5, vary: true}).emit_from(this.a);
		else
			new Sound(this.a.server, {path:'sound/weapons/welder.ogg', volume: 1, vary: true}).emit_from(this.a);
	}

	//the obj is deconstructed into pieces, whether through careful disassembly or when destroyed.
	deconstruct() {
		this.a.destroy();
	}

	obj_break() {}
	obj_destruction() {
		this.deconstruct(false);
	}

	attack_by(prev, item, user) {
		return prev() || (this.can_be_hit && item.c.Item.attack_obj(this.a, user));
	}

	attacked_by(item, user) {
		if(item.c.Item.force)
			visible_message`<span class='danger'>The ${user} has hit the ${this.a} with the ${item}!</span>`.emit_from(this.a);

		this.take_damage(item.c.Item.force, item.c.Item.damtype, "melee", true);
	}

	throw_impacted_by(obj) {
		if(!has_component(obj, "Tangible"))
			return;
		this.take_damage(obj.c.Tangible.throw_force, "brute", "melee", true);
	}

	bullet_act(prev, projectile) {
		let ret = prev();
		if(!has_component(this.a, "Wall"))
			new Sound(this.a.server, {path: projectile.c.Projectile.hitsound}).emit_from(this.a);
		visible_message`<span class='danger'>The ${this.a} is hit by a ${projectile}!</span>`
			.range(combat_defines.COMBAT_MESSAGE_RANGE)
			.emit_from(this.a);
		if(!projectile.c.Projectile.no_damage)
			this.take_damage(projectile.c.Projectile.damage, projectile.c.Projectile.damage_type, projectile.c.Projectile.flag, false);
		return ret;
	}

	ex_act(prev, severity) {
		prev();
		if(severity == 1) {
			this.obj_integrity = 0;
			this.a.destroy();
		} else if(severity == 2) {
			this.take_damage(_.random(100,250), "brute", "bomb", false);
		} else if(severity == 3) {
			this.take_damage(_.random(10, 90), "brute", "bomb", false);
		}
	}
}

Destructible.template = {
	vars: {
		components: {
			"Destructible": {
				crit_fail: false,
				armor: null,
				obj_integrity: null,
				max_integrity: 500,
				integrity_failure: true,
				can_be_hit: true,
				acid_level: 0,
				indestructible: false
			}
		}
	}
};

Destructible.depends = ["Tangible"];
Destructible.loadBefore = ["Tangible"];

module.exports.components = {Destructible};
