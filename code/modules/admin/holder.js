'use strict';

class AdminHolder {
	constructor(client) {
		client.holder = this;
		this.client = client;
	}

	has_permission() {
		return true;
	}
}

module.exports = AdminHolder;

module.exports.now = (server) => {
	server.on("client_login", (client) => {
		if(client.address == "127.0.0.1" || client.address == "::1") {
			client.holder = new AdminHolder(client);
		}
	});
};
