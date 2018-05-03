'use strict';

// BASED OFF OF tgstation COMMIT 910be9f4e29270e3a0a36ed8042310ed4bee1845

const Bluespess = require('bluespess');
const read_config = require('./code/config.js');

console.log("Loading game..");

var server = new Bluespess();
global.server = server; // So the debugger can access it. No, you are not allowed to use it in your code.
// I should be able to remove this line with *nothing* breaking (except the ability to use the debugger)
global.require = require;
server.resRoot = "./res/";

server.importModule(require('./code/game/components/squeak.js'));
server.importModule(require('./code/game/area/area_components.js'));
server.importModule(require('./code/game/area/area.js'));
server.importModule(require('./code/game/mobs/mob_movement.js'));
server.importModule(require('./code/game/mobs/new_player.js'));
server.importModule(require('./code/game/mobs/dead/ghost.js'));
server.importModule(require('./code/game/mobs/living/living_defense.js'));
server.importModule(require('./code/game/mobs/living/living.js'));
server.importModule(require('./code/game/mobs/living/carbon/carbon.js'));
server.importModule(require('./code/game/mobs/living/carbon/slip.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/body_parts.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/components.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/head.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/health_doll.js'));
server.importModule(require('./code/game/mobs/living/carbon/body_parts/zones.js'));
server.importModule(require('./code/game/mobs/living/carbon/human/human.js'));
server.importModule(require('./code/game/mobs/living/carbon/human/human_parts.js'));
server.importModule(require('./code/game/mobs/living/carbon/organs/lungs.js'));
server.importModule(require('./code/game/mobs/living/carbon/organs/organ.js'));
server.importModule(require('./code/game/objects/cleanable/blood.js'));
server.importModule(require('./code/game/objects/cleanable/cleanable.js'));
server.importModule(require('./code/game/objects/doors/airlock_variants.js'));
server.importModule(require('./code/game/objects/doors/airlock.js'));
server.importModule(require('./code/game/objects/doors/door.js'));
server.importModule(require('./code/game/objects/items/devices/flashlight.js'));
server.importModule(require('./code/game/objects/items/stacks/sheets/glass.js'));
server.importModule(require('./code/game/objects/items/stacks/sheets/sheet_types.js'));
server.importModule(require('./code/game/objects/items/stacks/tiles/tile_mineral.js'));
server.importModule(require('./code/game/objects/items/stacks/tiles/tile_types.js'));
server.importModule(require('./code/game/objects/items/stacks/rods.js'));
server.importModule(require('./code/game/objects/items/stacks/stack.js'));
server.importModule(require('./code/game/objects/items/storage/backpack.js'));
server.importModule(require('./code/game/objects/items/storage/boxes.js'));
server.importModule(require('./code/game/objects/items/storage/toolbox.js'));
server.importModule(require('./code/game/objects/items/clothing.js'));
server.importModule(require('./code/game/objects/items/emag.js'));
server.importModule(require('./code/game/objects/items/storage.js'));
server.importModule(require('./code/game/objects/items/tools.js'));
server.importModule(require('./code/game/objects/items/weaponry.js'));
server.importModule(require('./code/game/objects/structures/beds_chairs/chair.js'));
server.importModule(require('./code/game/objects/structures/crates_lockers/base.js'));
server.importModule(require('./code/game/objects/structures/crates_lockers/closets.js'));
server.importModule(require('./code/game/objects/structures/crates_lockers/closets/utility.js'));
server.importModule(require('./code/game/objects/structures/wall/reinf_walls.js'));
server.importModule(require('./code/game/objects/structures/wall/walls.js'));
server.importModule(require('./code/game/objects/structures/girders.js'));
server.importModule(require('./code/game/objects/structures/grille.js'));
server.importModule(require('./code/game/objects/structures/table_frames.js'));
server.importModule(require('./code/game/objects/structures/table.js'));
server.importModule(require('./code/game/objects/structures/window.js'));
server.importModule(require('./code/game/objects/buckling.js'));
server.importModule(require('./code/game/objects/destructible.js'));
server.importModule(require('./code/game/objects/items.js'));
server.importModule(require('./code/game/objects/objs.js'));
server.importModule(require('./code/game/objects/puller.js'));
server.importModule(require('./code/game/turfs/floor_base.js'));
server.importModule(require('./code/game/turfs/floor.js'));
server.importModule(require('./code/game/turfs/plating.js'));
server.importModule(require('./code/game/placeholders.js'));
server.importModule(require('./code/modules/atmospherics/environmental/block_air.js'));
server.importModule(require('./code/modules/atmospherics/environmental/controller.js'));
server.importModule(require('./code/modules/atmospherics/environmental/turf.js'));
server.importModule(require('./code/modules/client/verbs.js'));
server.importModule(require('./code/modules/clothing/under/jobs/civilian.js'));
server.importModule(require('./code/modules/clothing/under/jobs/engineering.js'));
server.importModule(require('./code/modules/clothing/under/jobs/medsci.js'));
server.importModule(require('./code/modules/clothing/under/jobs/security.js'));
server.importModule(require('./code/modules/clothing/under/_under.js'));
server.importModule(require('./code/modules/clothing/under/color.js'));
server.importModule(require('./code/modules/clothing/under/miscellaneous.js'));
server.importModule(require('./code/modules/clothing/under/pants.js'));
server.importModule(require('./code/modules/clothing/under/shorts.js'));
server.importModule(require('./code/modules/clothing/under/syndicate.js'));
server.importModule(require('./code/modules/clothing/under/trek.js'));
server.importModule(require('./code/modules/clothing/suits/_suits.js'));
server.importModule(require('./code/modules/clothing/suits/jobs.js'));
server.importModule(require('./code/modules/clothing/shoes/_shoes.js'));
server.importModule(require('./code/modules/clothing/shoes/colour.js'));
server.importModule(require('./code/modules/clothing/shoes/misc.js'));
server.importModule(require('./code/modules/clothing/head/_head.js'));
server.importModule(require('./code/modules/clothing/head/jobs.js'));
server.importModule(require('./code/modules/effect_system/sparks.js'));
server.importModule(require('./code/modules/janitorial/mop.js'));
server.importModule(require('./code/modules/jobs/access.js'));
server.importModule(require('./code/modules/jobs/controller.js'));
server.importModule(require('./code/modules/jobs/id.js'));
server.importModule(require('./code/modules/reagents/containers/open.js'));
server.importModule(require('./code/modules/reagents/containers/spray.js'));
server.importModule(require('./code/modules/reagents/machinery/chem_dispenser.js'));
server.importModule(require('./code/modules/reagents/machinery/chem_heater.js'));
server.importModule(require('./code/modules/reagents/holder.js'));
server.importModule(require('./code/modules/smoothing/smoothing.js'));
server.importModule(require('./code/modules/speech/speech.js'));
server.importModule(require('./code/onclick/hud.js'));
server.importModule(require('./code/onclick/interact.js'));
server.importModule(require('./code/onclick/inventory.js'));
server.importModule(require('./code/onclick/screen_objects.js'));

if(global.is_bs_editor_env) {
	module.exports = server;
} else { // Load these packages within this if statement because they throw errors in atom.io
	const finalhandler = require('finalhandler');
	const http = require('http');
	const net = require('net');
	const https = require('https');
	const serveStatic = require('serve-static');
	const fs = require('fs');
	const url = require('url');
	const querystring = require('querystring');

	/*for(var x = -7; x <= 7; x++) for(var y = -7; y <= 7; y++) {
		var turf = new Bluespess.Atom(server, server.templates["floor"], x, y, 0);
		//turf.icon = 'icons/turf/floors.png';
		//turf.icon_state = 'floor';
	}*/
	console.log("Loading maps..");
	server.instance_map_sync(JSON.parse(fs.readFileSync('convert_test.bsmap', 'utf8')), 0, 0, 0);

	server.on("client_login", (client) => {
		if(!client.mob) {
			let mob = new Bluespess.Atom(server, {components: ["NewPlayer"]});
			mob.c.Mob.client = client;
		}
	});
	console.log("Starting server..");
	let server_config = read_config('server.cson');
	for(let [key, file] of Object.entries(server_config.http_opts.files)) {
		if(!key || !file)
			continue;
		server_config.http_opts[key] = fs.readFileSync(file, 'utf8');
	}

	if(server_config.gh_login.enabled) {
		let authorization = 'Basic ' + Buffer.from(`${server_config.gh_login.client_id}:${server_config.gh_login.client_secret}`).toString('base64');
		let invalid_tokens = new Set();
		server.handle_login = function(ws) {
			ws.send(JSON.stringify({login_type:"github", client_id: server_config.gh_login.client_id}));
			let id = null;
			let name = null;
			let token = null;
			let message_handler = (msg) => {
				let obj = JSON.parse(msg);
				if(obj.access_token) {
					obj.access_token = ""+obj.access_token;
					let req = https.request({
						hostname: 'api.github.com',
						path: `/applications/${server_config.gh_login.client_id}/tokens/${querystring.escape(obj.access_token)}`,
						method: "GET",
						headers: {
							'User-Agent': server_config.gh_login.user_agent,
							'Authorization': authorization
						}
					}, (res) => {
						res.setEncoding('utf8');
						let data = "";
						res.on("data", chunk => {data += chunk;});
						res.on("end", () => {
							let obj2 = JSON.parse(data);
							if(!obj2.user || !obj2.scopes || !obj2.scopes.includes('user:email')) {
								ws.send(JSON.stringify({valid: false}));
							} else {
								name = obj2.user.login;
								id = obj2.user.id;
								token = obj.access_token;
								ws.send(JSON.stringify({valid: true, logged_in_as: obj2.user.login}));
							}
						});
					});
					req.on('error', (err)=>{
						ws.send(JSON.stringify({valid: false}));
						console.error(err);
					});
					req.end();
				} else if(obj.login) {
					if(!id || !name || invalid_tokens.has(token))
						return;
					ws.removeListener("message", message_handler);
					this.login(ws, id, name);
				} else if(obj.logout) {
					if(!token)
						return;
					invalid_tokens.add(token);
					let req = https.request({
						hostname: 'api.github.com',
						path: `/applications/${server_config.gh_login.client_id}/grants/${querystring.escape(token)}`,
						method: "DELETE",
						headers: {
							'User-Agent': server_config.gh_login.user_agent,
							'Authorization': authorization
						}
					});
					req.on("error", (err) => {
						console.error(err);
					});
					req.end();
				}
			};
			ws.on("message", message_handler);
		};
	}

	var serve = serveStatic(server.resRoot, {'index': ['index.html']});

	let http_handler = (req, res) => {
		let done = finalhandler(req, res);
		let url_obj = url.parse(req.url, true);
		if(url_obj.pathname == "/gh-oauth" && server_config.gh_login.enabled) {
			let req2 = https.request({
				hostname: 'github.com',
				path: '/login/oauth/access_token',
				method: "POST",
				headers: {'User-Agent': server_config.gh_login.user_agent}
			}, (res2) => {
				res2.setEncoding('utf8');
				let data = "";
				res2.on("data", chunk => {data += chunk;});
				res2.on("end", () => {
					let obj = querystring.parse(data);
					if(!obj.access_token) {
						console.error(obj);
						return done();
					}
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(`<html><head><script>localStorage.setItem("gh_access_token", ${JSON.stringify(obj.access_token)}); window.location.href="/";</script></head><body></body></html>`);
				});
			});
			req2.on('error', (err) => {
				console.error(err);
				done();
			});
			req2.write(querystring.stringify({client_id: server_config.gh_login.client_id, client_secret: server_config.gh_login.client_secret, code: url_obj.query.code}));
			req2.end();
		} else {
			serve(req, res, done);
		}
	};
	let http_server;
	if(server_config.https) {
		let proxies = {
			http: http.createServer((req, res) => {
				res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
				res.end();
			}),
			https: https.createServer(server_config.http_opts, http_handler)
		};
		net.createServer((socket) => {
			socket.once('data', (buffer) => {
				socket.pause();
				let byte = buffer[0];
				let protocol = byte == 22 ? 'https' : 'http';
				let proxy = proxies[protocol];
				socket.unshift(buffer);
				proxy.emit('connection', socket);
				socket.resume();
			});
		}).listen(server_config.port);

		http_server = proxies.https;
	} else {
		http_server = http.createServer(http_handler);
		http_server.listen(server_config.port);
	}

	server.startServer({websocket:{server: http_server}});
	console.log("Server started.");
}
