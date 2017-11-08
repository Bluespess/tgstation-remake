'use strict';
const BluespessClient = require('bluespess-client');

var client = new BluespessClient();
global.client = client;

client.importModule(require('./code/hud.js'));
client.importModule(require('./code/parallax.js'));
client.importModule(require('./code/progress_bar.js'));
client.importModule(require('./code/ui/new_player.js'));

if(global.is_bs_editor_env) {
	module.exports = client;
} else {
	window.addEventListener("load", () => {
		client.login();
	});
}
