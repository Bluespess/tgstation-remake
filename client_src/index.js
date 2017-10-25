'use strict';
const BluespessClient = require('bluespess-client');
const $ = require('jquery');

var client = new BluespessClient();

if(global.is_bs_editor_env) {
	module.exports = client;
} else {
	$(window).on("load", () => {
		client.login();
	});
}
