'use strict';
const {to_chat} = require('bluespess');

module.exports.now =  function(server) {
	server.on("client_login", function(client) {
		client.on("message", (obj) => {
			if(obj.ooc_message) {
				if(client.last_ooc_message && server.now() < client.last_ooc_message + 300) {
					to_chat`You're doing that too fast!`(client);
				} else {
					client.last_ooc_message = server.now();
					let msg = (""+obj.ooc_message).substring(0, 256);
					to_chat`<span style='color:#002eb8' class='ooc'><span class='prefix'>OOC:</span> <EM>${client.key}:</EM> <span class='message'>${msg}</span></span>`([...Object.values(server.clients)]);
				}
			}
		});
	});
};
