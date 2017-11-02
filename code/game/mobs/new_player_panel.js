'use strict';
const {Panel} = require('bluespess');

class NewPlayerPanel extends Panel {
	constructor(client) {
		super(client, {width:200, height:300, title:"New Player Options", can_close: false});
	}

	open() {
		super.open();
		this.send_message({"latejoin": false});
	}
}

module.exports = NewPlayerPanel;
