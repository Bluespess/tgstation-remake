'use strict';
const {Component, chain_func} = require('bluespess');
const {T0C} = require('../../../../defines/atmos_defines.js');
const {INTENT_HELP, INTENT_HARM} = require('../../../../defines/combat_defines.js');

class CarbonMob extends Component {
	
}
CarbonMob.depends = ["LivingMob"];
CarbonMob.loadBefore = ["LivingMob"];

CarbonMob.template = {
	vars: {
		components: {
			CarbonMob: {
				possible_act_intents: [INTENT_HELP, INTENT_HARM],
				temperature_resistance: T0C+75,
				
			}
		}
	}
}