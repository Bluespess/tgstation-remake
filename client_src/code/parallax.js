'use strict';

const {Atom, chain_func} = require('bluespess-client');

function create_mask(ctx, timestamp) {
	this.parallax_mask = new Path2D();
	var eye = this.eyes[""];
	if(eye instanceof Atom)
		eye.update_glide(timestamp);
	ctx.fillStyle = "#ffffff";
	for(let tile of this.visible_tiles) {
		tile = JSON.parse(tile);
		let [x,y] = tile;
		this.parallax_mask.rect(Math.round((x-eye.x-(eye.glide?eye.glide.x:0)+7)*32), -Math.round((y-eye.y-(eye.glide?eye.glide.y:0)-7)*32), 32, 32);
	}
}

module.exports.now = (client) => {
	if(global.is_bs_editor_env)
		return;
	client.on("before_draw", create_mask.bind(client));
	for(let x = 0; x < 2; x++) {
		for(let y = 0; y < 2; y++) {
			for(let layer = 1; layer <= 2; layer++) {
				var parallax_atom = new Atom(client, {
					icon: 'icons/effects/parallax.png',
					icon_state: `layer${layer}`,
					layer: -10 + layer
				});
				parallax_atom.get_displacement = function get_displacement() {
					return {dispx: 0, dispy: 0};
				};
				parallax_atom.draw = chain_func(parallax_atom.draw, function (prev, ctx, timestamp) {
					var eye = client.eyes[""];
					if(!eye)
						return {dispx: 0, dispy: 0};
					if(eye instanceof Atom)
						eye.update_glide(timestamp);
					let dispx = (-eye.x - (eye.glide?eye.glide.x:0)) * layer;
					let dispy = (+eye.y + (eye.glide?eye.glide.y:0)) * layer;
					dispx = ((dispx % 480) - 480) % 480;
					dispy = ((dispy % 480) - 480) % 480;
					dispx += x*480;
					dispy += y*480;
					ctx.save();
					if(client.parallax_mask)
						ctx.clip(client.parallax_mask);
					ctx.translate(dispx, dispy);
					ctx.globalCompositeOperation = "lighten";
					prev();
					ctx.globalCompositeOperation = "source-over";
					ctx.restore();
				});
			}
		}
	}
};
