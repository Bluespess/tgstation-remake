'use strict';

module.exports = {
	skintone2hex(skin_tone = "caucasian1") {
		switch(skin_tone) {
		case "caucasian1":
			return "#ffe0d1";
		case "caucasian2":
			return "#fcccb3";
		case "caucasian3":
			return "#e8b59b";
		case "latino":
			return "#d9ae96";
		case "mediterranean":
			return "#c79b8b";
		case "asian1":
			return "#ffdeb3";
		case "asian2":
			return "#e3ba84";
		case "arab":
			return "#c4915e";
		case "indian":
			return "#b87840";
		case "african1":
			return "#754523";
		case "african2":
			return "#471c18";
		case "albino":
			return "#fff4e6";
		case "orange":
			return "#ffc905";
		}
	},
	random_zone(zone, prob = 0.8) {
		if(zone && Math.random() < prob)
			return zone;

		let t = Math.floor(Math.random() * 18);
		if(t == 0)
			return "head";
		else if(t == 1)
			return "chest";
		else if(t <= 5)
			return "l_arm";
		else if(t <= 9)
			return "r_arm";
		else if(t <= 13)
			return "l_leg";
		else if(t >= 14)
			return "r_leg";

		return zone;
	}
};
