'use strict';
const {Component} = require('bluespess');

// heh this file is named node.js
// pun was not intended

class PowerNode extends Component {
	constructor(atom, template) {
		super(atom, template);
		
	}
}

PowerNode.loadBefore = [];
PowerNode.depends = [];

PowerNode.template = {
	vars: {
		components: {
			"PowerNode": {

			}
		}
	}
};
