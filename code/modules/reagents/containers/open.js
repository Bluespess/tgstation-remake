'use strict';

const {Component, has_component, chain_func, to_chat} = require('bluespess');

// Reagent containers where you can pour from one to another.
class OpenReagentContainer extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
	}

	attack_by(prev, item, user) {
		if(has_component(item, "OpenReagentContainer")) {
			if(!item.c.ReagentHolder.total_volume) {
				to_chat`<span class='warning'>The ${item} is empty!</span>`(user);
				return true;
			}

			if(this.a.c.ReagentHolder.total_volume >= this.a.c.ReagentHolder.maximum_volume) {
				to_chat`<span clas='notice'>The ${this.a} is full.</span>`(user);
				return true;
			}

			let trans = item.c.ReagentHolder.transfer_to(this.a, this.transfer_amount);
			to_chat`<span class='notice'>You transfer ${trans} unit${trans == 1 ? "" : "s"} of the solution to ${this.a}</span>`(user);
			return true;
		}
		return prev();
	}
}

OpenReagentContainer.depends = ["ReagentHolder", "Item"];
OpenReagentContainer.loadBefore = ["ReagentHolder", "Item"];

OpenReagentContainer.template = {
	vars: {
		components: {
			"OpenReagentContainer": {
				transfer_amount: 10
			},
			"ReagentHolder": {
				injectable: true,
				drawable: true
			}
		}
	}
};

class GlassBeaker extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.ReagentHolder.on("added", this.update_filling.bind(this));
		this.a.c.ReagentHolder.on("removed", this.update_filling.bind(this));
		this.update_filling();
	}

	update_filling() {
		let percent = this.a.c.ReagentHolder.total_volume / this.a.c.ReagentHolder.maximum_volume;
		if(percent == 0) {
			this.a.overlays.reagent_filling = null;
			return;
		}
		if(percent < .1) {
			this.a.overlays.reagent_filling = {icon_state: "[parent]-10"};
		} else if(percent < .25) {
			this.a.overlays.reagent_filling = {icon_state: "[parent]10"};
		} else if(percent < .5) {
			this.a.overlays.reagent_filling = {icon_state: "[parent]25"};
		} else if(percent < .75) {
			this.a.overlays.reagent_filling = {icon_state: "[parent]50"};
		} else if(percent < .8) {
			this.a.overlays.reagent_filling = {icon_state: "[parent]75"};
		} else if(percent < .9) {
			this.a.overlays.reagent_filling = {icon_state: "[parent]80"};
		} else {
			this.a.overlays.reagent_filling = {icon_state: "[parent]100"};
		}
		this.a.overlays.reagent_filling.icon = 'icons/obj/reagentfillings.png';
		let [r,g,b,a] = this.a.c.ReagentHolder.get_reagents_color();
		this.a.overlays.reagent_filling.color = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
		this.a.overlays.reagent_filling.alpha = a;
	}
}

GlassBeaker.depends = ["OpenReagentContainer"];
GlassBeaker.loadBefore = ["OpenReagentContainer"];

GlassBeaker.template = {
	vars: {
		components: {
			"ReagentHolder": {
				maximum_volume: 50
			},
			"Item": {
				inhand_icon_state: "beaker",
				size: 1
			},
			"Examine": {
				desc: "A beaker. It can hold up to 50 units."
			}
		},
		name: "beaker",
		icon: 'icons/obj/chemical.png',
		icon_state: "beaker"
	}
};

module.exports.templates = {
	"beaker": {
		components: ["GlassBeaker"],
		tree_paths: ["items/beaker"]
	},
	"beaker_large": {
		components: ["GlassBeaker"],
		vars: {
			components: {
				"ReagentHolder": {
					maximum_volume: 100
				},
				"Examine": {
					desc: "A large beaker. It can hold up to 100 units."
				},
				"Item": {
					size: 2
				},
			},
			name: "large beaker",
			icon: 'icons/obj/chemical.png',
			icon_state: "beakerlarge"
		},
		tree_paths: ["items/beaker/large"]
	}
};

module.exports.components = {OpenReagentContainer, GlassBeaker};
