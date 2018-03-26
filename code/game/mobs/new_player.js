'use strict';

const {Component, Sound, to_chat} = require('bluespess');
const NewPlayerPanel = require('./new_player_panel.js');

class NewPlayer extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Mob.on('client_changed', this.client_changed.bind(this));
	}

	client_changed(old_client, new_client) {
		if(old_client) {
			this.new_player_panel.close();
			this.lobby_music_sound.stop();
			this.a.destroy();
			return;
		}
		if(new_client) {
			to_chat(this.a, `<div class="motd"><h1>Welcome to Bluespess, a Space Station 13 remake!</h1><b>An ss13 remake so good, it just as laggy as the original!</b><br><i>This is still extremely unfinished.</i></div>`);

			this.new_player_panel = new NewPlayerPanel(new_client);
			this.new_player_panel.open();

			this.lobby_music_sound = new Sound(this.a.server, {path: this.a.server.lobby_music, volume: 0.85});
			this.lobby_music_sound.play_to(new_client);
		}
	}
}
NewPlayer.depends = ['Mob'];
NewPlayer.loadBefore = ['Mob'];

module.exports.components = {NewPlayer};
module.exports.now = function(server) {
	let options = [
		"sound/ambience/title1.ogg",
		"sound/ambience/title2.ogg",
		"sound/ambience/title3.ogg",
		"sound/ambience/clown.ogg"
	];
	server.lobby_music = options[Math.floor(Math.random() * options.length)];
};
