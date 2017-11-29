'use strict';
const {Component} = require('bluespess');

class ChestBodyPart extends Component {}
ChestBodyPart.depends = ["BodyPart"];
ChestBodyPart.loadBefore = ["BodyPart"];
ChestBodyPart.template = {
	vars: {
		components: {
			"BodyPart": {
				body_zone: "chest",
				max_damage: 200,
				should_draw_gender: true
			},
			"Describe": {
				desc: "It's impolite to stare at a person's chest."
			}
		},
		name: "chest",
		icon_state: "default_human_chest",

	}
};

class LArmBodyPart extends Component {}
LArmBodyPart.depends = ["BodyPart"];
LArmBodyPart.loadBefore = ["BodyPart"];
LArmBodyPart.template = {
	vars: {
		components: {
			"BodyPart": {
				body_zone: "l_arm",
				max_damage: 50
			},
			"Item": {
				attack_verb: ["slapped", "punched"]
			},
			"Describe": {
				desc: "Did you know that the word 'sinister' stems originally from the \
Latin 'sinestra' (left hand), because the left hand was supposed to \
be possessed by the devil? This arm appears to be possessed by no \
one though."
			}
		},
		name: "left arm",
		icon_state: "default_human_l_arm"
	}
};

class RArmBodyPart extends Component {}
RArmBodyPart.depends = ["BodyPart"];
RArmBodyPart.loadBefore = ["BodyPart"];
RArmBodyPart.template = {
	vars: {
		components: {
			"BodyPart": {
				body_zone: "r_arm",
				max_damage: 50
			},
			"Item": {
				attack_verb: ["slapped", "punched"]
			},
			"Describe": {
				desc: "Over 87% of humans are right handed. That figure is much lower \
among humans missing their right arm."
			}
		},
		name: "right arm",
		icon_state: "default_human_r_arm"
	}
};

class LLegBodyPart extends Component {}
LLegBodyPart.depends = ["BodyPart"];
LLegBodyPart.loadBefore = ["BodyPart"];
LLegBodyPart.template = {
	vars: {
		components: {
			"BodyPart": {
				body_zone: "l_leg",
				max_damage: 50
			},
			"Item": {
				attack_verb: ["kicked", "stomped"]
			},
			"Describe": {
				desc: "Some athletes prefer to tie their left shoelaces first for good \
luck. In this instance, it probably would not have helped."
			}
		},
		name: "left leg",
		icon_state: "default_human_l_leg"
	}
};

class RLegBodyPart extends Component {}
RLegBodyPart.depends = ["BodyPart"];
RLegBodyPart.loadBefore = ["BodyPart"];
RLegBodyPart.template = {
	vars: {
		components: {
			"BodyPart": {
				body_zone: "r_leg",
				max_damage: 50
			},
			"Item": {
				attack_verb: ["kicked", "stomped"]
			},
			"Describe": {
				desc: "You put your right leg in, your right leg out. In, out, in, out, \
shake it all about. And apparently then it detaches.\n\
The hokey pokey has certainly changed a lot since space colonisation."
			}
		},
		name: "right leg",
		icon_state: "default_human_r_leg"
	}
};

module.exports.components = {ChestBodyPart, LArmBodyPart, RArmBodyPart, LLegBodyPart, RLegBodyPart};
