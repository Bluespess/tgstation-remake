'use strict';
const {Component} = require('bluespess');

class FloorTile extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

FloorTile.depends = ["FloorBase"];
FloorTile.loadBefore = ["FloorBase"];

module.exports.components = {FloorTile};
