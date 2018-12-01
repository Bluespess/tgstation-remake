'use strict';
const {inst_dir} = require('./utils.js');

module.exports = [
	["/obj/machinery/atmospherics/pipe", (inst) => {
		let [,type,color] = /\/obj\/machinery\/atmospherics\/pipe\/(simple|manifold|manifold4w)(?:\/([a-z]+)|$)/i.exec(inst.type.path);
		let target_dir = 0;
		let dir = inst_dir(inst);
		if(type == "manifold4w") {
			target_dir = 15;
		} else if(type == "manifold") {
			target_dir = 15 - dir;
		} else {
			if(dir == 1 || dir == 2)
				target_dir = 3;
			else if(dir == 4 || dir == 8)
				target_dir = 12;
			else
				target_dir = dir;
		}
		if(color == "scrubbers") color = "red";
		else if(color == "supply") color = "blue";
		else if(color == "supplymain") color = "purple";
		return {template_name: inst.vars.level == "1" ? "pipe_hidden" : "pipe_visible", variant_leaf_path: [color, target_dir]};
	}],
	["/obj/machinery/atmospherics/pipe/heat_exchanging", () => {
		return null; // not implemented, but the above handler does not work with h/e pipes.
	}],

	// UNARY

	["/obj/machinery/atmospherics/components/unary/tank/air", (inst) => {return {template_name: "pressure_tank_air", variant_leaf_path: [inst_dir(inst)]};}],

	// BINARY

	["/obj/machinery/atmospherics/components/binary/pump", (inst) => {
		let ret = {template_name: +inst.vars.on ? "gas_pump_on" : "gas_pump", variant_leaf_path: [inst_dir(inst)]};
		if(inst.vars.name != `"gas pump"`) {
			if(!ret.instance_vars) ret.instance_vars = {};
			ret.instance_vars.name = JSON.parse(inst.vars.name);
		}
		if(inst.vars.target_pressure != "101.325") {
			if(!ret.instance_vars) ret.instance_vars = {};
			ret.instance_vars.components = {GasPump: {target_pressure: +inst.vars.target_pressure}};
		}
		return ret;
	}],

	// OTHER STUFF

	["/obj/machinery/meter", (inst) => {
		let ret = {template_name: "pipe_meter"};
		if(inst.vars.name != `"gas flow meter"`) {
			if(!ret.instance_vars) ret.instance_vars = {};
			ret.instance_vars.name = JSON.parse(inst.vars.name);
		}
		return ret;
	}]
];
