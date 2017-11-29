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
	}
};
