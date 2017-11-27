'use strict';
const {Component, has_component} = require('bluespess');
const layers = require('../../../defines/layers.js');

class MobBodyParts extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.limbs = {};
	}
}

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
}

BodyPart.template = {
	vars: {
		components: {
			"BodyPart": {
				is_robotic: false,
				body_zone: null
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

module.exports.components = {MobBodyParts};
