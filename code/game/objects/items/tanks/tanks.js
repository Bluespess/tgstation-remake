'use strict';
const {Component, chain_func, has_component, to_chat} = require('bluespess');
const GasMixture = require('../../../../modules/atmospherics/gasmixtures/gas_mixture.js');
const atmos_defines = require('../../../../defines/atmos_defines.js');

class Tank extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.internal_toggle_action = this.a.c.ItemActions.add_action({name: "Toggle Internals", click_act: (user) => {
			this.toggle_internals(user);
		}});
		this.air_contents = new GasMixture(this.volume);
		this.air_contents.parse_gas_string(this.init_gas);
		this.integrity = 3;
		this.a.c.AirHolder.return_air = this.return_air.bind(this);
		this.a.c.AirHolder.assume_air = this.assume_air.bind(this);
		this.a.c.AirHolder.remove_air = this.remove_air.bind(this);
		this.a.c.Examine.examine = chain_func(this.a.c.Examine.examine, this.examine.bind(this));
	}

	examine(prev, user) {
		prev();
		if(has_component(user, "Tangible") && !user.c.Tangible.can_reach(this.a)) {
			to_chat`<span class='notice'>If you want any more information you'll need to get closer.</span>`(user);
			return;
		}
		to_chat`<span class='notice'>The pressure gauge reads ${(this.air_contents.return_pressure()).toFixed(2)}`(user);
		let c_temp = this.air_contents.temperature - atmos_defines.T0C;
		let descriptive = "";
		if(c_temp < 20)
			descriptive = "cold";
		else if(c_temp < 40)
			descriptive = "room temperature";
		else if(c_temp < 80)
			descriptive = "lukewarm";
		else if(c_temp < 100)
			descriptive = "warm";
		else if(c_temp < 300)
			descriptive = "hot";
		else
			descriptive = "furiously hot";
		to_chat`<span class='notice'>It feels ${descriptive}.</span>`(user);
	}

	toggle_internals(user) {
		if(!has_component(user, "CarbonMob") || !has_component(user, "MobInventory"))
			return;
		if(user.c.MobInventory.internal == this.a) {
			to_chat`<span class='notice'>You close the ${this.a} valve.</span>`(user);
			user.c.MobInventory.internal = null;
		} else {
			if(!user.c.CarbonMob.organs.breathing_tube) {
				if(!user.c.MobInventory.slots.mask || !user.c.MobInventory.slots.mask.item) {
					to_chat`<span class='warning'>You need a mask!</span>`(user);
					return;
				}
				let mask = user.c.MobInventory.slots.mask.item;
				mask.c.MaskItem.adjusted = false;
				if(!mask.c.MaskItem.internals_mask) {
					to_chat`<span class='notice'>You switch your internals to the ${this.a}.</span>`(user);
					return;
				}
			}
			if(user.c.MobInventory.internal)
				to_chat`<span class='notice'>You switch your internals to the ${this.a}.</span>`(user);
			else
				to_chat`<span class='notice'>You open the ${this.a} valve.`(user);
			user.c.MobInventory.internal = this.a;
		}
	}

	return_air() {
		return this.air_contents;
	}
	assume_air(giver) {
		this.air_contents.merge(giver);
	}
	remove_air(amount) {
		return this.air_contents.remove(amount);
	}

	remove_air_volume(volume_to_return) {
		if(!this.air_contents)
			return null;
		
		let pressure = this.air_contents.return_pressure();
		if(pressure < this.distribute_pressure)
			this.distribute_pressure = pressure;
		let air = this.remove_air((this.distribute_pressure * volume_to_return / (atmos_defines.R_IDEAL_GAS_EQUATION * this.air_contents.temperature)) || 0);
		air.volume = volume_to_return;
		return air;
	}
}

Tank.depends = ["Item", "ItemActions", "AirHolder"];
Tank.loadBefore = ["Item", "ItemActions", "AirHolder"];

Tank.template = {
	vars: {
		components: {
			"Tank": {
				volume: 70,
				distribute_pressure: atmos_defines.ONE_ATMOSPHERE,
				init_gas: `TEMP=${atmos_defines.T20C}`
			},
			"Item": {
				force: 5,
				inhand_lhand_icon: 'icons/mob/inhands/equipment/tanks_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/equipment/tanks_righthand.png'
			},
			"Destructible": {
				armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 10, bio: 0, rad: 0, fire: 80, acid: 30}
			},
			"Tangible": {
				throw_force: 10,
				throw_speed: 1,
				throw_range: 4
			}
		},
		name: "tank",
		icon: 'icons/obj/tank.png'
	}
};

module.exports.components = {Tank};