'use strict';
const {Component} = require('bluespess');

// Component shared by floors and plating
class FloorBase extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

FloorBase.depends = ["Tangible"];
FloorBase.loadBefore = ["Tangible"];

FloorBase.template = {
	vars: {
		components: {
			"Tangible": {
				anchored: true
			}
		}
	}
};

module.exports.components = {FloorBase};
