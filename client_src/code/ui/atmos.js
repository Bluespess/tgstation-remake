'use strict';

class GasPumpPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.handle_message.bind(this));
		this.panel.content_obj.innerHTML = `
			<div class='button turned_on' data-toggle='turned_on'><span class='fa fa-power-off'></span></div>
			<input type="range" style='width:400px' min="0" max="1" step="0.0001" class='target_pressure'>
			<span class='target_pressure_display'>101.3</span> kPa
		`;
		this.panel.$('.target_pressure').addEventListener("input", () => {
			this.panel.$('.target_pressure_display').textContent = ((this.panel.$('.target_pressure').value ** 2) * 4500).toFixed(2);
		});
		this.panel.$('.target_pressure').addEventListener("change", () => {
			this.panel.send_message({target_pressure: (this.panel.$('.target_pressure').value ** 2) * 4500});
		});
	}

	handle_message(message) {
		if(message.turned_on != null) {
			if(message.turned_on)
				this.panel.$('.turned_on').classList.add("on");
			else
				this.panel.$('.turned_on').classList.remove("on");
		}
		if(message.target_pressure != null) {
			this.panel.$('.target_pressure').value = Math.sqrt(message.target_pressure / 4500);
			this.panel.$('.target_pressure_display').textContent = message.target_pressure.toFixed(2);
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
				<div class='button' data-radio-group='ready' data-radio-value='2'>Observe</div>
			</div>
			<div class="latejoin vertical-margins"><div class='button' data-message='{"latejoin":true}'>Join Game</div></div>
			<div class="latejoin vertical-margins"><div class='button' data-message='{"observe":true}'>Observe</div></div>
		`;
	}
}

module.exports.panel_classes = {GasPumpPanel};
