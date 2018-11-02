'use strict';
const {Component, Atom, has_component, dir_to} = require('bluespess');

const BLOOD_LOSS_PER_STEP = 5;
const BLOOD_LOSS_IN_SPREAD = 15;

class FootItem extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.footprint_amounts = {};
		this.mob_crossed = this.mob_crossed.bind(this);
		this.mob_uncrossed = this.mob_uncrossed.bind(this);
		this.mob_moved = this.mob_moved.bind(this);
		// hey check this shit out you can put code related to shoes in shoe code instead of mob code.
		this.a.c.Item.on("equipped", (slot) => {
			if(!slot.props.is_hand_slot) {
				slot.mob.on("crossed", this.mob_crossed);
				slot.mob.on("uncrossed", this.mob_uncrossed);
				slot.mob.on("moved", this.mob_moved);
			}
		});
		this.a.c.Item.on("unequipped", (slot) => {
			if(!slot.props.is_hand_slot) {
				slot.mob.removeListener("crossed", this.mob_crossed);
				slot.mob.removeListener("uncrossed", this.mob_uncrossed);
				slot.mob.removeListener("moved", this.mob_moved);
			}
		});
	}
	mob_crossed(obj, movement) {
		if(has_component(obj, "CleanableDecal")) {
			if(obj.c.CleanableDecal.footprint_amount && obj.c.CleanableDecal.footprint_type) {
				let type = obj.c.CleanableDecal.footprint_type;
				let to_get = Math.min(100, 100 - (+this.footprint_amounts[type] || 0), obj.c.CleanableDecal.footprint_amount);
				if(to_get > 0) {
					this.footprint_amounts[type] = (+this.footprint_amounts[type] || 0) + to_get;
					obj.c.CleanableDecal.footprint_amount -= to_get;
				}
			}
		}
		if(has_component(obj, "FootprintsDecal") && movement.offset) {
			let amount = +this.footprint_amounts[obj.c.FootprintsDecal.type] || 0;
			if(amount > 0) {
				this.footprint_amounts[obj.c.FootprintsDecal.type] = Math.max(this.footprint_amounts[obj.c.FootprintsDecal.type] - BLOOD_LOSS_PER_STEP, 0);
				obj.c.FootprintsDecal.entered_dirs |= dir_to(movement.offset.x, movement.offset.y);
			}
		}
	}
	mob_uncrossed(obj, movement) {
		if(has_component(obj, "FootprintsDecal") && movement.offset) {
			let amount = +this.footprint_amounts[obj.c.FootprintsDecal.type] || 0;
			if(amount > 0) {
				this.footprint_amounts[obj.c.FootprintsDecal.type] = Math.max(this.footprint_amounts[obj.c.FootprintsDecal.type] - BLOOD_LOSS_PER_STEP, 0);
				obj.c.FootprintsDecal.exited_dirs |= dir_to(movement.offset.x, movement.offset.y);
			}
		}
	}
	mob_moved(movement) {
		if(!movement.offset)
			return;
		for(let [type, amount] of Object.entries(this.footprint_amounts)) {
			if(amount <= 0)
				continue;
			let valid = true;
			for(let obj of this.a.crosses()) {
				if(has_component(obj, "FootprintsDecal") && obj.c.FootprintsDecal == type) {
					valid = false;
					break;
				}
			}
			if(!valid)
				break;
			this.footprint_amounts[type] = amount = Math.max(0, amount - BLOOD_LOSS_PER_STEP);
			if(amount > BLOOD_LOSS_IN_SPREAD) {
				let footprints = new Atom(this.a.server, {
					components: ["FootprintsDecal"],
					vars: {
						components: {
							"FootprintsDecal": {
								type: type
							}
						}
					}
				});
				footprints.fine_loc = this.a.c.Item.slot.mob.fine_loc;
				footprints.alpha = Math.max(footprints.alpha, (+this.footprint_amounts[type]) / 100);
				this.mob_crossed(footprints, movement);
			}
		}
	}
}

FootItem.template = {
	vars: {
		components: {
			"FootItem": {
				worn_icon: 'icons/mob/feet.png',
				worn_icon_state: null // If null, inherits from inhand_icon_state
			},
			"Describe": {
				desc: "comfortable-looking shoes."
			}
		},
		name: "shoes",
		icon: 'icons/obj/clothing/shoes.png',
		gender: "plural"
	}
};

FootItem.depends = ["WearableItem"];
FootItem.loadBefore = ["WearableItem"];

module.exports.components = {FootItem};
