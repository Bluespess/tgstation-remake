'use strict';
const {Component, Atom, Sound, has_component, chain_func, to_chat} = require('bluespess');
const layers = require('../../../defines/layers.js');
const sounds = require('../../../defines/sounds.js');

const _state = Symbol('_state');

class Window extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.c.Destructible.play_attack_sound = this.play_attack_sound.bind(this);
		this.a.c.Destructible.deconstruct = this.deconstruct.bind(this);
		this.a.c.Destructible.take_damage = chain_func(this.a.c.Destructible.take_damage, this.take_damage.bind(this));
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
	}

	take_damage(prev) {
		prev();
		this.update_damage_overlay();
	}

	play_attack_sound(damage_amount, damage_type = "brute") {
		if(damage_type == "brute") {
			if(damage_amount)
				new Sound(this.a.server, {path: 'sound/effects/Glasshit.ogg', volume: 0.75, vary: true}).emit_from(this.a);
			else
				new Sound(this.a.server, {path: 'sound/weapons/tap.ogg', volume: 0.75, vary: true}).emit_from(this.a);
		} else if(damage_type == "burn") {
			new Sound(this.a.server, {path: 'sound/items/Welder.ogg', vary: true}).emit_from(this.a);
		}
	}

	update_damage_overlay() {
		if(this.a.destroyed)
			return;
		var ratio = this.a.c.Destructible.obj_integrity / this.a.c.Destructible.max_integrity;
		ratio = Math.ceil(ratio * 4) * 25;

		if(ratio > 75)
			this.a.overlays.window_damage = null;
		else
			this.a.overlays.window_damage = {icon: 'icons/obj/structures.png', icon_state: `damage${ratio}`, overlay_layer: -1};
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool")) {
			if(this.state == "screwed_to_floor") {
				if(item.c.Tool.can_use("Screwdriver", user)) {
					item.c.Tool.used("Screwdriver");
					to_chat`<span class='notice'>You begin to unscrew the window from the floor...</span>`(user);
					user.c.MobInventory.do_after({delay: this.decon_speed * item.c.Tool.toolspeed, target: this.a}).then((success) => {
						if(!success || this.state != "screwed_to_floor")
							return;
						this.state = "unscrewed_from_floor";
						to_chat`<span class='notice'>You unfasten the window from the floor...</span>`(user);
					});
					return true;
				}
			} else if(this.state == "unscrewed_from_floor") {
				if(item.c.Tool.can_use("Screwdriver", user)) {
					item.c.Tool.used("Screwdriver");
					to_chat`<span class='notice'>You begin to screw the window to the floor...</span>`(user);
					user.c.MobInventory.do_after({delay: this.decon_speed * item.c.Tool.toolspeed, target: this.a}).then((success) => {
						if(!success || this.state != "unscrewed_from_floor")
							return;
						this.state = "screwed_to_floor";
						to_chat`<span class='notice'>You fasten the window to the floor...</span>`(user);
					});
					return true;
				} else if(item.c.Tool.can_use("Wrench", user)) {
					item.c.Tool.used("Wrench");
					to_chat`<span class='notice'>You begin to disassemble the ${this.a}...</span>`(user);
					user.c.MobInventory.do_after({delay: this.decon_speed * item.c.Tool.toolspeed, target: this.a}).then((success) => {
						if(!success || this.state != "unscrewed_from_floor")
							return;
						new Sound(this.a.server, {path: 'sound/items/Deconstruct.ogg', volume: 0.5, vary: true}).emit_from(this.a);
						to_chat`<span class='notice'>You successfully disassemble the ${this.a}.</span>`(user);
						this.a.c.Destructible.deconstruct(true);
					});
					return true;
				}
			}
		}
		return prev();
	}

	make_debris() {
		for(let i = 0; i < this.glass_amount; i++) {
			new Atom(this.a.server, this.shard_type, this.a.base_loc);
		}
	}

	deconstruct(disassembled = true) {
		if(this.a.destroyed)
			return;
		if(disassembled) {
			let glass = new Atom(this.a.server, this.glass_type);
			glass.c.Stack.amount = this.glass_amount;
			glass.loc = this.a.base_mover.fine_loc;
		} else {
			new Sound(this.a.server, {path: sounds.shatter(), volume: 0.7, vary: true}).emit_from(this.a);
			if(!this.a.c.Destructible.no_deconstruct && this.a.base_loc) {
				this.make_debris();
			}
		}
		this.a.destroy();
	}

	get state() {
		return this[_state];
	}
	set state(val) {
		if(val == this[_state])
			return;
		this[_state] = val;
		if(val == "unscrewed_from_floor") {
			this.a.c.Tangible.anchored = false;
			this.a.c.Smooth.enabled = false;
			this.a.c.SmoothGroup.enabled = false;
		} else {
			this.a.c.Tangible.anchored = true;
			this.a.c.Smooth.enabled = true;
			this.a.c.SmoothGroup.enabled = true;
		}
	}
}

Window.one_per_tile = true;

Window.depends = ["Destructible", "BlocksAir"];
Window.loadBefore = ["Destructible", "BlocksAir"];

Window.template = {
	vars: {
		components: {
			"Window": {
				state: "screwed_to_floor",
				heat_resistance: 800,
				glass_amount: 2,
				shard_type: "glass_shard",
				decon_speed: 3000,
				glass_type: "glass_sheet"
			},
			"Destructible": {
				max_integrity: 25,
				armor: {"melee": 0, "bullet": 0, "laser": 0, "energy": 0, "bomb": 0, "bio": 0, "rad": 0, "fire": 80, "acid": 100}
			},
			"Tangible": {
				anchored: true,
				pressure_resistance: 410
			},
			"Examine": {
				desc: "A window."
			}
		},
		name: "window",
		icon: 'icons/obj/structures.png',
		icon_state: "window",
		density: true,
		layer: layers.ABOVE_OBJ_LAYER
	}
};

class ReinforcedWindow extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Window.make_debris = chain_func(this.a.c.Window.make_debris, this.make_debris.bind(this));
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool")) {
			if(this.a.c.Window.state == "screwed_to_floor") {
				if(item.c.Tool.can_use("Crowbar", user)) {
					item.c.Tool.used("Crowbar");
					to_chat`<span class='notice'>You begin to lever the window into the frame...</span>`(user);
					user.c.MobInventory.do_after({delay: this.a.c.Window.decon_speed * item.c.Tool.toolspeed, target: this.a}).then((success) => {
						if(!success || this.a.c.Window.state != "screwed_to_floor")
							return;
						this.a.c.Window.state = "in_frame";
						to_chat`<span class='notice'>You pry the window into the frame.</span>`(user);
					});
					return true;
				}
			} else if(this.a.c.Window.state == "in_frame") {
				if(item.c.Tool.can_use("Crowbar", user)) {
					item.c.Tool.used("Crowbar");
					to_chat`<span class='notice'>You begin to lever the window out of the frame...</span>`(user);
					user.c.MobInventory.do_after({delay: this.a.c.Window.decon_speed * item.c.Tool.toolspeed, target: this.a}).then((success) => {
						if(!success || this.a.c.Window.state != "in_frame")
							return;
						this.a.c.Window.state = "screwed_to_floor";
						to_chat`<span class='notice'>You pry the window out of the frame.</span>`(user);
					});
					return true;
				} else if(item.c.Tool.can_use("Screwdriver", user)) {
					item.c.Tool.used("Screwdriver");
					to_chat`<span class='notice'>You begin to screw the window to the frame...</span>`(user);
					user.c.MobInventory.do_after({delay: this.a.c.Window.decon_speed * item.c.Tool.toolspeed, target: this.a}).then((success) => {
						if(!success || this.a.c.Window.state != "in_frame")
							return;
						this.a.c.Window.state = "screwed_to_frame";
						to_chat`<span class='notice'>You fasten the window to the frame.</span>`(user);
					});
					return true;
				}
			} else if(this.a.c.Window.state == "screwed_to_frame") {
				if(item.c.Tool.can_use("Screwdriver", user)) {
					item.c.Tool.used("Screwdriver");
					to_chat`<span class='notice'>You begin to unscrew the window from the frame...</span>`(user);
					user.c.MobInventory.do_after({delay: this.a.c.Window.decon_speed * item.c.Tool.toolspeed, target: this.a}).then((success) => {
						if(!success || this.a.c.Window.state != "screwed_to_frame")
							return;
						this.a.c.Window.state = "in_frame";
						to_chat`<span class='notice'>You unfasten the window from the frame.</span>`(user);
					});
					return true;
				}
			}
		}
		return prev();
	}

	make_debris(prev) {
		prev();
		let rod = new Atom(this.a.server, "stack_rods");
		rod.c.Stack.amount = this.a.c.Window.glass_amount;
		rod.loc = this.a.base_mover.fine_loc;
	}
}

ReinforcedWindow.depends = ["Window"];
ReinforcedWindow.loadBefore = ["Window"];

ReinforcedWindow.template = {
	vars: {
		components: {
			"Window": {
				state: "screwed_to_frame",
				heat_resistance: 1600,
				glass_type: "rglass_sheet"
			},
			"Destructible": {
				armor: {"melee": 50, "bullet": 0, "laser": 0, "energy": 0, "bomb": 25, "bio": 100, "rad": 100, "fire": 80, "acid": 100},
				max_integrity: 50
			},
			"Examine": {
				desc: "A window that is reinforced with metal rods."
			}
		},
		name: "reinforced window",
		icon_state: "rwindow",
		layer: layers.ABOVE_OBJ_LAYER
	}
};

module.exports.templates = {
	"window": {
		components: ["Window", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "window"
				},
				"SmoothGroup": {
					groups: ["window"]
				}
			},
			icon: 'icons/obj/smooth_structures/window.png',
			icon_state: "window"
		},
		tree_paths: ["basic_structures/window"]
	},
	"window_construct": {
		parent_template: "window",
		vars: {
			components: {
				"Window": {
					state: "unscrewed_from_floor"
				}
			}
		},
		tree_paths: ["basic_structures/window/construct"]
	},
	"r_window": {
		components: ["ReinforcedWindow", "TGSmooth"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "window"
				},
				"SmoothGroup": {
					groups: ["window"]
				}
			},
			icon: 'icons/obj/smooth_structures/reinforced_window.png',
			icon_state: "r_window"
		},
		tree_paths: ["basic_structures/window/reinforced"]
	},
	"r_window_construct": {
		parent_template: "r_window",
		vars: {
			components: {
				"Window": {
					state: "unscrewed_from_floor"
				}
			}
		},
		tree_paths: ["basic_structures/window/reinforced/construct"]
	},
};

module.exports.components = {Window, ReinforcedWindow};
