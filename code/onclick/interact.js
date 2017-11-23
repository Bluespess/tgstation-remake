'use strict';
const {Component, has_component} = require('bluespess');
const combat_defines = require('../defines/combat_defines.js');

class MobInteract extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Mob.on("click_on", this.click_on.bind(this));
		this.next_move = 0;
	}

	click_on(e) {
		if(e.atom == null) return;
		if(e.ctrlKey || e.altKey || e.shiftKey) return;
		let isliving = has_component(this.a, "LivingMob");
		let hasinv = has_component(this.a, "MobInventory");

		if(this.next_move > this.a.server.now())
			return;

		if(isliving && this.a.c.LivingMob.incapacitated({ignore_restraints: true}))
			return;

		var active_item = hasinv ? this.a.c.MobInventory.slots[this.a.c.MobInventory.active_hand].item : null;

		if(active_item == e.atom) {
			active_item.c.Item.attack_self(this.a);
			return;
		}

		if(Math.abs(e.atom.x - this.a.x) <= 1 && Math.abs(e.atom.y - this.a.y) <= 1) {
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
				next_move_modifier: 1
			}
		}
	}
};

MobInteract.depends = ["Mob"];
MobInteract.loadBefore = ["Mob"];

module.exports.components = {MobInteract};
