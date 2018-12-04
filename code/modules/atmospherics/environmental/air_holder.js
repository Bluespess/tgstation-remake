'use strict';
const {Component, has_component} = require('bluespess');

class AirHolder extends Component {
	constructor(atom, template) {
		super(atom, template);
	}

	return_air() {
		let l = this.a.loc;
		while(l && !l.is_base_loc && !has_component(l, "AirHolder")) {
			l = l.loc;
		}
		if(!l)
			return;
		if(l.is_base_loc) {
			if(has_component(l.turf, "Turf"))
				return l.turf.c.AirHolder.return_air();
			return;
		}
		return l.c.AirHolder.return_air();
	}

	assume_air(air) {
		let l = this.a.loc;
		while(l && !l.is_base_loc && !has_component(l, "AirHolder")) {
			l = l.loc;
		}
		if(!l)
			return;
		if(l.is_base_loc) {
			if(has_component(l.turf, "Turf"))
				return l.turf.c.AirHolder.assume_air(air);
			return;
		}
		return l.c.AirHolder.assume_air(air);
	}

	remove_air(amt) {
		let l = this.a.loc;
		while(l && !l.is_base_loc && !has_component(l, "AirHolder")) {
			l = l.loc;
		}
		if(!l)
			return;
		if(l.is_base_loc) {
			if(has_component(l.turf, "Turf"))
				return l.turf.c.AirHolder.remove_air(amt);
			return;
		}
		return l.c.AirHolder.remove_air(amt);
	}
}

function get_air_holder(l) {
	while(l && !l.is_base_loc && !has_component(l, "AirHolder")) {
		l = l.loc;
	}
	if(!l)
		return;
	if(l.is_base_loc) {
		if(has_component(l.turf, "Turf"))
			return l.turf;
		return;
	}
	return l;
}

module.exports.components = {AirHolder};
module.exports.get_air_holder = get_air_holder;
