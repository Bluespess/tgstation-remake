'use strict';
const {Component, Atom, has_component} = require('bluespess');
const combat_defines = require('../defines/combat_defines.js');
const mob_defines = require('../defines/mob_defines.js');

class MobInteract extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Mob.on("click_on", this.click_on.bind(this));
		this.next_move = 0;
		if(this.zone_sel_template) {
			let zone_sel = new Atom(this.a.server, this.zone_sel_template);
			process.nextTick(() => {
				zone_sel.c.ZoneSel.set_mob(this.a);
			});
			this.a.c.Eye.screen.zone_sel = zone_sel;
		}

		this.move_mode = mob_defines.MOVE_INTENT_RUN;
		this.a.c.Eye.screen.move_intent = new Atom(this.a.server, {vars:{
			icon: 'icons/mob/screen_midnight.png', icon_state: "running", screen_loc_x: 12.8125, screen_loc_y: .15625, layer: 30
		}});

		this.a.c.Eye.screen.move_intent.on("clicked", () => {
			this.move_intent();
		});

	}

	click_on(e) {
		if(e.atom == null) return;
		if(e.ctrlKey || e.altKey || e.shiftKey) return;
		let isliving = has_component(this.a, "LivingMob");
		let hasinv = has_component(this.a, "MobInventory");

		if(this.next_move > this.a.server.now())
			return;

		if(isliving && !this.can_interact())
			return;

		if(hasinv && this.a.c.MobInventory.throw_mode) {
			this.a.c.MobInventory.throw_item({x: e.atom.x + e.x - 0.5, y: e.atom.y + e.y - 0.5});
		}

		var active_item = hasinv ? this.a.c.MobInventory.slots[this.a.c.MobInventory.active_hand].item : null;

		if(active_item == e.atom) {
			active_item.c.Item.attack_self(this.a);
			return;
		}

		if(Math.abs(e.atom.x - this.a.x) <= 1.50001 && Math.abs(e.atom.y - this.a.y) <= 1.50001) {
			if(active_item) {
				active_item.c.Item.melee_attack_chain(this.a, e.atom, e);
			} else {
				if(has_component(e.atom, "Mob"))
					this.change_next_move(combat_defines.CLICK_CD_MELEE);
				this.unarmed_attack(e.atom, e);
			}
			return;
		} else {
			if(active_item) {
				active_item.c.Item.after_attack(e.atom, this.a, false, e);
			} else {
				this.ranged_attack(e.atom, e);
			}
		}
	}

	can_interact() {
		if(this.nointeract_counter)
			return false;
		return true;
	}

	move_intent() {
		if(this.move_mode == mob_defines.MOVE_INTENT_RUN) {
			this.move_mode = mob_defines.MOVE_INTENT_WALK;
			this.a.c.Eye.screen.move_intent.icon_state = "walking";
		} else {
			this.move_mode = mob_defines.MOVE_INTENT_RUN;
			this.a.c.Eye.screen.move_intent.icon_state = "running";
		}
	}


	change_next_move(num) {
		this.next_move = this.a.server.now() + ((num + this.next_move_adjust) * this.next_move_modifier);
	}

	unarmed_attack(target, e) {
		target.attack_hand(this.a, e);
	}

	ranged_attack() {}
}

MobInteract.template = {
	vars: {
		components: {
			"MobInteract": {
				next_move_adjust: 0,
				next_move_modifier: 1,
				zone_sel: "chest",
				zone_sel_template: null,
				act_intents: ["help", "harm"],
				act_intent: "help",
				nointeract_counter: 0,
				advanced_tool_user: false // Fun fact on tg this is a proc for no reason. A proc that just returns true/false. As in that's the only thing it does.
			}
		}
	}
};

MobInteract.depends = ["Mob"];
MobInteract.loadBefore = ["Mob"];

module.exports.components = {MobInteract};
