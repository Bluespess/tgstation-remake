'use strict';
const {Component, Atom, has_component} = require('bluespess');
const layers = require('../../../../../defines/layers.js');

class MobBodyParts extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.limbs = {
			get eyes() {return this.head;},
			get mouth() {return this.head;},
			get groin() {return this.chest;}
		};
		for(let init of this.init_parts) {
			let new_limb = new Atom(this.a.server, init);
			new_limb.c.BodyPart.attach(this.a);
		}
	}
}

MobBodyParts.template = {
	vars: {
		components: {
			"MobBodyParts": {
				init_parts: ["human_chest", "human_l_arm", "human_r_arm", "human_l_leg", "human_r_leg", "human_head"]
			}
		}
	}
};

MobBodyParts.depends = ["LivingMob"];
MobBodyParts.loadBefore = ["LivingMob", "CarbonMob"];

class BodyPart extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.owner = null;
	}

	attach(mob) {
		if(!has_component(mob, "MobBodyParts"))
			return false;
		if(mob.c.MobBodyParts.limbs[this.body_zone])
			return false;
		mob.c.MobBodyParts.limbs[this.body_zone] = this.a;
		this.a.loc = mob;
		this.owner = mob;
		this.apply_overlays(mob);

		this.emit("attached");
		mob.c.MobBodyParts.emit("limb_attached", this.a);
	}

	apply_overlays(atom) {
		if(atom == this.a)
			this.a.icon_state = "";
		atom.overlays[`limb_${this.body_zone}`] = this.get_main_overlay();
	}

	remove_overlays(atom) {
		atom.overlays[`limb_${this.body_zone}`] = undefined;
	}

	get_main_overlay() {
		let overlay = {icon: 'icons/mob/human_parts_greyscale.png'};
		overlay.icon_state = `${this.body_zone}`;
		if(this.species_id)
			overlay.icon_state = `${this.species_id}_${overlay.icon_state}`;
		if(this.should_draw_gender)
			overlay.icon_state += `_${this.body_gender == "female" ? "f" : "m"}`;
		overlay.color = this.get_color();
		return overlay;
	}

	get_color() {
		return "#ffffff";
	}
}

BodyPart.template = {
	vars: {
		components: {
			"BodyPart": {
				is_robotic: false,
				body_zone: null,
				dismemberable: true,
				should_draw_gender: false,
				dmg_overlay_type: null,
				body_gender: "male",
				species_id: "human"
			},
			"Item": {
				force: 3,
			},
			"Tangible": {
				throwforce: 3
			},
			"Describe": {
				desc: "Why is it detached..."
			}
		},
		name: "limb",
		icon: 'icons/mob/human_parts.png',
		layer: layers.BELOW_MOB_LAYER
	}
};

BodyPart.depends = ["Item"];
BodyPart.loadBefore = ["Item"];

module.exports.components = {MobBodyParts, BodyPart};
