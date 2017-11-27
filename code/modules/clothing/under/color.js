'use strict';
module.exports.templates = {
	"jumpsuit_color_random": {
		pick_from: ["jumpsuit_black", "jumpsuit_grey", "jumpsuit_blue", "jumpsuit_green",
			"jumpsuit_orange", "jumpsuit_pink", "jumpsuit_red", "jumpsuit_white", "jumpsuit_yellow",
			"jumpsuit_darkblue", "jumpsuit_teal", "jumpsuit_lightpurple", "jumpsuit_darkgreen",
			"jumpsuit_lightbrown", "jumpsuit_brown", "jumpsuit_maroon", "jumpsuit_rainbow"]
	},
	"jumpsuit_black": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "bl_suit",
				},
				"UniformItem": {
					worn_icon_state: "black"
				}
			},
			name: "black jumpsuit",
			icon_state: "black"
			//TODO item_color: "black"
			//TODO resistance_flags: 0
		}
	},

	"jumpsuit_grey": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A tasteful grey jumpsuit that reminds you of the good old days."
				},
				"Item": {
					inhand_icon_state: "gy_suit",
				},
				"UniformItem": {
					worn_icon_state: "grey"
				}
			},
			name: "grey jumpsuit",
			icon_state: "grey"
			//TODO item_color: "grey"
		}
	},

	"jumpsuit_blue": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "b_suit",
				},
				"UniformItem": {
					worn_icon_state: "blue"
				}
			},
			name: "blue jumpsuit",
			icon_state: "blue"
			//TODO item_color: "blue"
		}
	},

	"jumpsuit_green": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "g_suit",
				},
				"UniformItem": {
					worn_icon_state: "green"
				}
			},
			name: "green jumpsuit",
			icon_state: "green"
			//TODO item_color: "green"
		}
	},

	"jumpsuit_orange": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "Don't wear this near paranoid security officers."
				},
				"Item": {
					inhand_icon_state: "o_suit",
				},
				"UniformItem": {
					worn_icon_state: "orange"
				}
			},
			name: "orange jumpsuit",
			icon_state: "orange"
			//TODO item_color: "orange"
		}
	},

	"jumpsuit_pink": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "Just looking at this makes you feel <i>fabulous</i>."
				},
				"Item": {
					inhand_icon_state: "p_suit",
				},
				"UniformItem": {
					worn_icon_state: "pink"
				}
			},
			name: "pink jumpsuit",
			icon_state: "pink"
			//TODO item_color: "pink"
		}
	},

	"jumpsuit_red": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"UniformItem": {
					worn_icon_state: "red"
				}
			},
			name: "red jumpsuit",
			icon_state: "red"
			//TODO item_color: "red"
		}
	},

	"jumpsuit_white": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "w_suit",
				},
				"UniformItem": {
					worn_icon_state: "white"
				}
			},
			name: "white jumpsuit",
			icon_state: "white"
			//TODO item_color: "white"
		}
	},

	"jumpsuit_yellow": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "y_suit",
				},
				"UniformItem": {
					worn_icon_state: "yellow"
				}
			},
			name: "yellow jumpsuit",
			icon_state: "yellow"
			//TODO item_color: "yellow"
		}
	},

	"jumpsuit_darkblue": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "b_suit",
				},
				"UniformItem": {
					worn_icon_state: "darkblue"
				}
			},
			name: "darkblue jumpsuit",
			icon_state: "darkblue"
			//TODO item_color: "darkblue"
		}
	},

	"jumpsuit_teal": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "b_suit",
				},
				"UniformItem": {
					worn_icon_state: "teal"
				}
			},
			name: "teal jumpsuit",
			icon_state: "teal"
			//TODO item_color: "teal"
		}
	},

	"jumpsuit_lightpurple": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "p_suit",
				},
				"UniformItem": {
					worn_icon_state: "lightpurple"
				}
			},
			name: "purple jumpsuit",
			icon_state: "lightpurple"
			//TODO item_color: "lightpurple"
		}
	},

	"jumpsuit_darkgreen": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "g_suit",
				},
				"UniformItem": {
					worn_icon_state: "darkgreen"
				}
			},
			name: "darkgreen jumpsuit",
			icon_state: "darkgreen"
			//TODO item_color: "darkgreen"
		}
	},

	"jumpsuit_lightbrown": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "lb_suit",
				},
				"UniformItem": {
					worn_icon_state: "lightbrown"
				}
			},
			name: "lightbrown jumpsuit",
			icon_state: "lightbrown"
			//TODO item_color: "lightbrown"
		}
	},

	"jumpsuit_brown": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "lb_suit",
				},
				"UniformItem": {
					worn_icon_state: "brown"
				}
			},
			name: "brown jumpsuit",
			icon_state: "brown"
			//TODO item_color: "brown"
		}
	},

	"jumpsuit_maroon": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A standard issue colored jumpsuit. Variety is the spice of life!"
				},
				"Item": {
					inhand_icon_state: "r_suit",
				},
				"UniformItem": {
					worn_icon_state: "maroon"
				}
			},
			name: "maroon jumpsuit",
			icon_state: "maroon"
			//TODO item_color: "maroon"
		}
	},

	"jumpsuit_rainbow": {
		components: ["UniformItem"],
		vars: {
			components: {
				"Describe": {
					desc: "A multi-colored jumpsuit!"
				},
				"Item": {
					inhand_icon_state: "rainbow",
				},
				"UniformItem": {
					worn_icon_state: "rainbow"
				}
			},
			name: "rainbow jumpsuit",
			icon_state: "rainbow"
			//TODO item_color: "rainbow"
			// TODO can_adjust: 0
		}
	},
};
