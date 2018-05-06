'use strict';
const {Panel} = require('bluespess');
const LatejoinPanel = require('./latejoin_panel');
const PreferencesPanel = require('../../modules/client/preferences_panel.js');

class NewPlayerPanel extends Panel {
	constructor(client) {
		super(client, {width:200, height:300, title:"New Player Options", can_close: false});
		this.on("message", this.message_handler.bind(this));
		this.on("close", this.closed.bind(this));
		this.on("open", this.opened.bind(this));
	}

	opened() {
		this.send_message({"latejoin": true});
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
	}

	closed() {
		if(this.latejoin_panel)
			this.latejoin_panel.close();
	}
}

module.exports = NewPlayerPanel;
