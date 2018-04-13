'use strict';
const {Component} = require('bluespess');

class MobMovement extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.intended_walk_dir = 0;
		this.last_axis = 3;

		this.atom.c.Mob.on("keydown", (e) => {
			if(!e)
				return;
			if(e.which == 65 ||e.which == 37){this.intended_walk_dir |= 8; this.last_axis = 12;}
			if(e.which == 68 ||e.which == 39){this.intended_walk_dir |= 4; this.last_axis = 12;}
			if(e.which == 83 ||e.which == 40){this.intended_walk_dir |= 2; this.last_axis = 3;}
			if(e.which == 87 ||e.which == 38){this.intended_walk_dir |= 1; this.last_axis = 3;}
			this.update_walk();
		});

		this.atom.c.Mob.on("keyup", (e) => {
			if(!e)
				return;
			if(e.which == 65 ||e.which == 37){this.intended_walk_dir &= ~8;}
			if(e.which == 68 ||e.which == 39){this.intended_walk_dir &= ~4;}
			if(e.which == 83 ||e.which == 40){this.intended_walk_dir &= ~2;}
			if(e.which == 87 ||e.which == 38){this.intended_walk_dir &= ~1;}
			this.update_walk();
		});

		this.atom.on("moved", (movement) => {
			if(!movement.offset || movement.offset.z != 0)
				return;
			var dir = 0;
			if(movement.offset.x > 0) dir |= 4;
			if(movement.offset.x < 0) dir |= 8;
			if(movement.offset.y > 0) dir |= 1;
			if(movement.offset.y < 0) dir |= 2;
			if(dir)
				this.atom.dir = dir;
		});

		this.atom.on("bumped", (atom, offsetx, offsety) => {
			var dir = 0;
			if(offsetx > 0) dir |= 4;
			if(offsetx < 0) dir |= 8;
			if(offsety > 0) dir |= 1;
			if(offsety < 0) dir |= 2;
			if(dir)
				this.atom.dir = dir;
		});

		this.a.c.Mob.on("client_changed", () => {
			this.intended_walk_dir = 0;
			this.update_walk();
		});
	}
	update_walk() {
		var walk_dir = this.intended_walk_dir;
		if(walk_dir & 12 && walk_dir & 3) walk_dir &= this.last_axis;
		this.atom.walk_dir = walk_dir;
		this.atom.walking = !!walk_dir;
	}
}

MobMovement.depends = ["Mob", "Hearer"];
MobMovement.loadBefore = ["Mob"];

module.exports.components = {MobMovement};
