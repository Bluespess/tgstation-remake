'use strict';

class ChemDispenserPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.handle_message.bind(this));

		this.dispense_list = document.createElement('div');
		this.dispense_list.classList.add("status-display");
		this.panel.content_obj.appendChild(this.dispense_list);

		this.beaker_status = document.createElement('div');
		this.beaker_status.classList.add("status-display");
		this.panel.content_obj.appendChild(this.beaker_status);

		this.reagents_list_container = document.createElement('div');
		this.reagents_list_container.style.display = "none";
		this.beaker_status.appendChild(this.reagents_list_container);

		this.eject_button = document.createElement('div');
		this.eject_button.classList.add("button", "float-right");
		this.eject_button.innerText = "Eject";
		this.eject_button.dataset.message = JSON.stringify({eject: true});
		this.reagents_list_container.appendChild(this.eject_button);

		this.nobeaker = document.createElement('div');
		this.nobeaker.innerText = "No container loaded";
		this.beaker_status.appendChild(this.nobeaker);

		this.reagent_elems = {};
		this.reagents_list = document.createElement('div');
		this.reagents_list_container.appendChild(this.reagents_list);

		/*var amount_elem = document.createElement('div');
		amount_elem.appendChild(document.createTextNode('amount: '));
		amount_elem.appendChild(this.amount_node = document.createTextNode(''));
		this.panel.content_obj.appendChild(amount_elem);
		this.recipes_elem = document.createElement('div');
		this.panel.content_obj.appendChild(this.recipes_elem);*/
	}

	handle_message(message) {
		if(message.dispensable_reagents) {
			this.dispense_list.innerHTML = "";
			for(let reagent of message.dispensable_reagents) {
				let button = document.createElement("div");
				button.classList.add("button");
				button.style.width = "125px";
				button.style.margin = "2px 0px";
				button.innerText = reagent;
				button.dataset.message = JSON.stringify({dispense: reagent});
				this.dispense_list.appendChild(button);
			}
		}
		if(message.reagents) {
			for(let [reagent, amt] of Object.entries(message.reagents)) {
				if(amt <= 0) {
					if(this.reagent_elems[reagent])
						this.reagents_list.removeChild(this.reagent_elems[reagent]);
					delete this.reagent_elems[reagent];
				} else {
					let elem = this.reagent_elems[reagent];
					if(!elem) {
						elem = document.createElement('div');
						elem.classList.add("zebrastripe");
						elem.style.padding = "2px 0px";
						this.reagent_elems[reagent] = elem;
						this.reagents_list.appendChild(elem);
					}
					elem.textContent = `${+amt.toFixed(2)} units of ${reagent}`;
				}
			}
		}
		if(message.beaker !== undefined) {
			if(message.beaker) {
				this.reagents_list_container.style.display = "block";
				this.nobeaker.style.display = "none";
			} else {
				this.reagents_list_container.style.display = "none";
				this.nobeaker.style.display = "block";
			}
		}
	}
}

module.exports.panel_classes = {ChemDispenserPanel};
