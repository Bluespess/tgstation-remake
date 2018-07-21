'use strict';
const {Component, has_component, make_watched_property} = require('bluespess');

// heh this file is named node.js
// pun was not intended

class PowerNode extends Component {
	constructor(atom, template) {
		super(atom, template);
		make_watched_property(this, "powernet");
		this.cable = null;
		this.a.on("moved", () => {
			this.reconnect();
		});
	}

	get avail() {
		if(this.powernet)
			return this.powernet.avail;
		return 0;
	}

	get new_avail() {
		if(this.powernet)
			return this.powernet.new_avail;
		return 0;
	}
	set new_avail(val) {
		if(this.powernet)
			this.powernet.new_avail = val;
	}
	get surplus() {
		if(this.powernet)
			return this.powernet.avail - this.powernet.load;
		return 0;
	}

	get load() {
		if(this.powernet)
			return this.powernet.load;
		return 0;
	}
	set load(val) {
		if(this.powernet)
			this.powernet.load = val;
	}

	reconnect() {
		if(this.cable) {
			let idx = this.cable.c.Cable.nodes.indexOf(this.a);
			if(idx != -1)
				this.cable.c.Cable.nodes.splice(idx, 1);
			this.cable = null;
		}
		if(this.powernet) {
			this.powernet.nodes.delete(this.a);
		}
		for(let crosser of this.a.crosses()) {
			if(has_component(crosser, "Cable")
				&& crosser.c.Cable.d1 == 0
				&& crosser.c.Cable.powernet
				&& crosser.crosses(this.a, {bounds_x: 0.5, bounds_y: 0.5, bounds_width: 0, bounds_height: 0})) {
				// Yes, we've got it!
				this.cable = crosser;
				this.cable.c.Cable.nodes.push(this.a);
				this.cable.c.Cable.powernet.nodes.add(this.a);
				break;
			}
		}
	}
}

PowerNode.loadBefore = ["MachineTick"];
PowerNode.depends = ["MachineTick"];

PowerNode.template = {
	vars: {
		components: {
			"PowerNode": {

			}
		}
	}
};

module.exports.components = {PowerNode};
