'use strict';
const {Panel} = require('bluespess');
const CharacterPreferences = require('./character.js');

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
		}
		if(msg.randomize_name && this.char_prefs) {
			this.char_prefs.randomize_name(msg.randomize_name);
			this.send_prefs(["name"]);
		}
	}

	send_prefs(parts) {
		let char_prefs_msg = {};
		for(let key of ["name", "be_random_name", "be_random_body", "gender", "age", "skin_tone", "backbag"]) {
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

		this.send_message({set_tab: this.start_tab});
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
