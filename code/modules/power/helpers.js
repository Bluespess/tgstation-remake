'use strict';

module.exports = {
	display_watts(watts) {
		if(watts >= 1000000000000000000)
			return `${+(watts / 1000000000000000000).toFixed(3)} EW`;
		if(watts >= 1000000000000000)
			return `${+(watts / 1000000000000000).toFixed(3)} PW`;
		if(watts >= 1000000000000)
			return `${+(watts / 1000000000000).toFixed(3)} TW`;
		if(watts >= 1000000000)
			return `${+(watts / 1000000000).toFixed(3)} GW`;
		if(watts >= 1000000)
			return `${+(watts / 1000000).toFixed(3)} MW`;
		if(watts >= 1000)
			return `${+(watts / 1000).toFixed(3)} kW`;
		return `${+watts.toFixed(3)} W`;
	},

	display_kilojoules(kilojoules) {
		if(kilojoules >= 1000000000000000)
			return `${+(kilojoules / 1000000000000000).toFixed(3)} EJ`;
		if(kilojoules >= 1000000000000)
			return `${+(kilojoules / 1000000000000).toFixed(3)} PJ`;
		if(kilojoules >= 1000000000)
			return `${+(kilojoules / 1000000000).toFixed(3)} TJ`;
		if(kilojoules >= 1000000)
			return `${+(kilojoules / 1000000).toFixed(3)} GJ`;
		if(kilojoules >= 1000)
			return `${+(kilojoules / 1000).toFixed(3)} MJ`;
		if(kilojoules >= 1)
			return `${+(kilojoules).toFixed(3)} kJ`;
		return `${+(kilojoules * 1000).toFixed(3)} J`;
	}
};
