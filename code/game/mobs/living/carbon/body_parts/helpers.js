'use strict';

module.exports = {
	skin_tones: {
		"caucasian1": "#ffe0d1",
		"caucasian2": "#fcccb3",
		"caucasian3": "#e8b59b",
		"latino": "#d9ae96",
		"mediterranean": "#c79b8b",
		"asian1": "#ffdeb3",
		"asian2": "#e3ba84",
		"arab": "#c4915e",
		"indian": "#b87840",
		"african1": "#754523",
		"african2": "#471c18",
		"albino": "#fff4e6",
		"orange": "#ffc905"
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
	},
	parse_zone(zone) {
		if(zone == "r_hand")
			return "right hand";
		else if (zone == "l_hand")
			return "left hand";
		else if (zone == "l_arm")
			return "left arm";
		else if (zone == "r_arm")
			return "right arm";
		else if (zone == "l_leg")
			return "left leg";
		else if (zone == "r_leg")
			return "right leg";
		else if (zone == "l_foot")
			return "left foot";
		else if (zone == "r_foot")
			return "right foot";
		else
			return zone;
	}
};
