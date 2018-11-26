'use strict';

var defines = {};
defines.R_IDEAL_GAS_EQUATION =	8.31; // kPa*L/(K*mol)
defines.ONE_ATMOSPHERE =		101.325; //kPa
defines.T0C =					273.15; // 0degC
defines.T20C =					293.15; // 20degC
defines.TCMB =					2.7; // -270.3degC

defines.FIRE_DAMAGE_MODIFIER =	0.0215;	//Higher values result in more external fire damage to the skin (default 0.0215)
defines.AIR_DAMAGE_MODIFIER =	2.025;	//More means less damage from hot air scalding lungs, less = more damage. (default 2.025)

defines.CELL_VOLUME =			2500;	//liters in a cell
defines.MOLES_CELLSTANDARD =	(defines.ONE_ATMOSPHERE*defines.CELL_VOLUME/(defines.T20C*defines.R_IDEAL_GAS_EQUATION));	//moles in a 2.5 m^3 cell at 101.325 Pa and 20 degC
defines.M_CELL_WITH_RATIO =		(defines.MOLES_CELLSTANDARD * 0.005);
defines.O2STANDARD =			0.21;
defines.N2STANDARD =			0.79;
defines.MOLES_O2STANDARD =		(defines.MOLES_CELLSTANDARD*defines.O2STANDARD);	// O2 standard value (21%)
defines.MOLES_N2STANDARD =		(defines.MOLES_CELLSTANDARD*defines.N2STANDARD);	// N2 standard value (79%)

//stuff you should probably leave well alone!
//ATMOS
defines.BREATH_VOLUME =						0.5;		//liters in a normal breath
defines.BREATH_PERCENTAGE =					(defines.BREATH_VOLUME/defines.CELL_VOLUME);					//Amount of air to take a from a tile
defines.HUMAN_NEEDED_OXYGEN =				(defines.MOLES_CELLSTANDARD*defines.BREATH_PERCENTAGE*0.16);	//Amount of air needed before pass out/suffocation commences
defines.NORMPIPERATE =						30;		//pipe-insulation rate divisor
defines.HEATPIPERATE =						8;		//heat-exch pipe insulation
defines.FLOWFRAC =							0.99;	//fraction of gas transfered per process
defines.TANK_LEAK_PRESSURE =				(30*defines.ONE_ATMOSPHERE);	//Tank starts leaking
defines.TANK_RUPTURE_PRESSURE =				(35*defines.ONE_ATMOSPHERE);	//Tank spills all contents into atmosphere
defines.TANK_FRAGMENT_PRESSURE =			(40*defines.ONE_ATMOSPHERE);	//Boom 3x3 base explosion
defines.TANK_FRAGMENT_SCALE =	    		(6*defines.ONE_ATMOSPHERE);	//+1 for each SCALE kPa aboe threshold
defines.MINIMUM_AIR_RATIO_TO_SUSPEND =		0.1;		//Ratio of air that must move to/from a tile to reset group processing
defines.MINIMUM_AIR_RATIO_TO_MOVE =			0.001;	//Minimum ratio of air that must move to/from a tile
defines.MINIMUM_AIR_TO_SUSPEND =			(defines.MOLES_CELLSTANDARD*defines.MINIMUM_AIR_RATIO_TO_SUSPEND);	//Minimum amount of air that has to move before a group processing can be suspended
defines.MINIMUM_MOLES_DELTA_TO_MOVE =		(defines.MOLES_CELLSTANDARD*defines.MINIMUM_AIR_RATIO_TO_MOVE); //Either this must be active
defines.EXCITED_GROUP_BREAKDOWN_CYCLES =	4;
defines.EXCITED_GROUP_DISMANTLE_CYCLES =	16;
defines.MINIMUM_TEMPERATURE_TO_MOVE =		(defines.T20C+100);			//or this (or both, obviously)
defines.MINIMUM_TEMPERATURE_RATIO_TO_SUSPEND =		0.012;
defines.MINIMUM_TEMPERATURE_DELTA_TO_SUSPEND =		4;		//Minimum temperature difference before group processing is suspended
defines.MINIMUM_TEMPERATURE_DELTA_TO_CONSIDER =		0.5;		//Minimum temperature difference before the gas temperatures are just set to be equal
defines.MINIMUM_TEMPERATURE_FOR_SUPERCONDUCTION =	defines.T20C+10;
defines.MINIMUM_TEMPERATURE_START_SUPERCONDUCTION =	defines.T20C+200;
defines.FLOOR_HEAT_TRANSFER_COEFFICIENT =	0.4;
defines.WALL_HEAT_TRANSFER_COEFFICIENT =	0.0;
defines.DOOR_HEAT_TRANSFER_COEFFICIENT =	0.0;
defines.SPACE_HEAT_TRANSFER_COEFFICIENT =	0.2;		//a hack to partly simulate radiative heat
defines.OPEN_HEAT_TRANSFER_COEFFICIENT =	0.4;
defines.WINDOW_HEAT_TRANSFER_COEFFICIENT =	0.1;		//a hack for now
//Must be between 0 and 1. Values closer to 1 equalize temperature faster
//Should not exceed 0.4 else strange heat flow occur
defines.FIRE_MINIMUM_TEMPERATURE_TO_SPREAD =150+defines.T0C;
defines.FIRE_MINIMUM_TEMPERATURE_TO_EXIST =	100+defines.T0C;
defines.FIRE_SPREAD_RADIOSITY_SCALE =		0.85;
defines.FIRE_GROWTH_RATE =					40000;	//For small fires
defines.CARBON_LIFEFORM_FIRE_RESISTANCE = 	200+defines.T0C;	//Resistance to fire damage
defines.CARBON_LIFEFORM_FIRE_DAMAGE =		4;		//Fire damage
//Plasma fire properties
defines.OXYGEN_BURN_RATE_BASE =				1.4;
defines.PLASMA_BURN_RATE_DELTA =			9;
defines.PLASMA_MINIMUM_BURN_TEMPERATURE =	100+defines.T0C;
defines.PLASMA_UPPER_TEMPERATURE =			1370+defines.T0C;
defines.PLASMA_MINIMUM_OXYGEN_NEEDED =		2;
defines.PLASMA_MINIMUM_OXYGEN_PLASMA_RATIO =30;
defines.PLASMA_OXYGEN_FULLBURN =			10;
defines.MIN_TOXIC_GAS_DAMAGE =				1;
defines.MAX_TOXIC_GAS_DAMAGE =				10;
defines.MOLES_GAS_VISIBLE =				0.5;		//Moles in a standard cell after which plasma is visible

// Pressure limits.
defines.HAZARD_HIGH_PRESSURE =				550;		//This determins at what pressure the ultra-high pressure red icon is displayed. (This one is set as a constant)
defines.WARNING_HIGH_PRESSURE =				325;		//This determins when the orange pressure icon is displayed (it is 0.7 * HAZARD_HIGH_PRESSURE)
defines.WARNING_LOW_PRESSURE =				50;		//This is when the gray low pressure icon is displayed. (it is 2.5 * HAZARD_LOW_PRESSURE)
defines.HAZARD_LOW_PRESSURE =				20;		//This is when the black ultra-low pressure icon is displayed. (This one is set as a constant)

defines.TEMPERATURE_DAMAGE_COEFFICIENT =	1.5;		//This is used in handle_temperature_damage() for humans, and in reagents that affect body temperature. Temperature damage is multiplied by this amount.
defines.BODYTEMP_AUTORECOVERY_DIVISOR =		12;		//This is the divisor which handles how much of the temperature difference between the current body temperature and 310.15K (optimal temperature) humans auto-regenerate each tick. The higher the number, the slower the recovery. This is applied each tick, so long as the mob is alive.
defines.BODYTEMP_AUTORECOVERY_MINIMUM =		10;		//Minimum amount of kelvin moved toward 310.15K per tick. So long as abs(310.15 - bodytemp) is more than 50.
defines.BODYTEMP_COLD_DIVISOR =				6;		//Similar to the BODYTEMP_AUTORECOVERY_DIVISOR, but this is the divisor which is applied at the stage that follows autorecovery. This is the divisor which comes into play when the human's loc temperature is lower than their body temperature. Make it lower to lose bodytemp faster.
defines.BODYTEMP_HEAT_DIVISOR =				6;		//Similar to the BODYTEMP_AUTORECOVERY_DIVISOR, but this is the divisor which is applied at the stage that follows autorecovery. This is the divisor which comes into play when the human's loc temperature is higher than their body temperature. Make it lower to gain bodytemp faster.
defines.BODYTEMP_COOLING_MAX =				30;		//The maximum number of degrees that your body can cool in 1 tick, when in a cold area.
defines.BODYTEMP_HEATING_MAX =				30;		//The maximum number of degrees that your body can heat up in 1 tick, when in a hot area.

defines.BODYTEMP_HEAT_DAMAGE_LIMIT =		360.15; // The limit the human body can take before it starts taking damage from heat.
defines.BODYTEMP_COLD_DAMAGE_LIMIT =		260.15; // The limit the human body can take before it starts taking damage from coldness.

defines.SPACE_HELM_MIN_TEMP_PROTECT =		2.0;		//what min_cold_protection_temperature is set to for space-helmet quality headwear. MUST NOT BE 0.
defines.SPACE_HELM_MAX_TEMP_PROTECT =		1500;	//Thermal insulation works both ways /Malkevin
defines.SPACE_SUIT_MIN_TEMP_PROTECT =		2.0;		//what min_cold_protection_temperature is set to for space-suit quality jumpsuits or suits. MUST NOT BE 0.
defines.SPACE_SUIT_MAX_TEMP_PROTECT =		1500;

defines.FIRE_SUIT_MIN_TEMP_PROTECT =		60;		//Cold protection for firesuits
defines.FIRE_SUIT_MAX_TEMP_PROTECT =		30000;	//what max_heat_protection_temperature is set to for firesuit quality suits. MUST NOT BE 0.
defines.FIRE_HELM_MIN_TEMP_PROTECT =		60;		//Cold protection for fire helmets
defines.FIRE_HELM_MAX_TEMP_PROTECT =		30000;	//for fire helmet quality items (red and white hardhats)

defines.FIRE_IMMUNITY_SUIT_MAX_TEMP_PROTECT =	35000;	//what max_heat_protection_temperature is set to for firesuit quality suits. MUST NOT BE 0.
defines.FIRE_IMMUNITY_HELM_MAX_TEMP_PROTECT =	35000;	//for fire helmet quality items (red and white hardhats)

defines.HELMET_MIN_TEMP_PROTECT =				160;		//For normal helmets
defines.HELMET_MAX_TEMP_PROTECT =				600;		//For normal helmets
defines.ARMOR_MIN_TEMP_PROTECT =				160;		//For armor
defines.ARMOR_MAX_TEMP_PROTECT =				600;		//For armor

defines.GLOVES_MIN_TEMP_PROTECT =				2.0;		//For some gloves (black and)
defines.GLOVES_MAX_TEMP_PROTECT =				1500;	//For some gloves
defines.SHOES_MIN_TEMP_PROTECT =				2.0;		//For gloves
defines.SHOES_MAX_TEMP_PROTECT =				1500;	//For gloves


defines.PRESSURE_DAMAGE_COEFFICIENT =			4;		//The amount of pressure damage someone takes is equal to (pressure / HAZARD_HIGH_PRESSURE)*PRESSURE_DAMAGE_COEFFICIENT, with the maximum of MAX_PRESSURE_DAMAGE
defines.MAX_HIGH_PRESSURE_DAMAGE =				4;		//This used to be 20... I got this much random rage for some retarded decision by polymorph?! Polymorph now lies in a pool of blood with a katana jammed in his spleen. ~Errorage --PS: The katana did less than 20 damage to him :(
defines.LOW_PRESSURE_DAMAGE =					2;		//The amounb of damage someone takes when in a low pressure area (The pressure threshold is so low that it doesn't make sense to do any calculations, so it just applies this flat value).

defines.COLD_SLOWDOWN_FACTOR =					20;		//Humans are slowed by the difference between bodytemp and BODYTEMP_COLD_DAMAGE_LIMIT divided by this

// Atmos pipe limits
defines.MAX_OUTPUT_PRESSURE =					4500; // (kPa) What pressure pumps and powered equipment max out at.
defines.MAX_TRANSFER_RATE =						200; // (L/s) Maximum speed powered equipment can work at.

//Tanks
defines.TANK_MAX_RELEASE_PRESSURE = (defines.ONE_ATMOSPHERE*3);
defines.TANK_MIN_RELEASE_PRESSURE = 0;
defines.TANK_DEFAULT_RELEASE_PRESSURE = 16;

defines.LAVALAND_EQUIPMENT_EFFECT_PRESSURE = 50; //what pressure you have to be under to increase the effect of equipment meant for lavaland
defines.LAVALAND_DEFAULT_ATMOS = "o2=14;n2=23;TEMP=300";

module.exports = defines;
