'use strict';
const {Component, Atom, has_component, chain_func} = require('bluespess');
const _ = require('underscore');

// Component shared by floors and plating
class FloorBase extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Tangible.ex_act = chain_func(this.a.c.Tangible.ex_act, this.ex_act.bind(this));
	}

	ex_act(prev, severity) {
		prev();
		let shielded = this.is_shielded();
		if(severity != 1 && shielded)
			return;
		if(severity == 1) {
			this.a.destroy();
		} else if(severity == 2) {
			if(Math.random() < 0.65) {
				if(has_component(this.a, "Plating") && Math.random() < 0.64) {
					new Atom(this.a.server, "lattice", this.a.loc);
				}
				this.a.destroy();
			} else {
				this.break_tile();

			}
			if(Math.random() < 0.33)
				new Atom(this.a.server, "metal_sheet", this.a.loc);
		} else {
			if(Math.random() < 0.5)
				this.break_tile();
		}
	}

	break_tile() {
		if(this.broken)
			return;
		if(this.broken_states.length) {
			this.a.overlays.broken = {icon_state: _.sample(this.broken_states)};
		}
		this.broken = true;
	}

	is_shielded() {
		for(let obj of this.a.crosses()) {
			if(obj.layer <= this.a.layer)
				continue;
			let shielded_components = [
				"FloorBase", "Wall", "Window"
			];
			for(let comp of shielded_components) {
				if(has_component(obj, comp))
					return true;
			}
		}
	}
}

FloorBase.depends = ["Tangible"];
FloorBase.loadBefore = ["Tangible"];

FloorBase.template = {
	vars: {
		components: {
			"FloorBase": {
				broken: false,
				burnt: false,
				broken_states: [],
				burnt_states: []
			},
			"Tangible": {
				anchored: true
			}
		}
	}
};

module.exports.components = {FloorBase};
