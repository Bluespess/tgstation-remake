'use strict';

const fs = require('fs');
const path = require('path');
const ByondEnv = require('byond-parser');
const stable_stringify = require('json-stable-stringify');
const {promisify} = require('util');
//const read_config = require('../../code/config.js');

function loader(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (err, data) => {
			if(err)
				reject(err);
			resolve(data);
		});
	});
}

function progress_bar(title, proportion) {
	let notches = Math.ceil(proportion * 30);
	let text = `${title}: [`;
	for(let i = 0; i < notches; i++)
		text += "#";
	for(let i = notches; i < 30; i++)
		text += ".";
	text += `] (${(proportion * 100).toFixed(1)}%)  \r`;
	process.stdout.write(text);
}

let rules = [];
let rules_files = [
	"./rules/rules.js",
	"./rules/areas.js",
	"./rules/atmos.js",
	"./rules/clothing.js",
	"./rules/misc_items.js"
];

for(let rule_file of rules_files) {
	rules.push(...require(rule_file));
}

rules.sort((a, b) => {
	return b[0].length - a[0].length;
});

(async function() {
	if(!process.argv[2]) {
		console.log("Pass the /tg/station dme to this");
		return;
	}
	//let server_config = read_config('server.cson');
	let map_list = ['BoxStation', 'MetaStation']; //TODO get read_config working and remove this placeholder
	let env = await ByondEnv.parse(loader, process.argv[2], {progress_function: (prop) => {
		progress_bar('Parsing env', prop);
	}});
	process.stdout.write('\n\n');
	for(let processing_map of map_list) {
		let maptext = await loader(path.join(path.dirname(process.argv[2]), `_maps${path.sep}map_files${path.sep}${processing_map}${path.sep}${processing_map}.dmm`));
		let map = env.parse_map(maptext, 'map file');
		let bsmap = {};
		bsmap.locs = {};
		let total_locs = map.coords_to_key.size;
		let loc_counter = 0;
		for(let [loc, key] of map.coords_to_key) {
			let [x,y,z] = JSON.parse(loc);
			x -= 113;
			y -= 135;
			if(z != 1)
				continue;
			let bloc = bsmap.locs[`${x},${y},0`] || (bsmap.locs[`${x},${y},0`] = []);
			let ti = map.key_to_instance.get(key);
			for(let oi of ti.objs) {
				for(let [rulekey, rule, props] of rules) {
					if(!props) props = {};
					if(!oi.type.path.startsWith(rulekey))
						continue;
					let result = rule(oi, {env, in_map: map, out_map: bsmap});
					if(result === undefined)
						continue;
					else if(result === null)
						break;
					if(!(result instanceof Array)) result = [result];
					for(let item of result) {
						let tx = x;
						let ty = y;
						if(item.y) ty += item.y;
						if(item.x) tx += item.x;
						if(props.pixel_offsets) {
							tx += (+oi.vars.pixel_x || 0) / 32;
							ty += (+oi.vars.pixel_y || 0) / 32;
						}
						item.x = tx; item.y = ty;
						bloc.push(item);
					}
					if(props.put_plating)
						bloc.splice(0, 0, {template_name: "plating", x, y}); // at 0th position, removing 0 items, insert the plating
					break;
				}
			}
			loc_counter++;
			progress_bar(`Converting ${processing_map}`, loc_counter / total_locs);
		}

		for(let [key, val] of Object.entries(bsmap.locs)) {
			if(!val.length)
				delete bsmap.locs[key];
		}

		let str = stable_stringify(bsmap, {space: "\t", cmp: (a, b) => {
			var a_coords = /(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)/.exec(a.key);
			var b_coords = /(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)/.exec(b.key);
			if(a_coords && b_coords) {
				return (+a_coords[3] - +b_coords[3]) || (+a_coords[2] - +b_coords[2]) || (+a_coords[1] - +b_coords[1]);
			}
			return a.key > b.key ? 1 : -1;
		}});

		process.stdout.write('\n');
		console.log(processing_map + " converted!");

		let targetfile = path.join(__dirname, `..${path.sep}..${path.sep}${processing_map}.bsmap`);
		console.log(`Writing to ${targetfile}...`);
		try {
			await promisify(fs.writeFile)(targetfile, str, "utf8");
			console.log(`\x1b[1m\x1b[32mFile write success!\x1b[0m`);
		} catch (e) {
			console.error(`\x1b[1m\x1b[31mFile write success!\x1b[0m`);
			console.error(e);
		}
		console.log("");
	}
})().then(()=>{}, (err) => {
	console.error(err);
});
