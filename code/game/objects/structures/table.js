'use strict';
const {Component, has_component, chain_func} = require('bluespess');
const pass_flags = require('../../../defines/pass_flags.js');
const layers = require('../../../defines/layers.js');

class Table extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.can_be_crossed = chain_func(this.a.can_be_crossed, this.can_be_crossed.bind(this));
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
	}

	can_be_crossed(prev, mover) {
		for(let crosser of mover.crosses()) {
			if(has_component(crosser, "Table"))
				return true;
		}
		return prev();
	}

	attack_by(prev, item, user, e) {
		if(item.c.Item.slot && item.c.Item.slot.can_unequip()) {
			item.loc = this.a.base_mover.fine_loc;
			let dx = Math.min(Math.max(e.x - 0.5, -0.5), 0.5);
			let dy = Math.min(Math.max(e.y - 0.5, -0.5), 0.5);
			item.glide_size = 0;
			item.move(dx, dy, "placement");
			return true;
		}
	}
}

Table.one_per_tile = true;

Table.depends = ["Destructible"];
Table.loadBefore = ["Destructible", "TGSmooth"];

Table.template = {
	vars: {
		components: {
			"Smooth": {
				smooth_with: "table"
			},
			"SmoothGroup": {
				groups: ["table"]
			},
			"Destructible": {
				max_integrity: 100,
				integrity_failure: 30
			},
			"Tangible": {
				anchored: true
			},
			"Examine": {
				desc: "A square piece of metal standing on four metal legs. It can not move."
			}
		},
		name: "table",
		icon: 'icons/obj/smooth_structures/table.png',
		icon_state: "table",
		let_pass_flags: pass_flags.LETPASSTHROW | pass_flags.PASSTABLE,
		layer: layers.TABLE_LAYER,
		density: 1
	}
};

module.exports.templates = {
	"table": {
		components: ["TGSmooth", "Table"],
		tree_paths: ["basic_structures/table"]
	},
	"wood_table": {
		components: ["TGSmooth", "Table"],
		vars: {
			components: {
				"Smooth": {
					smooth_with: "table_wood"
				},
				"SmoothGroup": {
					groups: ["table_wood"]
				},
				"Destructible": {
					max_integrity: 70
				},
				"Examine": {
					desc: "Do not apply fire to this. Romour says it burns easily."
				}
			},
			name: "wooden table",
			icon: 'icons/obj/smooth_structures/wood_table.png',
			icon_state: "wood_table"
		},
		tree_paths: ["basic_structures/table/wood"]
	}
};

module.exports.components = {Table};
