'use strict';
const {Component, has_component, format_html, audible_message, to_chat} = require('bluespess');

class SpeechEmitter extends Component {
	constructor(atom, template) {
		super(atom, template);
		if(has_component(this.a, "Mob")) {
			this.a.c.Mob.on("message", (obj) => {
				if(obj.say_message) {
					let client = this.a.c.Mob.client;
					if(client.last_say_message && this.a.server.now() < client.last_say_message + 300) {
						to_chat`You're doing that too fast!`(client);
					} else {
						client.last_say_message = this.a.server.now();
						let msg = (""+obj.say_message).substring(0, 256);
						let message_obj = this.build_message({text: msg});
						this.emit_message(message_obj);
					}
				}
			});
		}
	}
	build_message({text = ""} = {}) {
		let msg = new SpeechMessage({message: text, speaker: this.a});
		if(!msg.message || !msg.message.length)
			return null;
		return msg;
	}
	emit_message(message) {
		if(!message)
			return;
		var hearers = new Set();
		for(var loc of this.a.base_mover.partial_locs()) {
			for(let hearer of loc.hearers)
				if(has_component(hearer, "SpeechHearer"))
					hearers.add(hearer);
		}
		for(let hearer of hearers) {
			if(Math.max(Math.abs(hearer.x - this.a.x), Math.abs(hearer.y - this.a.y)) <= message.range)
				hearer.c.SpeechHearer.hear_message(message, this.a);
		}
		if(message.mode == "radio" && !message.radio_freq) { // TODO make this less hacky
			let new_message = message.clone();
			new_message.radio_freq = 1459;
			for(let target of this.a.server.atoms_for_components["SpeechHearer"] || []) {
				target.c.SpeechHearer.hear_message(new_message, target);
			}
		}
		return this;
	}
}

SpeechEmitter.loadBefore = ["Mob"];

SpeechEmitter.template = {
	vars: {
		components: {
			"SpeechEmitter": {
				verb_say: "says",
				verb_ask: "asks",
				verb_exclain: "exclaims",
				verb_whisper: "whispers",
				verb_yell: "yells"
			}
		}
	}
};

class SpeechMessage {
	constructor(obj) {
		Object.assign(this, {
			message: "",
			mode: "normal",
			speaker: null,
			range: 7,
			radio_freq: null
		}, obj);
	}
	clone() {
		return new SpeechMessage(this);
	}
}

let freqtospan = {
	"1351": "sciradio",
	"1355": "medradio",
	"1357": "engradio",
	"1347": "suppradio",
	"1349": "servradio",
	"1359": "secradio",
	"1353": "comradio",
	"1447": "aiprivradio",
	"1213": "syndradio",
	"1337": "centcomradio",
	"1215": "redteamradio",
	"1217": "blueteamradio"
};

class SpeechHearer extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
	hear_message(message, emitter) {
		let deaf_message = null;
		if(message.speaker != this.a) {
			if(!message.radio_freq)
				deaf_message = format_html`<span class='name'>${message.speaker}</span> ${message.speaker.c.SpeechEmitter.verb_say} something but you cannot hear them.`;
		} else {
			deaf_message = "<span class='notice'>You can't hear yourself!</span>";
		}

		let composed = this.compose_message(message, emitter);
		if(!composed)
			return;
		let shown_message = audible_message(composed);
		if(deaf_message)
			shown_message.deaf(deaf_message);
		shown_message.show_directly_to(this.a, emitter);
	}

	compose_message(message) {
		let spanpart1 = `<span class='${message.radio_freq ? (freqtospan[message.radio_freq] || "radio") : "game say"}'>`;
		let spanpart2 = `<span class='name'>`;
		let freqpart = message.radio_freq ? `[Common]` : "";
		let namepart = message.speaker.name; // for now
		let endspanpart = `</span>`;
		let messagepart = format_html` <span class='message'>${message.speaker.c.SpeechEmitter.verb_say}, "${message.message}"</span></span>`;
		let languageicon = '';
		if(message.mode == "emote") {
			return `${spanpart2}${namepart}${endspanpart} ${message.message}.`;
		} else {
			return `${spanpart1}${spanpart2}${freqpart}${languageicon}${namepart}${endspanpart}${messagepart}`;
		}
	}
}

module.exports.components = {SpeechEmitter, SpeechHearer};
