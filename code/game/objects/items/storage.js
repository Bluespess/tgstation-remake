'use strict';
const {Component} = require('bluespess');

class StorageItem extends Component {

}

StorageItem.template = {
	vars: {
		components: {
			"StorageItem": {
				slient: false, // No message on putting items in
				can_hold: null, // Whitelist of components which can be put in
				cant_hold: null, // Whitelist of components which can't be put in
				max_w_class: 2, // Max size of objects that this object can store (in effect only if can_hold isn't set)
				max_combined_w_class: 14, //The sum of the w_classes of all the items in this storage item.
				storage_slots: 7, //The number of storage slots in this container.
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
		w_class: 3
	}
};
