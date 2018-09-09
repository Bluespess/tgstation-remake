'use strict';
const {Component, Atom} = require('bluespess');

//TODO: Folding up boxes

class Box extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(this.illustration) {
			this.a.overlays.illustration = this.illustration;
		}
	}
}

Box.depends = ["StorageItem"];
Box.loadBefore = ["StorageItem"];

Box.template = {
	vars: {
		components: {
			"Box": {
				illustration: "writing"
			},
			"StorageItem": {
				max_size: 2,
				max_combined_size: 14,
				storage_slots: 7
			},
			"Item": {
				inhand_icon_state: "syringe_kit",
				inhand_lhand_icon: 'icons/mob/inhands/equipment/medical_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/medical_righthand.png',
				size: 3
			},
			"Examine": {
				desc: "It's just an ordinary box."
			}
		},
		name: "box",
		icon_state: "box"
	}
};

module.exports.templates = {
	"box": {
		components: ["Box", "StorageItem"],
		tree_paths: ["items/storage/box"]
	},
	"survival_box": {
		parent_template: "box",
		vars: {
			components: {
				"Examine": {
					desc: "It contains essential survival equipment."
				}
			},
			name: "survival box",
		},
		tree_paths: ["items/storage/box/survival"]
	},
	"beaker_box": {
		parent_template: "box",
		vars: {
			components: {
				"Box": {
					illustration: "beaker"
				},
				"Examine": {
					desc: "This contains beakers, apparently."
				},
				"StorageItem": {
					populate_contents() {
						for(let i = 0; i < 7; i++) {
							new Atom(this.a.server, "beaker", this.a);
						}
					}
				}
			},
			name: "box of beakers",
		},
		tree_paths: ["items/storage/box/beakers"]
	},
	"light_bulbs_box": {
		parent_template: "box",
		vars: {
			components: {
				"Box": {
					illustration: "light"
				},
				"Examine": {
					desc: "This box is shaped on the inside so that only light tubes and bulbs fit."
				},
				"StorageItem": {
					max_combined_size: 21,
					storage_slots: 21,
					can_hold: ["LightTube"],
					use_to_pickup: true,
					populate_contents() {
						for(let i = 0; i < 21; i++) {
							new Atom(this.a.server, "light_tube_small", this.a);
						}
					}
				}
			},
			name: "box of replacement bulbs",
		},
		tree_paths: ["items/storage/box/lights/bulbs"]
	},
	"light_tubes_box": {
		parent_template: "light_bulbs_box",
		vars: {
			components: {
				"Box": {
					illustration: "lighttube"
				},
				"StorageItem": {
					populate_contents() {
						for(let i = 0; i < 21; i++) {
							new Atom(this.a.server, "light_tube", this.a);
						}
					}
				}
			},
			name: "box of replacement tubes",
		},
		tree_paths: ["items/storage/box/lights/tubes"]
	},
	"light_mixed_box": {
		parent_template: "light_bulbs_box",
		vars: {
			components: {
				"Box": {
					illustration: "lightmixed"
				},
				"StorageItem": {
					populate_contents() {
						for(let i = 0; i < 14; i++) {
							new Atom(this.a.server, "light_tube", this.a);
						}
						for(let i = 0; i < 7; i++) {
							new Atom(this.a.server, "light_tube_small", this.a);
						}
					}
				}
			},
			name: "box of replacement lights",
		},
		tree_paths: ["items/storage/box/lights/mixed"]
	},
};

module.exports.components = {Box};
