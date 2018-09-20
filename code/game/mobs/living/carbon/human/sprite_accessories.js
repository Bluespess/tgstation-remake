'use strict';

class SpriteAccessory {
	constructor(obj) {
		Object.assign(this, {
			icon: null,
			icon_state: null,
			name: null,
			gender: null, // array of genders to accept, or null to accept all
			gender_specific: false // //Something that can be worn by either gender, but looks different on each
		}, obj);
	}
}

class HairAccessory extends SpriteAccessory {
	constructor(obj = {}) {
		obj.icon = obj.hasOwnProperty('icon') ? obj.icon : 'icons/mob/human_face.png';
		super(obj);
	}
}

// more proof tg coders are dumb
// there were duplicate type paths. go figure.
// that means some hair styles got overwritten
module.exports.hair = {
	"short": new HairAccessory({
		name: "Short Hair",
		icon_state: "hair_a"
	}),

	"shorthair2": new HairAccessory({
		name: "Short Hair 2",
		icon_state: "hair_shorthair2"
	}),

	"shorthair3": new HairAccessory({
		name: "Short Hair 3",
		icon_state: "hair_shorthair3"
	}),

	"cut": new HairAccessory({
		name: "Cut Hair",
		icon_state: "hair_c"
	}),

	"shoulderlength": new HairAccessory({
		name: "Shoulder-length Hair",
		icon_state: "hair_b"
	}),

	"longer": new HairAccessory({
		name: "Long Hair",
		icon_state: "hair_vlong"
	}),

	"over_eye": new HairAccessory({
		name: "Over Eye",
		icon_state: "hair_shortovereye"
	}),

	"long_over_eye": new HairAccessory({
		name: "Long Over Eye",
		icon_state: "hair_longovereye"
	}),

	"longest2": new HairAccessory({
		name: "Very Long Over Eye",
		icon_state: "hair_longest2"
	}),

	"longest": new HairAccessory({
		name: "Very Long Hair",
		icon_state: "hair_longest"
	}),

	"longfringe": new HairAccessory({
		name: "Long Fringe",
		icon_state: "hair_longfringe"
	}),

	"longestalt": new HairAccessory({
		name: "Longer Fringe",
		icon_state: "hair_vlongfringe"
	}),

	"gentle": new HairAccessory({
		name: "Gentle",
		icon_state: "hair_gentle"
	}),

	"halfbang": new HairAccessory({
		name: "Half-banged Hair",
		icon_state: "hair_halfbang"
	}),

	"halfbang2": new HairAccessory({
		name: "Half-banged Hair 2",
		icon_state: "hair_halfbang2"
	}),

	"ponytail1": new HairAccessory({
		name: "Ponytail",
		icon_state: "hair_ponytail"
	}),

	"ponytail2": new HairAccessory({
		name: "Ponytail 2",
		icon_state: "hair_ponytail2"
	}),

	"ponytail3": new HairAccessory({
		name: "Ponytail 3",
		icon_state: "hair_ponytail3"
	}),

	"ponytail4": new HairAccessory({
		name: "Ponytail 4",
		icon_state: "hair_ponytail4"
	}),

	"ponytail5": new HairAccessory({
		name: "Ponytail 5",
		icon_state: "hair_ponytail5"
	}),


	"sidetail": new HairAccessory({
		name: "Side Pony",
		icon_state: "hair_sidetail"
	}),

	"sidetail2": new HairAccessory({
		name: "Side Pony 2",
		icon_state: "hair_sidetail2"
	}),

	"sidetail3": new HairAccessory({
		name: "Side Pony 3",
		icon_state: "hair_sidetail3"
	}),

	"sidetail4": new HairAccessory({
		name: "Side Pony 4",
		icon_state: "hair_sidetail4"
	}),

	"oneshoulder": new HairAccessory({
		name: "One Shoulder",
		icon_state: "hair_oneshoulder"
	}),

	"tressshoulder": new HairAccessory({
		name: "Tress Shoulder",
		icon_state: "hair_tressshoulder"
	}),

	"parted": new HairAccessory({
		name: "Parted",
		icon_state: "hair_parted"
	}),

	"pompadour": new HairAccessory({
		name: "Pompadour",
		icon_state: "hair_pompadour"
	}),

	"bigpompadour": new HairAccessory({
		name: "Big Pompadour",
		icon_state: "hair_bigpompadour"
	}),

	"quiff": new HairAccessory({
		name: "Quiff",
		icon_state: "hair_quiff"
	}),

	"bedhead": new HairAccessory({
		name: "Bedhead",
		icon_state: "hair_bedhead"
	}),

	"bedhead2": new HairAccessory({
		name: "Bedhead 2",
		icon_state: "hair_bedheadv2"
	}),

	"bedhead3": new HairAccessory({
		name: "Bedhead 3",
		icon_state: "hair_bedheadv3"
	}),

	"messy": new HairAccessory({
		name: "Messy",
		icon_state: "hair_messy"
	}),

	"beehive": new HairAccessory({
		name: "Beehive",
		icon_state: "hair_beehive"
	}),

	"beehive2": new HairAccessory({
		name: "Beehive 2",
		icon_state: "hair_beehivev2"
	}),

	"bobcurl": new HairAccessory({
		name: "Bobcurl",
		icon_state: "hair_bobcurl"
	}),

	"bobcut": new HairAccessory({
		name: "Bob",
		icon_state: "hair_bobcut"
	}),

	"bowl": new HairAccessory({
		name: "Bowl",
		icon_state: "hair_bowlcut"
	}),

	"buzz": new HairAccessory({
		name: "Buzzcut",
		icon_state: "hair_buzzcut"
	}),

	"crew": new HairAccessory({
		name: "Crewcut",
		icon_state: "hair_crewcut"
	}),

	"combover": new HairAccessory({
		name: "Combover",
		icon_state: "hair_combover"
	}),

	"devillock": new HairAccessory({
		name: "Devil Lock",
		icon_state: "hair_devilock"
	}),

	"dreadlocks": new HairAccessory({
		name: "Dreadlocks",
		icon_state: "hair_dreads"
	}),

	"curls": new HairAccessory({
		name: "Curls",
		icon_state: "hair_curls"
	}),

	"afro": new HairAccessory({
		name: "Afro",
		icon_state: "hair_afro"
	}),

	"afro2": new HairAccessory({
		name: "Afro 2",
		icon_state: "hair_afro2"
	}),

	"afro_large": new HairAccessory({
		name: "Big Afro",
		icon_state: "hair_bigafro"
	}),

	"sargeant": new HairAccessory({
		name: "Flat Top",
		icon_state: "hair_sargeant"
	}),

	"emo": new HairAccessory({
		name: "Emo",
		icon_state: "hair_emo"
	}),

	"longemo": new HairAccessory({
		name: "Long Emo",
		icon_state: "hair_longemo"
	}),

	"fag": new HairAccessory({
		name: "Flow Hair",
		icon_state: "hair_f"
	}),

	"feather": new HairAccessory({
		name: "Feather",
		icon_state: "hair_feather"
	}),

	"hitop": new HairAccessory({
		name: "Hitop",
		icon_state: "hair_hitop"
	}),

	"mohawk": new HairAccessory({
		name: "Mohawk",
		icon_state: "hair_d"
	}),

	"reversemohawk": new HairAccessory({
		name: "Reverse Mohawk",
		icon_state: "hair_reversemohawk"
	}),

	"jensen": new HairAccessory({
		name: "Jensen Hair",
		icon_state: "hair_jensen"
	}),

	"gelled": new HairAccessory({
		name: "Gelled Back",
		icon_state: "hair_gelled"
	}),

	"spiky": new HairAccessory({
		name: "Spiky",
		icon_state: "hair_spikey"
	}),

	"spiky2": new HairAccessory({
		name: "Spiky 2",
		icon_state: "hair_spiky"
	}),

	"spiky3": new HairAccessory({
		name: "Spiky 3",
		icon_state: "hair_spiky2"
	}),

	"protagonist": new HairAccessory({
		name: "Slightly Long",
		icon_state: "hair_protagonist"
	}),

	"kusangi": new HairAccessory({
		name: "Kusanagi Hair",
		icon_state: "hair_kusanagi"
	}),

	"kagami": new HairAccessory({
		name: "Pigtails",
		icon_state: "hair_kagami"
	}),

	"pigtail": new HairAccessory({
		name: "Pigtails 2",
		icon_state: "hair_pigtails"
	}),

	"pigtail2": new HairAccessory({
		name: "Pigtails 3",
		icon_state: "hair_pigtails2"
	}),

	"himecut": new HairAccessory({
		name: "Hime Cut",
		icon_state: "hair_himecut"
	}),

	"himecut2": new HairAccessory({
		name: "Hime Cut 2",
		icon_state: "hair_himecut2"
	}),

	"himeup": new HairAccessory({
		name: "Hime Updo",
		icon_state: "hair_himeup"
	}),

	"antenna": new HairAccessory({
		name: "Ahoge",
		icon_state: "hair_antenna"
	}),

	"front_braid": new HairAccessory({
		name: "Braided front",
		icon_state: "hair_braidfront"
	}),

	"lowbraid": new HairAccessory({
		name: "Low Braid",
		icon_state: "hair_hbraid"
	}),

	"not_floorlength_braid": new HairAccessory({
		name: "High Braid",
		icon_state: "hair_braid2"
	}),

	"shortbraid": new HairAccessory({
		name: "Short Braid",
		icon_state: "hair_shortbraid"
	}),

	"braid": new HairAccessory({
		name: "Floorlength Braid",
		icon_state: "hair_braid"
	}),

	"odango": new HairAccessory({
		name: "Odango",
		icon_state: "hair_odango"
	}),

	"ombre": new HairAccessory({
		name: "Ombre",
		icon_state: "hair_ombre"
	}),

	"updo": new HairAccessory({
		name: "Updo",
		icon_state: "hair_updo"
	}),

	"skinhead": new HairAccessory({
		name: "Skinhead",
		icon_state: "hair_skinhead"
	}),

	"longbangs": new HairAccessory({
		name: "Long Bangs",
		icon_state: "hair_lbangs"
	}),

	"balding": new HairAccessory({
		name: "Balding Hair",
		icon_state: "hair_e"
	}),

	"bald": new HairAccessory({
		name: "Bald",
		icon: null,
		icon_state: null
	}),

	"side_part": new HairAccessory({
		name: "Side Part",
		icon_state: "hair_part"
	}),

	"braided": new HairAccessory({
		name: "Braided",
		icon_state: "hair_braided"
	}),

	"bun": new HairAccessory({
		name: "Bun Head",
		icon_state: "hair_bun"
	}),

	"bun2": new HairAccessory({
		name: "Bun Head 2",
		icon_state: "hair_bunhead2"
	}),

	"braidtail": new HairAccessory({
		name: "Braided Tail",
		icon_state: "hair_braidtail"
	}),

	"bigflattop": new HairAccessory({
		name: "Big Flat Top",
		icon_state: "hair_bigflattop"
	}),

	"drillhair": new HairAccessory({
		name: "Drill Hair",
		icon_state: "hair_drillhair"
	}),

	"keanu": new HairAccessory({
		name: "Keanu Hair",
		icon_state: "hair_keanu"
	}),

	"swept": new HairAccessory({
		name: "Swept Back Hair",
		icon_state: "hair_swept"
	}),

	"swept2": new HairAccessory({
		name: "Swept Back Hair 2",
		icon_state: "hair_swept2"
	}),

	"business": new HairAccessory({
		name: "Business Hair",
		icon_state: "hair_business"
	}),

	"business2": new HairAccessory({
		name: "Business Hair 2",
		icon_state: "hair_business2"
	}),

	"business3": new HairAccessory({
		name: "Business Hair 3",
		icon_state: "hair_business3"
	}),

	"business4": new HairAccessory({
		name: "Business Hair 4",
		icon_state: "hair_business4"
	}),

	"hedgehog": new HairAccessory({
		name: "Hedgehog Hair",
		icon_state: "hair_hedgehog"
	}),

	"bob": new HairAccessory({
		name: "Bob Hair",
		icon_state: "hair_bob"
	}),

	"bob2": new HairAccessory({
		name: "Bob Hair 2",
		icon_state: "hair_bob2"
	}),

	"boddicker": new HairAccessory({
		name: "Boddicker",
		icon_state: "hair_boddicker"
	}),

	"long": new HairAccessory({
		name: "Long Hair 1",
		icon_state: "hair_long"
	}),

	"long2": new HairAccessory({
		name: "Long Hair 2",
		icon_state: "hair_long2"
	}),

	"pixie": new HairAccessory({
		name: "Pixie Cut",
		icon_state: "hair_pixie"
	}),

	"megaeyebrows": new HairAccessory({
		name: "Mega Eyebrows",
		icon_state: "hair_megaeyebrows"
	}),

	"highponytail": new HairAccessory({
		name: "High Ponytail",
		icon_state: "hair_highponytail"
	}),

	"longponytail": new HairAccessory({
		name: "Long Ponytail",
		icon_state: "hair_longstraightponytail"
	}),

	"sidepartlongalt": new HairAccessory({
		name: "Long Side Part",
		icon_state: "hair_longsidepart"
	}),

	"sidecut": new HairAccessory({
		name: "Sidecut",
		icon_state: "hair_sidecut"
	}),

	"largebun": new HairAccessory({
		name: "Large Bun",
		icon_state: "hair_largebun"
	}),
};
