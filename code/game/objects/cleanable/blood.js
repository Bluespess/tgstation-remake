'use strict';
const {Component} = require('bluespess');

class BloodDecal extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

BloodDecal.depends = ["CleanableDecal"];
BloodDecal.loadBefore = ["CleanableDecal"];

BloodDecal.template = {
	vars: {
		name: "blood",
		icon: 'icons/effects/blood.png',
	}
};

module.exports.templates = {
	"decal_blood": {
		components: ["BloodDecal"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: ["floor1", "floor2", "floor3", "floor4", "floor5", "floor6", "floor7"],
				label: true,
				orientation: "vertical"
			}
		],
		use_random_variant: true
	},
	"decal_blood_old": {
		components: ["BloodDecal"],
		vars: {
			components: {
				"Examine": {
					desc: "Looks like it's been here a while.  Eew."
				}
			},
			name: "dried blood"
		},
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: ["floor1-old", "floor2-old", "floor3-old", "floor4-old", "floor5-old", "floor6-old", "floor7-old"],
				label: true,
				orientation: "vertical"
			}
		],
		use_random_variant: true
	}
};

module.exports.components = {BloodDecal};
