'use strict';
const {Component, chain_func, has_component} = require('bluespess');

class Emag extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

Emag.depends = ["Item"];
Emag.loadBefore = ["Item"];

Emag.template = {
	vars: {
		components: {
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/equipment/idcards_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/idcards_righthand.png',
				no_bludgeon: true
			},
			"Describe": {
				desc: "It's a card with a magnetic strip attached to some circuitry"
			}
		},
		icon: 'icons/obj/card.png',
		icon_state: 'emag',
		name: "cryptographic sequencer"
	}
};

class Emaggable extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Emag")) {
			this.emag_act(user);
			return true;
		}
		return prev();
	}

	emag_act() {
		this.emagged = true;
	}
}

Emaggable.template = {
	vars: {
		components: {
			"Emaggable": {
				emagged: false
			}
		}
	}
};

module.exports.templates = {
	"emag": {
		components: ["Emag"],
		tree_paths: ["items/card/emag"]
	}
};

module.exports.components = {Emag, Emaggable};
