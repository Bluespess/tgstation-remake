'use strict';
const {Component, Atom, Sound, make_watched_property, has_component, chain_func, to_chat} = require('bluespess');
const SparkSystem = require('../effect_system/sparks.js');

class LightFixture extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.tube = new Atom(this.a.server, this.default_tube, this.a);
		this.a.c.ApcPowered.on("powered_changed", this.update_on.bind(this));
		this.on("tube_changed", this.update_on.bind(this));
		this.on("turned_on_changed", this.update_on.bind(this));
		make_watched_property(this, "tube");
		make_watched_property(this, "turned_on");
		this.a.c.Destructible.take_damage = chain_func(this.a.c.Destructible.take_damage, this.take_damage.bind(this));
		this.a.c.Destructible.play_attack_sound = this.play_attack_sound.bind(this);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.attack_hand = this.attack_hand.bind(this);
	}

	update_on() {
		let functional = this.turned_on && this.tube && !this.tube.c.LightTube.broken && !this.tube.c.LightTube.burned;
		this.using_idle_power = functional;
		if(functional && this.a.c.ApcPowered.powered) {
			this.a.icon_state = `${this.base_state}1`;
			this.a.c.LightSource.enabled = true;
		} else {
			this.a.c.LightSource.enabled = false;
			if(!this.tube) {
				this.a.icon_state = `${this.base_state}-empty`;
			} else if(this.tube.c.LightTube.broken) {
				this.a.icon_state = `${this.base_state}-broken`;
			} else if(this.tube.c.LightTube.burned) {
				this.a.icon_state = `${this.base_state}-burned`;
			} else {
				this.a.icon_state = `${this.base_state}0`;
			}
		}
	}

	attack_by(prev, item, user) {
		if(has_component(item, "LightTube")) {
			if(item.c.Item.slot && !item.c.Item.slot.can_unequip())
				return true;
			if(this.tube && !this.tube.c.LightTube.broken && !this.tube.c.LightTube.burned)
				to_chat`<span class='warning'>There is a ${this.tube_type} already inserted!</span>`(user);
			else if(item.c.LightTube.tube_type != this.tube_type)
				to_chat`<span class='warning'>This type of light requires a ${this.tube_type}</span>`(user);
			else {
				if(this.tube) {
					this.tube.loc = this.a.fine_loc;
					this.tube = null;
					to_chat`<span class='notice'>You replace the ${item}</span>`(user);
				} else {
					to_chat`<span class='notice'>You insert the ${item}</span>`(user);
				}
				this.tube = item;
				item.loc = this.a;
			}
			return true;
		}
		return prev();
	}
	attack_hand(user) {
		if(!this.tube) {
			to_chat`There is no ${this.tube_type} in this light.`(user);
			return;
		}
		//TODO burn your hands
		to_chat`<span class='notice'>You remove the ${this.tube}.</span>`(user);
		if(user.c.MobInventory.put_in_hands(this.tube))
			this.tube = null;
	}

	play_attack_sound(damage_amount, damage_type = "brute") {
		if(damage_type == "brute") {
			if(!this.tube)
				new Sound(this.a.server, {path: 'sound/weapons/smash.ogg', volume: 0.5, vary: true}).emit_from(this.a);
			else if(this.tube.c.LightTube.broken)
				new Sound(this.a.server, {path: 'sound/effects/hit_on_shattered_glass.ogg', volume: 0.9, vary: true}).emit_from(this.a);
			else
				new Sound(this.a.server, {path: 'sound/effects/glasshit.ogg', volume: 0.9, vary: true}).emit_from(this.a);
		} else if(damage_type == "burn") {
			new Sound(this.a.server, {path: 'sound/items/Welder.ogg', vary: true}).emit_from(this.a);
		}
	}

	take_damage(prev, damage_amount) {
		let dot = prev();
		if(!this.a.destroyed) {
			if(Math.random() < (damage_amount * 0.05))
				this.break_light_tube();
		}
		return dot;
	}

	break_light_tube(skip_sound_and_sparks = false) {
		if(!this.tube || this.tube.c.LightTube.broken)
			return;

		if(!skip_sound_and_sparks) {
			new Sound(this.a.server, {path: 'sound/effects/glasshit.ogg', vary: true, volume: 0.75}).emit_from(this.a);
			if(this.a.c.LightSource.enabled) {
				new SparkSystem(this.a.server, 3, true, this.a).start();
			}
		}
		this.tube.c.LightTube.broken = true;
	}
}

LightFixture.loadBefore = ["ApcPowered", "Destructible", "LightSource"];
LightFixture.depends = ["ApcPowered", "Destructible", "LightSource"];

LightFixture.template = {
	vars: {
		components: {
			"LightFixture": {
				base_state: "tube",
				tube_type: "tube",
				default_tube: "light_tube",
				turned_on: true
			},
			"LightSource": {
				enabled: true,
				radius: 8,
				color: "#ffffff"
			},
			"ApcPowered": {
				power_usage: 20,
				using_idle_power: true
			},
			"Tangible": {
				anchored: true,
			}
		},
		name: "light fixture",
		layer: 2.9,
		icon: 'icons/obj/lighting.png',
		icon_state: "tube1"
	}
};

class LightTube extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.on("broken_changed", this.update_broken.bind(this));
		this.on("burned_changed", this.update_broken.bind(this));
		make_watched_property(this, "broken", "boolean");
		make_watched_property(this, "burned", "boolean");
	}

	update_broken() {
		if(this.broken) {
			this.a.icon_state = this.broken_icon_state;
			this.a.c.Examine.desc = this.broken_desc;
			this.a.c.Item.force = 5;
		} else if(this.burned) {
			this.a.icon_state = this.burned_icon_state;
			this.a.c.Examine.desc = this.burned_desc;
			this.a.c.Item.force = this.a.template.vars.components.Item.force;
		} else {
			this.a.icon_state = this.a.template.vars.icon_state;
			this.a.c.Examine.desc = this.a.template.vars.components.Examine.desc;
			this.a.c.Item.force = this.a.template.vars.components.Item.force;
		}
		if(has_component(this.a.loc, "LightFixture"))
			this.a.loc.c.LightFixture.update_on();
	}
}

LightTube.loadBefore = ["Item"];
LightTube.depends = ["Item"];

LightTube.template = {
	vars: {
		components: {
			"LightTube": {
				tube_type: "tube",
				broken: false,
				burned: false,
				broken_desc: "A broken light tube",
				burned_desc: "A burnt-out light tube.",
				broken_icon_state: "ltube-broken",
				burned_icon_state: "ltube-burned"
			},
			"Item": {
				inhand_icon_state: "c_tube",
				size: 1,
				force: 2
			},
			"Tangible": {
				throw_force: 5
			},
			"Examine": {
				desc: "A replacement light tube"
			}
		},
		name: "light tube",
		icon: 'icons/obj/lighting.png',
		icon_state: "ltube"
	}
};

module.exports.templates = {
	"light": {
		components: ["LightFixture"],
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		]
	},
	"light_small": {
		components: ["LightFixture"],
		vars: {
			icon_state: "bulb1",
			components: {
				"LightFixture": {
					default_tube: "light_tube_small",
					tube_type: "bulb",
					base_state: "bulb"
				},
				"LightSource": {
					radius: 4,
					color: "#ccbbaa"
				}
			}
		},
		variants: [
			{
				type: "single",
				var_path: ["dir"],
				values: [
					2, 1, 4, 8
				],
				orientation: "horizontal",
			}
		]
	},
	"light_tube": {
		components: ["LightTube"]
	},
	"light_tube_small": {
		components: ["LightTube"],
		vars: {
			components: {
				"LightTube": {
					tube_type: "bulb",
					broken_desc: "A broken light bulb",
					burned_desc: "A burnt-out light bulb.",
					broken_icon_state: "lbulb-broken",
					burned_icon_state: "lbulb-burned"
				},
				"Examine": {
					desc: "A replacement light bulb."
				}
			},
			name: "light bulb",
			icon_state: "lbulb"
		}
	}
};

module.exports.components = {LightFixture, LightTube};
