'use strict';
const {Atom, Component, has_component, make_watched_property} = require('bluespess');
const _ = require('underscore');
const combat_defines = require('../defines/combat_defines.js');
const EventEmitter = require('events');

class Action /*lawsuit*/ extends EventEmitter {
	constructor(inst) {
		super();
		Object.assign(this, {
			name: "Generic Action",
			desc: null,
			tooltip_theme: "",
			use_target_for_icon: false,
			target: null,
			check_conscious: false,
			check_interact: false,
			bg_icon: 'icons/mob/actions/backgrounds.png',
			bg_icon_state: "bg_default",
			act_icon: 'icons/mob/actions.png',
			act_icon_state: "default"
		}, inst);
		this.instanced_buttons = [];
		make_watched_property(this, "bg_icon_state", "string");
	}
	add_to(mob) {
		if(!has_component(mob, "MobHud"))
			return;
		if(mob.c.MobHud.actions.has(this))
			return;
		mob.c.MobHud.actions.add(this);
		let button = new Atom(mob.server, {
			components: ["ActionButton"],
			vars: {
				components: {
					"Tooltip": {
						desc: this.desc,
						theme: this.tooltip_theme
					}
				},
				name: this.name,
				icon: this.bg_icon,
				icon_state: this.bg_icon_state
			}
		});
		if(this.use_target_for_icon && this.target) {
			button.overlays.button_icon = _.pick(this.target, "icon", "icon_state", "color", "alpha", "dir");
		} else {
			button.overlays.button_icon = {icon: this.act_icon, icon_state: this.act_icon_state};
		}
		button.c.ActionButton.action = this;
		button.c.ActionButton.mob = mob;
		button.c.ActionButton.update_icon();
		mob.c.MobHud.action_buttons.set(this, button);
		mob.c.MobHud.reorganize_buttons();
	}
	remove_from(mob) {
		if(!has_component(mob, "MobHud"))
			return;
		if(!mob.c.MobHud.actions.has(this))
			return;
		mob.c.MobHud.actions.delete(this);
		let button = mob.c.MobHud.action_buttons.get(this);
		button.c.ActionButton.action = this;
		button.c.ActionButton.mob = mob;
		mob.c.MobHud.action_buttons.delete(this);
		if(button) {
			mob.c.Eye.screen["button_" + button.object_id] = null;
			button.destroy();
		}
		mob.c.MobHud.reorganize_buttons();
	}
	check_mob_use(mob) {
		if(this.check_conscious) {
			if(!has_component(mob, "LivingMob"))
				return false;
			if(mob.c.LivingMob.stat != combat_defines.CONSCIOUS)
				return false;
		}
		if(this.check_interact) {
			if(!has_component(mob, "MobInteract"))
				return false;
			if(mob.c.MobInteract.nointeract_counter)
				return false;
		}
		return true;
	}

	click_act(/*user*/) {}
}

class ItemAction extends Action {
	constructor(inst) {
		super(Object.assign({}, {
			check_conscious: true,
			check_interact: true,
			use_target_for_icon: true
		}, inst));
	}
	check_mob_use(mob) {
		if(!super.check_mob_use(mob))
			return false;
		if(!has_component(mob, "MobInventory") || !this.target || this.target.loc != mob)
			return false;
		return true;
	}
	click_act(user) {
		this.target.c.Item.attack_self(user);
	}
}

Action.Item = ItemAction;

class ActionButton extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("clicked", this.clicked.bind(this));
		this.action = null;
		this.mob = null;
	}

	clicked(e) {
		if(!this.action || !this.action.check_mob_use(e.mob) || e.mob != this.mob)
			return;
		this.action.click_act(e.mob);
	}

	update_icon() {
		let usable = this.action.check_mob_use(this.mob);
		if(!usable) {
			this.a.color = "#800000";
			this.a.alpha = 0.5;
			this.a.overlays.button_icon.color = this.color;
			this.a.overlays.button_icon.alpha = this.alpha;
		} else {
			this.a.color = null;
			this.a.alpha = 1;
			if(this.action.target) {
				this.a.overlays.button_icon.color = this.action.target.color;
				this.a.overlays.button_icon.alpha = this.action.target.alpha;
			} else {
				this.a.overlays.button_icon.color = null;
				this.a.overlays.button_icon.alpha = null;
			}
		}
	}
}

ActionButton.loadBefore = ["Tooltip"];
ActionButton.depends = ["Tooltip"];

class ItemActions extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("moved", this.moved.bind(this));
		this.actions = [];
	}

	moved(e) {
		if(e.old && e.new && e.old.loc == e.new.loc)
			return; // nothing changed stop rearranging my buttons ree
		if(e.old && has_component(e.old.loc, "MobHud")) {
			for(let act of this.actions) {
				act.remove_from(e.old.loc);
			}
		}
		if(e.new && has_component(e.new.loc, "MobHud")) {
			for(let act of this.actions) {
				act.add_to(e.new.loc);
			}
		}
	}

	add_action(act) {
		if(this.actions.includes(act) || !act)
			return act;
		if(!(act instanceof Action)) {
			let instobj = act;
			act = new ItemAction(instobj);
		}
		if(!act.target)
			act.target = this.a;
		this.actions.push(act);
		if(has_component(this.loc, "MobHud"))
			act.add_to(this.loc);
		return act;
	}
	remove_action(act) {
		let idx = this.actions.indexOf(act);
		if(idx == -1)
			return;
		this.actions.splice(idx, 1);
		if(has_component(this.loc, "MobHud"))
			act.remove_from(this.loc);
	}
}

ItemActions.loadBefore = ["Item"];
ItemActions.depends = ["Item"];

module.exports = Action;
module.exports.components = {ActionButton, ItemActions};
