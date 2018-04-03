'use strict';
const {Component} = require('bluespess');

class BaseballBat extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

BaseballBat.depends = ["Item"];
BaseballBat.loadBefore = ["Item"];

BaseballBat.template = {
	vars: {
		components: {
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/weapons/melee_lefthand.dmi',
				inhand_rhand_icon: 'icons/mob/inhands/weapons/melee_righthand.dmi',
				inhand_icon_state: "baseball_bat",
				size: 4,
				force: 10,
				throw_force: 12,
				attack_verb: ["beat", "smacked"]
			},
			"Examine": {
				desc: "There ain't a skull in the league that can withstand a swatter."
			}
		},
		icon: 'icons/obj/items_and_weapons.png',
		icon_state: 'baseball_bat',
		name: "baseball bat"
	}
};

module.exports.templates = {
	"baseball_bat": {
		components: ["BaseballBat"],
		tree_paths: ["items/melee/baseball_bat"]
	}
};

module.exports.components = {BaseballBat};
