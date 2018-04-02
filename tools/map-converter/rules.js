'use strict';

function inst_dir(inst) {
	let dir = +inst.vars.dir || 2;
	if(inst.vars.dir == "NORTH") dir = 1;
	if(inst.vars.dir == "WEST") dir = 8;
	if(inst.vars.dir == "EAST") dir = 4;
	return dir;
}

let areas = {};

// Careful! There's a difference between returning null and undefined.
// (undefined means "keep going, find a different rule" and null means "spawn nothing")
let rules = [
	["/turf/open/floor", (inst) => {
		let templates = {
			floor: ["floor", "white", "dark", "bar", "floorgrime", "delivery", "bot", "barber", "whitebot", "whitedelivery", "cmo", "grimy", "freezerfloor", "cafeteria"],
			floor_ss13: ["L1", "L3", "L5", "L7", "L2", "L4", "L6", "L8", "L9", "L11", "L13", "L7", "L10", "L12", "L14", "L8"],
			floor_edge: ["red", "whitered", "blue", "whiteblue", "green", "whitegreen", "yellow", "whiteyellow", "orange", "whitehall", "arrival", "escape", "purple", "whitepurple", "brownold", "brown", "redyellow", "redblue", "bluered", "redgreen", "greenyellow", "greenblue", "blueyellow", "darkpurple", "darkred", "darkblue", "darkgreen", "darkyellow", "darkbrown"],
			floor_corner: ["redcorner", "whiteredcorner", "bluecorner", "whitebluecorner", "greencorner", "whitegreencorner", "yellowcorner", "whiteyellowcorner", "orangecorner", "arrivalcorner", "escapecorner", "purplecorner", "whitepurplecorner", "browncorner"]
		};
		for(let [tname, states] of Object.entries(templates)) {
			if(states.includes(JSON.parse(inst.vars.icon_state))) {
				let variants = [JSON.parse(inst.vars.icon_state)];
				if(tname != "floor" && tname != "floor_ss13") {
					let dir = inst_dir(inst);
					variants.push(dir);
				}
				return {template_name: tname, variant_leaf_path: variants};
			}
		}
		return {template_name: "floor", variant_leaf_path: ["floor"]};
	}, {put_plating: true}],
	["/turf/open/floor/wood", () => {return {template_name: "floor_wood"};}, {put_plating: true}],
	["/turf/open/floor/carpet", () => {return {template_name: "floor_carpet"};}, {put_plating: true}],
	["/turf/open/floor/mineral/titanium", (inst) => {
		let state = JSON.parse(inst.vars.icon_state);
		let variants = ["shuttlefloor", "shuttlefloor2", "shuttlefloor3", "shuttlefloor5"];
		if(!variants.includes(state)) state = variants[0];
		return {template_name: "floor_titanium", variant_leaf_path: [state]};
	}, {put_plating: true}],
	["/turf/closed/wall", () => {return {template_name: "wall"};}, {put_plating: true}],
	["/turf/closed/wall/r_wall", () => {return {template_name: "r_wall"};}, {put_plating: true}],
	["/turf/closed/wall/mineral/titanium", () => {return {template_name: "wall_titanium"};}, {put_plating: true}],
	["/turf/open/floor/plating", () => {return {template_name: "plating"};}],
	["/obj/structure/grille", () => {return {template_name: "grille"};}],
	["/obj/effect/spawner/structure/window/reinforced", () => {return [{template_name: "r_window"}, {template_name: "grille"}];}],
	["/obj/effect/spawner/structure/window", () => {return [{template_name: "window"}, {template_name: "grille"}];}],
	["/obj/effect/spawner/structure/window/shuttle", () => {return [{template_name: "shuttle_window"}, {template_name: "grille"}];}],
	["/obj/structure/window/shuttle", () => {return [{template_name: "shuttle_window"}];}],
	["/obj/machinery/door/airlock", (inst) => {
		let valid = ["airlock_command","airlock_security","airlock_engineering","airlock_medical",
			"airlock_maintenance","airlock_mining","airlock_atmos","airlock_research",
			"airlock_freezer","airlock_science","airlock_virology","airlock_command_glass",
			"airlock_engineering_glass","airlock_security_glass","airlock_medical_glass",
			"airlock_research_glass","airlock_mining_glass","airlock_atmos_glass",
			"airlock_science_glass","airlock_virology_glass","airlock_maintenance_glass",
			"airlock_glass","airlock","airlock_titanium","airlock_titanium_glass",
			"airlock_external","airlock_external_glass"];
		let path = inst.type.path;
		let path_type = path.substr(28);
		let tname = "airlock";
		if(path_type == "glass")
			tname = "airlock_glass";
		else if(path_type.startsWith("glass"))
			tname = `airlock_${path_type.substr(6)}_glass`;
		else
			tname = `airlock_${path_type}`;
		if(!valid.includes(tname))
			tname = "airlock";
		return {template_name: tname};
	}],
	["/obj/structure/table", () => {return {template_name: "table"};}],
	["/obj/structure/table/wood", () => {return {template_name: "wood_table"};}],

	["/obj/structure/closet", () => {return {template_name: "closet"};}],
	["/obj/structure/closet/emcloset", () => {return {template_name: "emergency_closet"};}],
	["/obj/structure/closet/firecloset", () => {return {template_name: "fire_closet"};}],
	["/obj/structure/closet/toolcloset", () => {return {template_name: "tool_closet"};}],
	["/obj/structure/closet/radcloset", () => {return {template_name: "radiation_closet"};}],
	["/obj/structure/closet/bombcloset", () => {return {template_name: "bomb_closet"};}],

	// TOOLS

	["/obj/item/storage/toolbox/mechanical", () => {return {template_name: "toolbox_mechanical"};}, {pixel_offsets: true}],
	["/obj/item/screwdriver", () => {return {template_name: "screwdriver"};}, {pixel_offsets: true}],
	["/obj/item/crowbar", () => {return {template_name: "crowbar"};}, {pixel_offsets: true}],
	["/obj/item/weldingtool", () => {return {template_name: "weldingtool"};}, {pixel_offsets: true}],
	["/obj/item/wirecutters", () => {return {template_name: "wirecutters"};}, {pixel_offsets: true}],
	["/obj/item/wrench", () => {return {template_name: "wrench"};}, {pixel_offsets: true}],

	// LAMPS AND LIGHTS

	["/obj/machinery/light", (inst) => {
		if(inst.type.path == "/obj/machinery/light_switch")
			return;
		return {template_name: inst.type.path == "/obj/machinery/light/small" ? "light_small" : "light", variant_leaf_path: [inst_dir(inst)]};
	}],
	["/obj/item/device/flashlight", () => {return {template_name: "flashlight"};}, {pixel_offsets: true}],
	["/obj/item/device/flashlight/lamp", () => {return {template_name: "desk_lamp"};}, {pixel_offsets: true}],
	["/obj/item/device/flashlight/lamp/green", () => {return {template_name: "desk_lamp_green"};}, {pixel_offsets: true}],
	["/obj/item/device/flashlight/lamp/bananalamp", () => {return {template_name: "desk_lamp_banana"};}, {pixel_offsets: true}],

	// JANITORIAL

	["/obj/item/mop", () => {return {template_name: "mop"};}, {pixel_offsets: true}],

	// CHEMISTRY

	["/obj/machinery/chem_dispenser", () => {return {template_name: "chem_dispenser"};}],

	["/obj/item/reagent_containers/glass/beaker", () => {return {template_name: "beaker"};}, {pixel_offsets: true}],
	["/obj/item/reagent_containers/glass/beaker/large", () => {return {template_name: "beaker_large"};}, {pixel_offsets: true}],
	["/obj/item/reagent_containers/spray/cleaner", () => {return {template_name: "spray_spacecleaner"};}, {pixel_offsets: true}],

	// BOXES

	["/obj/item/storage/box", () => {return {template_name: "box"};}, {pixel_offsets: true}],
	["/obj/item/storage/box/beakers", () => {return {template_name: "beaker_box"};}, {pixel_offsets: true}],
	["/obj/item/storage/box/survival", () => {return {template_name: "survival_box"};}, {pixel_offsets: true}],
	
	// AREAS

	["/area", (inst) => {
		let id = inst.type.path.substr(6).replace(/\//g, "_");
		let brush_inst = {template_name: "area_brush", instance_vars: {components: {"AreaBrush": {map_id: id}}}};
		let insts = [brush_inst];
		if(!areas[id]) {
			areas[id] = true;
			let name = inst.vars.name.substring(1, inst.vars.name.length - 1);
			if(name.startsWith("\\improper "))
				name = name.substring(10);

			let template_name = "area";
			if(inst.type.path.startsWith("/area/maintenance"))
				template_name = "area_maintenance";
			else if(inst.type.path.startsWith("/area/chapel"))
				template_name = "area_chapel";
			else if(inst.type.path.startsWith("/area/engine"))
				template_name = "area_engine";
			else if(inst.type.path.startsWith("/area/medical/morgue"))
				template_name = "area_morgue";
			else if(inst.type.path.startsWith("/area/security/detectivs_office"))
				template_name = "area_detective";

			let area_inst = {template_name, instance_vars: {
				components: {
					"Area": {
						brush_icon_state: JSON.parse(inst.vars.icon_state),
						map_id: id
					}
				},
				name
			}};
			insts.push(area_inst);
		}
		return insts;
	}],
	["/area/space", () => {return null;}]
];

module.exports = rules;
