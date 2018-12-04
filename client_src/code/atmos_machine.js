'use strict';
const {Component, Atom} = require('bluespess-client');

class AtmosMachine extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.under_floor_obj = new Atom(this.a.client, {eye_id: this.a.eye_id});
		this.under_floor_obj.get_displacement = (timestamp) => {this.under_floor_obj.dir = this.a.dir; return this.a.get_displacement(timestamp);};
		this.under_floor_obj.get_plane = (timestamp) => {return this.a.get_plane(timestamp);};
		this.under_floor_obj.get_plane_id = (timestamp) => {return this.a.get_plane_id(timestamp);};
		this.under_floor_obj.layer = 2.35;
		this.update_node_display();
		this.cap_overlay = this.cap_overlay;
	}

	set node_display(val) {
		this._node_display = val;
		this.update_node_display();
	}
	get node_display() {return this._node_display;}

	set cap_overlay(val) {
		if(this.under_floor_obj)
			this.under_floor_obj.set_overlay(`cap`, val);
		this._cap_overlay = val;
	}
	get cap_overlay() {
		return this._cap_overlay;
	}

	update_node_display() {
		if(!this.node_display || !this.under_floor_obj)
			return;
		console.log(this.node_display);
		for(let i = 0; i < this.node_display.length; i++) {
			let dir = 1 << i;
			let obj = this.node_display[i];
			if(!obj) {
				this.a.set_overlay(`atmos_pipe_${dir}`, null);
				this.under_floor_obj.set_overlay(`atmos_pipe_${dir}`, null);
			} else {
				let overlay = {icon: 'icons/obj/atmospherics/components/binary_devices.png', icon_state: obj[1] ? "pipe_intact" : "pipe_exposed", dir, color: obj[0], overlay_layer: -1};
				this.a.set_overlay(`atmos_pipe_${dir}`, obj[2] ? overlay : null);
				this.under_floor_obj.set_overlay(`atmos_pipe_${dir}`, obj[2] ? null : overlay);
			}
		}
	}
	destroy() {
		this.under_floor_obj.del();
	}
}

module.exports.components = {AtmosMachine};
