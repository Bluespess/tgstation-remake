'use strict';
const {Component, has_component, chain_func, to_chat, Atom} = require('bluespess');
const pass_flags = require('../../../defines/pass_flags.js');

class Rack extends Component { //TODO: attack_hand() and by extension play_attack_sound. Basically, you can't kick racks yet.
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Examine.examine = chain_func(this.a.c.Examine.examine, this.examine.bind(this));
		this.a.c.Destructible.deconstruct = chain_func(this.a.c.Destructible.deconstruct, this.deconstruct.bind(this));
	}

	examine(prev, user) {
		prev();
		to_chat`<span class='notice'>It's held together by a couple of <b>bolts</b>.</span>`(user);
	}

	attack_by(prev, item, user, e) {
		if(has_component(item, "Tool")) {
			if(item.c.Tool.can_use("Wrench", user)) {
				item.c.Tool.used("Wrench");
				this.a.c.Destructible.deconstruct();
				return true;
			}
		} else if(item.c.Item.slot && item.c.Item.slot.can_unequip()) { //Yes this is from table code. Because I like it more than how racks in DM handle placing items. Sue me.
			item.glide_size = 0;
			item.loc = this.a.base_mover.fine_loc;
			let dx = Math.min(Math.max(e.x - 0.5, -0.5), 0.5);
			let dy = Math.min(Math.max(e.y - 0.5, -0.5), 0.5);
			item.move(dx, dy, "placement");
			return true;
		}
	}

	deconstruct() {
		if(!this.a.loc)
			return;
		if(!this.a.c.Destructible.no_deconstruct) {
			this.a.density = 0;
			new Atom(this.a.server, "rack_parts", this.a.loc);
			//TODO: fingerprints
			this.a.destroy();
		}
	}
}

class RackParts extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.c.Item.attack_self = this.attack_self.bind(this);
	}

	attack_by(prev, item, user) {
		if(has_component(item, "Tool")) {
			if(item.c.Tool.can_use("Wrench", user)) {
				item.c.Tool.used("Wrench");
				let sheets = new Atom (this.a.server, "metal_sheet");
				sheets.c.Stack.amount = 2;
				sheets.loc = user.loc;
				this.a.destroy();
				return true;
			}
		}
	}

	attack_self(user) {
		to_chat`<span class='notice'>You start constructing a rack...</span>`(user);
		user.c.MobInventory.do_after({delay: 5000, target: this.a}).then((success) => {
			if(!success)
				return;
			new Atom(this.a.server, "rack", user.loc);
		});
	}
}

Rack.one_per_tile = true;

Rack.depends = ["Destructible"];
Rack.loadBefore = ["Destructible"];

Rack.template = {
	vars: {
		components: {
			"Destructible": {
				max_integrity: 20
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "Different from the Middle Ages version."
			}
		},
		name: "rack",
		icon: 'icons/obj/objects.png',
		icon_state: "rack",
		let_pass_flags: pass_flags.LETPASSTHROW,
		density: 1
	}
};

RackParts.depends = ["Item"];
RackParts.loadBefore = ["Item"];

RackParts.template = {
	vars: {
		components: {
			"Examine": {
				desc: "Parts of a rack."
			}
		},
		name: "rack parts",
		icon: 'icons/obj/items_and_weapons.png',
		icon_state: "rack_parts",
		//TODO: flags_1 = CONDUCT_1
		//TODO: materials = list(MAT_METAL=2000)
	}
};

module.exports.templates = {
	"rack": {
		components: ["Rack"],
		tree_paths: ["basic_structures/rack"]
	},
	"rack_parts": {
		components: ["RackParts"],
		tree_paths: ["items/rack_parts"]
	},
};

module.exports.components = {Rack, RackParts};
