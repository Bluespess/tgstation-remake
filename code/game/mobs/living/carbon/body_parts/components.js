'use strict';
const {Component, chain_func, make_watched_property} = require('bluespess');
const {skin_tones} = require('./helpers.js');
const sprite_accessories = require('../human/sprite_accessories.js');

class BodyPartSkinTone extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.BodyPart.get_color = this.get_color.bind(this);
		this.a.c.BodyPart.get_main_overlay = chain_func(this.a.c.BodyPart.get_main_overlay, this.get_main_overlay.bind(this));
		this.a.c.BodyPart.apply_prefs = chain_func(this.a.c.BodyPart.apply_prefs, this.apply_prefs.bind(this));
		make_watched_property(this, "skin_tone");
		this.on("skin_tone_changed", () => {this.a.c.BodyPart.update_overlays();});
	}

	apply_prefs(prev, prefs) {
		prev();
		this.skin_tone = prefs.skin_tone;
	}

	get_color() {
		return skin_tones[this.skin_tone];
	}

	get_main_overlay(prev) {
		let overlay = prev();
		overlay.icon = 'icons/mob/human_parts_greyscale.png';
		return overlay;
	}
}

BodyPartSkinTone.depends = ["BodyPart"];
BodyPartSkinTone.loadBefore = ["BodyPart"];

BodyPartSkinTone.template = {
	vars: {
		components: {
			"BodyPartSkinTone": {
				skin_tone: "caucasian2"
			}
		}
	}
};

class BodyPartHumanHair extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.BodyPart.apply_prefs = chain_func(this.a.c.BodyPart.apply_prefs, this.apply_prefs.bind(this));
		this.a.c.BodyPart.apply_overlays = chain_func(this.a.c.BodyPart.apply_overlays, this.apply_overlays.bind(this));
		this.a.c.BodyPart.remove_overlays = chain_func(this.a.c.BodyPart.remove_overlays, this.remove_overlays.bind(this));

		make_watched_property(this, "hair_style");
		make_watched_property(this, "hair_color");
		this.on("hair_style_changed", () => {this.a.c.BodyPart.update_overlays();});
		this.on("hair_color_changed", () => {this.a.c.BodyPart.update_overlays();});
	}

	apply_overlays(prev, atom) {
		prev();
		let hair_obj = sprite_accessories.hair[this.hair_style];
		if(hair_obj) {
			atom.overlays[`limb_${this.a.c.BodyPart.body_zone}_hair`] = {
				icon: hair_obj.icon,
				icon_state: hair_obj.icon_state,
				color: `rgb(${this.hair_color.join(",")})`,
				overlay_layer: 14
			};
		} else {
			atom.overlays[`limb_${this.a.c.BodyPart.body_zone}_hair`] = null;
		}
	}

	remove_overlays(prev, atom) {
		prev();
		atom.overlays[`limb_${this.a.c.BodyPart.body_zone}_brute`] = null;
	}

	apply_prefs(prev, prefs) {
		prev();
		this.hair_style = prefs.hair_style;
		this.hair_color = prefs.hair_color;
	}
}

BodyPartHumanHair.loadBefore = ["BodyPart"];
BodyPartHumanHair.depends = ["BodyPart"];

BodyPartHumanHair.template = {
	vars: {
		components: {
			"BodyPartHumanHair": {
				hair_style: "bald",
				hair_color: [0,0,0]
			}
		}
	}
};

module.exports.components = {BodyPartSkinTone, BodyPartHumanHair};
