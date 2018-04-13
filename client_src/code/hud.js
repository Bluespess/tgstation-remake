'use strict';
const {Component, chain_func} = require('bluespess-client');

class GridDisplay extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.get_bounds = chain_func(this.a.get_bounds, this.get_bounds.bind(this));
		this.a.draw = chain_func(this.a.draw, this.draw.bind(this));
		this.a.is_mouse_over = chain_func(this.a.is_mouse_over, this.is_mouse_over.bind(this));
	}

	get_bounds(prev) {
		var bounds = prev();
		if(!bounds)
			return bounds;
		bounds.width += (this.width - 1) * this.offset_x * 32;
		bounds.height += (this.height - 1) * this.offset_y * 32;
		return bounds;
	}

	draw(prev, ctx) {
		for(let x = 0; x < this.width; x++) {
			for(let y = 0; y < this.height; y++) {
				ctx.save();
				ctx.translate(x*this.offset_x*32, -y*this.offset_y*32);
				prev(); // you can call prev() more than once, and I found a reason to. Woo!
				ctx.restore();
			}
		}
	}

	is_mouse_over(prev, x, y) {
		for(let ox = 0; ox < this.width; ox++) {
			for(let oy = 0; oy < this.height; oy++) {
				if(prev(x-ox, y-oy))
					return true;
			}
		}
		return false;
	}
}

module.exports.components = {GridDisplay};
