'use strict';

const access_types = {
	"security": {name: "Security", group: "station"},
	"brig": {"name":"Brig","group":"station"},
	"hokding_cells": {"name":"Holding Cells","group":"station"},
	"armory": {"name":"Armory","group":"station"},
	"forensics": {"name":"Forensics","group":"station"},
	"courtroom": {"name":"Courtroom","group":"station"},
	"medical": {"name":"Medical","group":"station"},
	"genetics": {"name":"Genetics Lab","group":"station"},
	"morgue": {"name":"Morgue","group":"station"},
	"rd": {"name":"RD Office","group":"station"},
	"rnd": {"name":"R&D Lab","group":"station"},
	"toxins_lab": {"name":"Toxins Lab","group":"station"},
	"chemistry": {"name":"Chemistry Lab","group":"station"},
	"engineering": {"name":"Engineering","group":"station"},
	"power_equipment": {"name":"Power Equipment","group":"station"},
	"maint": {"name":"Maintenance","group":"station"},
	"external_airlocks": {"name":"External Airlocks","group":"station"},
	"change_ids": {"name":"ID Console","group":"station"},
	"ai_upload": {"name":"AI Chambers","group":"station"},
	"teleporter": {"name":"Teleporter","group":"station"},
	"eva": {"name":"EVA","group":"station"},
	"heads": {"name":"Bridge","group":"station"},
	"captain": {"name":"Captain","group":"station"},
	"personal_lockers": {"name":"Personal Lockers","group":"station"},
	"tech_storage": {"name":"Technical Storage","group":"station"},
	"chapel_office": {"name":"Chapel Office","group":"station"},
	"atmospherics": {"name":"Atmospherics","group":"station"},
	"kitchen": {"name":"Kitchen","group":"station"},
	"bar": {"name":"Bar","group":"station"},
	"janitor": {"name":"Custodial Closet","group":"station"},
	"crematorium": {"name":"Crematorium","group":"station"},
	"robotics": {"name":"Robotics","group":"station"},
	"cargo": {"name":"Cargo Bay","group":"station"},
	"construction": {"name":"Construction","group":"station"},
	"hydroponics": {"name":"Hydroponics","group":"station"},
	"library": {"name":"Library","group":"station"},
	"lawyer": {"name":"Law Office","group":"station"},
	"virology": {"name":"Virology","group":"station"},
	"cmo": {"name":"CMO Office","group":"station"},
	"qm": {"name":"Quartermaster","group":"station"},
	"surgery": {"name":"Surgery","group":"station"},
	"theatre": {"name":"Theatre","group":"station"},
	"science": {"name":"Science","group":"station"},
	"mining": {"name":"Mining","group":"station"},
	"cargo_office": {"name":"Cargo Office","group":"station"},
	"weapons": {"name":"Weapon Permit","group":"station"},
	"vault": {"name":"Main Vault","group":"station"},
	"mining_station": {"name":"Mining EVA","group":"station"},
	"xenobiology": {"name":"Xenobiology Lab","group":"station"},
	"ce": {"name":"CE Office","group":"station"},
	"hop": {"name":"HoP Office","group":"station"},
	"hos": {"name":"HoS Office","group":"station"},
	"rc_announce": {"name":"RC Announcements","group":"station"},
	"keycard_auth": {"name":"Keycode Auth.","group":"station"},
	"tcomsat": {"name":"Telecommunications","group":"station"},
	"gateway": {"name":"Gateway","group":"station"},
	"mineral_storeroom": {"name":"Mineral Storage","group":"station"},
	"minisat": {"name":"AI Satellite","group":"station"},
	"network": {"name":"Network Access","group":"station"},
	"cloning": {"name":"Cloning Room","group":"station"}
};

const all_access = [];
for(let [access, meta] of Object.entries(access_types)) {
	if(meta.group == "station")
		all_access.push(access);
}

module.exports.access_types = access_types;
module.exports.all_access = all_access;
