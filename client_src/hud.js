'use strict';
const {Component, chain_func} = require('bluespess-client');

class GridDisplay extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.get_bounds = chain_func(this.a.get_bounds, this.get_bounds.bind(this));
		this.a.draw = chain_func(this.a.draw, this.draw.bind(this));
	}

	get_bounds(prev) {
		var bounds = prev();
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
}

module.exports.components = {GridDisplay};
