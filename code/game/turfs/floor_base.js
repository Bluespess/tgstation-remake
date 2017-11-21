'use strict';
const {Component} = require('bluespess');

// Component shared by floors and plating
class FloorBase extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

module.exports.components = {FloorBase};
