'use strict';
const {Component, Sound, to_chat, visible_message, has_component, chain_func} = require('bluespess');

class Mop extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Item.after_attack = chain_func(this.a.c.Item.after_attack, this.after_attack.bind(this));
	}

	after_attack(prev, target, user, prox) {
		if(!prox)
			return prev();

		if(has_component(target, "OpenReagentContainer")) {
			if(target.c.ReagentHolder.total_volume < 1)
				to_chat`<span class='warning'>The ${target} is empty!</span>`(user);
			else {
				target.c.ReagentHolder.transfer_to(this.a, 5);
				to_chat`<span class='warning'>You wet the ${this.a} in the ${target}</span>`(user);
				new Sound(this.a.server, {path: 'sound/effects/slosh.ogg', volume: 0.25, vary: true}).emit_from(target);
			}
			return true;
		}

		if(this.a.c.ReagentHolder.total_volume < 1) {
			to_chat`<span class='warning'>Your mop is dry!</span>`(user);
			return;
		}

		let turf = (target.base_loc && target.base_loc.turf) || target;

		if(turf) {
			visible_message`The ${user} begins to clean the ${turf} with the ${this.a}.`
				.self`<span class='notice'>You begin to clean the ${turf} with the ${this.a}...</span>`
				.emit_from(user);
			user.c.MobInventory.do_after({delay: this.mop_speed, target: turf}).then((success) => {
				if(!success)
					return;
				to_chat`<span class='notice'>You finish mopping.</span>`(user);
				if(this.a.c.ReagentHolder.volume_of("Water") >= 1) {
					for(let crosser of [...turf.crosses()]) {
						if(has_component(crosser, "CleanableDecal")){
							crosser.destroy();
							continue;
						}
					}
				}
				this.a.c.ReagentHolder.react_atom(turf, "touch", {volume_modifier: 10 / this.a.c.ReagentHolder.total_volume});
				this.a.c.ReagentHolder.remove_any(1);
			});
		}
	}
}

Mop.depends = ["Item", "ReagentHolder"];
Mop.loadBefore = ["Item", "ReagentHolder"];

Mop.template = {
	vars: {
		components: {
			"Mop": {
				mop_speed: 3000
			},
			"ReagentHolder": {
				maximum_volume: 5,
				init_reagents: {"Water": 5}
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/equipment/custodial_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/custodial_righthand.png',
				force: 3,
				size: 3,
				attack_verb: ["mopped", "bashed", "bludgeoned", "whacked"]
			},
			"Tangible": {
				throw_force: 5,
				throw_speed: 3,
				throw_range: 7
			},
			"Examine": {
				desc: "The world of janitalia wouldn't be complete without a mop."
			}
		},
		name: "mop",
		icon: 'icons/obj/janitor.png',
		icon_state: "mop"
	}
};

module.exports.templates = {
	"mop": {
		components: ["Mop"],
		tree_paths: ["items/mop"]
	}
};

module.exports.components = {Mop};
