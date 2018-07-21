'use strict';
const _ = require('underscore');

class PowerController {
	constructor(server) {
		this.server = server;
		this.powernets = new Set();
		this.machines = new Set();
	}

	start() {
		setInterval(this.tick.bind(this), 1000);
	}

	async tick() {
		let dt = 1;
		for(let powernet of _.shuffle([...this.powernets])) {
			if(!powernet.nodes.size && !powernet.cables.size)
				this.powernets.delete(powernet);
			else
				powernet.reset(dt);
		}
		for(let machine of this.server.atoms_for_components.MachineTick) {
			machine.c.MachineTick.process(dt);
		}
	}
}

module.exports.now = (server) => {
	server.power_controller = new PowerController(server);
};

module.exports.server_start = (server) => {
	server.power_controller.start();
};
