'use strict';

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
				this.beaker = Object.assign(this.beaker || {}, message.beaker);
				this.reagents_list_container.style.display = "block";
				this.nobeaker.style.display = "none";
			} else {
				this.beaker = null;
				this.reagents_list_container.style.display = "none";
				this.nobeaker.style.display = "block";
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
