'use strict';

// BASED OFF OF tgstation COMMIT 910be9f4e29270e3a0a36ed8042310ed4bee1845

const Bluespess = require('bluespess');

console.log("Loading game..");

var server = new Bluespess();
global.server = server; // So the debugger can access it
server.resRoot = "./res/";

server.importModule(require('./player.js'));
server.importModule(require('./code/game/mobs/new_player.js'));
server.importModule(require('./code/game/mobs/living/living.js'));
server.importModule(require('./code/game/mobs/living/carbon/carbon.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/body_parts.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/components.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/head.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/health_doll.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/zones.js'));
server.importModule(require('./code/game/mobs/living/carbon/human/human.js'));
server.importModule(require('./code/game/mobs/living/carbon/human/human_parts.js'));
server.importModule(require('./code/game/objects/doors/airlock_variants.js'));
server.importModule(require('./code/game/objects/doors/airlock.js'));
server.importModule(require('./code/game/objects/doors/door.js'));
server.importModule(require('./code/game/objects/items/stacks/sheets/glass.js'));
server.importModule(require('./code/game/objects/items/stacks/rods.js'));
server.importModule(require('./code/game/objects/items/stacks/stack.js'));
server.importModule(require('./code/game/objects/items/storage/toolbox.js'));
server.importModule(require('./code/game/objects/items/clothing.js'));
server.importModule(require('./code/game/objects/items/emag.js'));
server.importModule(require('./code/game/objects/items/storage.js'));
server.importModule(require('./code/game/objects/items/tools.js'));
server.importModule(require('./code/game/objects/structures/grille.js'));
server.importModule(require('./code/game/objects/structures/table.js'));
server.importModule(require('./code/game/objects/structures/window.js'));
server.importModule(require('./code/game/objects/destructible.js'));
server.importModule(require('./code/game/objects/items.js'));
server.importModule(require('./code/game/objects/objs.js'));
server.importModule(require('./code/game/objects/puller.js'));
server.importModule(require('./code/game/turfs/floor_base.js'));
server.importModule(require('./code/game/turfs.js'));
server.importModule(require('./code/modules/atmospherics/environmental/block_air.js'));
server.importModule(require('./code/modules/atmospherics/environmental/controller.js'));
server.importModule(require('./code/modules/atmospherics/environmental/turf.js'));
server.importModule(require('./code/modules/clothing/under/_under.js'));
server.importModule(require('./code/modules/clothing/under/color.js'));
server.importModule(require('./code/modules/clothing/shoes/_shoes.js'));
server.importModule(require('./code/modules/clothing/shoes/colour.js'));
server.importModule(require('./code/modules/effect_system/sparks.js'));
server.importModule(require('./code/modules/jobs/access.js'));
server.importModule(require('./code/modules/smoothing/smoothing.js'));
server.importModule(require('./code/onclick/hud.js'));
server.importModule(require('./code/onclick/interact.js'));
server.importModule(require('./code/onclick/inventory.js'));
server.importModule(require('./code/onclick/screen_objects.js'));

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
			var template = {"components": ["Player", "MobInventory", "HumanMob"]};
			var atom = new Bluespess.Atom(server, template, 0, 0, 0);
			atom.c.MobInventory.slots.iclothing.item = new Bluespess.Atom(server, "jumpsuit_grey");
			atom.c.MobInventory.slots.shoes.item = new Bluespess.Atom(server, "shoes_black");
			atom.c.MobInventory.slots.back.item = new Bluespess.Atom(server, "backpack");
			atom.c.Mob.client = client;
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
