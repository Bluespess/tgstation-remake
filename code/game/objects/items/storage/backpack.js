'use strict';
const {Component, Atom} = require('bluespess');

module.exports.templates = {
	"backpack": {
		components: ["BackItem", "StorageItem"],
		vars: {
			components: {
				"StorageItem": {
					max_size: 3,
					max_combined_size: 21,
					storage_slots: 21,
					populate_contents() {
						new Atom(this.a.server, "survivalbox", this.a);
					}
				},
				"Item": {
					inhand_icon_state: "backpack",
					inhand_lhand_icon: 'icons/mob/inhands/equipment/backpack_lefthand.png',
					inhand_rhand_icon: 'icons/mob/inhands/equipment/backpack_righthand.png',
					size: 4
				}
			},
			name: "backpack",
			icon_state: "backpack"
		},
		tree_paths: ["items/storage/backpack"]
	},
	"cultpack": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "backpack"
				},
				"Examine": {
					desc: "It's useful for both carrying extra gear and proudly declaring your insanity."
				}
			},
			name: "trophy rack",
			icon_state: "cultpack"
		},
		tree_paths: ["items/storage/backpack/trophy_rack"]
	},
	"backpack_clown": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "clownpack"
				},
				"Examine": {
					desc: "It's a backpack made by Honk! Co."
				}
			},
			name: "Giggles von Honkerton",
			icon_state: "clownpack"
		},
		tree_paths: ["items/storage/backpack/clown"]
	},
	"backpack_explorer": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "explorerpack"
				},
				"Examine": {
					desc: "A robust backpack for stashing your loot."
				}
			},
			name: "explorer bag",
			icon_state: "explorerpack"
		},
		tree_paths: ["items/storage/backpack/explorer"]
	},
	"backpack_mime": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "mimepack"
				},
				"Examine": {
					desc: "A silent backpack made for those silent workers. Silence Co."
				}
			},
			name: "Parcel Parceaux",
			icon_state: "mimepack"
		},
		tree_paths: ["items/storage/backpack/mime"]
	},
	"backpack_medic": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "medicalpack"
				},
				"Examine": {
					desc: "It's a backpack especially designed for use in a sterile environment."
				}
			},
			name: "medical backpack",
			icon_state: "medicalpack"
		},
		tree_paths: ["items/storage/backpack/medic"]
	},
	"backpack_security": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "securitypack"
				},
				"Examine": {
					desc: "It's a very robust backpack."
				}
			},
			name: "security backpack",
			icon_state: "securitypack"
		},
		tree_paths: ["items/storage/backpack/security"]
	},
	"backpack_captain": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "captainpack"
				},
				"Examine": {
					desc: "It's a special backpack made exclusively for Nanotrasen officers."
				}
			},
			name: "captain's backpack",
			icon_state: "captainpack"
			// resistance_flags = 0
		},
		tree_paths: ["items/storage/backpack/captain"]
	},
	"backpack_industrial": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "engiepack"
				},
				"Examine": {
					desc: "It's a tough backpack for the daily grind of station life."
				}
			},
			name: "industrial backpack",
			icon_state: "engiepack"
			// resistance_flags = FIRE_PROOF
		},
		tree_paths: ["items/storage/backpack/industrial"]
	},
	"backpack_botany": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "botpack"
				},
				"Examine": {
					desc: "It's a backpack made of all-natural fibers."
				}
			},
			name: "botany backpack",
			icon_state: "botpack"
		},
		tree_paths: ["items/storage/backpack/botany"]
	},
	"backpack_chemistry": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "chempack"
				},
				"Examine": {
					desc: "A backpack specially designed to repel stains and hazardous liquids."
				}
			},
			name: "chemistry backpack",
			icon_state: "chempack"
		},
		tree_paths: ["items/storage/backpack/chemistry"]
	},
	"backpack_genetics": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "genepack"
				},
				"Examine": {
					desc: "A bag designed to be super tough, just in case someone hulks out on you."
				}
			},
			name: "genetics backpack",
			icon_state: "genepack"
		},
		tree_paths: ["items/storage/backpack/genetics"]
	},
	"backpack_science": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "toxpack"
				},
				"Examine": {
					desc: "A specially designed backpack. It's fire resistant and smells vaguely of plasma."
				}
			},
			name: "science backpack",
			icon_state: "toxpack"
			// resistance_flags = 0
		},
		tree_paths: ["items/storage/backpack/science"]
	},
	"backpack_virology": {
		parent_template: "backpack",
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "viropack"
				},
				"Examine": {
					desc: "A backpack made of hypo-allergenic fibers. It's designed to help prevent the spread of disease. Smells like monkey."
				}
			},
			name: "virology backpack",
			icon_state: "viropack"
		},
		tree_paths: ["items/storage/backpack/virology"]
	}
};
