'use strict';

module.exports.templates = {
	"jumpsuit_bartender": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "bar_suit"
				},
				"Examine": {
					desc: "It looks like it could use some more flair."
				}
			},
			name: "bartender's uniform",
			icon_state: "barman"
		},
		tree_paths: ["items/clothing/under/rank/bartender"]
	},
	"jumpsuit_captain": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "b_suit"
				},
				"Examine": {
					desc: "It's a blue jumpsuit with some gold markings denoting the rank of \"Captain\"."
				}
			},
			name: "captain's jumpsuit",
			icon_state: "captain"
		},
		tree_paths: ["items/clothing/under/rank/captain"]
	},
	"jumpsuit_qm": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "lb_suit"
				},
				"Examine": {
					desc: "It's a jumpsuit worn by the quartermaster. It's specially designed to prevent back injuries caused by pushing paper."
				}
			},
			name: "quartermaster's jumpsuit",
			icon_state: "qm"
		},
		tree_paths: ["items/clothing/under/rank/qm"]
	},
	"jumpsuit_cargo": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "lb_suit"
				},
				"Examine": {
					desc: "Shooooorts! They're comfy and easy to wear!"
				}
			},
			name: "cargo technician's jumpsuit",
			icon_state: "cargo"
		},
		tree_paths: ["items/clothing/under/rank/cargotech"]
	},
	"jumpsuit_chaplain": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "bl_suit"
				},
				"Examine": {
					desc: "It's a black jumpsuit, often worn by religious folk."
				}
			},
			name: "chaplain's jumpsuit",
			icon_state: "chaplain"
		},
		tree_paths: ["items/clothing/under/rank/chaplain"]
	},
	"jumpsuit_chef": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "chef"
				},
				"Examine": {
					desc: "A suit which is given only to the most <b>hardcore</b> cooks in space."
				}
			},
			name: "cook's suit",
			icon_state: "chef"
		},
		tree_paths: ["items/clothing/under/rank/chef"]
	},
	"jumpsuit_clown": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "clown"
				},
				"Examine": {
					desc: "<i>'HONK!'</i>"
				}
			},
			name: "clown suit",
			icon_state: "clown"
		},
		tree_paths: ["items/clothing/under/rank/clown"]
	},
	"jumpsuit_hop": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "b_suit"
				},
				"Examine": {
					desc: "It's a jumpsuit worn by someone who works in the position of \"Head of Personnel\"."
				}
			},
			name: "head of personnel's jumpsuit",
			icon_state: "hop"
		},
		tree_paths: ["items/clothing/under/rank/chef"]
	},
	"jumpsuit_botanist": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "g_suit"
				},
				"Examine": {
					desc: "It's a jumpsuit designed to protect against minor plant-related hazards."
				}
			},
			name: "botanist's jumpsuit",
			icon_state: "hydroponics"
		},
		tree_paths: ["items/clothing/under/rank/botany"]
	},
	"jumpsuit_janitor": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "janitor"
				},
				"Examine": {
					desc: "It's the official uniform of the station's janitor. It has minor protection from biohazards."
				}
			},
			name: "janitor's jumpsuit",
			icon_state: "janitor"
		},
		tree_paths: ["items/clothing/under/rank/janitor"]
	},
};
