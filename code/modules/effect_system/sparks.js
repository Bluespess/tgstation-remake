'use strict';

const {Component, Sound, Atom, has_component} = require('bluespess');
const pass_flags = require('../../defines/pass_flags.js');
const sounds = require('../../defines/sounds.js');
const layers = require('../../defines/layers.js');
const EffectSystem = require('./effect_system.js');

class SparkEffect extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("moved", this.moved.bind(this));
		this.a.flick = {icon_state: "sparks"};
		this.a.once("moved", () => {
			new Sound(this.a.server, {path: sounds.sparks(), vary: true}).emit_from(this.a);
		});
		setTimeout(() => {
			this.a.destroy();
		}, 2000);
	}

	moved() {
		var turf = this.a.base_loc && this.a.base_loc.turf;
		if(has_component(turf, "SimulatedTurf"))
			turf.c.SimulatedTurf.hotspot_expose(1000,100);
	}
}

SparkEffect.depends = ["LightSource"];
SparkEffect.loadBefore = ["LightSource"];

SparkEffect.template = {
	vars: {
		components: {
			"LightSource": {
				enabled: true,
				range: 1,
				color: "#444444"
			}
		},
		icon: 'icons/effects/effects.png',
		icon_state: "sparks",
		let_pass_flags: pass_flags.PASSTABLE | pass_flags.PASSGRILLE,
		name: "sparks",
		layer: layers.OBJ_LAYER
	}
};

class SparkSystem extends EffectSystem {
	create_effect_atom(location) {
		return new Atom(this.server, {components:["SparkEffect"]}, location);
	}
}

module.exports = SparkSystem;

module.exports.components = {SparkEffect};
