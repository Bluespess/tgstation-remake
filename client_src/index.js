'use strict';
const BluespessClient = require('bluespess-client');
const {Eye, Plane} = BluespessClient;

var client = new BluespessClient();
global.client = client;

client.importModule(require('./code/carbon_mob.js'));
client.importModule(require('./code/hud.js'));
client.importModule(require('./code/parallax.js'));
client.importModule(require('./code/progress_bar.js'));
client.importModule(require('./code/ui/chem_dispenser.js'));
client.importModule(require('./code/ui/new_player.js'));
client.importModule(require('./code/ui/stack_craft.js'));

if(global.is_bs_editor_env) {
	module.exports = client;
} else {
	window.addEventListener("load", () => {
		let eye = new Eye(client, "");
		let main_plane = new Plane.World(eye, "");
		main_plane.z_index = 0;
		let ui_plane = new Plane(eye, "ui");
		ui_plane.z_index = 10000;

		eye.canvas = document.getElementById("mainlayer");
		client.login();
	});
}
