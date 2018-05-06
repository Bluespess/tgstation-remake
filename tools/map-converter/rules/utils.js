'use strict';

const access_types = require('./access.json');

module.exports.inst_dir = function(inst) {
	let dir = +inst.vars.dir || 2;
	if(inst.vars.dir == "NORTH") dir = 1;
	if(inst.vars.dir == "WEST") dir = 8;
	if(inst.vars.dir == "EAST") dir = 4;
	return dir;
};

module.exports.inst_access = function(inst) {
	let req_access_txt = /"(.+)"/i.exec(inst.vars.req_access_txt)[1];
	let req_one_access_txt = /"(.+)"/i.exec(inst.vars.req_one_access_txt)[1];
	if(req_one_access_txt && req_one_access_txt != "0") {
		return req_one_access_txt.split(";").map(num => {return access_types[num.trim()];}).join("||");
	} else if(req_access_txt && req_access_txt != "0") {
		return req_access_txt.split(";").map(num => {return access_types[num.trim()];}).join("&&");
	}
};
