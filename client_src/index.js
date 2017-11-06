'use strict';
const BluespessClient = require('bluespess-client');
const $ = require('jquery');

var client = new BluespessClient();
global.client = client;

client.importModule(require('./parallax.js'));
client.importModule(require('./progress_bar.js'));
client.importModule(require('./ui/new_player.js'));

if(global.is_bs_editor_env) {
	module.exports = client;
} else {
	$(window).on("load", () => {
		client.login();
	});
}
