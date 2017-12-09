'use strict';

const {Component} = require('bluespess');
const layers = require('../../../defines/layers.js');

class CleanableDecal extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

CleanableDecal.depends = ["Tangible"];
CleanableDecal.loadBefore = ["Tangible"];

CleanableDecal.template = {
	vars: {
		components: {
			"CleanableDecal": {
				merge_group: null
			},
			"Examine": {
				desc: "It's red and gooey. Perhaps it's the chef's cooking?"
			}
		},
		icon: 'icons/effects/effects.png',
		layer: layers.ABOVE_NORMAL_TURF_LAYER
	}
};

module.exports.components = {CleanableDecal};
