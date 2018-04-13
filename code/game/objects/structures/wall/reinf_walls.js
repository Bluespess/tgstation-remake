'use strict';
const {Component, has_component, to_chat} = require('bluespess');

const d_states = {
	intact: 0,
	support_lines: 1,
	cover: 2,
	cut_cover: 3,
	bolts: 4,
	support_rods: 5,
	sheath: 6
};

const _d_state = Symbol('_d_state');

class RWall extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.on("d_state_changed", this.d_state_changed.bind(this));
		this.a.c.Wall.try_decon = this.try_decon.bind(this);
		this.a.c.Wall.deconstruction_hints = this.deconstruction_hints.bind(this);
	}

	deconstruction_hints(user) {
		switch(this.d_state) {
		case "intact":
			to_chat`<span class='notice'>The outer <b>grille</b> is fully intact.</span>`(user);
			break;
		case "support_lines":
			to_chat`<span class='notice'>The outer <i>grille</i> has been cut, and the support lines are <b>screwed</b> securely to the outer cover.</span>`(user);
			break;
		case "cover":
			to_chat`<span class='notice'>The support lines have been <i>unscrewed</i>, and the metal cover is <b>welded</b> firmly in place.</span>`(user);
			break;
		case "cut_cover":
			to_chat`<span class='notice'>The metal cover has been <i>sliced through</i>, and is <b>connected loosely</b> to the girder.</span>`(user);
			break;
		case "bolts":
			to_chat`<span class='notice'>The outer cover has been <i>pried away</i>, and the bolts anchoring the support rods are <b>wrenched</b> in place.</span>`(user);
			break;
		case "support_rods":
			to_chat`<span class='notice'>The bolts anchoring the support rods have been <i>loosened</i>, but are still <b>welded</b> firmly to the girder.</span>`(user);
			break;
		case "sheath":
			to_chat`<span class='notice'>The support rods have been <i>sliced through</i>, and the outer sheath is <b>connected loosely</b> to the girder.</span>`(user);
			break;
		}
	}

	try_decon(item, user) {
		let istool = has_component(item, "Tool");
		switch(this.d_state) {
		case "intact":
			if(istool && item.c.Tool.can_use("Wirecutters", user)) {
				item.c.Tool.used("Wirecutters");
				this.d_state = "support_lines";
				to_chat`<span class='notice'>You cut the outer grille.</span>`(user);
				return true;
			}
			break;
		case "support_lines":
			if(istool && item.c.Tool.can_use("Screwdriver", user)) {
				to_chat`<span class='notice'>You begin unsecuring the support lines...</span>`(user);
				item.c.Tool.used("Screwdriver");
				user.c.MobInventory.do_after({delay: 4000 * item.c.Tool.toolspeed, target: this.a}).then((success)=>{
					if(!success || this.d_state != "support_lines")
						return;
					this.d_state = "cover";
					to_chat`<span class='notice'>You unsecure the support lines.</span>`(user);
				});
				return true;
			}
			break;
		case "cover":
			if(istool && item.c.Tool.can_use("WeldingTool", user)) {
				to_chat`<span class='notice'>You begin slicing through the metal cover...</span>`(user);
				item.c.Tool.used("WeldingTool");
				user.c.MobInventory.do_after({delay: 6000 * item.c.Tool.toolspeed, target: this.a}).then((success)=>{
					if(!success || this.d_state != "cover")
						return;
					this.d_state = "cut_cover";
					to_chat`<span class='notice'>You press firmly on the cover, dislodging it.</span>`(user);
				});
				return true;
			}
			break;
		case "cut_cover":
			if(istool && item.c.Tool.can_use("Crowbar", user)) {
				to_chat`<span class='notice'>You struggle to pry off the cover...</span>`(user);
				item.c.Tool.used("Crowbar");
				user.c.MobInventory.do_after({delay: 10000 * item.c.Tool.toolspeed, target: this.a}).then((success)=>{
					if(!success || this.d_state != "cut_cover")
						return;
					this.d_state = "bolts";
					to_chat`<span class='notice'>You pry off the cover.</span>`(user);
				});
				return true;
			}
			break;
		case "bolts":
			if(istool && item.c.Tool.can_use("Wrench", user)) {
				to_chat`<span class='notice'>You start loosening the anchoring bolts which secure the support rods to their frame...</span>`(user);
				item.c.Tool.used("Wrench");
				user.c.MobInventory.do_after({delay: 4000 * item.c.Tool.toolspeed, target: this.a}).then((success)=>{
					if(!success || this.d_state != "bolts")
						return;
					this.d_state = "support_rods";
					to_chat`<span class='notice'>You remove the bolts anchoring the support rods.</span>`(user);
				});
				return true;
			}
			break;
		case "support_rods":
			if(istool && item.c.Tool.can_use("WeldingTool", user)) {
				to_chat`<span class='notice'>You begin slicing through the support rods...</span>`(user);
				item.c.Tool.used("WeldingTool");
				user.c.MobInventory.do_after({delay: 10000 * item.c.Tool.toolspeed, target: this.a}).then((success)=>{
					if(!success || this.d_state != "support_rods")
						return;
					this.d_state = "sheath";
					to_chat`<span class='notice'>You slice through the support rods.</span>`(user);
				});
				return true;
			}
			break;
		case "sheath":
			if(istool && item.c.Tool.can_use("Crowbar", user)) {
				to_chat`<span class='notice'>You struggle to pry off the outer sheath...</span>`(user);
				item.c.Tool.used("Crowbar");
				user.c.MobInventory.do_after({delay: 10000 * item.c.Tool.toolspeed, target: this.a}).then((success)=>{
					if(!success || this.d_state != "sheath")
						return;
					to_chat`<span class='notice'>You pry off the outer sheath.</span>`(user);
					this.a.c.Destructible.deconstruct(true);
				});
				return true;
			}
			break;
		}
	}

	get d_state() {
		return this[_d_state];
	}
	set d_state(val) {
		let old = this[_d_state];
		if(val == old)
			return;
		this[_d_state] = val;
		this.emit("d_state_changed", old, val);
	}

	d_state_changed(old, val) {
		if(val == "intact") {
			this.a.icon_state = this.a.template.vars.icon_state;
			this.a.c.Smooth.enabled = this.a.template.vars.components.Smooth.enabled;
			this.a.c.SmoothGroup.enabled = this.a.template.vars.components.SmoothGroup.enabled;
		} else {
			this.a.icon_state = `${this.a.template.vars.icon_state}-${d_states[val]}`;
			this.a.c.Smooth.enabled = false;
			this.a.c.SmoothGroup.enabled = false;
		}
	}
}

RWall.loadBefore = ["Wall", "Destructible", "Smooth"];
RWall.depends = ["Wall", "Destructible", "Smooth"];

RWall.template = {
	vars: {
		components: {
			"RWall": {
				d_state: "intact"
			},
			"Wall": {
				sheet_type: "plasteel_sheet",
				sheet_amount: 1,
				girder_type: "girder_reinforced"
			},
			"Smooth": {
				smooth_with: "wall"
			},
			"SmoothGroup": {
				groups: ["wall"]
			},
			"Examine": {
				desc: "A huge chunk of reinforced metal used to separate rooms."
			}
		},
		name: "reinforced wall",
		icon: 'icons/turf/walls/reinforced_wall.png',
		icon_state: "r_wall"
	}
};

module.exports.templates = {

	"r_wall": {
		components: ["RWall", "TGSmooth"],
		tree_paths: ["basic_structures/wall/reinforced"],
		requires_under: {
			component: "FloorBase",
			default: "plating"
		}
	}
};

module.exports.components = {RWall};
