'use strict';

module.exports.templates = {
	"red_athletic_shorts": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "redshorts",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_coveblack: ['groin']
				},
				"Examine": {
					desc: "95% Polyester, 5% Spandex!."
				}
			},
			name: "red athletic shorts",
			icon_state: "redshorts"
			//TODO item_color: "redshorts"
		},
		tree_paths: ["items/clothing/under/shorts/red"]
	},
	"green_athletic_shorts": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "greenshorts",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_coveblack: ['groin']
				},
				"Examine": {
					desc: "95% Polyester, 5% Spandex!."
				}
			},
			name: "green athletic shorts",
			icon_state: "greenshorts"
			//TODO item_color: "greenshorts"
		},
		tree_paths: ["items/clothing/under/shorts/green"]
	},
	"blue_athletic_shorts": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "blueshorts",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_coveblack: ['groin']
				},
				"Examine": {
					desc: "95% Polyester, 5% Spandex!."
				}
			},
			name: "blue athletic shorts",
			icon_state: "blueshorts"
			//TODO item_color: "blueshorts"
		},
		tree_paths: ["items/clothing/under/shorts/blue"]
	},
	"black_athletic_shorts": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "blackshorts",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_coveblack: ['groin']
				},
				"Examine": {
					desc: "95% Polyester, 5% Spandex!."
				}
			},
			name: "black athletic shorts",
			icon_state: "blackshorts"
			//TODO item_color: "blackshorts"
		},
		tree_paths: ["items/clothing/under/shorts/black"]
	},
	"grey_athletic_shorts": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "greyshorts",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covegrey: ['groin']
				},
				"Examine": {
					desc: "95% Polyester, 5% Spandex!."
				}
			},
			name: "grey athletic shorts",
			icon_state: "greyshorts"
			//TODO item_color: "greyshorts"
		},
		tree_paths: ["items/clothing/under/shorts/grey"]
	},
	"purple_athletic_shorts": {
		components: ["UniformItem"],
		vars: {
			components: {
				"UniformItem": {
					worn_icon_state: "purpleshorts",
					can_adjust: false,
					fitted: "no_female_uniform"
				},
				"WearableItem": {
					body_parts_covepurple: ['groin']
				},
				"Examine": {
					desc: "95% Polyester, 5% Spandex!."
				}
			},
			name: "purple athletic shorts",
			icon_state: "purpleshorts"
			//TODO item_color: "purpleshorts"
		},
		tree_paths: ["items/clothing/under/shorts/purple"]
	},
};
