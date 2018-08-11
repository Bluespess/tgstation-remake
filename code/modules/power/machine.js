'use strict';
const {Component, has_component, make_watched_property, chain_func} = require('bluespess');

class ApcPowered extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("start_touch_area", this.start_touch_area.bind(this));
		this.a.on("end_touch_area", this.end_touch_area.bind(this));
		make_watched_property(this, "area");
		make_watched_property(this, "powered"); // controls whether this object received it's idle power in the last machine tick.
		this.a.c.MachineTick.process = chain_func(this.a.c.MachineTick.process, this.process.bind(this));
	}

	start_touch_area(atom) {
		if(has_component(atom, "AreaPower")) {
			this.area = atom;
		}
	}
	end_touch_area(atom) {
		if(atom == this.area) {
			for(let brush of this.a.crosses()) {
				if(has_component(brush, "AreaBrush") && has_component(brush.c.AreaBrush.area, "AreaPower")) {
					this.area = brush.c.AreaBrush.area;
					return;
				}
			}
			this.area = null;
		}
	}

	// returns the energy available in joules
	get_available_power(channel = this.power_channel) {
		if(!this.area)
			return 0;
		return this.area.c.AreaPower.get_available_power(channel);
	}

	// uses this amount of energy in joules
	use_power(amount, channel = this.power_channel) {
		if(!this.area)
			return 0;
		return this.area.c.AreaPower.use_power(amount, channel);
	}

	process(prev, dt) {
		prev();
		if(!this.using_idle_power) {
			this.powered = false;
			return;
		}
		if(this.get_available_power() >= this.power_usage*dt) {
			this.use_power(this.power_usage*dt);
		} else {
			this.powered = false;
		}
	}
}

ApcPowered.loadBefore = ["MachineTick"];
ApcPowered.depends = ["MachineTick"];

ApcPowered.template = {
	vars: {
		components: {
			"ApcPowered": {
				power_channel: "equipment",
				// so tg code had "active" and "idle" power usage.
				// I've decided that this is unnecessary- it was generally
				// used by chargers, where there's already code in place to
				// charge something - just take the power at the same time the
				// charging happens using use_power, mmkay?
				power_usage: 0, // idle power usage in *watts*
				using_idle_power: false
			}
		}
	}
};

class MachineTick extends Component {
	process(/* dt */) {}
}

module.exports.components = {MachineTick, ApcPowered};
