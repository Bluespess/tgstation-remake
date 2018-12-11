'use strict';
const {Component, Sound, visible_message, to_chat, has_component} = require('bluespess');

class Handcuffs extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Item.attack = this.attack.bind(this);
	}

	attack(target, user) {
		if(this.used || !has_component(target, "MobInventory") || !target.c.MobInventory.check_can_handcuff(user))
			return;
		if(!target.c.MobInventory.handcuffed) {
			visible_message`<span class='danger'>The ${user} is trying to put the ${this.a} on the ${target}!</span>`
				.self`<span class='userdanger'>The ${user} is trying to put the ${this.a} on the ${target}!</span>`
				.emit_from(target);
			new Sound(this.a.server, {path: this.cuff_sound, volume: 0.3, vary: true, range: 5}).emit_from(target);
			user.c.MobInventory.do_after({target, delay: 3000}).then(success => {
				if(!success) {
					to_chat`<span class='warning'>You fail to handcuff the ${target}</span>`(user);
					return;
				}
				this.apply(target, user);
			});
		}
	}

	apply(target, user) {
		if(this.used || !target.c.MobInventory.check_can_handcuff(user) || target.c.MobInventory.handcuffed)
			return;
		if(this.a.c.Item.slot && !this.a.c.Item.slot.can_unequip)
			return;
		if(this.single_use) {
			if(this.used_icon_state)
				this.a.icon_state = this.used_icon_state;
			if(this.used_inhand_icon_state)
				this.a.c.Item.inhand_icon_state = this.used_inhand_icon_state;
			if(this.used_name)
				this.a.name = this.used_name;
			if(this.used_desc)
				this.a.c.Examine.desc = this.used_desc;
			this.used = true;
		}
		if(this.a.c.Item.slot)
			this.a.c.Item.slot.item = null;
		this.a.loc = target;
		target.c.MobInventory.handcuffed = this.a;
		return;
	}
}

Handcuffs.loadBefore = ["Item", "BeltItem"];
Handcuffs.depends = ["Item", "BeltItem"];

Handcuffs.template = {
	vars: {
		components: {
			"Handcuffs": {
				breakout_time: 60000,
				cuff_sound: 'sound/weapons/handcuffs.ogg',
				single_use: false,
				used_icon_state: null,
				used_inhand_icon_state: null,
				used_name: null,
				used_desc: null,
				used: false
			},
			"Item": {
				inhand_icon_state: null,
				inhand_lhand_icon: 'icons/mob/inhands/equipment/security_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/security_righthand.png',
				size: 2
			},
			"Destructible": {
				armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 50, acid: 50}
			},
			"Tangible": {
				throw_force: 0,
				throw_speed: 3,
				throw_range: 5
			},
			"Examine": {
				desc: "Use this to keep prisoners in line."
			}
		},
		name: "handcuffs",
		gender: "plural",
		icon: 'icons/obj/items_and_weapons.png',
		icon_state: "handcuff"
	}
};

module.exports.templates = {
	"handcuffs": {
		components: ["Handcuffs"],
		tree_paths: ["items/handcuffs"]
	}
};

module.exports.components = {Handcuffs};
