'use strict';

const {inst_dir, inst_access} = require('./utils.js');

// Careful! There's a difference between returning null and undefined.
// (undefined means "keep going, find a different rule" and null means "spawn nothing")
module.exports = [
	["/turf/open/floor", (inst) => {
		let templates = {
			floor: ["floor", "white", "dark", "bar", "floorgrime", "delivery", "bot", "barber", "whitebot", "whitedelivery", "cmo", "grimy", "freezerfloor", "cafeteria", "engine"],
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

	// atmos floors
	["/turf/open/floor/engine/n2o", () => {return {template_name: "floor", variant_leaf_path: ["engine"]};}, {put_plating: "plating_n2o"}],
	["/turf/open/floor/engine/co2", () => {return {template_name: "floor", variant_leaf_path: ["engine"]};}, {put_plating: "plating_co2"}],
	["/turf/open/floor/engine/plasma", () => {return {template_name: "floor", variant_leaf_path: ["engine"]};}, {put_plating: "plating_plasma"}],
	["/turf/open/floor/engine/o2", () => {return {template_name: "floor", variant_leaf_path: ["engine"]};}, {put_plating: "plating_o2"}],
	["/turf/open/floor/engine/n2", () => {return {template_name: "floor", variant_leaf_path: ["engine"]};}, {put_plating: "plating_n2"}],
	["/turf/open/floor/engine/air", () => {return {template_name: "floor", variant_leaf_path: ["engine"]};}, {put_plating: "plating_air"}],

	["/turf/closed/wall", () => {return {template_name: "wall"};}, {put_plating: true}],
	["/turf/closed/wall/r_wall", () => {return {template_name: "r_wall"};}, {put_plating: true}],
	["/turf/closed/wall/mineral/titanium", () => {return {template_name: "wall_titanium"};}, {put_plating: true}],
	["/turf/open/floor/plating", () => {return {template_name: "plating"};}],
	["/obj/structure/grille", () => {return {template_name: "grille"};}],
	["/obj/structure/lattice", () => {return {template_name: "lattice"};}],
	["/obj/effect/spawner/structure/window/reinforced", () => {return [{template_name: "r_window"}, {template_name: "grille"}];}],
	["/obj/effect/spawner/structure/window", () => {return [{template_name: "window"}, {template_name: "grille"}];}],
	["/obj/effect/spawner/structure/window/shuttle", () => {return [{template_name: "shuttle_window"}, {template_name: "grille"}];}],
	["/obj/structure/window/shuttle", () => {return [{template_name: "shuttle_window"}];}],
	["/obj/structure/window", (inst) => {return {template_name: "window_dir", variant_leaf_path: [inst_dir(inst)]};}],
	["/obj/structure/window/reinforced", (inst) => {return {template_name: "r_window_dir", variant_leaf_path: [inst_dir(inst)]};}],
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
		let access = inst_access(inst);
		let instance_vars = {};
		if(access)
			instance_vars.components = {"RequiresAccess": {access_expression: access}};
		if(Object.prototype.hasOwnProperty.call(inst.vars, "name")) {
			instance_vars.name = JSON.parse(inst.vars.name);
		}
		return {template_name: tname, instance_vars};
	}],
	["/obj/structure/table", () => {return {template_name: "table"};}],
	["/obj/structure/table/wood", () => {return {template_name: "wood_table"};}],
	["/obj/structure/table/reinforced", () => {return {template_name: "reinforced_table"};}],

	["/obj/structure/rack", () => {return {template_name: "rack"};}],
	["/obj/item/rack", () => {return {template_name: "rack_parts"};}],

	["/obj/structure/chair", (inst) => {return {template_name: "chair", variant_leaf_path: [inst_dir(inst)]};}],
	["/obj/structure/chair/wood", (inst) => {return {template_name: "wooden_chair", variant_leaf_path: [inst_dir(inst)]};}],
	["/obj/structure/chair/wood/wings", (inst) => {return {template_name: "wooden_chair_wings", variant_leaf_path: [inst_dir(inst)]};}],
	["/obj/structure/chair/stool", () => {return {template_name: "stool"};}],
	["/obj/structure/chair/stool/bar", () => {return {template_name: "bar_stool"};}],
	["/obj/structure/chair/office/light", (inst) => {return {template_name: "office_chair_light", variant_leaf_path: [inst_dir(inst)]};}],
	["/obj/structure/chair/office/dark", (inst) => {return {template_name: "office_chair_dark", variant_leaf_path: [inst_dir(inst)]};}],

	["/obj/structure/closet", () => {return {template_name: "closet"};}],
	["/obj/structure/closet/emcloset", () => {return {template_name: "emergency_closet"};}],
	["/obj/structure/closet/firecloset", () => {return {template_name: "fire_closet"};}],
	["/obj/structure/closet/toolcloset", () => {return {template_name: "tool_closet"};}],
	["/obj/structure/closet/radcloset", () => {return {template_name: "radiation_closet"};}],
	["/obj/structure/closet/bombcloset", () => {return {template_name: "bomb_closet"};}],

	// TOOLS

	["/obj/item/storage/toolbox/mechanical", () => {return {template_name: "toolbox_mechanical"};}, {pixel_offsets: true}],
	["/obj/item/storage/toolbox/electrical", () => {return {template_name: "toolbox_electrical"};}, {pixel_offsets: true}],
	["/obj/item/screwdriver", () => {return {template_name: "screwdriver"};}, {pixel_offsets: true}],
	["/obj/item/crowbar", () => {return {template_name: "crowbar"};}, {pixel_offsets: true}],
	["/obj/item/weldingtool", () => {return {template_name: "welding_tool"};}, {pixel_offsets: true}],
	["/obj/item/wirecutters", () => {return {template_name: "wirecutters"};}, {pixel_offsets: true}],
	["/obj/item/wrench", () => {return {template_name: "wrench"};}, {pixel_offsets: true}],
	["/obj/item/device/multitool", () => {return {template_name: "multitool"};}, {pixel_offsets: true}],
	["/obj/item/device/analyzer", () => {return {template_name: "analyzer"};}, {pixel_offsets: true}],

	// CABLE

	["/obj/structure/cable", (inst) => {
		return {template_name: "cable", variant_leaf_path: [JSON.parse(inst.vars.cable_color), JSON.parse(inst.vars.icon_state)]};
	}],
	["/obj/machinery/power/smes", () => {return {template_name: "smes"};}],
	["/obj/machinery/power/smes/engineering", () => {return {template_name: "engineering_smes"};}],
	["/obj/machinery/power/terminal", (inst) => {return {template_name: "smes_terminal", variant_leaf_path: [inst_dir(inst)]};}], // there's only one kind of mapped-in terminal
	["/obj/machinery/power/apc", (inst) => {
		let obj = {template_name: "apc", variant_leaf_path: [inst_dir(inst)]};
		let areastring = JSON.parse(inst.vars.areastring);
		if(areastring) {
			obj.instance_vars = {components: {"Apc": {area_override_id: areastring.substr(6).replace(/\//g, "_")}}};
		}
		return obj;
	}],

	// WEAPONS

	["/obj/machinery/recharger", () => {return {template_name: "recharger"};}],

	["/obj/item/melee/baseball_bat", () => {return {template_name: "baseball_bat"};}, {pixel_offsets: true}],

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
	["/obj/item/caution", () => {return {template_name: "caution"};}, {pixel_offsets: true}],

	// CHEMISTRY

	["/obj/machinery/chem_dispenser", () => {return {template_name: "chem_dispenser"};}],
	["/obj/machinery/chem_heater", () => {return {template_name: "chem_heater"};}],

	["/obj/item/reagent_containers/glass/beaker", () => {return {template_name: "beaker"};}, {pixel_offsets: true}],
	["/obj/item/reagent_containers/glass/beaker/large", () => {return {template_name: "beaker_large"};}, {pixel_offsets: true}],
	["/obj/item/reagent_containers/spray/cleaner", () => {return {template_name: "spray_spacecleaner"};}, {pixel_offsets: true}],

	// BOXES

	["/obj/item/storage/box", () => {return {template_name: "box"};}, {pixel_offsets: true}],
	["/obj/item/storage/box/beakers", () => {return {template_name: "beaker_box"};}, {pixel_offsets: true}],
	["/obj/item/storage/box/survival", () => {return {template_name: "survival_box"};}, {pixel_offsets: true}],
	["/obj/item/storage/box/lights", () => {return {template_name: "light_bulbs_box"};}, {pixel_offsets: true}],
	["/obj/item/storage/box/lights/tubes", () => {return {template_name: "light_tubes_box"};}, {pixel_offsets: true}],
	["/obj/item/storage/box/lights/mixed", () => {return {template_name: "light_mixed_box"};}, {pixel_offsets: true}],

	// STACKS/SHEETS

	["/obj/item/stack/sheet/metal", (inst) => {return {template_name: "metal_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/sheet/glass", (inst) => {return {template_name: "glass_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/sheet/rglass", (inst) => {return {template_name: "rglass_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/rods", (inst) => {return {template_name: "stack_rods", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/sheet/plasteel", (inst) => {return {template_name: "plasteel_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/sheet/mineral/wood", (inst) => {return {template_name: "wood_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/sheet/cloth", (inst) => {return {template_name: "cloth_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/sheet/cardboard", (inst) => {return {template_name: "cardboard_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/sheet/bone", (inst) => {return {template_name: "bone_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/sheet/plastic", (inst) => {return {template_name: "plastic_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/sheet/paperframes", (inst) => {return {template_name: "paperframe_sheet", variant_leaf_path: [JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
	["/obj/item/stack/cable", (inst) => {return {template_name: "stack_cable", variant_leaf_path: [JSON.parse(inst.vars.item_color) || "random", JSON.parse(inst.vars.amount)]};}, {pixel_offsets: true}],
];
