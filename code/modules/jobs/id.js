'use strict';
const {Component, chain_func} = require('bluespess');
const {all_access} = require('../../defines/access.js');

class CardId extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.access = [...this.access];
		this.a.c.HasAccess.has_access = chain_func(this.a.c.HasAccess.has_access, this.has_access.bind(this));
	}

	has_access(prev, access) {
		if(prev())
			return true;
		return this.access.includes(access);
	}

	update_label() {
		if(!this.do_update_label)
			return;
		let name = this.registered_name;
		let job_name = this.include_job_in_name ? this.job_name : null;

		this.a.name = `${name ? `${name}'s ID Card` : "identification card"}${job_name ? ` (${job_name})` : ""}`;
	}
}

CardId.loadBefore = ["HasAccess", "IdSlotItem"];
CardId.depends = ["HasAccess", "IdSlotItem"];

CardId.template = {
	vars: {
		components: {
			"CardId": {
				mining_points: 0,
				access: [],
				registered_name: null,
				job: null,
				job_name: null,
				include_job_in_name: true,
				do_update_label: true
			},
			"Item": {
				size: 1,
				inhand_icon_state: "card-id",
				inhand_lhand_icon: 'icons/mob/inhands/equipment/idcards_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/idcards_righthand.png'
			},
			"Destructible": {
				armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 100, acid: 100}
			},
			"Examine": {
				desc: "A card used to provide ID and determine access across the station."
			}
		},
		name: "identification card",
		icon: 'icons/obj/card.png',
		icon_state: "id"
	}
};

class IdSlotItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

IdSlotItem.template = {
	vars: {
		components: {
			"IdSlotItem": {
				worn_icon: null,
				worn_icon_state: null // If null, inherits from inhand_icon_state
			}
		}
	}
};

IdSlotItem.depends = ["WearableItem"];
IdSlotItem.loadBefore = ["WearableItem"];

module.exports.templates = {
	"id": {
		components: ["CardId"],
		tree_paths: ["items/id"]
	},
	"id_gold": {
		components: ["CardId"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "gold_id"
				},
				"Examine": {
					desc: "A golden card shows power and might."
				}
			},
			name: "gold identification card",
			icon_state: "gold"
		},
		tree_paths: ["items/id/gold"]
	},
	"id_silver": {
		components: ["CardId"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "silver_id"
				},
				"Examine": {
					desc: "A silver card shows honour and dedication."
				}
			},
			name: "silver identification card",
			icon_state: "silver"
		},
		tree_paths: ["items/id/silver"]
	},
	"id_captains_spare": {
		components: ["CardId"],
		vars: {
			components: {
				"CardId": {
					do_update_label: false,
					access: all_access
				},
				"Item": {
					inhand_icon_state: "gold_id"
				},
				"Examine": {
					desc: "The spare ID of the High Lord himself."
				}
			},
			name: "captain's spare ID",
			icon_state: "gold"
		},
		tree_paths: ["items/id/gold/spare"]
	}
};

module.exports.components = {IdSlotItem, CardId};
