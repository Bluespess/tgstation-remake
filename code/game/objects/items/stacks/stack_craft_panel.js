'use strict';
const {Panel} = require('bluespess');

class StackCraftPanel extends Panel {
	constructor(client, panel_props) {
		super(client, panel_props);
		this.on("open", () => {
			this.send_message({recipes: this.bound_atom.c.Stack.recipes});
		});
	}
}

module.exports = StackCraftPanel;
