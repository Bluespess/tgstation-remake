'use strict';
/*ALL MOB-RELATED DEFINES THAT DON'T BELONG IN ANOTHER FILE GO HERE*/

//Misc mob defines

//Ready states at roundstart for mob/dead/new_player
module.exports.PLAYER_NOT_READY = 0;
module.exports.PLAYER_READY_TO_PLAY = 1;
module.exports.PLAYER_READY_TO_OBSERVE = 2;

//movement intent defines for the m_intent var
module.exports.MOVE_INTENT_WALK = "walk";
module.exports.MOVE_INTENT_RUN = "run";

//Blood levels
module.exports.BLOOD_VOLUME_MAXIMUM = 2000;
module.exports.BLOOD_VOLUME_SLIME_SPLIT = 1120;
module.exports.BLOOD_VOLUME_NORMAL = 560;
module.exports.BLOOD_VOLUME_SAFE = 475;
module.exports.BLOOD_VOLUME_OKAY = 336;
module.exports.BLOOD_VOLUME_BAD = 224;
module.exports.BLOOD_VOLUME_SURVIVE = 122;

//Sizes of mobs, used by mob/living/var/mob_size
module.exports.MOB_SIZE_TINY = 0;
module.exports.MOB_SIZE_SMALL = 1;
module.exports.MOB_SIZE_HUMAN = 2;
module.exports.MOB_SIZE_LARGE = 3;

//Ventcrawling defines
module.exports.VENTCRAWLER_NONE = 0;
module.exports.VENTCRAWLER_NUDE = 1;
module.exports.VENTCRAWLER_ALWAYS = 2;

//Bloodcrawling defines
module.exports.BLOODCRAWL = 1;
module.exports.BLOODCRAWL_EAT = 2;

//Organ defines for carbon mobs
module.exports.ORGAN_ORGANIC = 1;
module.exports.ORGAN_ROBOTIC = 2;

module.exports.BODYPART_ORGANIC = 1;
module.exports.BODYPART_ROBOTIC = 2;

module.exports.DEFAULT_BODYPART_ICON_ORGANIC = 'icons/mob/human_parts_greyscale.dmi';
module.exports.DEFAULT_BODYPART_ICON_ROBOTIC = 'icons/mob/augmentation/augments.dmi';

module.exports.MONKEY_BODYPART = "monkey";
module.exports.ALIEN_BODYPART = "alien";
module.exports.LARVA_BODYPART = "larva";
module.exports.DEVIL_BODYPART = "devil";
/*see __DEFINES/inventory.dm for bodypart bitflag defines*/

//Health hud screws for carbon mobs
module.exports.SCREWYHUD_NONE = 0;
module.exports.SCREWYHUD_CRIT = 1;
module.exports.SCREWYHUD_DEAD = 2;
module.exports.SCREWYHUD_HEALTHY = 3;

//Nutrition levels for humans
module.exports.NUTRITION_LEVEL_FAT = 600;
module.exports.NUTRITION_LEVEL_FULL = 550;
module.exports.NUTRITION_LEVEL_WELL_FED = 450;
module.exports.NUTRITION_LEVEL_FED = 350;
module.exports.NUTRITION_LEVEL_HUNGRY = 250;
module.exports.NUTRITION_LEVEL_STARVING = 150;

//Disgust levels for humans
module.exports.DISGUST_LEVEL_MAXEDOUT = 150;
module.exports.DISGUST_LEVEL_DISGUSTED = 75;
module.exports.DISGUST_LEVEL_VERYGROSS = 50;
module.exports.DISGUST_LEVEL_GROSS = 25;

//Slime evolution threshold. Controls how fast slimes can split/grow
module.exports.SLIME_EVOLUTION_THRESHOLD = 10;

//Slime commands defines
module.exports.SLIME_FRIENDSHIP_FOLLOW = 3; //Min friendship to order it to follow
module.exports.SLIME_FRIENDSHIP_STOPEAT = 5; //Min friendship to order it to stop eating someone
module.exports.SLIME_FRIENDSHIP_STOPEAT_NOANGRY = 7; //Min friendship to order it to stop eating someone without it losing friendship
module.exports.SLIME_FRIENDSHIP_STOPCHASE = 4; //Min friendship to order it to stop chasing someone (their target)
module.exports.SLIME_FRIENDSHIP_STOPCHASE_NOANGRY = 6; //Min friendship to order it to stop chasing someone (their target) without it losing friendship
module.exports.SLIME_FRIENDSHIP_STAY = 3; //Min friendship to order it to stay
module.exports.SLIME_FRIENDSHIP_ATTACK = 8; //Min friendship to order it to attack

//Sentience types, to prevent things like sentience potions from giving bosses sentience
module.exports.SENTIENCE_ORGANIC = 1;
module.exports.SENTIENCE_ARTIFICIAL = 2;
module.exports.SENTIENCE_OTHER = 3;
module.exports.SENTIENCE_MINEBOT = 4;
module.exports.SENTIENCE_BOSS = 5;

//Mob AI Status

//Hostile simple animals
//If you add a new status, be sure to add a list for it to the simple_animals global in _globalvars/lists/mobs.dm
module.exports.AI_ON = 1;
module.exports.AI_IDLE = 2;
module.exports.AI_OFF = 3;

//determines if a mob can smash through it
module.exports.ENVIRONMENT_SMASH_NONE = 0;
module.exports.ENVIRONMENT_SMASH_STRUCTURES = 1; //crates, lockers, ect
module.exports.ENVIRONMENT_SMASH_WALLS = 2;   //walls
module.exports.ENVIRONMENT_SMASH_RWALLS = 4;  //rwalls


//SNPCs
//AI defines
module.exports.INTERACTING = 2;
module.exports.TRAVEL = 4;
module.exports.FIGHTING = 8;
//Trait defines
module.exports.TRAIT_ROBUST = 2;
module.exports.TRAIT_UNROBUST = 4;
module.exports.TRAIT_SMART = 8;
module.exports.TRAIT_DUMB = 16;
module.exports.TRAIT_MEAN = 32;
module.exports.TRAIT_FRIENDLY = 64;
module.exports.TRAIT_THIEVING = 128;
//Range/chance defines
module.exports.MAX_RANGE_FIND = 32;
module.exports.MIN_RANGE_FIND = 16;
module.exports.FUZZY_CHANCE_HIGH = 85;
module.exports.FUZZY_CHANCE_LOW = 50;
module.exports.CHANCE_TALK = 1;
//Traitor type defines
module.exports.SNPC_BRUTE = 1;
module.exports.SNPC_STEALTH = 2;
module.exports.SNPC_MARTYR = 3;
module.exports.SNPC_PSYCHO = 4;

module.exports.TK_MAXRANGE = 15;

module.exports.NO_SLIP_WHEN_WALKING = 1;
module.exports.SLIDE = 2;
module.exports.GALOSHES_DONT_HELP = 4;
module.exports.SLIDE_ICE = 8;

module.exports.MAX_CHICKENS = 50;

module.exports.UNHEALING_EAR_DAMAGE = 100;


module.exports.INCORPOREAL_MOVE_BASIC = 1;
module.exports.INCORPOREAL_MOVE_SHADOW = 2; // leaves a trail of shadows
module.exports.INCORPOREAL_MOVE_JAUNT = 3; // is blocked by holy water/salt

//Secbot and ED209 judgement criteria bitflag values
module.exports.JUDGE_EMAGGED = 1;
module.exports.JUDGE_IDCHECK = 2;
module.exports.JUDGE_WEAPONCHECK = 4;
module.exports.JUDGE_RECORDCHECK = 8;
//ED209's ignore monkeys
module.exports.JUDGE_IGNOREMONKEYS = 16;

module.exports.MEGAFAUNA_DEFAULT_RECOVERY_TIME = 5;

module.exports.SHADOW_SPECIES_LIGHT_THRESHOLD = 0.2;

// Offsets defines

module.exports.OFFSET_UNIFORM = "uniform";
module.exports.OFFSET_ID = "id";
module.exports.OFFSET_GLOVES = "gloves";
module.exports.OFFSET_GLASSES = "glasses";
module.exports.OFFSET_EARS = "ears";
module.exports.OFFSET_SHOES = "shoes";
module.exports.OFFSET_S_STORE = "s_store";
module.exports.OFFSET_FACEMASK = "mask";
module.exports.OFFSET_HEAD = "head";
module.exports.OFFSET_FACE = "face";
module.exports.OFFSET_BELT = "belt";
module.exports.OFFSET_BACK = "back";
module.exports.OFFSET_SUIT = "suit";
module.exports.OFFSET_NECK = "neck";
