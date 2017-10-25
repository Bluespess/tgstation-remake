'use strict';
/*ALL DEFINES RELATED TO COMBAT GO HERE*/

module.exports = {
//Damage and status effect defines

//bitflag damage defines used for suicide_act
	BRUTELOSS: 1,
	FIRELOSS: 2,
	TOXLOSS: 4,
	OXYLOSS: 8,
	SHAME: 16,

	/*STUN: "stun",
	KNOCKDOWN: "knockdown",
	UNCONSCIOUS: "unconscious",
	IRRADIATE: "irradiate",
	STUTTER: "stutter",
	SLUR: "slur",
	EYE_BLUR: "eye_blur",
	DROWSY: "drowsy",
	JITTER: "jitter",*/

	//Bitflags defining which status effects could be or are inflicted on a mob
	CANSTUN: 1,
	CANKNOCKDOWN: 2,
	CANUNCONSCIOUS: 4,
	CANPUSH: 8,
	IGNORESLOWDOWN: 16,
	GOTTAGOFAST: 32,
	GOTTAGOREALLYFAST: 64,
	GODMODE: 4096,
	FAKEDEATH: 8192,	//Replaces stuff like changeling.changeling_fakedeath
	DISFIGURED: 16384,	//I'll probably move this elsewhere if I ever get wround to writing a bitflag mob-damage system
	XENO_HOST: 32768,	//Tracks whether we're gonna be a baby alien's mummy.

	//Health Defines
	HEALTH_THRESHOLD_CRIT: 0,
	HEALTH_THRESHOLD_DEAD: -100,

	//Actual combat defines

	//click cooldowns, in tenths of a second, used for various combat actions
	CLICK_CD_MELEE: 8,
	CLICK_CD_RANGE: 4,
	CLICK_CD_RAPID: 2,
	CLICK_CD_CLICK_ABILITY: 6,
	CLICK_CD_BREAKOUT: 100,
	CLICK_CD_HANDCUFFED: 10,
	CLICK_CD_RESIST: 20,
	CLICK_CD_GRABBING: 10,

	//Cuff resist speeds
	FAST_CUFFBREAK: 1,
	INSTANT_CUFFBREAK: 2,

	//Grab levels
	GRAB_PASSIVE: 0,
	GRAB_AGGRESSIVE: 1,
	GRAB_NECK: 2,
	GRAB_KILL: 3,

	//Attack types for checking shields/hit reactions
	MELEE_ATTACK: 1,
	UNARMED_ATTACK: 2,
	PROJECTILE_ATTACK: 3,
	THROWN_PROJECTILE_ATTACK: 4,
	LEAP_ATTACK: 5,

	//attack visual effects
	ATTACK_EFFECT_PUNCH: "punch",
	ATTACK_EFFECT_KICK: "kick",
	ATTACK_EFFECT_SMASH: "smash",
	ATTACK_EFFECT_CLAW: "claw",
	ATTACK_EFFECT_DISARM: "disarm",
	ATTACK_EFFECT_BITE: "bite",
	ATTACK_EFFECT_MECHFIRE: "mech_fire",
	ATTACK_EFFECT_MECHTOXIN: "mech_toxin",
	ATTACK_EFFECT_BOOP: "boop", //Honk

	//intent defines
	INTENT_HELP: "help",
	INTENT_GRAB: "grab",
	INTENT_DISARM: "disarm",
	INTENT_HARM: "harm",
	//NOTE: INTENT_HOTKEY_* defines are not actual intents!
	//they are here to support hotkeys
	INTENT_HOTKEY_LEFT: "left",
	INTENT_HOTKEY_RIGHT: "right",

	//the define for visible message range in combat
	COMBAT_MESSAGE_RANGE: 3,

	//Combat object defines

	//Embedded objects
	EMBEDDED_PAIN_CHANCE: 15,	//Chance for embedded objects to cause pain (damage user)
	EMBEDDED_ITEM_FALLOUT: 5,	//Chance for embedded object to fall out (causing pain but removing the object)
	EMBED_CHANCE: 45,	//Chance for an object to embed into somebody when thrown (if it's sharp)
	EMBEDDED_PAIN_MULTIPLIER: 2,	//Coefficient of multiplication for the damage the item does while embedded (this*item.w_class)
	EMBEDDED_FALL_PAIN_MULTIPLIER: 5,	//Coefficient of multiplication for the damage the item does when it falls out (this*item.w_class)
	EMBEDDED_IMPACT_PAIN_MULTIPLIER: 4,	//Coefficient of multiplication for the damage the item does when it first embeds (this*item.w_class)
	EMBED_THROWSPEED_THRESHOLD: 4,	//The minimum value of an item's throw_speed for it to embed (Unless it has embedded_ignore_throwspeed_threshold set to 1)
	EMBEDDED_UNSAFE_REMOVAL_PAIN_MULTIPLIER: 8,	//Coefficient of multiplication for the damage the item does when removed without a surgery (this*item.w_class)
	EMBEDDED_UNSAFE_REMOVAL_TIME: 30,	//A Time in ticks, total removal time = (this*item.w_class)

	//Gun Stuff
	SAWN_INTACT: 0,
	SAWN_OFF: 1,
	//Gun weapon weight
	WEAPON_DUAL_WIELD: 0,
	WEAPON_LIGHT: 1,
	WEAPON_MEDIUM: 2,
	WEAPON_HEAVY: 3,
	//Gun trigger guards
	TRIGGER_GUARD_ALLOW_ALL: -1,
	TRIGGER_GUARD_NONE: 0,
	TRIGGER_GUARD_NORMAL: 1,

	//Object/Item sharpness
	IS_BLUNT: 0,
	IS_SHARP: 1,
	IS_SHARP_ACCURATE: 2,

	//His Grace.
	HIS_GRACE_SATIATED: 0, //He hungers not. If bloodthirst is set to this, His Grace is asleep.
	HIS_GRACE_PECKISH: 20, //Slightly hungry.
	HIS_GRACE_HUNGRY: 60, //Getting closer. Increases damage up to a minimum of 20.
	HIS_GRACE_FAMISHED: 100, //Dangerous. Increases damage up to a minimum of 25 and cannot be dropped.
	HIS_GRACE_STARVING: 120, //Incredibly close to breaking loose. Increases damage up to a minimum of 30.
	HIS_GRACE_CONSUME_OWNER: 140, //His Grace consumes His owner at this point and becomes aggressive.
	HIS_GRACE_FALL_ASLEEP: 160, //If it reaches this point, He falls asleep and resets.

	HIS_GRACE_FORCE_BONUS: 4, //How much force is gained per kill.

	EXPLODE_NONE: 0,				//Don't even ask me why we need this.
	EXPLODE_DEVASTATE: 1,
	EXPLODE_HEAVY: 2,
	EXPLODE_LIGHT: 3,

	EMP_HEAVY: 1,
	EMP_LIGHT: 2
};
