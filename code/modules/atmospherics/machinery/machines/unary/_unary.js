'use strict';
const {Component} = require('bluespess');

class UnaryAtmosMachine extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.AtmosMachine.get_node_index_dirs = this.get_node_index_dirs.bind(this);
	}

	get_node_index_dirs() {
		return [this.a.dir];
	}
}

UnaryAtmosMachine.loadBefore = ["AtmosMachine"];
UnaryAtmosMachine.depends = ["AtmosMachine"];

UnaryAtmosMachine.template = {
	vars: {
		components: {
			"AtmosMachine": {
				node_amount: 1
			}
		}
	}
};

module.exports.components = {UnaryAtmosMachine};
