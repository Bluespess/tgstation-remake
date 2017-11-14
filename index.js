'use strict';

// BASED OFF OF tgstation COMMIT 910be9f4e29270e3a0a36ed8042310ed4bee1845

const Bluespess = require('bluespess');

console.log("Loading game..");

var server = new Bluespess();
global.server = server; // So the debugger can access it
server.resRoot = "./res/";

server.importModule(require('./player.js'));
server.importModule(require('./code/game/turfs.js'));
server.importModule(require('./code/game/mobs/new_player.js'));
server.importModule(require('./code/game/mobs/living/living.js'));
server.importModule(require('./code/game/mobs/living/carbon/carbon.js'));
server.importModule(require('./code/game/mobs/living/carbon/human/human.js'));
server.importModule(require('./code/game/objects/doors/airlock.js'));
server.importModule(require('./code/game/objects/doors/door.js'));
server.importModule(require('./code/game/objects/items/stacks/rods.js'));
server.importModule(require('./code/game/objects/items/stacks/stack.js'));
server.importModule(require('./code/game/objects/items/storage/toolbox.js'));
server.importModule(require('./code/game/objects/items/clothing.js'));
server.importModule(require('./code/game/objects/items/storage.js'));
server.importModule(require('./code/game/objects/items/tools.js'));
server.importModule(require('./code/game/objects/items.js'));
server.importModule(require('./code/game/objects/objs.js'));
server.importModule(require('./code/game/objects/puller.js'));
server.importModule(require('./code/modules/atmospherics/environmental/turf.js'));
server.importModule(require('./code/modules/atmospherics/environmental/controller.js'));
server.importModule(require('./code/modules/jobs/access.js'));
server.importModule(require('./code/onclick/hud.js'));
server.importModule(require('./code/onclick/inventory.js'));

if(global.is_bs_editor_env) {
	module.exports = server;
} else { // Load these packages within this if statement because they throw errors in atom.io
	const finalhandler = require('finalhandler');
	const http = require('http');
	const serveStatic = require('serve-static');
	const fs = require('fs');

	/*for(var x = -7; x <= 7; x++) for(var y = -7; y <= 7; y++) {
		var turf = new Bluespess.Atom(server, server.templates["floor"], x, y, 0);
		//turf.icon = 'icons/turf/floors.png';
		//turf.icon_state = 'floor';
	}*/
	server.instance_map(JSON.parse(fs.readFileSync('testmap.bsmap', 'utf8')), 0, 0, 0);

	server.on("client_login", (client) => {
		if(!client.mob) {
			var template = {"components": ["Player", "MobInventory", "LivingMob"]};
			var atom = new Bluespess.Atom(server, template, 0, 0, 0);
			atom.c.Mob.client = client;
			atom.icon = 'icons/mob/human.png';
			atom.icon_state = "skeleton";
			atom.layer = 5;
		}
	});
	console.log("Starting server..");
	var serve = serveStatic(server.resRoot, {'index': ['index.html']});

	var httpServer = http.createServer((req, res) => {
		serve(req, res, finalhandler(req, res));
	});

	httpServer.listen(8080);
	server.startServer({websocket:{server: httpServer}});
	console.log("Server started.");
}
