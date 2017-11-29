'use strict';
const {Component, chain_func} = require('bluespess');
const {skintone2hex} = require('./helpers.js');

class BodyPartSkinTone extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.BodyPart.get_color = this.get_color.bind(this);
		this.a.c.BodyPart.get_main_overlay = chain_func(this.a.c.BodyPart.get_main_overlay, this.get_main_overlay.bind(this));
	}

	get_color() {
		return skintone2hex(this.skin_tone);
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

module.exports.components = {BodyPartSkinTone};
