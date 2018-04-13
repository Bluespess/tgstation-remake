'use strict';
const CSON = require('cson-parser');
const {weak_deep_assign} = require('bluespess');
const fs = require('fs');
const path = require('path');

module.exports = function read_config(name) {
	let config = {};
	try {
		config = CSON.parse(fs.readFileSync(path.join('config', name), 'utf8'));
	} catch(e){/**/}
	weak_deep_assign(config, CSON.parse(fs.readFileSync(path.join('config/default', name), 'utf8')));
	return config;
};
