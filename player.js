'use strict';
const {Component} = require('bluespess');


class Player extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.atom.on("keydown", (e) => {
			if(!e)
				return;
			if(e.which == 37){ this.atom.x--; this.atom.appearance.dir = 8;}
			if(e.which == 39){ this.atom.x++; this.atom.appearance.dir = 4;}
			if(e.which == 40){ this.atom.y--; this.atom.appearance.dir = 2;}
			if(e.which == 38){ this.atom.y++; this.atom.appearance.dir = 1;}
		})
	}
}

Player.depends = ["Mob"];
Player.loadBefore = ["Mob"];

module.exports.components = {Player};
