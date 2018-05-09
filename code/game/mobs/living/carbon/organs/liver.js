'use strict';
const {Component, has_component, chain_func, to_chat} = require('bluespess');
const {reagent_types} = require('../../../../../modules/reagents/holder.js');

class OrganLiver extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Organ.do_life = chain_func(this.a.c.Organ.do_life, this.do_life.bind(this));
	}

	do_life() {
		// slowly heal liver damage
		this.damage = Math.max(0, this.damage - 0.1);
		if(this.damage > this.max_health)
			this.damage = this.max_health;
		if(!has_component(this.a.c.Organ.mob, "CarbonMob"))
			return;
		if(this.failing)
			return;

		let owner = this.a.c.Organ.mob;
		if(this.filter_toxins) {
			let toxamount = 0;
			for(let reagent of owner.c.ReagentHolder.reagents.values()) {
				if(reagent instanceof reagent_types.Toxin) {
					toxamount += reagent.volume;
				}
			}
			if(toxamount < this.tox_tolerance && toxamount > 0) {
				for(let reagent of [...owner.c.ReagentHolder.reagents.values()]) {
					if(reagent instanceof reagent_types.Toxin) {
						reagent.remove(reagent.volume);
					}
				}
			} else if(toxamount > this.tox_tolerance) {
				this.damage += toxamount * this.tox_lethality;
			}

			owner.c.ReagentHolder.metabolize();

			if(this.damage > 10 && (Math.random() < this.damage / 300))
				to_chat`<span class='notice'>You feel ${["nauseous", "dull pain in our lower body", "confused"][Math.floor(Math.random() * 3)]}.</span>`(owner);
		}
	}

	get failing() {
		return this.damage >= this.max_health;
	}
}

OrganLiver.depends = ["Organ"];
OrganLiver.loadBefore = ["Organ"];

OrganLiver.template = {
	vars: {
		components: {
			"OrganLiver": {
				damage: 0,
				alcohol_tolerance: 0.005,
				max_health: 100,
				tox_tolerance: 3,
				tox_lethality: 0.5,
				filter_toxins: true
			},
			"Organ": {
				zone: "chest",
				slot: "liver"
			},
			"Item": {
				size: 3
			},
			"Examine": {
				desc: "Pairing suggestion: chianti and fava beans."
			}
		},
		name: "liver",
		icon_state: "liver"
	}
};

module.exports.templates = {
	"organ_liver": {
		components: ["OrganLiver"]
	}
};

module.exports.components = {OrganLiver};
