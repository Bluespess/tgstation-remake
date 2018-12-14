'use strict';
const _ = require('underscore');
const {stoplag} = require('bluespess');

class PowerController {
	constructor(server) {
		this.server = server;
		this.powernets = new Set();
		this.machines = new Set();
		this.last_tick_time = null;
		this.tick = this.tick.bind(this);
	}

	start() {
		this.tick();
	}

	async tick() {
		if(this.server.ticker.game_state != "pregame") {
			this.last_tick_time = this.server.now();
			let dt = 1;
			for(let powernet of _.shuffle([...this.powernets])) {
				if(!powernet.nodes.size && !powernet.cables.size)
					this.powernets.delete(powernet);
				else
					powernet.reset(dt);
			}
			let ctr = 0;
			for(let machine of this.server.atoms_for_components.MachineTick) {
				machine.c.MachineTick.process(dt);
				ctr++;
				if(ctr > 50) {
					ctr = 0;
					await stoplag();
				}
			}
		}
		setTimeout(this.tick,1000 - (this.server.now() - this.last_tick_time));
	}
}

module.exports.now = (server) => {
	server.power_controller = new PowerController(server);
};

module.exports.server_start = (server) => {
	server.power_controller.start();
};
