'use strict';
const {Component, has_component} = require('bluespess');

const _is_blocking = Symbol('_is_blocking');
const _blocking_dirs = Symbol('_blocking_dirs');

class BlocksAir extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.affecting_turfs = [];
		this.a.on("moved", this.update_affecting_turfs.bind(this));
	}

	get is_blocking() {return this[_is_blocking];}
	set is_blocking(val) {
		if(val == this[_is_blocking])
			return;
		this[_is_blocking] = val;
		this.update_affecting_turfs();
	}

	get blocking_dirs() {return this[_blocking_dirs];}
	set blocking_dirs(val) {
		if(val == this[_blocking_dirs])
			return;
		this[_blocking_dirs] = val;
		this.update_affecting_turfs();
	}

	update_affecting_turfs() {
		if(!this.affecting_turfs)
			return;
		for(var turf of this.affecting_turfs) {
			turf.c.SimulatedTurf.update_blockers();
		}
		this.affecting_turfs.length = 0;
		for(let marginal of this.a.marginal_locs()) {
			if(has_component(marginal.turf, "SimulatedTurf"))
				marginal.turf.c.SimulatedTurf.update_blockers();
		}
	}
}

BlocksAir.template = {
	vars: {
		components: {
			"BlocksAir": {
				is_blocking: true,
				blocking_dirs: 15
			}
		}
	}
};

module.exports.components = {BlocksAir};
