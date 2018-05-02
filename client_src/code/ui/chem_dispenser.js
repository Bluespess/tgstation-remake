'use strict';
const ReagentBinding = require('./components/reagent_binding.js');

class ChemDispenserPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.handle_message.bind(this));

		this.dispense_list_container = document.createElement('div');
		this.dispense_list_container.classList.add("status-display");
		this.panel.content_obj.appendChild(this.dispense_list_container);

		this.dispense_amounts = document.createElement('div');
		this.dispense_list_container.appendChild(this.dispense_amounts);

		this.dispense_list = document.createElement('div');
		this.dispense_list_container.appendChild(this.dispense_list);

		this.reagents_list_container = document.createElement('div');
		this.reagents_list_container.classList.add("status-display");
		this.reagents_list_container.innerHTML = `
<div class='has-no-container' style='color:red'>No container loaded</div>
<div class='has-container'>
	<div class='button float-right' data-message='{"eject": true}'>Eject</div>
	<div class='float-right'><span class='total-volume'></span> / <span class='maximum-volume'></span></div>
	<div class='reagents-list'></div>
</div>
`;
		this.panel.content_obj.appendChild(this.reagents_list_container);
		this.reagent_binding = new ReagentBinding(this.panel, this.reagents_list_container);

		for(let amt of [1, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 300]) {
			let button = document.createElement('div');
			button.classList.add("button");
			button.dataset.radioGroup = "dispense_amount";
			button.dataset.radioValue = amt;
			button.innerText = amt;
			this.dispense_amounts.appendChild(button);
		}
	}

	handle_message(message) {
		if(message.dispensable_reagents) {
			this.dispense_list.innerHTML = "";
			message.dispensable_reagents.sort();
			for(let [reagent, name] of message.dispensable_reagents) {
				let button = document.createElement("div");
				button.classList.add("button");
				button.style.width = "125px";
				button.style.margin = "2px 0px";
				button.innerText = name;
				button.dataset.message = JSON.stringify({dispense: reagent});
				this.dispense_list.appendChild(button);
			}
		}
		if(message.dispense_amount) {
			if(message.dispense_amount != this.dispense_amount) {
				this.dispense_amount = message.dispense_amount;
				for(let child of this.dispense_amounts.childNodes) {
					if(child.dataset.radioValue == this.dispense_amount)
						child.classList.add("selected");
					else
						child.classList.remove("selected");
				}
			}
		}
	}
}

module.exports.panel_classes = {ChemDispenserPanel};
