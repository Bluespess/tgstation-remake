'use strict';
module.exports.templates = {
	"trash": {
		components: ["Item"],
		vars: {
			components: {
				"Item": {
					no_bludgeon: true,
					inhand_lhand_icon: 'icons/mob/inhands/misc/food_lefthand.png',
					inhand_rhand_icon: 'icons/mob/inhands/misc/food_righthand.png',
					size: 1
				},
				"Examine": {
					desc: "This is rubbish."
				}
			},
			name: "trash",
			icon: 'icons/obj/janitor.png',
			//resistance_flags: FLAMMABLE
		}
	},
	"trash_raisins": {
		parent_template: "trash",
		vars: {
			name: "4no raisins",
			icon_state: '4no_raisins'
		}
	},
	"trash_candy": {
		parent_template: "trash",
		vars: {
			name: "candy",
			icon_state: 'candy'
		}
	},
	"trash_cheesie": {
		parent_template: "trash",
		vars: {
			name: "cheesie honkers",
			icon_state: 'cheesie_honkers'
		}
	},
	"trash_chips": {
		parent_template: "trash",
		vars: {
			name: "chips",
			icon_state: 'chips'
		}
	},
	"trash_popcorn": {
		parent_template: "trash",
		vars: {
			name: "popcorn",
			icon_state: 'popcorn'
		}
	},
	"trash_sosjerky": {
		parent_template: "trash",
		vars: {
			name: "Scaredy's Private Reserve Beef Jerky",
			icon_state: 'sosjerky'
		}
	},
	"trash_syndi_cakes": {
		parent_template: "trash",
		vars: {
			name: "syndi-cakes",
			icon_state: 'syndi_cakes'
		}
	},
	"trash_waffles": {
		parent_template: "trash",
		vars: {
			name: "waffles tray",
			icon_state: 'waffles'
		}
	},
	"trash_plate": {
		parent_template: "trash",
		vars: {
			name: "plate",
			icon_state: 'plate'
			//resistance_flags: 0
		}
	},
	"trash_pistachios": {
		parent_template: "trash",
		vars: {
			name: "pistachios pack",
			icon_state: 'pistachios_pack'
		}
	},
	"trash_semki": {
		parent_template: "trash",
		vars: {
			name: "semki pack",
			icon_state: 'semki_pack'
		}
	},
	"trash_tray": {
		parent_template: "trash",
		vars: {
			name: "tray",
			icon_state: 'tray'
			//resistance_flags: 0
		}
	},
	"trash_candle": {
		parent_template: "trash",
		vars: {
			name: "candle",
			icon: 'icons/obj/candle.png',
			icon_state: 'candle4'
		}
	},
	"trash_can": {
		parent_template: "trash",
		vars: {
			name: "crushed can",
			icon_state: 'cola'
			//resistance_flags: 0
		}
	},
	"trash_coal": { //TODO: /obj/item/trash/coal/burn()
		parent_template: "trash",
		vars: {
			components: {
				"Examine": {
					desc: "Someone's gotten on the naughty list."
				}
			},
			name: "lump of coal",
			icon: 'icons/obj/mining.png',
			icon_state: 'slag'
		}
	},
};
