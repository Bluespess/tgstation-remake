'use strict';
const {Panel, has_component} = require('bluespess');

class StripPanel extends Panel {
	constructor(client, {title = "Strip"} = {}) {
		super(client, {width:440, height:600, title, can_close: true});
		this.on("message", this.message_handler.bind(this));
		this.on("close", this.closed.bind(this));
		this.on("open", this.opened.bind(this));
		this.slot_item_changed = this.slot_item_changed.bind(this);
	}

	message_handler(msg) {
		if(msg.slot) {
			if(has_component(this.bound_mob, "MobInventory") && !this.cached_covered[msg.slot]) {
				let slot_to_strip = this.bound_atom.c.MobInventory.slots[msg.slot];
				if(!slot_to_strip)
					return;
				let item_to_strip = slot_to_strip.item;
				if(item_to_strip)
					this.bound_mob.c.MobInventory.strip_panel_unequip(this.bound_atom, slot_to_strip);
				else
					this.bound_mob.c.MobInventory.strip_panel_equip(this.bound_atom, slot_to_strip);
			}
		}
	}
	opened() {
		let layout = this.bound_atom.c.MobInventory.strip_layout;
		let layout_names = this.bound_atom.c.MobInventory.strip_names;
		let covered = {};
		let covered_set = this.bound_atom.c.MobInventory.get_covered_slots();
		for(let slotname of Object.keys(this.bound_atom.c.MobInventory.slots)) {
			covered[slotname] = covered_set.has(slotname);
		}
		this.cached_covered = covered;
		let item_names = {};
		let item_appearances = {};
		for(let [slotname, slot] of Object.entries(this.bound_atom.c.MobInventory.slots)) {
			if(!slot.item || covered[slotname]) {
				item_names[slotname] = null;
				item_appearances[slotname] = null;
			} else {
				item_names[slotname] = slot.props.visible ? slot.item.name : "Full";
				item_appearances[slotname] = slot.props.visible ? slot.item.network_encode(this.bound_mob) : null;
			}
		}
		this.send_message({layout, layout_names, covered, item_names, item_appearances});
		this.bound_atom.c.MobInventory.on("slot_item_changed", this.slot_item_changed);
	}
	closed() {
		this.bound_atom.c.MobInventory.removeListener("slot_item_changed", this.slot_item_changed);
	}

	slot_item_changed(slotid, from, to) {
		let slot = this.bound_atom.c.MobInventory.slots[slotid];
		let new_covered_set = this.bound_atom.c.MobInventory.get_covered_slots();
		let new_covered_msg = {};
		let new_item_names_msg = {};
		let new_item_appearances_msg = {};
		for(let [otherslotname, otherslot] of Object.entries(this.bound_atom.c.MobInventory.slots)) {
			let new_covered = new_covered_set.has(otherslotname);
			if(this.cached_covered[otherslotname] != new_covered) {
				new_covered_msg[otherslotname] = new_covered;
				this.cached_covered[otherslotname] = new_covered;
				if(new_covered) {
					new_item_names_msg[otherslotname] = null;
					new_item_appearances_msg[otherslotname] = null;
				} else {
					new_item_names_msg[otherslotname] = otherslot.item ? (otherslot.props.visible ? otherslot.item.name : "Full") : null;
					new_item_appearances_msg[otherslotname] = (otherslot.item && otherslot.props.visible) ? otherslot.item.network_encode(this.bound_mob) : null;
				}
			}
		}
		if(!new_covered_msg[slotid] && !this.cached_covered[slotid]) {
			new_item_names_msg[slotid] = to ? (slot.props.visible ? to.name : "Full") : null;
			new_item_appearances_msg[slotid] = (to && slot.props.visible) ? to.network_encode(this.bound_mob) : null;
		}
		this.send_message({covered: new_covered_msg, item_names: new_item_names_msg, item_appearances: new_item_appearances_msg});
	}
}

module.exports = StripPanel;
