'use strict';

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
		for(let powernet of [...this.powernets]) {
			if(!powernet.nodes.size && !powernet.cables.size)
				this.powernets.delete(powernet);
			else
				powernet.reset(dt);
		}
	}
}

module.exports.now = (server) => {
	server.power_controller = new PowerController(server);
};

module.exports.server_start = (server) => {
	server.power_controller.start();
};
