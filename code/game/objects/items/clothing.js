'use strict';
const {Component} = require('bluespess');

class WearableItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

WearableItem.template = {
	vars: {
		components: {
			WearableItem: {
				put_on_delay: 2000,
				strip_delay: 4000
			}
		}
	}
};

WearableItem.depends = ["Item"];
WearableItem.loadBefore = ["Item"];

module.exports.components = {WearableItem};
