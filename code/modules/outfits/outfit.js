'use strict';
const {Atom, has_component} = require('bluespess');

class Outfit {
	constructor(obj) {
		Object.assign(this, {
			name: "Naked",
			slots: {},
			toggle_helmet: true,
			backpack_contents: [],
			can_be_admin_equipped: true
		}, obj);
	}

	pre_equip() {}
	post_equip() {}

	equip(target, visuals_only = false) {
		let clone = Object.create(this);
		Object.assign(clone, JSON.parse(JSON.stringify(this)));
		clone.pre_equip(target, visuals_only);

		if(has_component(target, "MobInventory")) {
			if(clone.slots.iclothing && target.c.MobInventory.slots.iclothing)
				target.c.MobInventory.slots.iclothing.equip_or_del(new Atom(target.server, clone.slots.iclothing));
			if(clone.slots.oclothing && target.c.MobInventory.slots.oclothing)
				target.c.MobInventory.slots.oclothing.equip_or_del(new Atom(target.server, clone.slots.oclothing));

			for(let [id, slot] of Object.entries(target.c.MobInventory.slots)) {
				if(id == "iclothing" || id == "oclothing")
					continue;
				if(clone.slots[id])
					slot.equip_or_del(new Atom(target.server, clone.slots[id]));
			}

			if(!visuals_only) {
				let backpack = target.c.MobInventory.slots.back && target.c.MobInventory.slots.back.item;
				if(clone.backpack_contents && has_component(backpack, "StorageItem")) {
					for(let item of clone.backpack_contents) {
						backpack.c.StorageItem.insert_item_or_del(new Atom(target.server, item));
					}
				}
			}
		}

		clone.post_equip(target, visuals_only);
	}
}

module.exports = Outfit;
