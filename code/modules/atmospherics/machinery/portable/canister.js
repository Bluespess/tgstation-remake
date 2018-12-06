'use strict';
const {Component} = require('bluespess');
const atmos_defines = require('../../../../defines/atmos_defines.js');

const INIT_MOLES = atmos_defines.ONE_ATMOSPHERE * 45 * 1000 / (atmos_defines.R_IDEAL_GAS_EQUATION * atmos_defines.T20C);

class Canister extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.PortableAtmospherics.on("connected_port_changed", this.connected_port_changed.bind(this));
		this.a.c.PortableAtmospherics.on("air_updated", this.air_updated.bind(this));
		this.a.c.PortableAtmospherics.air_contents.parse_gas_string(this.init_gas);
		this.a.c.PortableAtmospherics.emit("air_updated");
	}

	connected_port_changed(from, to) {
		if(from && !to) {
			this.a.overlays.can_connector = null;
		} else if(to && !from) {
			this.a.overlays.can_connector = {icon_state: "can-connector"};
		}
	}
	air_updated() {
		let pressure = this.a.c.PortableAtmospherics.air_contents.return_pressure();
		if(pressure > 10) {
			let overlay = null;
			if(pressure < 5*atmos_defines.ONE_ATMOSPHERE)
				overlay = "can-o0";
			else if(pressure < 10*atmos_defines.ONE_ATMOSPHERE)
				overlay = "can-o1";
			else if(pressure < 40*atmos_defines.ONE_ATMOSPHERE)
				overlay = "can-o2";
			else
				overlay = "can-o3";
			if(!this.a.overlays.can_pressure || this.a.overlays.can_pressure.icon_state != overlay)
				this.a.overlays.can_pressure = {icon_state: overlay};
		} else {
			if(this.a.overlays.can_pressure)
				this.a.overlays.can_pressure = null;
		}
	}
}

Canister.loadBefore = ["PortableAtmospherics"];
Canister.depends = ["PortableAtmospherics"];

Canister.template = {
	vars: {
		components: {
			"Canister": {
				release_pressure: atmos_defines.ONE_ATMOSPHERE,
				max_release_pressure: atmos_defines.ONE_ATMOSPHERE * 10,
				min_release_pressure: atmos_defines.ONE_ATMOSPHERE / 10,
				init_gas: `TEMP=${atmos_defines.T20C}`
			},
			"Examine": {
				desc: "A canister for the storage of gas."
			}
		},
		name: "canister",
		icon_state: "yellow"
	}
};

module.exports.templates = {
	"canister": {
		components: ["Canister"]
	},
	"canister_n2": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `n2=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Nitrogen gas. Reportedly useful for something."
				}
			},
			name: "n2 canister",
			icon_state: "red"
		}
	},
	"canister_o2": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `o2=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Oxygen. Necessary for human life."
				}
			},
			name: "o2 canister",
			icon_state: "blue"
		}
	},
	"canister_co2": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `co2=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Carbon dioxide. What the fuck is carbon dioxide?"
				}
			},
			name: "co2 canister",
			icon_state: "black"
		}
	},
	"canister_plasma": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `plasma=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Plasma gas. The reason YOU are here. Highly toxic."
				}
			},
			name: "plasma canister",
			icon_state: "orange"
		}
	},
	"canister_bz": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `bz=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "BZ, a powerful hallucinogenic nerve agent."
				}
			},
			name: "bz canister",
			icon_state: "purple"
		}
	},
	"canister_n2o": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `n2o=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Nitrous oxide gas. Known to cause drowsiness."
				}
			},
			name: "n2o canister",
			icon_state: "redws"
		}
	},
	"canister_air": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `n2=${INIT_MOLES*0.8};o2=${INIT_MOLES*0.2};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Pre-mixed air."
				}
			},
			name: "air canister",
			icon_state: "grey"
		}
	},
	"canister_tritium": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `tritium=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Tritium. Inhalation might cause irradiation"
				}
			},
			name: "tritium canister",
			icon_state: "green"
		}
	},
	"canister_nob": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `nob=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Hyper-Noblium. More noble than all other gases."
				}
			},
			name: "hyper-noblium canister",
			icon_state: "freon"
		}
	},
	"canister_no2": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `no2=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Nitryl gas. Feels great 'til the acid eats your lungs."
				}
			},
			name: "nitryl canister",
			icon_state: "brown"
		}
	},
	"canister_stim": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `stim=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Stimulum. High energy gas, high energy people."
				}
			},
			name: "stimulum canister",
			icon_state: "darkpurple"
		}
	},
	"canister_pluox": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `pluox=${INIT_MOLES};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Pluoxium. Like oxygen, but more bang for your buck."
				}
			},
			name: "pluoxium canister",
			icon_state: "darkblue"
		}
	},
	"canister_water_vapor": {
		components: ["Canister"],
		vars: {
			components: {
				"Canister": {
					init_gas: `water_vapor=${INIT_MOLES * 2};TEMP=${atmos_defines.T20C}`
				},
				"Examine": {
					desc: "Water Vapor. We get it, you vape."
				}
			},
			name: "water vaport canister",
			icon_state: "water_vapor"
		}
	},
};

module.exports.components = {Canister};
