'use strict';

class NewPlayerPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.handle_message.bind(this));
		this.build_content();
	}

	handle_message(message) {
		if(message.latejoin != undefined) {
			this.panel.content_obj.getElementsByClassName("pregame")[0].style.display = message.latejoin ? "none" : "block";
			this.panel.content_obj.getElementsByClassName("latejoin")[0].style.display = message.latejoin ? "visible" : "none";
		}
	}

	build_content() {
		this.panel.header_obj.classList.add("center");
		this.panel.content_obj.classList.add("center");
		this.panel.content_obj.innerHTML = `
			<div class="vertical-margins"><div class='button' data-message='{"setup_character":true}'>Setup Character</div></div>
			<div class="pregame vertical-margins">
				<div class='button' data-radio-group='ready' data-radio-value='1'>Ready</div>
				<div class='button selected' data-radio-group='ready' data-radio-value='0'>Not Ready</div>
			</div>
			<div class="latejoin vertical-margins"><div class='button' data-message='{"latejoin":true}'>Join Game</div></div>
			<div class="vertical-margins"><div class='button' data-message='{"observe":true}'>Observe</div></div>
		`;
	}
}

module.exports.panel_classes = {NewPlayerPanel};
