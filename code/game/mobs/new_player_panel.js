'use strict';
const {Atom, Panel, to_chat} = require('bluespess');
const LatejoinPanel = require('./latejoin_panel');
const PreferencesPanel = require('../../modules/client/preferences_panel.js');

class NewPlayerPanel extends Panel {
	constructor(client) {
		super(client, {width:200, height:300, title:"New Player Options", can_close: false});
		this.on("message", this.message_handler.bind(this));
		this.on("close", this.closed.bind(this));
		this.on("open", this.opened.bind(this));
		this.game_state_changed = this.game_state_changed.bind(this);
		this.start_at_changed = this.start_at_changed.bind(this);
		this.ready = false;
	}

	opened() {
		this.send_message({"latejoin": this.client.server.ticker.game_state != "pregame", "start_at": this.client.server.ticker.start_at});
		this.client.server.ticker.on("game_state_changed", this.game_state_changed);
		this.client.server.ticker.on("start_at_changed", this.start_at_changed);
	}

	message_handler(msg) {
		if(msg.latejoin) {
			if(!this.latejoin_panel) {
				let panel = new LatejoinPanel(this.client);
				this.latejoin_panel = panel;
				panel.on("close", () => {
					this.latejoin_panel = null;
				});
				panel.open();
			}
		}
		if(msg.setup_character) {
			PreferencesPanel.open_for(this.client);
		}
		if(msg.observe) {
			if(this.client.server.ticker.busy) {
				// we don't want someone to ghost while the game is assigning roles to people. That would be *very* bad.
				to_chat`<span class='warning'>The server is busy, please wait</span>`(this.client);
			} else {
				let ghost = new Atom(this.client.server, {components: ["Ghost"]});
				ghost.force_move(0, 0, 0, this.client.server.station_dim); // toss them in the center of the station area.
				ghost.c.Mob.client = this.client;
			}
		}
		if(msg.ready != null) {
			this.ready = msg.ready;
		}
	}

	closed() {
		if(this.latejoin_panel)
			this.latejoin_panel.close();
		this.client.server.ticker.removeListener("game_state_changed", this.game_state_changed);
		this.client.server.ticker.removeListener("start_at_changed", this.start_at_changed);
	}

	game_state_changed(from, to) {
		this.send_message({"latejoin": to != "pregame"});
		if(to == "playing" && this.latejoin_panel)
			this.latejoin_panel.close();
	}
	start_at_changed(from, to) {
		this.send_message({"start_at": to});
	}
}

module.exports = NewPlayerPanel;
