'use strict';
const {Component, Atom, Sound, chain_func, to_chat, sleep, dir_to, has_component} = require('bluespess');
const combat_defines = require('../../../defines/combat_defines.js');
const pass_flags = require('../../../defines/pass_flags.js');

class SprayBottle extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Item.after_attack = chain_func(this.a.c.Item.after_attack, this.after_attack.bind(this));
	}

	after_attack(prev, target, user) {
		if(target == null || target.z != user.z)
			return prev();
		if(this.a.c.ReagentHolder.total_volume < this.current_amount) {
			to_chat`<span class='warning'>The ${this.a} is empty!</span>`(user);
			return;
		}
		this.spray_at(target);

		new Sound(this.a.server, {path: 'sound/effects/spray2.ogg', volume: 0.5, vary: true}).emit_from(this.a);
		user.c.MobInteract.change_next_move(combat_defines.CLICK_CD_MELEE);
	}

	spray_at(target) {
		let range = Math.max(Math.min(this.current_range, Math.max(Math.abs(this.a.x - target.x), Math.abs(this.a.y - target.y))), 1);
		let chempuff = new Atom(this.a.server, {
			components: ["ReagentHolder"],
			vars: {
				components: {
					"ReagentHolder": {
						maximum_volume: this.current_amount
					}
				},
				name: "chemicals",
				icon: 'icons/obj/chempuff.png',
				pass_flags: pass_flags.PASSTABLE | pass_flags.PASSGRILLE,
				layer: 5
			}
		});
		chempuff.flick = {icon_state: ""};
		chempuff.dir = dir_to(target.x - this.a.x, target.y - this.a.y);
		chempuff.loc = this.a.base_mover.fine_loc;
		let puff_reagent_left = range;
		this.a.c.ReagentHolder.transfer_to(chempuff, this.current_amount);
		if(this.stream_mode) {
			puff_reagent_left = 1;
		}
		let [r,g,b] = chempuff.c.ReagentHolder.get_reagents_color();
		chempuff.color = `rgb(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)})`;
		let wait_step = Math.max(200 + 300 / range, 200);
		this.move_spray({target, wait_step, chempuff, range, puff_reagent_left});
	}

	async move_spray({target, wait_step, chempuff, range, puff_reagent_left} = {}) {
		let range_left = range;
		await sleep(100);
		let volume_modifier = 1 / puff_reagent_left;
		for(let i = 0; i < range; i++) {
			range_left--;

			chempuff.glide_size = 1000 / wait_step;
			let dx = Math.max(Math.min(target.x - chempuff.x, 1), -1);
			let dy = Math.max(Math.min(target.y - chempuff.y, 1), -1);
			chempuff.dir = dir_to(dx, dy);
			chempuff.move(dx, dy);

			await sleep(wait_step);

			for(let atom of [...chempuff.crosses()]) {
				if(puff_reagent_left <= 0)
					break;

				chempuff.c.ReagentHolder.react_atom(atom, "vapor", {volume_modifier});
				if(has_component(atom, "LivingMob")) {
					puff_reagent_left--;
				}
			}

			if(puff_reagent_left > 0 && (!this.stream_mode || !range_left)) {
				puff_reagent_left--;
			}
			if(puff_reagent_left <= 0) {
				chempuff.destroy();
				return;
			}
		}
		chempuff.destroy();
	}
}

SprayBottle.depends = ["ReagentHolder", "Item", "ReagentReceiver"];
SprayBottle.loadBefore = ["ReagentHolder", "Item", "ReagentReceiver"];

SprayBottle.template = {
	vars: {
		components: {
			"SprayBottle": {
				stream_mode: false,
				current_range: 3,
				current_amount: 5,
				spray_range: 3,
				spray_amount: 5,
				stream_range: 1,
				stream_amount: 10
			},
			"ReagentHolder": {
				maximum_volume: 250
			},
			"Item": {
				no_bludgeon: true,
				inhand_icon_state: "cleaner",
				inhand_lhand_icon: 'icons/mob/inhands/equipment/custodial_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/custodial_righthand.png',
				size: 2
			},
			"Tangible": {
				throw_force: 0,
				throw_speed: 3,
				throw_range: 7
			},
			"Examine": {
				desc: "A spray bottle, with an unscrewable top"
			}
		},
		name: "spray bottle",
		icon: 'icons/obj/janitor.png',
		icon_state: "cleaner"
	}
};

module.exports.templates = {
	"spray_spacecleaner": {
		components: ["SprayBottle"],
		vars: {
			components: {
				"ReagentHolder": {
					init_reagents: {"SpaceCleaner": 250}
				},
				"Examine": {
					desc: "BLAM!-brand non-foaming space cleaner!"
				}
			},
			name: "space cleaner"
		}
	}
};

module.exports.components = {SprayBottle};
