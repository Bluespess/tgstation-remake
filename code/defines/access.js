'use strict';

const access_types = {

	//command

	"ai_upload": {"name":"AI Chambers","group":"station"},
	"change_ids": {"name":"ID Console","group":"station"},
	"minisat": {"name":"AI Satellite","group":"station"},
	"network": {"name":"Network Access","group":"station"},
	"rc_announce": {"name":"RC Announcements","group":"station"},
	"keycard_auth": {"name":"Keycode Auth.","group":"station"},
	"tcomsat": {"name":"Telecommunications","group":"station"},
	"gateway": {"name":"Gateway","group":"station"},
	"hop": {"name":"HoP Office","group":"station"},
	"teleporter": {"name":"Teleporter","group":"station"},
	"eva": {"name":"EVA","group":"station"},
	"vault": {"name":"Main Vault","group":"station"},
	"heads": {"name":"Bridge","group":"station"},
	"captain": {"name":"Captain","group":"station"},
	"personal_lockers": {"name":"Personal Lockers","group":"station"},

	//civillian

	"chapel_office": {"name":"Chapel Office","group":"station"},
	"crematorium": {"name":"Crematorium","group":"station"},
	"library": {"name":"Library","group":"station"},
	"lawyer": {"name":"Law Office","group":"station"},

	//Engineering

	"atmospherics": {"name":"Atmospherics","group":"station"},
	"ce": {"name":"CE Office","group":"station"},
	"construction": {"name":"Construction","group":"station"},
	"engineering": {"name":"Engineering","group":"station"},
	"external_airlocks": {"name":"External Airlocks","group":"station"},
	"maint": {"name":"Maintenance","group":"station"},
	"power_equipment": {"name":"Power Equipment","group":"station"},
	"tech_storage": {"name":"Technical Storage","group":"station"},

	//Medical

	"medical": {"name":"Medical","group":"station"},
	"genetics": {"name":"Genetics Lab","group":"station"},
	"morgue": {"name":"Morgue","group":"station"},
	"chemistry": {"name":"Chemistry Lab","group":"station"},
	"virology": {"name":"Virology","group":"station"},
	"cmo": {"name":"CMO Office","group":"station"},
	"cloning": {"name":"Cloning Room","group":"station"},

	//science

	"science": {"name":"Science","group":"station"},
	"rd": {"name":"RD Office","group":"station"},
	"rnd": {"name":"R&D Lab","group":"station"},
	"toxins_lab": {"name":"Toxins Lab","group":"station"},
	"robotics": {"name":"Robotics","group":"station"},
	"surgery": {"name":"Surgery","group":"station"},
	"xenobiology": {"name":"Xenobiology Lab","group":"station"},


	//Security

	"security": {name: "Security", group: "station"},
	"brig": {"name":"Brig","group":"station"},
	"holding_cells": {"name":"Holding Cells","group":"station"},
	"armory": {"name":"Armory","group":"station"},
	"forensics": {"name":"Forensics","group":"station"},
	"courtroom": {"name":"Courtroom","group":"station"},
	"weapons": {"name":"Weapon Permit","group":"station"},
	"hos": {"name":"HoS Office","group":"station"},

	//Service

	"janitor": {"name":"Custodial Closet","group":"station"},
	"kitchen": {"name":"Kitchen","group":"station"},
	"bar": {"name":"Bar","group":"station"},
	"cargo": {"name":"Cargo Bay","group":"station"},
	"hydroponics": {"name":"Hydroponics","group":"station"},
	"qm": {"name":"Quartermaster","group":"station"},
	"theatre": {"name":"Theatre","group":"station"},
	"mining": {"name":"Mining","group":"station"},
	"cargo_office": {"name":"Cargo Office","group":"station"},
	"mining_station": {"name":"Mining EVA","group":"station"},
	"mineral_storeroom": {"name":"Mineral Storage","group":"station"},
};

const all_access = [];
for(let [access, meta] of Object.entries(access_types)) {
	if(meta.group == "station")
		all_access.push(access);
}

module.exports.access_types = access_types;
module.exports.all_access = all_access;
