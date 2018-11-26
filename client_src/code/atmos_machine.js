'use strict';
const {Component, Atom} = require('bluespess-client');

class AtmosMachine extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.under_floor_obj = new Atom(this.a.client, {eye_id: this.a.eye_id});
		this.under_floor_obj.get_displacement = (timestamp) => {return this.a.get_displacement(timestamp);};
		this.under_floor_obj.get_plane = (timestamp) => {return this.a.get_plane(timestamp);};
		this.under_floor_obj.get_plane_id = (timestamp) => {return this.a.get_plane_id(timestamp);};
		this.under_floor_obj.layer = 2.35;
	}

	set node_display(val) {
		if(!val)
			return;
		for(let i = 0; i < val.length; i++) {
			let dir = 1 << i;
			let obj = val[i];
			if(!obj) {
				this.a.set_overlay(`atmos_pipe_${dir}`, null);
				this.under_floor_obj.set_overlay(`atmos_pipe_${dir}`, null);
			} else {
				let overlay = {icon: 'icons/obj/atmospherics/components/binary_devices.dmi', icon_state: obj[1] ? "pipe_intact" : "pipe_exposed", dir, color: obj[0], overlay_layer: -1};
				this.a.set_overlay(`atmos_pipe_${dir}`, obj[2] ? overlay : null);
				this.under_floor_obj.set_overlay(`atmos_pipe_${dir}`, obj[2] ? null : overlay);
			}
		}
	}
	destroy() {
		this.under_floor_obj.destroy();
	}
}

module.exports.components = {AtmosMachine};
