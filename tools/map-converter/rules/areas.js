'use strict';
const {inst_dir} = require('./utils.js');

const absolute_to_relative = {
	1: 180,
	2: 0,
	4: -90,
	8: 90
};

// AREAS

let _areas = Symbol('_areas');

module.exports = [
	["/area", (inst, {out_map}) => {
		if(!out_map[_areas]) out_map[_areas] = {};
		let areas = out_map[_areas];
		let id = inst.type.path.substr(6).replace(/\//g, "_");
		let brush_inst = {template_name: "area_brush", instance_vars: {components: {"AreaBrush": {map_id: id}}}};
		let insts = [brush_inst];
		if(!areas[id] && !inst.type.path.startsWith("/area/shuttle")) {
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
			else if(inst.type.path.startsWith("/area/security/detectives_office"))
				template_name = "area_detective";
			else if(inst.type.path.startsWith("/area/shuttle/arrival"))
				template_name = "area_arrivals";

			let area_inst = {template_name, instance_vars: {
				components: {
					"Area": {
						brush_icon_state: JSON.parse(inst.vars.icon_state),
						map_id: id
					}
				},
				name
			}};
			if(!(+inst.vars.requires_power) || inst.type.path.startsWith("/area/engine/supermatter") || inst.type.path.startsWith("/area/science/test_area")) {
				area_inst.instance_vars.components.AreaPower = {infinite_power: true};
			}
			insts.push(area_inst);
		}
		return insts;
	}],
	["/area/space", () => {return null;}],

	// SHUTTLES

	["/obj/docking_port/mobile", (inst, {out_map, in_map, in_loc} = {}) => {
		if(!out_map[_areas]) out_map[_areas] = {};
		let areas = out_map[_areas];
		let ti = in_map.key_to_instance.get(in_map.coords_to_key.get(JSON.stringify(in_loc)));
		let area_inst = null;
		for(let oi of ti.objs) {
			if(oi.type.path.startsWith("/area/shuttle")) {
				area_inst = oi;
				break;
			}
		}
		if(!area_inst) {
			console.error(`Docking port is missing an area at ${in_loc}`);
			return [];
		}
		let id = area_inst.type.path.substr(6).replace(/\//g, "_");
		areas[id] = true;
		let name = area_inst.vars.name.substring(1, area_inst.vars.name.length - 1);
		if(name.startsWith("\\improper "))
			name = name.substring(10);

		let template_name = "area_shuttle";
		if(area_inst.type.path.startsWith("/area/shuttle/arrival"))
			template_name = "area_arrivals";

		let out_inst = {template_name, instance_vars: {
			components: {
				"Shuttle": {
					port_direction: absolute_to_relative[JSON.parse(inst.vars.port_direction || 1)]
				},
				"Area": {
					brush_icon_state: JSON.parse(area_inst.vars.icon_state),
					map_id: id
				}
			},
			name,
			dir: inst_dir(inst)
		}};
		return out_inst;
	}],
	["/obj/docking_port/stationary", (inst) => {
		return {template_name: "docking_port", instance_vars: {components: {"DockingPort": {id: JSON.parse(inst.vars.id)}}, name: JSON.parse(inst.vars.name), dir: inst_dir(inst)}};
	}]
];
