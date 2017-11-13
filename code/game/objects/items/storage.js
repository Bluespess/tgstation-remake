'use strict';
const {Atom, Component, chain_func} = require('bluespess');

const _current_storage_item = Symbol('_current_storage_item');
const _slots = Symbol('_slots');
const _viewers = Symbol('_viewers');
const _grid = Symbol('_grid');
const _old_layers = Symbol('_old_layers');
const _close_button = Symbol('_close_button');

class StorageItem extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("entered", this.entered.bind(this));
		this.a.on("exited", this.exited.bind(this));
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));
		this.a.on("mouse_dragged_to", this.mouse_dragged_to.bind(this));
		this[_slots] = [];
		this[_viewers] = null;
		this[_grid] = new Atom(this.a.server, {components: ["GridDisplay"], vars:{
			name: "storage",
			icon: 'icons/mob/screen_gen.png',
			icon_state: "block",
			screen_loc_x: 3.5,
			screen_loc_y: 1.5,
			layer: 30,
			components: {GridDisplay: {
				width: this.columns
			}}
		}});
		this[_grid].on("clicked", this.grid_clicked.bind(this));
		this[_close_button] = new Atom(this.a.server, {vars: {
			name: "close",
			icon: 'icons/mob/screen_gen.png',
			icon_state: "backpack_close",
			layer: 30,
			screen_loc_x: 10.5,
			screen_loc_y: 1.5
		}});
		this[_close_button].on("clicked", this.close_button_clicked.bind(this));
		this[_old_layers] = new WeakMap();
		for(var item of this.a.contents) {
			this.entered({atom:item});
		}
	}

	entered(movement) {
		var prev_rows = this.rows;
		var slot = [movement.atom];
		var slotnum = this[_slots].length;
		this[_slots].push(slot);
		this[_old_layers].set(movement.atom, movement.atom.layer);
		movement.atom.layer = 31;
		this.set_screen_loc_for_slot_num(movement.atom, slotnum);
		if(this[_viewers])
			for(let viewer of this[_viewers]) {
				viewer.c.Eye.screen[`storage_item_${slotnum}`] = movement.atom;
			}
		if(this.rows != prev_rows)
			for(let i = 0; i < slotnum; i++) {
				this.set_screen_loc_for_slot_num(this[_slots][i][0], i);
			}
		this[_grid].c.GridDisplay.height = this.rows + 1;
	}

	set_screen_loc_for_slot_num(item, num) {
		item.screen_loc_x = num % this.columns + 3.5;
		item.screen_loc_y = this.rows - Math.floor(num / this.columns) + 1.5;
	}

	get rows() {
		return Math.floor(Math.max(this[_slots].length - 1, 0) / this.columns);
	}

	exited(movement) {
		var prev_rows = this.rows;
		var i;
		for(i = 0; i < this[_slots].length; i++) {
			var slot = this[_slots][i];
			var idx = slot.indexOf(movement.atom);
			if(idx == -1)
				continue;
			if(idx == 0) {
				if(this[_viewers])
					for(let viewer of this[_viewers]) {
						viewer.c.Eye.screen[`storage_item_${i}`] = slot[1];
					}
				if(slot[1]) {
					slot[1].screen_loc_x = slot[0].screen_loc_x;
					slot[1].screen_loc_y = slot[0].screen_loc_y;
					this[_old_layers].set(slot[1], slot[1].layer);
					slot[1].layer = 31;
				}
				slot[0].layer = this[_old_layers].get(slot[0]);
				slot[0].screen_loc_x = null;
				slot[0].screen_loc_y = null;
				slot.splice(0, 1);
				if(slot.length)
					return;
				break;
			} else {
				slot.splice(idx, 1);
				return;
			}
		}
		if(i >= this[_slots].length) // this should never happen
			return;
		if(this[_viewers])
			for(let j = i+1; j < this[_slots].length; j++) {
				for(let viewer of this[_viewers]) {
					viewer.c.Eye.screen[`storage_item_${j}`] = null;
				}
			}
		this[_slots].splice(i,1);
		for(let j = i; j < this[_slots].length; j++) {
			if(this[_viewers])
				for(let viewer of this[_viewers]) {
					viewer.c.Eye.screen[`storage_item_${j}`] = this[_slots][j][0];
				}
			this.set_screen_loc_for_slot_num(this[_slots][j][0],j);
		}
		if(this.rows != prev_rows)
			for(let j = 0; j < i; j++) {
				this.set_screen_loc_for_slot_num(this[_slots][j][0],j);
			}
		this[_grid].c.GridDisplay.height = this.rows + 1;
	}

	attack_by(prev, item) {
		item.c.Item.slot.item = null;
		item.loc = this.a;
	}

	attack_hand(prev, mob) {
		if(this.a.c.Item.slot && this.a.c.Item.slot.mob == mob && this.a.c.Item.slot.id != mob.c.MobInventory.active_hand) {
			if(this.is_showing_to(mob)) {
				this.hide_from(mob);
				return;
			}
			this.show_to(mob);
		} else {
			return prev();
		}
	}

	mouse_dragged_to(e) {
		if(e.to.atom == e.mob) {
			this.show_to(e.mob);
			return;
		}
	}

	show_to(user) {
		if(!this.a.server.has_component(user, "Eye"))
			return;
		if(user.c.Eye[_current_storage_item] == this.a)
			return;
		if(user.c.Eye[_current_storage_item])
			user.c.Eye[_current_storage_item].hide_from(user);
		this[_viewers] = this[_viewers] || new Set();
		this[_viewers].add(user);
		for(let i = 0; i < this[_slots].length; i++) {
			user.c.Eye.screen[`storage_item_${i}`] = this[_slots][i][0];
		}
		user.c.Eye.screen.storage_grid = this[_grid];
		user.c.Eye.screen.storage_close_button = this[_close_button];
		user.c.Eye[_current_storage_item] = this.a;
	}

	hide_from(user) {
		if(!this.a.server.has_component(user, "Eye"))
			return;
		if(user.c.Eye[_current_storage_item] != this.a)
			return;
		this[_viewers].delete(user);
		user.c.Eye[_current_storage_item] = null;
		for(let i = 0; i < this[_slots].length; i++) {
			user.c.Eye.screen[`storage_item_${i}`] = null;
		}
		user.c.Eye.screen.storage_grid = null;
		user.c.Eye.screen.storage_close_button = null;
	}

	is_showing_to(user) {
		return this.a.server.has_component(user, "Eye") && user.components.Eye[_current_storage_item] == this.a;
	}

	close_button_clicked(e) {
		this.hide_from(e.mob);
	}
	grid_clicked(e) {
		console.log(e.x + ", " + e.y);
		if(!e.mob)return;
		var slot = (this.rows - Math.floor(e.y)) * 7 + Math.floor(e.x);
		var target_atom;
		if(this[_slots][slot]) {
			target_atom = this[_slots][slot][0];
		} else {
			target_atom = this.a;
		}
		var new_event = Object.assign({}, e, {atom: target_atom, y: e.y - Math.floor(e.y), x: e.x - Math.floor(e.x)});
		target_atom.emit("clicked", new_event);
		if(e.mob)
			e.mob.c.Mob.emit("click_on", new_event);
	}
}

StorageItem.template = {
	vars: {
		components: {
			"StorageItem": {
				slient: false, // No message on putting items in
				can_hold: null, // Whitelist of components which can be put in
				cant_hold: null, // Whitelist of components which can't be put in
				max_size: 2, // Max size of objects that this object can store (in effect only if can_hold isn't set)
				max_combined_size: 14, //The sum of the sizees of all the items in this storage item.
				storage_slots: 7, //The number of storage slots in this container.
				columns: 7,
				use_to_pickup: false, //Set this to make it possible to use this item in an inverse way, so you can have the item in your hand and click items on the floor to pick them up.
				display_contents_with_number: false, //Set this to make the storage item group contents of the same type and display them as a number.
				allow_quick_empty: false, //Set this variable to allow the object to have the 'empty' verb, which dumps all the contents on the floor.
				allow_quick_gather: false, //Set this variable to allow the object to have the 'toggle mode' verb, which quickly collects all items from a tile.
				collection_mode: 1, //0 = pick one at a time, 1 = pick all on tile, 2 = pick all of a type
				preposition: "in", // You put things 'in' a bag, but trays need 'on'.
				rustle_jimmies: true //Play the rustle sound on insertion
			}
		},
		name: "storage",
		icon: 'icons/obj/storage.png',
		size: 3
	}
};

StorageItem.depends = ["Item"];
StorageItem.loadBefore = ["Item"];

module.exports.templates = {
	"backpack": {
		components: ["BackItem", "StorageItem"],
		vars: {
			components: {
				"Item": {
					inhand_icon_state: "backpack",
					inhand_lhand_icon: 'icons/mob/inhands/equipment/backpack_lefthand.png',
					inhand_rhand_icon: 'icons/mob/inhands/equipment/backpack_righthand.png',
					size: 4,
					max_size: 3,
					max_combined_size: 21,
					storage_slots: 21
				}
			},
			icon_state: "backpack"
		}
	}
};

module.exports.components = {StorageItem};
