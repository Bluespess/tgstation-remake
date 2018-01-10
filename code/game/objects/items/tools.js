'use strict';
const {Component, Sound, has_component, chain_func, to_chat} = require('bluespess');

const _is_on = Symbol('_is_on');

class Tool extends Component {
	constructor(atom, template) {
		super(atom, template);
	}

	can_use(cname) {
		return has_component(this.a, cname);
	}
	used() {
		if(this.usesound)
			new Sound(this.a.server, {path: this.usesound, vary: true}).emit_from(this.a);
	}
}

Tool.depends = ["Item", "BeltItem"];
Tool.loadBefore = ["Item", "BeltItem"];

Tool.template = {
	vars: {
		components: {
			"Tool": {
				toolspeed: 1,
				usesound: null
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/equipment/tools_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/tools_righthand.png'
			}
		},
		icon: 'icons/obj/tools.png'
	}
};

class Wrench extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

Wrench.depends = ["Tool"];
Wrench.loadBefore = ["Tool"];

Wrench.template = {
	vars: {
		components: {
			"Tool": {
				usesound: 'sound/items/ratchet.ogg'
			},
			"Item": {
				force: 5,
				throw_force: 7,
				size: 2,
				attack_verb: ["bashed", "battered", "bludgeoned", "whacked"],
			},
			"Examine": {
				desc: "A wrench with common uses. Can be found in your hand."
			}
		},
		icon_state: "wrench",
		name: "wrench"
	}
};

class Screwdriver extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

Screwdriver.depends = ["Tool"];
Screwdriver.loadBefore = ["Tool"];

Screwdriver.template = {
	vars: {
		components: {
			"Tool": {
				usesound: 'sound/items/screwdriver.ogg'
			},
			"Item": {
				force: 5,
				attack_verb: ["stabbed"],
				inhand_icon_state: "screwdriver",
				size: 1,
				hitsound: 'sound/weapons/bladeslice.ogg'
			},
			"Tangible": {
				throw_force: 5,
				throw_speed: 3,
				throw_range: 5,
			},
			"Examine": {
				desc: "You can be totally screwy with this."
			}
		},
		icon_state: "screwdriver_map",
		name: "screwdriver"
	}
};

class Wirecutters extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(this.random_color)
			this.a.icon_state = `cutters_${['yellow', 'red'][Math.floor(Math.random() * 2)]}`;
	}
}

Wirecutters.depends = ["Tool"];
Wirecutters.loadBefore = ["Tool"];

Wirecutters.template = {
	vars: {
		components: {
			"Wirecutters": {
				random_color: true
			},
			"Tool": {
				usesound: 'sound/items/wirecutter.ogg'
			},
			"Item": {
				force: 6,
				throw_speed: 3,
				throw_range: 7,
				attack_verb: ["pinched", "nipped"],
				size: 2,
				hitsound: 'sound/items/wirecutter.ogg'
			},
			"Examine": {
				desc: "This cuts wires."
			}
		},
		icon_state: "cutters",
		name: "wirecutters"
	}
};

class Crowbar extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

Crowbar.depends = ["Tool"];
Crowbar.loadBefore = ["Tool"];

Crowbar.template = {
	vars: {
		components: {
			"Tool": {
				usesound: 'sound/items/crowbar.ogg'
			},
			"Item": {
				force: 5,
				attack_verb: ["attacked", "bashed", "battered", "bludgeoned", "whacked"],
				size: 2
			},
			"Tangible": {
				throw_force: 7
			},
			"Examine": {
				desc: "A small crowbar. This handy tool is useful for lots of things, such as prying floor tiles or opening unpowered doors."
			}
		},
		icon_state: "crowbar",
		name: "pocket crowbar"
	}
};

class WeldingTool extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.c.ReagentHolder.on("removed", this.update_fuel.bind(this));
		this.a.c.ReagentHolder.on("added", this.update_fuel.bind(this));
		this.a.c.Item.attack_self = chain_func(this.a.c.Item.attack_self, this.attack_self.bind(this));
		this.a.c.Tool.can_use = chain_func(this.a.c.Tool.can_use, this.can_use.bind(this));
		this.update_fuel();
	}

	update_fuel() {
		this.a.overlays.fuel_indicator = {icon_state: `[parent]${Math.ceil(this.get_fuel() / this.a.c.ReagentHolder.maximum_volume * 4) * 25}`};
	}

	update_torch() {
		if(this.a.overlays.welder_on && !this.is_on)
			this.a.overlays.welder_on = null;
		else if(!this.a.overlays.welder_on && this.is_on)
			this.a.overlays.welder_on = {icon_state: `[parent]-on`};
	}

	attack_self(/*prev, user*/) {
		this.is_on = this.get_fuel() > 0 && !this.is_on;
	}

	can_use(prev, tool) {
		if(!prev())
			return false;
		if(tool != "WeldingTool")
			return true;
		return this.is_on && this.get_fuel() > 0;
	}

	use_fuel(amount, user) {
		if(!this.a.c.Tool.can_use("WeldingTool", user))
			return false;
		if(this.get_fuel() >= amount) {
			this.a.c.ReagentHolder.remove("WeldingFuel", amount);
			return true;
		} else {
			to_chat`<span class='warning'>You need more welding fuel to complete this task!</span>`(user);
			return false;
		}
	}

	can_use_fuel(amount, user) {
		return this.get_fuel() >= amount && this.a.c.Tool.can_use("WeldingTool", user);
	}

	get_fuel() {
		return this.a.c.ReagentHolder.volume_of("WeldingFuel");
	}

	get is_on() {
		return this[_is_on];
	}
	set is_on(val) {
		this[_is_on] = val;
		this.update_torch();
	}
}

WeldingTool.depends = ["Tool", "ReagentHolder"];
WeldingTool.loadBefore = ["Tool", "ReagentHolder"];

WeldingTool.template = {
	vars: {
		components: {
			"WeldingTool": {
				activate_sound: 'sound/items/welderactivate.ogg',
				deactivate_sound: 'sound/items/welderdeactivate.ogg',
				is_on: false,
				secured: true,

			},
			"Tool": {
				usesound: 'sound/items/welder.ogg'
			},
			"ReagentHolder": {
				maximum_volume: 20,
				init_reagents: {"WeldingFuel": 123456789},
				reagents_visible: true
			},
			"Item": {
				inhand_icon_state: "welder",
				force: 3,
				hitsound: 'sound/items/welder.ogg',
				size: 2
			},
			"Destructible": {
				armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 100, acid: 30}
			},
			"Tangible": {
				throw_force: 5,
				throw_speed: 3,
				throw_range: 5
			},
			"Examine": {
				desc: "A standard edition welder provided by Nanotrasen."
			}
		},
		name: "welding tool",
		icon_state: "welder",

	}
};

module.exports.templates = {
	"wrench": {
		components: ["Wrench"],
		tree_paths: ["items/tools/wrench"]
	},
	"screwdriver": {
		components: ["Screwdriver"],
		tree_paths: ["items/tools/screwdriver"]
	},
	"wirecutters": {
		components: ["Wirecutters"],
		tree_paths: ["items/tools/wirecutters"]
	},
	"crowbar": {
		components: ["Crowbar"],
		tree_paths: ["items/tools/crowbar"]
	},
	"red_crowbar": {
		components: ["Crowbar"],
		vars: {
			components: {
				"Item": {
					force: 8
				}
			},
			icon_state: "crowbar_red"
		},
		tree_paths: ["items/tools/crowbar/red"]
	},
	"welding_tool": {
		components: ["WeldingTool"],
		tree_paths: ["items/tools/welder"]
	},
	"industrial_welding_tool": {
		components: ["WeldingTool"],
		vars: {
			components: {
				"ReagentHolder": {
					maximum_volume: 40
				},
				"Examine": {
					desc: "A slightly larger welder with a larger tank."
				}
			},
			name: "industrial welding tool",
			icon_state: "indwelder"
		},
		tree_paths: ["items/tools/welder/industrial"]
	},
	"mini_welding_tool": {
		components: ["WeldingTool"],
		vars: {
			components: {
				"ReagentHolder": {
					maximum_volume: 10
				},
				"Item": {
					size: 1
				},
				"Examine": {
					desc: "A miniature welder used during emergencies."
				}
			},
			name: "emergency welding tool",
			icon_state: "miniwelder"
		},
		tree_paths: ["items/tools/welder/emergency"]
	}
};

module.exports.components = {Tool, Wrench, Screwdriver, Wirecutters, Crowbar, WeldingTool};
