'use strict';

class NewPlayerPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.handle_message.bind(this));
		this.build_content();
	}

	handle_message() {

	}

	build_content() {
		this.panel.content_obj.innerHTML = `
			<div><div class='button'>Setup Character</div></div>
		`;
	}
}

module.exports.panel_classes = {NewPlayerPanel};
