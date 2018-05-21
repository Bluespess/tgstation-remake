'use strict';
const _ = require('underscore');

module.exports = {
	shatter() {
		return `sound/effects/glassbr${_.random(1,3)}.ogg`;
	},
	explosion() {
		return `sound/effects/explosion${_.random(1,2)}.ogg`;
	},
	sparks() {
		return `sound/effects/sparks${_.random(1,4)}.ogg`;
	},
	rustle() {
		return `sound/effects/rustle${_.random(1,5)}.ogg`;
	}
};
