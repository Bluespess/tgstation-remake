'use strict';
const {Component, has_component} = require('bluespess');

const _smooth_with = Symbol('_smooth_with');
const _enabled = Symbol('_enabled');

class Smooth extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.adjacent = 0;
		this.a.on("moved", this.rebuild_smooth.bind(this));
	}

	rebuild_smooth(exclude) {
		this.a.icon_state = "";
		this.adjacent = 0;
		if(!this.enabled)
			return this.redraw_smoothing();
		for(let loc of this.a.marginal_locs()) {
			for(let atom of loc.partial_contents) {
				if(atom == exclude || atom == this.a)
					continue;
				if(!has_component(atom, "SmoothGroup"))
					continue;
				if(!atom.c.SmoothGroup.enabled || !atom.c.SmoothGroup.groups.includes(this.smooth_with))
					continue;
				let left_touch = Math.abs((atom.x + atom.bounds_x + atom.bounds_width) - (this.a.x + this.a.bounds_x)) < 0.00001;
				let right_touch = Math.abs((atom.x + atom.bounds_x) - (this.a.x + this.a.bounds_x + this.a.bounds_width)) < 0.00001;
				let top_touch = Math.abs((atom.y + atom.bounds_y) - (this.a.y + this.a.bounds_y + this.a.bounds_height)) < 0.00001;
				let bottom_touch = Math.abs((atom.y + atom.bounds_y + atom.bounds_height) - (this.a.y + this.a.bounds_y)) < 0.00001;
				if(Math.abs(atom.x - this.a.x) < 0.00001) {
					if(bottom_touch) {
						this.adjacent |= (1 << 2);
					}
					if(top_touch) {
						this.adjacent |= (1 << 1);
					}
				}
				if(Math.abs(atom.y - this.a.y) < 0.00001) {
					if(left_touch) {
						this.adjacent |= (1 << 8);
					}
					if(right_touch) {
						this.adjacent |= (1 << 4);
					}
				}
				if(top_touch && right_touch)
					this.adjacent |= (1 << 5);
				if(bottom_touch && right_touch)
					this.adjacent |= (1 << 6);
				if(top_touch && left_touch)
					this.adjacent |= (1 << 9);
				if(bottom_touch && left_touch)
					this.adjacent |= (1 << 10);
			}
		}
		this.redraw_smoothing();
	}

	redraw_smoothing() {
		// implement this yourself. in another component.
	}

	get smooth_with() {
		return this[_smooth_with];
	}
	set smooth_with(val) {
		if(val == this[_smooth_with])
			return;
		this[_smooth_with] = val;
		if(this.a)
			this.rebuild_smooth();
	}

	get enabled() {
		return this[_enabled];
	}
	set enabled(val) {
		if(val == this[_enabled])
			return;
		this[_enabled] = val;
		if(this.a)
			this.rebuild_smooth();
	}
}

Smooth.depends = ["SmoothGroup"];
Smooth.loadBefore = ["SmoothGroup"];

Smooth.template = {
	vars: {
		components: {
			"Smooth": {
				smooth_with: null,
				enabled: true
			}
		}
	}
};

class SmoothGroup extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("before_move", this.before_move.bind(this));
		this.a.on("moved", this.moved.bind(this));
	}

	before_move() {
		for(let loc of this.a.marginal_locs()) {
			for(let atom of loc.partial_contents) {
				if(has_component(atom, "Smooth") && atom.c.Smooth.enabled && this.groups.includes(atom.c.Smooth.smooth_with)) {
					atom.c.Smooth.rebuild_smooth(this.a);
				}
			}
		}
	}

	moved() {
		for(let loc of this.a.marginal_locs()) {
			for(let atom of loc.partial_contents) {
				if(has_component(atom, "Smooth") && atom.c.Smooth.enabled && this.groups.includes(atom.c.Smooth.smooth_with)) {
					atom.c.Smooth.rebuild_smooth();
				}
			}
		}
	}

	get enabled() {
		return this[_enabled];
	}
	set enabled(val) {
		if(val == this[_enabled])
			return;
		this[_enabled] = val;
		if(this.a)
			this.moved();
	}
}

SmoothGroup.template = {
	vars: {
		components: {
			"SmoothGroup": {
				smooth_with: [],
				enabled: true
			}
		}
	}
};

// TG shitcode smoothing
class TGSmooth extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Smooth.redraw_smoothing = this.redraw_smoothing.bind(this);
	}

	redraw_smoothing() {
		let adjacent = this.a.c.Smooth.adjacent;
		for(let i of [1,2,3,4]) {
			let corner = [9,5,10,6][i-1];
			let dir_string = "";
			if((corner & 1) && (adjacent & (1 << 1)))
				dir_string += "n";
			if((corner & 2) && (adjacent & (1 << 2)))
				dir_string += "s";
			if((corner & 4) && (adjacent & (1 << 4)))
				dir_string += "e";
			if((corner & 8) && (adjacent & (1 << 8)))
				dir_string += "w";
			if(dir_string.length == 0)
				dir_string = "i";
			else if(dir_string.length >= 2) {
				if(adjacent & (1 << corner))
					dir_string = "f";
			}
			this.a.overlays[`smoothing_corner_${i}`] = {icon_state: `${i}-${dir_string}`};
		}
	}
}

TGSmooth.depends = ["Smooth"];
TGSmooth.loadBefore = ["Smooth"];

module.exports.components = {Smooth, SmoothGroup, TGSmooth};
