'use strict';
module.exports.templates = {
	"airlock_command": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/command.png'
		},
		tree_paths: ["basic_structures/airlock/command"]
	},
	"airlock_security": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/security.png'
		},
		tree_paths: ["basic_structures/airlock/security"]
	},
	"airlock_engineering": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/engineering.png'
		},
		tree_paths: ["basic_structures/airlock/engineering"]
	},
	"airlock_medical": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/medical.png'
		},
		tree_paths: ["basic_structures/airlock/medical"]
	},
	"airlock_maintenance": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/maintenance.png'
		},
		tree_paths: ["basic_structures/airlock/maintenance"]
	},
	"airlock_mining": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/mining.png'
		},
		tree_paths: ["basic_structures/airlock/mining"]
	},
	"airlock_atmos": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/atmos.png'
		},
		tree_paths: ["basic_structures/airlock/atmos"]
	},
	"airlock_research": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/research.png'
		},
		tree_paths: ["basic_structures/airlock/research"]
	},
	"airlock_freezer": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/freezer.png'
		},
		tree_paths: ["basic_structures/airlock/freezer"]
	},
	"airlock_science": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/science.png'
		},
		tree_paths: ["basic_structures/airlock/science"]
	},
	"airlock_virology": {
		components: ["Airlock"],
		vars: {
			icon: 'icons/obj/doors/airlocks/station/virology.png'
		},
		tree_paths: ["basic_structures/airlock/virology"]
	},

	// Glass

	"airlock_command_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/command.png'
		},
		tree_paths: ["basic_structures/airlock/command/glass"]
	},
	"airlock_engineering_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/engineering.png'
		},
		tree_paths: ["basic_structures/airlock/engineering/glass"]
	},
	"airlock_security_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/security.png'
		},
		tree_paths: ["basic_structures/airlock/security/glass"]
	},
	"airlock_medical_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/medical.png'
		},
		tree_paths: ["basic_structures/airlock/medical/glass"]
	},
	"airlock_research_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/research.png'
		},
		tree_paths: ["basic_structures/airlock/research/glass"]
	},
	"airlock_mining_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/mining.png'
		},
		tree_paths: ["basic_structures/airlock/mining/glass"]
	},
	"airlock_atmos_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/atmos.png'
		},
		tree_paths: ["basic_structures/airlock/atmos/glass"]
	},
	"airlock_science_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/science.png'
		},
		tree_paths: ["basic_structures/airlock/science/glass"]
	},
	"airlock_virology_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/virology.png'
		},
		tree_paths: ["basic_structures/airlock/virology/glass"]
	},
	"airlock_maintenance_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				}
			},
			icon: 'icons/obj/doors/airlocks/station/maintenance.png'
		},
		tree_paths: ["basic_structures/airlock/maintenance/glass"]
	},

	// Mineral ones

	"airlock_titanium": {
		components: ["Airlock"],
		vars: {
			components: {
				"Airlock": {
					overlays_file: 'icons/obj/doors/airlocks/shuttle/overlays.png'
				}
			},
			name: "shuttle airlock",
			icon: 'icons/obj/doors/airlocks/shuttle/shuttle.png'
		},
		tree_paths: ["basic_structures/airlock/titanium"]
	},
	"airlock_titanium_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				},
				"Airlock": {
					overlays_file: 'icons/obj/doors/airlocks/shuttle/overlays.png'
				}
			},
			name: "shuttle airlock",
			icon: 'icons/obj/doors/airlocks/shuttle/shuttle.png'
		},
		tree_paths: ["basic_structures/airlock/titanium/glass"]
	},

	// Station2

	"airlock_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				},
				"Airlock": {
					overlays_file: 'icons/obj/doors/airlocks/station2/overlays.png'
				}
			},
			icon: 'icons/obj/doors/airlocks/station2/glass.png'
		},
		tree_paths: ["basic_structures/airlock/glass"]
	},

	// External

	"airlock_external": {
		components: ["Airlock"],
		vars: {
			components: {
				"Airlock": {
					overlays_file: 'icons/obj/doors/airlocks/external/overlays.png'
				}
			},
			name: "external airlock",
			icon: 'icons/obj/doors/airlocks/external/external.png'
		},
		tree_paths: ["basic_structures/airlock/external"]
	},
	"airlock_external_glass": {
		components: ["Airlock"],
		vars: {
			components: {
				"Door": {
					glass: true
				},
				"Airlock": {
					overlays_file: 'icons/obj/doors/airlocks/external/overlays.png'
				}
			},
			name: "external airlock",
			icon: 'icons/obj/doors/airlocks/external/external.png'
		},
		tree_paths: ["basic_structures/airlock/external/glass"]
	}
};
