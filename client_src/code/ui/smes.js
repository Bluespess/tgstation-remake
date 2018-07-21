'use strict';

class SmesPanel {
	constructor(panel) {
		this.panel = panel;

		this.panel.content_obj.innerHTML = `
<div class='status-display'>
	<h1>Stored Energy</h1>
	<div class='bar bar-stored-energy'>
		<div class='bar-fill' style='transition: width 1s linear'></div>
	</div>
</div>
<div class='status-display'>
	<h1>Input</h1>
	<div>
		<div class='button' data-toggle='input_attempt'><span class='fa fa-power-off'></span></div>
		<input type='number' class='button input-level' min=0 max=200000>
		<span class='input-status'></span>
	</div>
	<div class='bar bar-inputting'>
		<div class='bar-fill' style='opacity: 0.5'></div>
		<div class='bar-fill' style='transition: width 1s linear'></div>
	</div>
</div>
<div class='status-display'>
	<h1>Output</h1>
	<div>
		<div class='button' data-toggle='output_attempt'><span class='fa fa-power-off'></span></div>
		<input type='number' class='button output-level' min=0 max=200000>
		<span class='output-status'></span>
	</div>
	<div class='bar bar-outputting'>
		<div class='bar-fill' style='opacity: 0.5'></div>
		<div class='bar-fill' style='transition: width 1s linear'></div>
	</div>
</div>
`;
		this.panel.on("message", this.handle_message.bind(this));
		this.panel.$('.input-level').addEventListener('input', (e) => {
			this.panel.send_message({input_level: e.target.value});
		});
		this.panel.$('.output-level').addEventListener('input', (e) => {
			this.panel.send_message({output_level: e.target.value});
		});
	}

	handle_message(msg) {
		console.log(msg);
		if(msg.capacity != null || msg.charge != null) {
			if(msg.capacity != null)
				this.capacity = msg.capacity;
			if(msg.charge != null)
				this.charge = msg.charge;
			let bar_elem = this.panel.$('.bar-stored-energy');
			if(msg.charge_display) bar_elem.dataset.barLabel = msg.charge_display;
			let charge_percent = this.charge / this.capacity * 100;
			bar_elem.querySelector('.bar-fill').style.width = `${charge_percent}%`;
			if(charge_percent > 50)
				bar_elem.dataset.statusColor = "good";
			else if(charge_percent > 15)
				bar_elem.dataset.statusColor = "average";
			else
				bar_elem.dataset.statusColor = "bad";
		}
		if(msg.outputting != null || msg.charge != null) {
			if(msg.outputting != null)
				this.outputting = msg.outputting;
			let elem = this.panel.$('.output-status');
			if(this.outputting) {
				elem.dataset.statusColor = "good";
				elem.textContent = "Sending";
			} else if(this.charge > 0) {
				elem.dataset.statusColor = "average";
				elem.textContent = "Not Sending";
			} else {
				elem.dataset.statusColor = "bad";
				elem.textContent = "No Charge";
			}
			this.panel.$('.bar-outputting').dataset.statusColor = this.outputting ? 'good' : 'bad';
		}
		if(msg.output_attempt != null) {
			let elem = this.panel.$(`.button[data-toggle="output_attempt"]`);
			if(msg.output_attempt) elem.classList.add("on");
			else elem.classList.remove("on");
		}
		if(msg.output_level != null || msg.output_level_max != null || msg.output_used != null) {
			if(msg.output_level != null)
				this.output_level = msg.output_level[1];
			if(msg.output_level_max != null)
				this.output_level_max = msg.output_level_max;
			if(msg.output_used != null)
				this.output_used = msg.output_used;
			if(msg.output_level_display != null)
				this.output_level_display = msg.output_level_display;
			if(msg.output_used_display != null)
				this.output_used_display = msg.output_used_display;

			let bar_elem = this.panel.$('.bar-outputting');
			let fills = bar_elem.querySelectorAll('.bar-fill');

			fills[0].style.width = `${this.output_level * 100 / this.output_level_max}%`;
			fills[1].style.width = `${this.output_used * 100 / this.output_level_max}%`;
			bar_elem.dataset.barLabel = `${this.output_used_display} / ${this.output_level_display}`;
		}
		if(msg.inputting != null || msg.charge != null || msg.capacity != null) {
			if(msg.inputting != null)
				this.inputting = msg.inputting;
			let elem = this.panel.$('.input-status');
			if((this.charge / this.capacity) > .99) {
				elem.dataset.statusColor = "good";
				elem.textContent = "Fully Charged";
			} else if(this.inputting) {
				elem.dataset.statusColor = "average";
				elem.textContent = "Charging";
			} else {
				elem.dataset.statusColor = "bad";
				elem.textContent = "Not Charging";
			}
			this.panel.$('.bar-inputting').dataset.statusColor = this.inputting ? 'good' : 'bad';
		}
		if(msg.input_attempt != null) {
			let elem = this.panel.$(`.button[data-toggle="input_attempt"]`);
			if(msg.input_attempt) elem.classList.add("on");
			else elem.classList.remove("on");
		}
		if(msg.input_level != null || msg.input_level_max != null || msg.input_available != null) {
			if(msg.input_level != null)
				this.input_level = msg.input_level[1];
			if(msg.input_level_max != null)
				this.input_level_max = msg.input_level_max;
			if(msg.input_available != null)
				this.input_available = msg.input_available;
			if(msg.input_level_display != null)
				this.input_level_display = msg.input_level_display;
			if(msg.input_available_display != null)
				this.input_available_display = msg.input_available_display;

			let bar_elem = this.panel.$('.bar-inputting');
			let fills = bar_elem.querySelectorAll('.bar-fill');

			fills[0].style.width = `${this.input_level * 100 / this.input_level_max}%`;
			fills[1].style.width = `${this.input_available * 100 / this.input_level_max}%`;
			bar_elem.dataset.barLabel = `${this.input_available_display} / ${this.input_level_display}`;
		}

		if(msg.input_level_max) {
			this.panel.$(`.input-level`).max = msg.input_level_max;
		}
		if(msg.output_level_max) {
			this.panel.$(`.output-level`).max = msg.output_level_max;
		}
		if(msg.input_level) {
			let elem = this.panel.$(`.input-level`);
			if(!elem.value || (+elem.value || 0) == msg.input_level[0])
				elem.value = msg.input_level[1];
		}
		if(msg.output_level) {
			let elem = this.panel.$(`.output-level`);
			if(!elem.value || (+elem.value || 0) == msg.output_level[0])
				elem.value = msg.output_level[1];
		}
	}
}

module.exports.panel_classes = {SmesPanel};
