'use strict';
const {Component, chain_func} = require('bluespess-client');

class SplashScreen extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.fading = false;
		this.fade_start = 0;
		this.fade_len = 1500;
		this.a.del = chain_func(this.a.del, this.del.bind(this));
		this.a.on_render_tick = chain_func(this.a.on_render_tick, this.on_render_tick.bind(this));
		this.a.draw = chain_func(this.a.draw, this.draw.bind(this));
		this.a.draw_gl = chain_func(this.a.draw_gl, this.draw_gl.bind(this));
	}

	on_render_tick(prev) {
		prev();
		if(this.fading)
			this.a.mark_dirty();
	}

	draw(prev, ctx, timestamp) {
		let old_alpha = ctx.globalAlpha;
		if(this.fading) {
			ctx.globalAlpha *= (1 - 1 / this.fade_len * (timestamp - this.fade_start));
		}
		prev();
		ctx.globalAlpha = old_alpha;
	}

	draw_gl(prev, transform, timestamp) {
		if(this.fading) {
			this.a.alpha = (1 - 1 / this.fade_len * (timestamp - this.fade_start));
		} else {
			this.a.alpha = 1;
		}
		prev();
	}

	del(prev) {
		this.fading = true;
		this.fade_start = performance.now();
		setTimeout(prev, this.fade_len);
	}
}

module.exports.components = {SplashScreen};
