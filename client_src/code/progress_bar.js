'use strict';
const {chain_func, Component} = require('bluespess-client');

const PROGRESSBAR_HEIGHT = 6/32;

const _progress_bars = Symbol('_progress_bars');

class ProgressBar extends Component {
	constructor(atom, template) {
		super(atom, template);
		atom.get_displacement = this.get_displacement.bind(this);
		atom.get_plane_id = this.get_plane_id.bind(this);
		atom.on_render_tick = chain_func(atom.on_render_tick, this.on_render_tick.bind(this));
	}

	update_offset(timestamp) {
		if(this.target_offset_y && this.target_offset_y <this.offset_y && this.last_timestamp) {
			this.offset_y = Math.max(this.target_offset_y, this.offset_y - (timestamp - this.last_timestamp) / 640);
		}

		if(!this.attached_atom) {
			this.attached_atom = this.atom.client.atoms_by_netid[this.attached_atom_id];
			if(!this.attached_atom[_progress_bars])
				this.attached_atom[_progress_bars] = [];
			this.target_offset_y = 1 + (PROGRESSBAR_HEIGHT * this.attached_atom[_progress_bars].length);
			if(this.attached_atom[_progress_bars].length) {
				var prev_bar = this.attached_atom[_progress_bars][this.attached_atom[_progress_bars].length - 1];
				if(prev_bar.c.ProgressBar.offset_y)
					this.offset_y = prev_bar.c.ProgressBar.offset_y + PROGRESSBAR_HEIGHT;
				else
					this.offset_y = this.target_offset_y;
			} else
				this.offset_y = this.target_offset_y;
			this.attached_atom[_progress_bars].push(this.atom);
		}

		this.last_timestamp = timestamp;
	}

	get_plane_id() {
		if(this.attached_atom) {
			return this.attached_atom.get_plane_id();
		}
	}

	get_displacement(timestamp) {
		this.update_offset(timestamp);
		if(this.attached_atom) {
			var disp = this.attached_atom.get_displacement(timestamp);
			disp.dispy += this.offset_y;
			return disp;
		}
		return null;
	}

	on_render_tick(prev, timestamp) {
		this.update_offset(timestamp);
		var percentage = (timestamp - (this.time_begin + this.atom.client.server_time_to_client)) / this.delay;
		this.atom.icon_state = `prog_bar_${Math.max(0, Math.min(20, Math.round(percentage * 20))) * 5}`;
		prev();
	}

	destroy() {
		super.destroy();
		if(this.attached_atom && this.attached_atom[_progress_bars]) {
			var list = this.attached_atom[_progress_bars];
			var idx = list.indexOf(this.atom);
			if(idx != -1) {
				list.splice(idx, 1);
				for(let i = idx; i < list.length; i++) {
					list[i].components.ProgressBar.target_offset_y -= PROGRESSBAR_HEIGHT;
				}
			}
		}
	}
}

module.exports.components = {ProgressBar};
