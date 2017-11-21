'use strict';
const {Component, Atom, Sound, chain_func} = require('bluespess');
const layers = require('../../../defines/layers.js');
const sounds = require('../../../defines/sounds.js');

class Window extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.c.Destructible.play_attack_sound = this.play_attack_sound.bind(this);
		this.a.c.Destructible.deconstruct = this.deconstruct.bind(this);
		this.a.c.Destructible.take_damage = chain_func(this.a.c.Destructible.take_damage, this.take_damage.bind(this));
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

	make_debris() {
		for(let i = 0; i < this.glass_amount; i++) {
			new Atom(this.a.server, this.shard_type, this.a.base_loc);
		}
	}

	deconstruct(disassembled = true) {
		if(this.a.destroyed)
			return;
		if(!disassembled) {
			new Sound(this.a.server, {path: sounds.shatter(), volume: 0.7, vary: true}).emit_from(this.a);
			if(!this.a.c.Destructible.no_deconstruct && this.a.base_loc) {
				this.make_debris();
			}
		}
		this.a.destroy();
	}
}

Window.one_per_turf = true;

Window.depends = ["Destructible", "BlocksAir"];
Window.loadBefore = ["Destructible", "BlocksAir"];

Window.template = {
	vars: {
		components: {
			"Window": {
				state: "out_of_frame",
				heat_resistance: 800,
				glass_amount: 2,
				shard_type: "glass_shard"
			},
			"Destructible": {
				max_integrity: 25
			},
			"Tangible": {
				anchored: true,
				pressure_resistance: 410
			},
			"Describe": {
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

module.exports.templates = {
	"window": {
		components: ["Window"],
		vars: {
			icon: 'icons/obj/smooth_structures/window.png',
			icon_state: "window"
		},
		tree_paths: ["basic_structures/window"]
	}
};

module.exports.components = {Window};
