'use strict';
const {Component, Sound, Panel, has_component, make_watched_property} = require('bluespess');
const _ = require('underscore');

class MachineWires extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.wires = [];
		this.colors = {};
		this.wire_types = {};
		let group_def = null;
		if(!this.wire_group || !this.a.server.wire_groups[this.wire_group]) {
			let colors = _.shuffle(["blue", "brown", "crimson", "cyan", "gold", "grey",
				"green", "magenta", "orange", "pink", "purple", "red", "silver",
				"violet", "white", "yellow"]);
			group_def = [];
			for(let [type, name] of _.shuffle(Object.entries(this.wire_defs))) {
				if(name === undefined)
					continue;
				let color = colors.pop();

				let template_obj = {
					color,
					name,
					type
				};
				group_def.push(template_obj);
			}
			if(this.wire_group)
				this.a.server.wire_groups[this.wire_group] = group_def;
		} else {
			group_def = this.a.server.wire_groups[this.wire_group];
		}
		for(let def of group_def) {
			let wire_obj = Object.assign({}, def);
			this.wires.push(wire_obj);
			this.colors[wire_obj.color] = wire_obj;
			this.wire_types[wire_obj.type] = wire_obj;

			let cut = false;
			Object.defineProperty(wire_obj, "cut", {
				get: () => {return cut;},
				set: (val) => {
					val = !!val;
					if(cut == val)
						return;
					cut = val;
					if(cut)
						this.emit("cut", wire_obj);
					else
						this.emit("mend", wire_obj);
				}
			});
			wire_obj.pulse = (user) => {
				if(wire_obj.cut)
					return;
				this.emit("pulse", wire_obj, user);
			};
			wire_obj.do_cut = (user) => {
				if(wire_obj.cut)
					return;
				cut = true;
				this.emit("cut", wire_obj, user);
			};
			wire_obj.do_mend = (user) => {
				if(!wire_obj.cut)
					return;
				cut = false;
				this.emit("mend", wire_obj, user);
			};
		}
		make_watched_property(this, "status_text", "string");
	}

	show_ui(user) {
		if(user.c.Mob.get_panel(this.a, MachineWirePanel) || !user.c.Mob.can_read_panel(this.a, MachineWirePanel)) {
			return;
		}
		var panel = new MachineWirePanel(user.c.Mob.client, {title: `${this.a.name} wires`, width:350, height:150 + this.wires.length * 30});
		user.c.Mob.bind_panel(this.a, panel);
		panel.open();
	}

	is_wire_tool(tool) {
		if(has_component(tool, "Tool") && (tool.c.Tool.can_use("Wirecutters", this.bound_mob) || tool.c.Tool.can_use("Multitool", this.bound_mob)))
			return true;
		return false;
	}

	update_status_text() {
		this.status_text = this.build_status_text();
	}

	build_status_text() {
		return "";
	}
}

MachineWires.loadBefore = [];
MachineWires.depends = [];

MachineWires.template = {
	vars: {
		components: {
			"MachineWires": {
				wire_defs: {}, // a list of wire IDs
				// but be careful though the individual wire IDs will be inherited
				wire_group: null, // if not null all wire machines with the same group will have the same
				status_text: null
			}
		}
	}
};

class MachineWirePanel extends Panel {
	constructor(client, obj) {
		super(client, obj);

		this.wire_cut_changed = this.wire_cut_changed.bind(this);
		this.status_text_changed = this.status_text_changed.bind(this);
		this.active_hand_item_changed = this.active_hand_item_changed.bind(this);

		this.on("open", () => {
			this.bound_atom.c.MachineWires.on("cut", this.wire_cut_changed);
			this.bound_atom.c.MachineWires.on("mend", this.wire_cut_changed);
			this.bound_atom.c.MachineWires.on("status_text_changed", this.status_text_changed);
			if(has_component(this.bound_mob, "MobInventory")) {
				this.bound_mob.c.MobInventory.on("active_hand_item_changed", this.active_hand_item_changed);
				this.active_hand_item_changed(null, this.bound_mob.c.MobInventory.slots[this.bound_mob.c.MobInventory.active_hand].item);
			}
			let wires_obj = this.bound_atom.c.MachineWires.wires.map(wire => {
				return _.pick(wire, "color", "cut");
			});
			this.send_message({wires: wires_obj, status_text: this.bound_atom.c.MachineWires.status_text});
		});
		this.on("close", () => {
			this.bound_atom.c.MachineWires.removeListener("cut", this.wire_cut_changed);
			this.bound_atom.c.MachineWires.removeListener("mend", this.wire_cut_changed);
			this.bound_atom.c.MachineWires.removeListener("status_text_changed", this.status_text_changed);
			if(has_component(this.bound_mob, "MobInventory"))
				this.bound_mob.c.MobInventory.removeListener("active_hand_item_changed", this.active_hand_item_changed);
		});
		this.on("message", (msg) => {
			let tool = null;
			if(has_component(this.bound_mob, "MobInventory"))
				tool = this.bound_mob.c.MobInventory.slots[this.bound_mob.c.MobInventory.active_hand].item;
			if(msg.cut && has_component(tool, "Tool") && tool.c.Tool.can_use("Wirecutters", this.bound_mob)) {
				tool.c.Tool.used("Wirecutters");
				let wire = this.bound_atom.c.MachineWires.colors[msg.cut];
				if(wire) {
					if(wire.cut)
						wire.do_mend(this.bound_mob);
					else
						wire.do_cut(this.bound_mob);
				}
			}
			if(msg.pulse && has_component(tool, "Tool") && tool.c.Tool.can_use("Multitool", this.bound_mob)) {
				new Sound(this.client.server, {path: 'sound/weapons/empty.ogg', vary: true, volume: 0.2}).emit_from(this.bound_atom);
				let wire = this.bound_atom.c.MachineWires.colors[msg.pulse];
				if(wire) {
					wire.pulse();
				}
			}
		});
	}
	active_hand_item_changed(from, to) {
		let item_type = null;
		if(has_component(to, "Tool") && to.c.Tool.can_use("Wirecutters", this.bound_mob))
			item_type = "Wirecutters";
		else if(has_component(to, "Tool") && to.c.Tool.can_use("Multitool", this.bound_mob))
			item_type = "Multitool";
		this.send_message({item_type});
	}
	wire_cut_changed(wire) {
		this.send_message({wires: [{color: wire.color, cut: wire.cut}]});
	}
	status_text_changed(from, to) {
		this.send_message({status_text: to});
	}
}

module.exports.now = (server) => {
	server.wire_groups = {};
};

module.exports.components = {MachineWires};
