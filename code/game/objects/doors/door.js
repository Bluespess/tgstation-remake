'use strict';
const {Component, chain_func} = require('bluespess');
const layers = require('../../../defines/layers.js');

class Door extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.seconds_electrified = 0;
		this.shockedby = [];
		this.operating = false;
		this.a.layer = this.a.density ? this.closed_layer : this.open_layer;
		this.a.on("bumped_by", this.bumped_by.bind(this));
		this.a.c.RequiresAccess.has_access = chain_func(this.a.c.RequiresAccess.has_access, this.has_access);
	}

	bumped_by(atom) {
		if(this.operating)
			return;
		if((atom.last_bump_time + 1000) > this.a.server.now())
			return;
		this.bump_open(atom);
	}

	bump_open(atom) {
		if(this.density) {
			if(this.a.c.RequiresAccess.has_access(atom)) {
				this.open();
			} else {
				this.do_animate("deny");
			}
		}
	}

	try_to_activate_door(atom) {
		if(this.operating)
			return;
		if(this.a.c.RequiresAccess.has_access(atom)) {
			if(this.a.density) {
				this.open();
			} else {
				this.close();
			}
			return;
		}
		if(this.density)
			this.do_animate("deny");
	}

	has_access(prev) {
		if(this.emergency)
			return true;
		return prev();
	}

	async open() {
		if(!this.a.density)
			return true;
		if(this.operating)
			return;
		this.operating = true;
		this.do_animate("opening");
		this.a.opacity = false;
		await this.a.server.sleep(500);
		this.a.density = false;
		await this.a.server.sleep(500);
		this.a.layer = this.open_layer;
		this.a.icon_state = this.open_state;
		this.a.opacity = false;
		this.operating = false;
		if(this.autoclose) {
			setTimeout(() => {this.close();}, this.autoclose_delay);
		}
		this.emit("opened");
		return true;
	}

	async close() {
		if(this.a.density)
			return true;
		if(this.operating)
			return;
		if(this.safe) {
			for(let atom of this.a.crosses) {
				if(atom.density) {
					if(this.autoclose) {
						setTimeout(() => {this.close();}, 6000);
					}
					return;
				}
			}
		}
		this.operating = true;

		this.do_animate("closing");
		this.a.layer = this.closed_layer;
		await this.a.server.sleep(500);
		this.density = true;
		await this.a.server.sleep(500);
		this.a.icon_state = this.closed_state;
		if(!this.glass)
			this.opacity = true;
		if(this.safe) {
			for(var atom of this.a.crosses) {
				if(this.a.server.has_component(atom, "LivingMob")) {
					setTimeout(() => {this.open();}, 100);
					return;
				}
			}
		} else {
			this.crush();
		}
	}

	crush() {

	}

	lock() {

	}

	unlock() {
		
	}
}

Door.template = {
	vars: {
		components: {
			"Door": {
				glass: false,
				welded: false,
				normalspeed: true,
				heat_proof: false, // For rglass-windowed airlocks and firedoors
				emergency: false, // Emergency access override
				sub_door: false, // true if it's meant to go under another door.
				closed_layer: layers.CLOSED_DOOR_LAYER,
				open_layer: layers.OPEN_DOOR_LAYER,
				autoclose: false, // does it automatically close after some time
				autoclose_delay: 6000,
				safe: true, // whether the door detects things and mobs in its way and reopen or crushes them.
				locked: false, // whether the door is bolted or not
				damage_deflection: 10,
				open_state: "door1",
				closed_state: "door0"
			}
		}
	}
};

Door.depends = ["RequiresAccess"];
Door.loadBefore = ["RequiresAccess"];

module.exports.components = {Door};
