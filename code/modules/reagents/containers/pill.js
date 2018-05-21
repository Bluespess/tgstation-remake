'use strict';
const {Component, visible_message, to_chat} = require('bluespess');
const _ = require('underscore');

class Pill extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(!this.a.icon_state)
			this.a.icon_state = `pill${_.random(1, 20)}`;
		this.a.c.Item.attack = this.attack.bind(this);
	}

	attack(target, user) {
		if(!this.a.c.ReagentHolder.can_consume(target, user))
			return true;

		(async () => {
			if(target == user) {
				visible_message`<span class='notice'>The ${user} attempts to ${this.apply_method} the ${this.a}</span>`.emit_from(target);
				if(this.self_delay) {
					if(!await user.c.MobInventory.do_after({target, delay: this.self_delay}))
						return;
				}
				to_chat`<span class='notice'>You ${this.apply_method} the ${this.a}.</span>`(user);
			} else {
				visible_message`<span class='danger'>The ${user} attempts to force the ${target} to ${this.apply_method} the ${this.a}.</span>`
					.self`<span class='userdanger'>The ${user} attempts to force you to ${this.apply_method} the ${this.a}.</span>`
					.emit_from(target);
				if(!await user.c.MobInventory.do_after({target, delay: 3000}))
					return;
				visible_message`<span class='danger'>The ${user} forces the ${target} to ${this.apply_method} the ${this.a}.</span>`
					.self`<span class='userdanger'>The ${user} forces you to ${this.apply_method} the ${this.a}.</span>`
					.emit_from(target);
			}

			this.a.c.ReagentHolder.react_atom(target, "ingest");
			this.a.c.ReagentHolder.transfer_percent_to(target, 1);
			this.a.destroy();
		})();
		return true;
	}
}

Pill.loadBefore = ["Item", "ReagentHolder"];
Pill.depends = ["Item", "ReagentHolder"];

Pill.template = {
	vars: {
		components: {
			"Pill": {
				apply_type: "ingest",
				apply_method: "swallow",
				self_delay: 0 //pills are instant, this is because patches inheret their aplication from pills
			},
			"ReagentHolder": {
				maximum_volume: 50
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/equipment/medical_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/medical_righthand.png',
				inhand_icon_state: "pill"
			},
			"Examine": {
				desc: "A tablet or capsule."
			}
		},
		name: "pill",
		icon: 'icons/obj/chemical.png',
		icon_state: "pill"
	}
};

module.exports.components = {Pill};
