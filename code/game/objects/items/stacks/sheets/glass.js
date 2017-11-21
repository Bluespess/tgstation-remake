'use strict';
const {Component} = require('bluespess');
const combat_defines = require('../../../../../defines/combat_defines.js');

class GlassShard extends Component {
	constructor(atom, template) {
		super(atom, template);

		this.a.icon_state = ["small", "medium", "large"][Math.floor(Math.random()*3)];
		this.a.once("moved", () => {
			var bxo = Math.random() - 0.5;
			var byo = Math.random() - 0.5;
			if(this.a.icon_state == "small")
				this.a.move(bxo*0.75, byo*0.75, "placement");
			if(this.a.icon_state == "medium")
				this.a.move(bxo*0.5, byo*0.5, "placement");
			if(this.a.icon_state == "large")
				this.a.move(bxo*0.3125, byo*0.3125, "placement");
		});
	}
}

GlassShard.depends = ["Item"];
GlassShard.loadBefore = ["Item"];

GlassShard.template = {
	vars: {
		components: {
			"Item": {
				size: 1,
				force: 5,
				inhand_icon_state: 'shard-glass',
				inhand_lhand_icon: 'icons/mob/inhands/weapons/melee_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/weapons/melee_righthand.png',
				attack_verb: ["stabbed", "slashed", "sliced", "cut"],
				hitsound: 'sound/weapons/bladeslice.ogg',
				sharpness: combat_defines.IS_SHARP
			},
			"Destructible": {
				max_integrity: 40,
				armor: {"melee": 100, "bullet": 0, "laser": 0, "energy": 100, "bomb": 0, "bio": 0, "rad": 0, "fire": 50, "acid": 100}
			},
			"Tangible": {
				throw_force: 10
			},
			"Describe": {
				desc: "A nasty looking shard of glass."
			}
		},
		name: "shard",
		icon: 'icons/obj/shards.png',
		icon_state: "large"
	}
};

module.exports.templates = {
	"glass_shard": {
		components: ["GlassShard"],
		tree_paths: ["items/shard"]
	}
};

module.exports.components = {GlassShard};
