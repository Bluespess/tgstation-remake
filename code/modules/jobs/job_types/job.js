'use strict';
const Outfit = require('../../outfits/outfit.js');
const {Atom, weak_deep_assign, has_component} = require('bluespess');

class JobType {
	constructor(obj) {
		Object.assign(this, {
			title: "NOPE",
			minimal_access: [],
			access: [],

			department_head: [],
			departments: [],

			total_positions: 0,
			spawn_positions: 0,
			current_positions: 0,

			supervisors: "",

			selection_color: "#ffffff",

			req_admin_notify: false,
			minimal_player_age: 0,
			outfit: null,
			exp_requirements: 0,
			exp_type: "",
			exp_type_department: ""
		}, obj);
	}

	get_access_list() {
		return this.access;
	}

	instance(server, loc) {
		let template = {"components": ["MobMovement", "MobInventory", "HumanMob"], vars: {layer: 5}};
		let mob = new Atom(server, template);
		this.equip(mob);
		mob.loc = loc;
		return mob;
	}

	equip(mob) {
		if(this.outfit)
			this.outfit.equip(mob);
	}
}

class JobOutfit extends Outfit {
	constructor(obj) {
		super(obj);
		weak_deep_assign(this, {
			name: "Standard Gear",
			jobtype: null,
			slots: {
				iclothing: "jumpsuit_grey",
				shoes: "shoes_black",
				id: "id"
			},

			backpack: "backpack",
			satchel: "backpack",
			duffelbag: "backpack",
			box: null,

			pda_slot: "belt"
		});
	}

	pre_equip() {
		this.slots.back = this.backpack;
		if(this.box) {
			if(!this.backpack_contents)
				this.backpack_contents = [];
			this.backpack_contents.splice(0, 0, this.box); // at 0th position, deleting 0 items, insert this.box
		}
	}

	post_equip(target, visuals_only = false) {
		if(visuals_only)
			return;
		if(has_component(target, "MobInventory")) {
			let id = target.c.MobInventory.slots.id && target.c.MobInventory.slots.id.item;
			if(has_component(id, "CardId")) {
				id.c.CardId.access = [...this.jobtype.get_access_list(target)];
				id.c.CardId.registered_name = target.name;
				id.c.CardId.job = this.jobtype;
				id.c.CardId.job_name = this.jobtype.title;
				id.c.CardId.update_label();
			}
		}
	}
}

JobType.Outfit = JobOutfit;

module.exports = JobType;
