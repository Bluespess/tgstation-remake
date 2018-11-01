'use strict';
const {Component, Atom, make_watched_property, has_component} = require('bluespess');
const _ = require('underscore');

class BloodDecal extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

BloodDecal.depends = ["CleanableDecal"];
BloodDecal.loadBefore = ["CleanableDecal"];

BloodDecal.template = {
	vars: {
		components: {
			"CleanableDecal": {
				footprint_amount: 100,
				footprint_type: "blood",
				merge_group: "blood_splat",
				merge_priority: 20
			}
		},
		name: "blood",
		icon: 'icons/effects/blood.png'
	}
};

class BloodDripsDecal extends Component {
	constructor(atom, template) {
		super(atom, template);
		for(let i = 0; i < this.num_drips; i++) {
			this.a.overlays[`drip_${i}`] = {icon_state: _.sample(this.drip_icons)};
		}
		this.a.icon_state = null;
		this.a.c.CleanableDecal.on("merged", this.merged.bind(this));
	}
	merged(other) {
		if(has_component(other, "BloodDripsDecal")) {
			let old_drips = this.num_drips;
			this.num_drips += other.c.BloodDripsDecal.num_drips;
			if(this.num_drips > this.max_drips) {
				let new_decal = new Atom(this.a.server, "decal_blood_splatter");
				new_decal.fine_loc = this.a.fine_loc;
				this.a.destroy();
				return;
			}
			for(let i = old_drips; i < this.num_drips; i++) {
				this.a.overlays[`drip_${i}`] = other.overlays[`drip_${i - old_drips}`];
			}
		}
	}
}

BloodDripsDecal.loadBefore = ["BloodDecal"];
BloodDripsDecal.depends = ["BloodDecal"];

BloodDripsDecal.template = {
	vars: {
		components: {
			"CleanableDecal": {
				merge_priority: 0,
				footprint_amount: 0
			},
			"BloodDripsDecal": {
				drip_icons: ["drip1", "drip2", "drip3", "drip4", "drip5"],
				num_drips: 1,
				max_drips: 3
			}
		},
		icon_state: "drip1"
	}
};

class FootprintsDecal extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.CleanableDecal.merge_group = "footprints_" + this.type;
		this.on("entered_dirs_changed", this.entered_dirs_changed.bind(this));
		this.on("exited_dirs_changed", this.exited_dirs_changed.bind(this));
		make_watched_property(this, "entered_dirs", "number");
		make_watched_property(this, "exited_dirs", "number");
	}

	entered_dirs_changed(from, to) {
		for(let dir of [1,2,4,8]) {
			if((from & dir) && !(to & dir))
				this.a.overlays[`entered_${dir}`] = null;
			else if((to & dir) && !(from & dir))
				this.a.overlays[`entered_${dir}`] = {icon_state: `${this.type}1`, dir, alpha: this.a.alpha};
		}
	}

	exited_dirs_changed(from, to) {
		for(let dir of [1,2,4,8]) {
			if((from & dir) && !(to & dir))
				this.a.overlays[`exited_${dir}`] = null;
			else if((to & dir) && !(from & dir))
				this.a.overlays[`exited_${dir}`] = {icon_state: `${this.type}2`, dir, alpha: this.a.alpha};
		}
	}
}

FootprintsDecal.loadBefore = ["CleanableDecal"];
FootprintsDecal.depends = ["CleanableDecal"];

FootprintsDecal.template = {
	vars: {
		components: {
			"FootprintsDecal": {
				type: "blood",
				entered_dirs: 0,
				exited_dirs: 0
			},
			"Examine": {
				desc: "WHOSE FOOTPRINTS ARE THESE?"
			}
		},
		name: "footprints",
		icon: 'icons/effects/footprints.png',
		icon_state: "nothingwhatsoever",
		alpha: 0.5
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
				"CleanableDecal": {
					footprint_amount: 0
				},
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
	},
	"decal_blood_splatter": {
		components: ["BloodDecal"],
		variants: [
			{
				type: "single",
				var_path: ["icon_state"],
				values: ["gibbl1", "gibbl2", "gibbl3", "gibbl4", "gibbl5"],
				label: true,
				orientation: "vertical"
			}
		],
		use_random_variant: true
	},
	"decal_blood_drips": {
		components: ["BloodDripsDecal"]
	}
};

module.exports.components = {BloodDecal, BloodDripsDecal, FootprintsDecal};
