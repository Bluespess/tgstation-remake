'use strict';
const {Panel} = require('bluespess');
const CharacterPreferences = require('./character.js');
const sprite_accessories = require('../../game/mobs/living/carbon/human/sprite_accessories.js');
const {skin_tones} = require('../../game/mobs/living/carbon/body_parts/helpers.js');

class PreferencesPanel extends Panel {
	constructor(client, {start_tab = "character"} = {}) {
		super(client, {width:640, height:770, title:"Preferences", can_close: true});
		this.start_tab = start_tab;
		this.on("message", this.message_handler.bind(this));
		this.on("close", this.closed.bind(this));
		this.on("open", this.opened.bind(this));
		this.char_prefs = client.character_preferences || (client.character_preferences = new CharacterPreferences());
	}

	message_handler(msg) {
		if(msg.char_prefs && this.char_prefs) {
			if(msg.char_prefs.name != null) {
				let new_name = CharacterPreferences.reject_bad_name(msg.char_prefs.name);
				if(new_name) {
					this.send_message({name_valid: true});
					let corrected = CharacterPreferences.reject_bad_name(msg.char_prefs.name, {trim: false});
					if(corrected != msg.char_prefs.name) {
						this.send_message({name_correction: [msg.char_prefs.name, corrected]});
					}
					this.char_prefs.name = new_name;
				} else {
					this.send_message({name_valid: false});
				}
			}
			if(msg.char_prefs.gender != null) {
				this.char_prefs.gender = (msg.char_prefs.gender == "female") ? "female" : "male";
			}
			if(msg.char_prefs.age != null) {
				let age = +msg.char_prefs.age || 0;
				age = Math.min(Math.max(17, age), 85);
				this.char_prefs.age = age;
			}
			if(msg.char_prefs.hair_style != null) {
				let hair_obj = sprite_accessories.hair[msg.char_prefs.hair_style];
				if(hair_obj && sprite_accessories.hair.hasOwnProperty(msg.char_prefs.hair_style) && (!hair_obj.gender || hair_obj.gender.includes(this.char_prefs.gender)))
					this.char_prefs.hair_style = msg.char_prefs.hair_style;
			}
			if(msg.char_prefs.hair_color != null) {
				let arr = msg.char_prefs.hair_color;
				if(!(arr instanceof Array))
					arr = [];
				arr.length = 3;
				arr = arr.map(item => {return Math.min(255, Math.max(0, Math.round(+item)));});
				this.char_prefs.hair_color = arr;
			}
			if(msg.char_prefs.skin_tone != null) {
				if(skin_tones.hasOwnProperty(msg.char_prefs.skin_tone))
					this.char_prefs.skin_tone = msg.char_prefs.skin_tone;
			}
		}
		if(msg.randomize_name && this.char_prefs) {
			this.char_prefs.randomize_name(msg.randomize_name);
			this.send_prefs(["name"]);
		}
	}

	send_prefs(parts) {
		let char_prefs_msg = {};
		for(let key of ["name", "be_random_name", "be_random_body", "gender", "age", "skin_tone", "backbag", "hair_style", "hair_color"]) {
			if(parts && !parts.includes(key))
				continue;
			char_prefs_msg[key] = this.char_prefs[key];
		}
		this.send_message({char_prefs: char_prefs_msg});
	}

	closed() {
		this.client.preferences_panel = null;
	}
	opened() {
		this.client.preferences_panel = this;

		this.send_message({set_tab: this.start_tab, sprite_accessories, skin_tones});
		this.send_prefs();
	}

	static open_for(client, options = {}) {
		if(client.preferences_panel)
			return client.preferences_panel;
		let panel = new PreferencesPanel(client, options);
		panel.open();
		return panel;
	}
}

module.exports = PreferencesPanel;
