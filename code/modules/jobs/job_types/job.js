'use strict';
const Outfit = require('../../outfits/outfit.js');
const {weak_deep_assign, has_component, to_chat} = require('bluespess');
const CharacterPreferences = require('../../client/character.js');

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

			name_override: "",
			req_admin_notify: false,
			minimal_player_age: 0,
			outfit: null,
			exp_requirements: 0,
			exp_type: "",
			exp_type_department: ""
		}, obj);
	}

	get_access_list(server) {
		let access = [...this.access];
		if(server.job_controller.minimal_access)
			access = [...this.minimal_access];
		if(server.game_options.everyone_has_maint_access && !access.includes("maint"))
			access.push("maint");
		return access;
	}

	instance(server, prefs) {
		if(!prefs)
			prefs = new CharacterPreferences();
		let mob = prefs.instance_human(server, {name_override: this.name_override});
		this.equip(mob);
		return mob;
	}

	after_spawn(user) {
		to_chat`<b>You are the ${""}${this.title}.</b>`(user);
		to_chat`<b>As the ${this.title} you answer directly to ${this.supervisors}. Special circumstances may change this.</b>`(user);
		to_chat`<b>To speak on your department's radio, use the :h button. To see others, look closely at your headset.</b>`(user);
		if(this.req_admin_notify)
			to_chat`<b>You are playing a job that is important for Game Progression. If you have to disconnect, please notify the admins via adminhelp.</b>`(user);
		if(user.server.game_options.minimal_access_threshold) {
			to_chat`<span style='color:blue;font-weight:bold'>As this station was initially staffed with a ${user.server.job_controller.minimal_access ? "full crew, only your job's necessities" : "skeleton crew, additional access may"} have been added to your ID card.</span>`(user);
		}
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
			box: "survival_box",

			pda_slot: "belt"
		});
		Object.defineProperty(this, "jobtype", {enumerable: false, value: this.jobtype});
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
				id.c.CardId.access = [...this.jobtype.get_access_list(target.server, target)];
				id.c.CardId.registered_name = target.c.LivingMob.real_name;
				id.c.CardId.job = this.jobtype;
				id.c.CardId.job_name = this.jobtype.title;
				id.c.CardId.update_label();
			}
		}
	}
}

JobType.Outfit = JobOutfit;

module.exports = JobType;
