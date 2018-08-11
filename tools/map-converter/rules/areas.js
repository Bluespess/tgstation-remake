'use strict';

// AREAS

let _areas = Symbol('_areas');

module.exports = [
	["/area", (inst, {out_map}) => {
		if(!out_map[_areas]) out_map[_areas] = {};
		let areas = out_map[_areas];
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
			insts.push(area_inst);
		}
		return insts;
	}],
	["/area/space", () => {return null;}]
];
