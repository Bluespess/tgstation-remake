'use strict';

const {Component} = require('bluespess');

class NewPlayer extends Component {
	constructor(atom, template) {
		super(atom, template);

	}
}
NewPlayer.require = ['Mob'];
NewPlayer.loadBefore = ['Mob'];

module.exports.components = {NewPlayer};
