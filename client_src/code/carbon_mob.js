'use strict';
const {Component, chain_func} = require('bluespess-client');

class CarbonMob extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.get_transform = chain_func(this.a.get_transform, this.get_transform.bind(this));
		this.last_timestamp = 0;
		this.lying_direction = -1;
		this.interpolated_lying = this.lying ? 1 : 0;
	}

	get_transform(prev, timestamp) {
		let timestamp_diff = timestamp - this.last_timestamp;
		if(timestamp_diff > 0) {
			if(this.lying) {
				if(this.interpolated_lying == 0) {
					this.lying_direction = (Math.random() < 0.5) ? 1 : -1;
				}
				this.interpolated_lying = Math.min(this.interpolated_lying + (timestamp_diff / 150), 1);
			} else {
				this.interpolated_lying = Math.max(this.interpolated_lying - (timestamp_diff / 150), 0);
			}
			this.last_timestamp = timestamp;
		}
		return prev().translate(0, -this.interpolated_lying * 0.1875).rotate(this.lying_direction * this.interpolated_lying * Math.PI * 0.5);
	}
}

module.exports.components = {CarbonMob};
