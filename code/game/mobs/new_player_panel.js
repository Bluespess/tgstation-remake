'use strict';
const {Panel} = require('bluespess');

class NewPlayerPanel extends Panel {
	constructor(client) {
		super(client, {width:250, height:265, title:"New Player Options", can_close: false});
	}
}

module.exports = NewPlayerPanel;
