'use strict';

const {Atom, chain_func, Plane} = require('bluespess-client');

module.exports.ParallaxPlane = class ParallaxPlane extends Plane {
	constructor(eye, id) {
		super(eye, id);
		this.no_click = true;

		this.parallax_velocity = [0,0];
		this.parallax_offset = [0,0];
		this.parallax_velocity_lasttimestamp = -1;

		for(let x = 0; x < 2; x++) {
			for(let y = 0; y < 2; y++) {
				for(let layer = 1; layer <= 2; layer++) {
					var parallax_atom = new Atom(this.client, {
						icon: 'icons/effects/parallax.png',
						icon_state: `layer${layer}`,
						layer: -10 + layer,
						eye_id: eye.id
					});
					parallax_atom.get_plane_id = ()=>{return "parallax";};
					parallax_atom.get_displacement = function get_displacement(timestamp) {
						let origin_disp = this.eye && this.eye.origin && this.eye.origin.get_displacement && this.eye.origin.get_displacement(timestamp);
						let dispx = 0;
						let dispy = 0;
						if(origin_disp) {
							dispx = -(origin_disp.dispx + this.get_plane().parallax_offset[0]) * layer;
							dispy = -(origin_disp.dispy + this.get_plane().parallax_offset[1]) * layer;
						}
						dispx = ((dispx % 480) - 480) % 480;
						dispy = ((dispy % 480) - 480) % 480;
						dispx += x*480;
						dispy += y*480;
						dispx /= 32;
						dispy /= 32;
						return {dispx, dispy};
					};
					parallax_atom.draw = chain_func(parallax_atom.draw, function (prev, ctx) {
						ctx.globalCompositeOperation = "lighten";
						prev();
						ctx.globalCompositeOperation = "source-over";
					});
				}
			}
		}
	}

	draw_objects(timestamp) {
		if(this.parallax_velocity_lasttimestamp != -1) {
			let diff = (timestamp - this.parallax_velocity_lasttimestamp) / 1000;
			this.parallax_offset[0] += this.parallax_velocity[0] * diff;
			this.parallax_offset[1] += this.parallax_velocity[1] * diff;
		}
		this.parallax_velocity_lasttimestamp = timestamp;
		super.draw_objects(timestamp);
	}

	draw_gl(transform, timestamp) {
		let gl = this.client.gl;
		gl.blendFunc(gl.ONE, gl.ONE);
		this.draw_objects_gl(transform, timestamp);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	}

	composite_plane(eye_ctx, timestamp) {
		let mctx = this.mask_canvas.getContext('2d');
		mctx.clearRect(0, 0, eye_ctx.canvas.width, eye_ctx.canvas.height);
		mctx.fillStyle = "#ffffff";
		let {dispx, dispy} = (this.eye.origin && this.eye.origin.get_displacement && this.eye.origin.get_displacement(timestamp)) || {dispx:0,dispy:0};
		for(let tile of this.client.visible_tiles) {
			let [x,y] = JSON.parse(tile);
			mctx.fillRect(Math.round((x-dispx+7)*32), Math.round(-(y-dispy-7)*32), 32, 32);
		}
		mctx.globalCompositeOperation = "source-in";
		super.composite_plane(mctx, timestamp);
		mctx.globalCompositeOperation = "source-over";
		eye_ctx.globalCompositeOperation = "destination-over";
		eye_ctx.drawImage(this.mask_canvas, 0, 0);
		eye_ctx.globalCompositeOperation = "source-over";
	}
};
