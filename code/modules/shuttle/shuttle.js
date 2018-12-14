'use strict';
const {Atom, Component, Dimension, has_component, turn_dir} = require('bluespess');

class DockingPort extends Component {}

DockingPort.template = {
	vars: {
		components: {
			"DockingPort": {
				id: null
			}
		},
		name: "dock",
		visible: false,
		icon: 'icons/obj/device.png',
		icon_state: "pinonfar"
	}
};

class TransitDockingPort extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.DockingPort.on("docked", this.docked.bind(this));
		this.a.c.DockingPort.on("undocked", this.undocked.bind(this));
		this.helper = null;
		this.a.once("moved", () => {
			this.helper = new Atom(this.a.server, {components: ["TransitHelper"],vars: {dir: this.transit_dir}}, this.a.x, this.a.y, this.a.z, this.a.dim);
		});
	}

	docked(shuttle) {
		if(!this.helper)
			return;
		let left = this.helper.x + this.helper.bounds_x;
		let bottom = this.helper.y + this.helper.bounds_y;
		let right = left + this.helper.bounds_width;
		let top = bottom + this.helper.bounds_height;
		for(let atom of shuttle.c.Area.area_brushes) {
			let a_left = atom.x + atom.bounds_x;
			let a_bottom = atom.y + atom.bounds_y;
			let a_right = a_left + atom.bounds_width;
			let a_top = a_bottom + atom.bounds_height;
			left = Math.min(left, a_left);
			bottom = Math.min(bottom, a_bottom);
			right = Math.max(right, a_right);
			top = Math.max(top, a_top);
		}
		this.helper.resize(left - this.helper.x, bottom - this.helper.y, right - left, top - bottom);
	}

	undocked() { // we want to leave the z-level empty
		if(this.helper)
			this.helper.destroy();
		this.a.destroy(); // we're done, no need for this shizz anymore
	}
}

TransitDockingPort.loadBefore = ["DockingPort"];
TransitDockingPort.depends = ["DockingPort"];

TransitDockingPort.template = {
	vars: {
		components: {
			"TransitDockingPort": {
				transit_dir: 1
			}
		},
		name: "In Transit"
	}
};

// basically a marker object. Sending this object to the client will cause the space to start scrolling
class TransitHelper extends Component.Networked {}

class Shuttle extends Component {
	constructor(atom, template) {
		super(atom, template);
	}

	get_docked() {
		for(let atom of this.a.crosses()) {
			if(has_component(atom, "DockingPort") && atom.x == this.a.x && atom.y == this.a.y && atom.z == this.a.z && atom.dir == this.a.dir) {
				return atom;
			}
		}
	}

	dock(target) {
		let old_dock = this.get_docked();
		if(!target || target == old_dock)
			return;
		let dock_atoms = new Set([...this.a.c.Area.touching, ...this.a.c.Area.area_brushes, this.a].filter((atom) => {
			if(atom == old_dock) // obviously we don't bring the old dock with us
				return false;
			if(atom.dim != this.a.dim) // this shouldn't happen ever but meh
				return false;
			if(has_component(atom, "TransitHelper") || has_component(atom, "LightingObject")) // let's not drag the transit helpers or light objects around
				return false;
			return true;
		}));
		let dx = target.x - this.a.x;
		let dy = target.y - this.a.y;
		let dz = target.z - this.a.z;
		for(let atom of dock_atoms) {
			atom.force_move(atom.x + dx, atom.y + dy, atom.z + dz, target.dim);
		}
		old_dock.c.DockingPort.emit("undocked", this.a);
		target.c.DockingPort.emit("docked", this.a);
	}

	enter_transit() {
		let dim = new Dimension();
		let transit_dock = new Atom(this.a.server, {
			components: ["TransitDockingPort"],
			vars: {
				components: {
					"TransitDockingPort": {
						transit_dir: turn_dir(this.a.dir, this.port_direction)
					}
				},
				dir: this.a.dir
			}
		}, 0, 0, 0, dim);
		this.dock(transit_dock);
	}
}

Shuttle.loadBefore = ["Area", "AreaPower"];
Shuttle.depends = ["Area"];

Shuttle.template = {
	vars: {
		components: {
			"Shuttle": {
				port_direction: 0 // angle offset between dir and where shuttle actually points in degrees
			},
			"Area": {
				brush_icon_state: "shuttle"
			},
			"AreaPower": {
				infinite_power: true
			}
		},
		name: "Shuttle"
	}
};

module.exports.templates = {
	"docking_port": {
		components: ["DockingPort"]
	},
	"area_shuttle": {
		components: ["Shuttle", "AreaPower"]
	}
};

module.exports.components = {Shuttle, DockingPort, TransitDockingPort, TransitHelper};
