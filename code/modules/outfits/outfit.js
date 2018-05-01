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
		this.pre_equip(target, visuals_only);

		if(has_component(target, "MobInventory")) {
			if(this.slots.iclothing && target.c.MobInventory.slots.iclothing)
				target.c.MobInventory.slots.iclothing.equip_or_del(new Atom(target.server, this.slots.iclothing));
			if(this.slots.oclothing && target.c.MobInventory.slots.oclothing)
				target.c.MobInventory.slots.oclothing.equip_or_del(new Atom(target.server, this.slots.oclothing));
			if(this.slots.head && target.c.MobInventory.slots.head)
				target.c.MobInventory.slots.head.equip_or_del(new Atom(target.server, this.slots.head));

			for(let [id, slot] of Object.entries(target.c.MobInventory.slots)) {
				if(id == "iclothing" || id == "oclothing" || id == "head")
					continue;
				if(this.slots[id])
					slot.equip_or_del(new Atom(target.server, this.slots[id]));
			}

			if(!visuals_only) {
				let backpack = target.c.MobInventory.slots.back && target.c.MobInventory.slots.back.item;
				if(this.backpack_contents && has_component(backpack, "StorageItem")) {
					for(let item of this.backpack_contents) {
						backpack.c.StorageItem.insert_item_or_del(new Atom(target.server, item));
					}
				}
			}
		}

		this.post_equip(target, visuals_only);
	}
}

module.exports = Outfit;
