'use strict';

const {Component, Atom, chain_func} = require('bluespess');
const EventEmitter = require('events');
const _slots = Symbol('_slots');
const {_slot} = require('../game/objects/items.js').symbols;
const _visible = Symbol('_can_see');
const _item = Symbol('_item');
const _active_hand = Symbol('_active_hand');

class MobInventory extends Component {
	constructor(atom, template) {
		super(atom, template);

		this[_slots] = {};
		this.slots = new Proxy(this[_slots],{set:()=>{},deleteProperty:()=>{},defineProperty:()=>{}});
		this.add_slot('lhand', {icon: 'icons/mob/screen_midnight.png', icon_state: "hand_l", screen_loc_x: 7.5, screen_loc_y: 0.15625, layer: 30}, {is_hand_slot: true});
		this.add_slot('rhand', {icon: 'icons/mob/screen_midnight.png', icon_state: "hand_r", screen_loc_x: 6.5, screen_loc_y: 0.15625, layer: 30}, {is_hand_slot: true});

		this.atom.components.Eye.screen.swap_hands = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_midnight.png', icon_state: "swap", screen_loc_x: 6.5, screen_loc_y: 1.15625, layer: 30
		}}});
		this.atom.components.Eye.screen.swap_hands.on("clicked", (e) => {
			if(this.active_hand == "lhand") {
				this.active_hand = "rhand";
			} else {
				this.active_hand = "lhand";
			}
		});
		this.active_hand = "rhand";

		this.atom.components.Eye.screen.act_equip = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_midnight.png', icon_state: "act_equip", screen_loc_x: 6.5, screen_loc_y: 1.15625, layer: 30
		}}});
		this.atom.components.Eye.screen.act_equip.on("clicked", (e) => {

		})

		this.add_slot('id', {icon: 'icons/mob/screen_midnight.png', icon_state: "id", screen_loc_x: 3.375, screen_loc_y: 0.15625, layer: 30}, {special_slot:true});
		this.add_slot('belt', {icon: 'icons/mob/screen_midnight.png', icon_state: "belt", screen_loc_x: 4.4375, screen_loc_y: 0.15625, layer: 30}, {special_slot:true});
		this.add_slot('back', {icon: 'icons/mob/screen_midnight.png', icon_state: "back", screen_loc_x: 5.4375, screen_loc_y: 0.15625, layer: 30}, {special_slot:true});
		this.add_slot('storage1', {icon: 'icons/mob/screen_midnight.png', icon_state: "pocket", screen_loc_x: 8.5625, screen_loc_y: 0.15625, layer: 30});
		this.add_slot('storage2', {icon: 'icons/mob/screen_midnight.png', icon_state: "pocket", screen_loc_x: 9.625, screen_loc_y: 0.15625, layer: 30});
		this.add_slot('suit_storage', {icon: 'icons/mob/screen_midnight.png', icon_state: "suit_storage", screen_loc_x: 2.3125, screen_loc_y: 0.15625, layer: 30}, {special_slot:true});

		this.atom.components.Eye.screen.toggle_clothing = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_midnight.png', icon_state: "toggle", screen_loc_x: 0.1875, screen_loc_y: 0.15625, layer: 30
		}}});
		this.atom.components.Eye.screen.toggle_clothing.on("clicked", (e) => {
			for(var slotname of ['shoes', 'iclothing', 'oclothing', 'gloves', 'glasses', 'mask', 'ears', 'head']) {
				var slot = this.slots[slotname];
				slot.visible = !slot.visible;
			}
		})
		this.add_slot('shoes', {icon: 'icons/mob/screen_midnight.png', icon_state: "shoes", screen_loc_x: 1.25, screen_loc_y: 0.15625, layer: 30}, {special_slot:true});
		this.add_slot('iclothing', {icon: 'icons/mob/screen_midnight.png', icon_state: "uniform", screen_loc_x: 0.1875, screen_loc_y: 1.21875, layer: 30}, {special_slot:true});
		this.add_slot('oclothing', {icon: 'icons/mob/screen_midnight.png', icon_state: "suit", screen_loc_x: 1.25, screen_loc_y: 1.21875, layer: 30}, {special_slot:true});
		this.add_slot('gloves', {icon: 'icons/mob/screen_midnight.png', icon_state: "gloves", screen_loc_x: 2.3125, screen_loc_y: 1.21875, layer: 30}, {special_slot:true});
		this.add_slot('mask', {icon: 'icons/mob/screen_midnight.png', icon_state: "mask", screen_loc_x: 1.25, screen_loc_y: 2.28125, layer: 30}, {special_slot:true});
		this.add_slot('glasses', {icon: 'icons/mob/screen_midnight.png', icon_state: "glasses", screen_loc_x: 0.1875, screen_loc_y: 2.28125, layer: 30}, {special_slot:true});
		this.add_slot('ears', {icon: 'icons/mob/screen_midnight.png', icon_state: "ears", screen_loc_x: 2.3125, screen_loc_y: 2.28125, layer: 30}, {special_slot:true});
		this.add_slot('head', {icon: 'icons/mob/screen_midnight.png', icon_state: "head", screen_loc_x: 1.25, screen_loc_y: 3.34375, layer: 30}, {special_slot:true});

		this.atom.components.Eye.screen.drop_item = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_midnight.png', icon_state: "act_drop", screen_loc_x: 13.875, screen_loc_y: 1.21875, layer: 30
		}}});
		this.atom.components.Eye.screen.drop_item.on("clicked", (e) => {
			this.slots[this.active_hand].item = undefined;
		});

		this.atom.components.Eye.screen.throw_item = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_midnight.png', icon_state: "act_throw_off", screen_loc_x: 13.875, screen_loc_y: 1.21875, layer: 30
		}}});

		this.atom.components.Eye.screen.resist = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_midnight.png', icon_state: "act_resist", screen_loc_x: 12.8125, screen_loc_y: 1.21875, layer: 30
		}}});

		this.atom.components.Eye.screen.move_intent = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_midnight.png', icon_state: "running", screen_loc_x: 12.8125, screen_loc_y: .15625, layer: 30
		}}});

		this.atom.components.Eye.screen.act_intent = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_gen.png', icon_state: "help", screen_loc_x: 11.75, screen_loc_y: .15625, layer: 30
		}}});

		this.atom.components.Eye.screen.zone_sel = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_midnight.png', icon_state: "zone_sel", screen_loc_x: 13.875, screen_loc_y: .15625, layer: 30
		}}});

		this.atom.components.Eye.screen.health = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_gen.png', icon_state: "health0", screen_loc_x: 13.875, screen_loc_y: 6.46875, layer: 30
		}}});

		this.atom.components.Eye.screen.healthdoll = new Atom(this.atom.server, {vars:{appearance:{
			icon: 'icons/mob/screen_gen.png', icon_state: "healthdoll_OVERLAY", screen_loc_x: 13.875, screen_loc_y: 5.40625, layer: 30
		}}});

		this.atom.on("click_on", this.click_on.bind(this));
	}

	click_on(e) {
		if(e.atom == null) return;
		var active_item = this[_slots][this[_active_hand]].item;
		if(active_item) {
			e.atom.attack_by(active_item, this.atom, e);
		} else {
			e.atom.attack_hand(this.atom, e);
		}
	}

	add_slot(id, appearance, props) {
		var slotatom = new Atom(this.atom.server, {vars:{appearance}});
		this[_slots][id] = new Slot(this.atom, id, slotatom, props);
	}
	set active_hand(value) {
		if(typeof value != "string" || !this[_slots][value])
			throw new TypeError(`${value} is not a string referring to a valid slot.`);
		if(this[_active_hand])
			this[_slots][this[_active_hand]].atom.overlays.hand_active = undefined;
		this[_active_hand] = value;
		this[_slots][this[_active_hand]].atom.overlays.hand_active = "hand_active";
	}
	get active_hand() {
		return this[_active_hand];
	}
}

Atom.prototype.attack_hand = ()=>{};
Atom.prototype.attack_by = ()=>{};

class Slot extends EventEmitter {
	constructor(mob, id, atom, props) {
		super();
		Object.defineProperty(this, 'mob', {enumerable: false,configurable: false,writable: false,value: mob});
		Object.defineProperty(this, 'id', {enumerable: true,configurable: false,writable: false,value: id});
		Object.defineProperty(this, 'atom', {enumerable: true,configurable: false,writable: false,value: atom});
		this.props = props ? props : {};
		this.visible = true;
		this.atom.on("clicked", this.clicked.bind(this));
	}

	clicked(e) {
		if(this.props.is_hand_slot) {
			if(this.mob.components.MobInventory.active_hand == this.id) {
				if(this.item)
					this.item.attack_self(this.mob);
			} else {
				this.mob.components.MobInventory.active_hand = this.id;
			}
			return;
		}
		if(!this.item && this.can_accept_item(this.mob.components.MobInventory.slots[this.mob.components.MobInventory.active_hand].item)) {
			this.item = this.mob.components.MobInventory.slots[this.mob.components.MobInventory.active_hand].item
		} else if(this.item && !this.mob.components.MobInventory.slots[this.mob.components.MobInventory.active_hand].item) {
			this.item.attack_hand(this.mob, e);
		}
	}

	can_accept_item(item) {
		if(this.props.max_size && this.props.max_size < item.components.Item.size)
			return false;
		if(this.props.special_slot) { // This slot has autism.
			if(!this.mob.server.has_component(item, "WearableItem"))
				return false;
			if(item.components.WearableItem.slots.indexOf(this.id) == -1)
				return false;
		}
		return true;
	}

	set visible(value) {
		if(typeof value != 'boolean')
			throw new TypeError(`Boolean expected, got ${value}`);
		if(value === this[_visible]) return;
		this[_visible] = value;
		if(value) {
			this.mob.components.Eye.screen[`slot_${this.id}`] = this.atom;
		} else {
			this.mob.components.Eye.screen[`slot_${this.id}`] = undefined;
		}
	}
	get visible() {return this[_visible];}

	get item() {return this[_item];}
	set item(value) {
		if(!this.atom.server.has_component(value, "Item") && value != undefined)
			throw new TypeError(`${value} is not an atom with item component or undefined!`);
		if(this[_item]) {
			this[_item].components.Item[_slot] = undefined;
			this[_item].appearance.layer = this.old_item_layer;
			delete this[_item].appearance.screen_loc_x;
			delete this[_item].appearance.screen_loc_y;
			this[_item].loc = this.mob.loc;
			this.mob.components.Eye.screen[`item_in_slot_${this.id}`] = undefined;
		}
		this[_item] = value;
		if(this[_item]) {
			if(this[_item].components.Item[_slot]) {
				this[_item].components.Item[_slot].item = undefined;
				this[_item].loc = this.mob.loc;
			}
			this[_item].components.Item[_slot] = this;
			this.old_item_layer = this[_item].appearance.layer;
			this[_item].appearance.layer = 31;
			this[_item].appearance.screen_loc_x = this.atom.appearance.screen_loc_x;
			this[_item].appearance.screen_loc_y = this.atom.appearance.screen_loc_y;
			this.mob.components.Eye.screen[`item_in_slot_${this.id}`] = this[_item];
			this[_item].loc = this.mob;
			if(this.props.is_hand_slot && this[_item].components.Item.inhand_icon_state) {
				this.mob.overlays[`inhand_${this.id}`] = {
					icon: this[_item].components.Item[`inhand_${this.id}_icon`],
					icon_state: this[_item].components.Item.inhand_icon_state,
					overlay_layer: 30
				};
			}
		} else {
			if(this.props.is_hand_slot)
				this.mob.overlays[`inhand_${this.id}`] = undefined;
		}
	}
}

MobInventory.depends = ["Mob", "MobHud"];
MobInventory.loadBefore = ["Mob", "MobHud"];

module.exports.components = {MobInventory};