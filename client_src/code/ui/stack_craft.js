'use strict';

class StackCraftPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.handle_message.bind(this));
	}

	handle_message(message) {
		if(message.recipes) {
			this.panel.content_obj.innerHTML = "";
			this.recipes = message.recipes;
		}
	}
}

module.exports.panel_classes = {StackCraftPanel};
