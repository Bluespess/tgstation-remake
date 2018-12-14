'use strict';

const {Component, Sound, to_chat} = require('bluespess');
const NewPlayerPanel = require('./new_player_panel.js');
const _ = require('underscore');
const CharacterPreferences = require('../../modules/client/character.js');

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
			this.a.server.ticker.total_players--;
			return;
		}
		if(new_client) {
			this.a.server.ticker.total_players++;
			to_chat(this.a, this.a.server.config.motd);

			this.new_player_panel = new NewPlayerPanel(new_client);
			this.new_player_panel.open();

			this.lobby_music_sound = new Sound(this.a.server, {path: this.a.server.lobby_music, volume: 0.85});
			this.lobby_music_sound.play_to(new_client);

			if(!new_client.character_preferences)
				new_client.character_preferences = new CharacterPreferences();
		}
	}
}
NewPlayer.depends = ['Mob'];
NewPlayer.loadBefore = ['Mob'];

module.exports.components = {NewPlayer};
module.exports.now = function(server) {
	server.lobby_music = _.sample([
		"sound/ambience/title1.ogg",
		"sound/ambience/title2.ogg",
		"sound/ambience/title3.ogg",
		"sound/ambience/clown.ogg"
	]);
};
