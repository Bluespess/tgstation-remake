'use strict';

const {Component, Sound, Atom, to_chat} = require('bluespess');
const NewPlayerPanel = require('./new_player_panel.js');
const _ = require('underscore');
const CharacterPreferences = require('../../modules/client/character.js');

class NewPlayer extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.c.Mob.on('client_changed', this.client_changed.bind(this));

		this.splash_screen = new Atom(this.a.server, {
			components: ["SplashScreen"],
			vars: {
				screen_loc_x: 0,
				screen_loc_y: 0,
				icon: this.a.server.config.title_screen,
				icon_state: "",
				layer: 30
			}
		});
		this.a.c.Eye.screen.splash_screen = this.splash_screen;
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

	destroy() {
		this.splash_screen.destroy();
	}
}
NewPlayer.depends = ['Mob'];
NewPlayer.loadBefore = ['Mob'];

class SplashScreen extends Component.Networked {}

module.exports.components = {NewPlayer, SplashScreen};
module.exports.now = function(server) {
	server.lobby_music = _.sample([
		"sound/ambience/title1.ogg",
		"sound/ambience/title2.ogg",
		"sound/ambience/title3.ogg",
		"sound/ambience/clown.ogg"
	]);
};
