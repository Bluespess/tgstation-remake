'use strict';
const ReagentBinding = require('./components/reagent_binding.js');

class ChemHeaterPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.handle_message.bind(this));

		this.panel.content_obj.innerHTML = `
<div>
	<div class='button' data-toggle="enabled"><span class='fa fa-power-off'></span></div>
	<input type='number' class='button target-temperature' min=0 max=1000>
	<div class='status-display beaker-contents'>
		<div class='has-no-container' style='color:red'>No container loaded</div>
		<div class='has-container'>
			<div class='button float-right' data-message='{"eject": true}'>Eject</div>
			<div>Temperature: <span class='temperature'></span> K</div>
			<div class='float-right'><span class='total-volume'></span> / <span class='maximum-volume'></span></div>
			<div class='reagents-list'></div>
		</div>
	</div>
</div>`;
		this.panel.content_obj.querySelector(`.target-temperature`).addEventListener("change", (e) => {
			this.panel.send_message({target_temperature: e.target.value});
		});
		this.panel.content_obj.querySelector(`.target-temperature`).addEventListener("input", (e) => {
			e.target.classList.add("yellow");
		});
		this.reagent_binding = new ReagentBinding(this.panel, this.panel.content_obj.querySelector('.beaker-contents'));

	}

	handle_message(message) {
		if(message.target_temperature) {
			let elem = this.panel.content_obj.querySelector(`.target-temperature`);
			elem.value = message.target_temperature;
			elem.classList.remove("yellow");
		}
		else if(message.enabled != null) {
			let elem = this.panel.content_obj.querySelector(`.button[data-toggle="enabled"]`);
			if(message.enabled) elem.classList.add("on");
			else elem.classList.remove("on");
		}
	}
}

module.exports.panel_classes = {ChemHeaterPanel};
