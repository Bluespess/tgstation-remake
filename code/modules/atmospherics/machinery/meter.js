'use strict';
const {Component, chain_func, has_component, to_chat} = require('bluespess');
const layers = require('../../../defines/layers.js');
const atmos_defines = require('../../../defines/atmos_defines.js');

class PipeMeter extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.AtmosMachineTick.process = chain_func(this.a.c.AtmosMachineTick.process, this.process_atmos.bind(this));
		this.a.on("crossed_by", this.crossed.bind(this));
		this.a.on("crossed", this.crossed.bind(this));
		this.a.c.Examine.examine = chain_func(this.a.c.Examine.examine, (prev,user)=>{prev(); this.show_status(user);});
		this.a.attack_hand = (user)=>{this.show_status(user);};
	}

	show_status(user) {
		if(this.target) {
			let env = this.target.c.AirHolder.return_air();
			if(env) {
				to_chat`The pressure gauge reads ${(env.return_pressure()).toFixed(2)} kPa; ${env.temperature.toFixed(2)} K (${(env.temperature - atmos_defines.T0C).toFixed(2)}&deg;C).`(user);
			} else {
				to_chat`The sensor error light is blinking.`(user);
			}
		} else {
			to_chat`The connect error light isblinking.`(user);
		}
	}

	crossed(other) {
		if(this.target || !has_component(other, "Pipe"))
			return;
		if((Math.abs(other.x - this.a.x) < 0.00001) && (Math.abs(other.y - this.a.y) < 0.00001)) {
			this.target = other;
		}
	}

	process_atmos(prev, dt) {
		prev();
		if(!this.target || this.a.c.ApcPowered.get_available_power() < 20*dt) {
			this.a.icon_state = "meterX";
			return;
		}
		// uses 20 watts (yes, the byond one says 5, but that's with a 2-second power tick and half-second atmos tick)
		this.a.c.ApcPowered.use_power(20*dt);
		let air = this.target.c.AirHolder.return_air();
		if(!air) {
			this.a.icon_state = "meterX";
			return;
		}

		let pressure = air.return_pressure();
		if(pressure <= 0.15*atmos_defines.ONE_ATMOSPHERE) {
			this.a.icon_state = "meter0";
		} else if(pressure <= 1.8*atmos_defines.ONE_ATMOSPHERE) {
			this.a.icon_state = `meter1_${Math.floor(pressure / (atmos_defines.ONE_ATMOSPHERE*0.3) + 0.5)}`;
		} else if(pressure <= 30*atmos_defines.ONE_ATMOSPHERE) {
			this.a.icon_state = `meter2_${Math.floor(pressure / (atmos_defines.ONE_ATMOSPHERE * 5) - 0.35) + 1}`;
		} else if(pressure <= 59*atmos_defines.ONE_ATMOSPHERE) {
			this.a.icon_state = `meter3_${Math.floor(pressure/(atmos_defines.ONE_ATMOSPHERE * 5) - 6) + 1}`;
		} else {
			this.a.icon_state = `meter4`;
		}
	}
}

PipeMeter.loadBefore = ["ApcPowered", "AtmosMachineTick", "Destructible"];
PipeMeter.depends = ["ApcPowered", "AtmosMachineTick", "Destructible"];

PipeMeter.template = {
	vars: {
		components: {
			"Destructible": {
				max_integrity: 150,
				armor: {melee: 0, bullet: 0, laser: 0, energy: 100, bomb: 0, bio: 100, rad: 100, fire: 40, acid: 0}
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "It measures something."
			},
			"ApcPowered": {
				power_channel: "environment"
			}
		},
		name: "gas flow meter",
		icon: 'icons/obj/meter.png',
		icon_state: "meterX",
		layer: layers.OBJ_LAYER
	}
};

module.exports.templates = {
	"pipe_meter": {
		components: ["PipeMeter"]
	}
};

module.exports.components = {PipeMeter};
