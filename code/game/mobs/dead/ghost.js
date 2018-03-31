'use strict';
const {Component, Atom, VisibilityGroup, to_chat} = require('bluespess');
const layers = require('../../../defines/layers.js');

const ghost_group = new VisibilityGroup();
ghost_group.overrides.set("visible", true);

class Ghost extends Component {
	constructor(atom, template) {
		super(atom, template);
		//this.add_networked_var("ghost_orbit");
		ghost_group.viewers.add(this.a);

		this.a.c.Mob.on("client_changed", this.client_changed.bind(this));

		this.a.c.Eye.screen.reenter_corpse = new Atom(this.a.server, {vars:{
			icon: 'icons/mob/screen_ghost.png', icon_state: "reenter_corpse", screen_loc_x: 7.75, screen_loc_y: 0.1875, layer: 30
		}});
		this.a.c.Eye.screen.reenter_corpse.on("clicked", () => {
			this.reenter_corpse();
		});
	}

	client_changed(old_client, new_client) {
		if(new_client) {
			ghost_group.atoms.add(this.a);
		} else {
			ghost_group.atoms.delete(this.a);
		}
	}

	reenter_corpse() {
		if(!this.a.c.Mob.client)
			return;
		if(!this.mind || !this.mind.current || this.mind.current.destroyed) {
			to_chat`<span class='warning'>You have no body.</span>`(this.a);
			return;
		}
		if(!this.can_reenter_corpse) {
			to_chat`<span class='warning'>You cannot re-enter your body.</span>`(this.a);
			return;
		}
		if(this.mind.current.c.Mob.key) {
			to_chat`<span class='warning'>Another consciousness is in your body... It is resisting you.</span>`(this.a);
			return;
		}
		this.mind.key = this.a.c.Mob.key;
		this.mind.current.c.Mob.key = this.mind.key;
		this.a.destroy();
	}
}

Ghost.template = {
	vars: {
		components: {
			"Ghost": {
				can_reenter_corpse: false
			},
			"Examine": {
				desc: "It's a g-g-g-g-ghooooost!" // jinkies!
			},
			"Eye": {
				xray: true
			}
		},
		name: "ghost",
		icon: 'icons/mob/mob.png',
		icon_state: "ghost",
		layer: layers.GHOST_LAYER,
		density: -1,
		visible: false,
		walk_delay: 50
	}
};

Ghost.depends = ["MobMovement", "Hearer", "Mob", "Examine"];
Ghost.loadBefore = ["Mob", "Examine"];

module.exports.components = {Ghost};
