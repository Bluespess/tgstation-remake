'use strict';

const {Component, chain_func, has_component, visible_message} = require('bluespess');

class Buckle extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));
		this.atom.on("mouse_dropped_by", this.mouse_dropped_by.bind(this));
		this.buckled_mobs = [];
	}

	attack_hand(prev, user) {
		if(this.can_buckle && this.has_buckled_mobs()) {
			if(this.buckled_mobs.length > 1) {
				//TODO: implement this correctly like on TG
				this.unbuckle_all_mobs();
			}
			if(this.user_unbuckle_mob(this.buckled_mobs[0], user)) {
				return true;
			}
		}
		return prev();
	}

	mouse_dropped_by(e) {
		let buckling = e.from.atom;
		let user = e.mob;
		if(this.can_buckle && has_component(buckling, "LivingMob")) {
			if(this.user_buckle_mob(buckling, user)) {
				return true;
			}
		}
	}

	has_buckled_mobs() {
		if(this.buckled_mobs.length > 0) {
			return true;
		}
		return false;
	}

	buckle_mob(buckling, force = false, check_loc = true) {
		if(!this.buckled_mobs) {
			this.buckled_mobs = [];
		}
		if(!has_component(buckling, "LivingMob")) {
			return false;
		}
		if(check_loc && buckling.loc != this.a.loc) {
			return false;
		}
		if((!this.can_buckle && !force) || buckling.c.LivingMob.buckled || (this.buckled_mobs.length >= this.max_buckled_mobs) || this.atom == buckling) { //TODO: restraints check
			return false;
		}

		//TODO: implement can_buckle() mob proc and add the relevant check here.
		//TODO: implement check for buckle_prevents_pull, and stop_pulling()

		if(!check_loc && buckling.loc != this.a.loc) {
			buckling.loc = this.a.loc;
		}

		buckling.c.LivingMob.buckled = this.atom;
		buckling.dir = this.atom.dir;
		this.buckled_mobs.push(buckling);
		buckling.c.LivingMob.nomove_counter++;
		buckling.c.MobHud.throw_alert('buckled', 'alert_buckled');
		this.post_buckle_mob();
		return true;
	}

	//TODO: Handle igniting mobs buckled to flaming things. see /obj/buckle_mob() in TG code

	unbuckle_mob(unbuckling, force = false) {
		if((has_component(unbuckling, "LivingMob") && unbuckling.c.LivingMob.buckled == this.atom) || force) { //TODO: can_unbuckle() from TG. Irrelevant until slimes are added.
			unbuckling.c.LivingMob.buckled = null;
			unbuckling.c.Tangible.anchored = unbuckling.template.vars.components.Tangible.anchored;
			unbuckling.c.LivingMob.nomove_counter--;
			unbuckling.c.MobHud.clear_alert('buckled');
			let idx = this.buckled_mobs.indexOf(unbuckling);
			if(idx != -1) this.buckled_mobs.splice(idx, 1);
			this.post_buckle_mob();
			return true;
		}
	}

	unbuckle_all_mobs(force = false) {
		if(!this.has_buckled_mobs()) {
			return;
		}
		for(let i = 0; i < this.buckled_mobs.length; i++) {
			let unbuckling = this.buckled_mobs[i];
			this.unbuckle_mob(unbuckling, force);
		}
	}

	//Handle any extras after buckling/unbuckling
	//Called on buckle_mob() and unbuckle_mob()
	post_buckle_mob() { //TODO: On TG this has an arg for the mob in question, but we don't need it for anything yet and the linter hates unused vars
		return;
	}

	//Wrappers that handle sanity and user feedback
	user_buckle_mob(buckling, user, check_loc = true) { //This proc is unfinished placeholder, using it for testing.
		//TODO: range/stat/restrained checks

		if(this.buckle_mob(buckling, false, check_loc)) {
			if(buckling == user) {
				visible_message`<span class='notice'>${buckling} buckles themself to ${this.a}.</span>`
					.self`<span class='notice'>You buckle yourself to ${this.a}.</span>`
					.emit_from(this.a);
			} else {
				visible_message`<span class='warning'>${user} buckles ${buckling} to ${this.a}.</span>`
					.self`<span class='warning'>${user} buckles you to ${this.a}.</span>`
					.emit_from(this.a);
			}
		}
	}

	user_unbuckle_mob(unbuckling, user) {
		this.unbuckle_mob(unbuckling);
		if(unbuckling != user) {
			visible_message`<span class='notice'>${user} unbuckles ${unbuckling} from ${this.a}.</span>`
				.self`<span class='notice'>${user} unbuckles you from ${this.a}.</span>`
				.emit_from(this.a);
		} else {
			visible_message`<span class='warning'>${unbuckling} unbuckles themself from ${this.a}.</span>`
				.self`<span class='warning'>You unbuckle yourself from ${this.a}.</span>`
				.emit_from(this.a);
		}
	}
}

Buckle.template = {
	vars: {
		components: {
			"Buckle": {
				can_buckle: false,
				buckle_lying: -1, //bed-like behaviour, forces mob.lying = buckle_lying if != -1
				buckle_requires_restraints: false, //require people to be handcuffed before being able to buckle. eg: pipes
				max_buckled_mobs: 1,
				buckle_prevents_pull: false
			}
		}
	}
};

module.exports.components = {Buckle};
