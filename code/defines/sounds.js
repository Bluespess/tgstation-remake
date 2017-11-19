'use strict';

module.exports = {
	shatter() {
		return `sound/effects/glassbr${Math.floor(Math.random()*3)+1}.ogg`;
	},
	explosion() {
		return `sound/effects/explosion${Math.floor(Math.random()*2)+1}.ogg`;
	},
	sparks() {
		return `sound/effects/sparks${Math.floor(Math.random()*4)+1}.ogg`;
	},
	rustle() {
		return `sound/effects/rustle${Math.floor(Math.random()*5)+1}.ogg`;
	}
};
