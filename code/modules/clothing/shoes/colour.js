'use strict';
module.exports.templates = {
	"shoes_black": {
		components: ["FootItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "black"
				},
				"Examine": {
					desc: "A pair of black shoes."
				}
			},
			name: "black shoes",
			icon_state: "black"
		}
	},
	"shoes_brown": {
		components: ["FootItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "brown"
				},
				"Examine": {
					desc: "A pair of brown shoes."
				}
			},
			name: "brown shoes",
			icon_state: "brown"
		}
	}
};
