'use strict';

class ReagentBinding {
	constructor(panel, elem, props) {
		Object.assign(this, {
			path: "beaker"
		}, props);
		this.elem = elem;
		this.message_handler = this.message_handler.bind(this);
		this.panel = panel;
		this.reagent_elems = {};
		this.panel.on("message", this.message_handler);
		for(let e of this.elem.querySelectorAll('.has-container')) {
			e.style.display = 'none';
		}
		for(let e of this.elem.querySelectorAll('.has-no-container')) {
			e.style.display = 'visible';
		}
	}

	message_handler(obj) {
		for(let split of this.path.split(".")) {
			if(!obj || !obj.hasOwnProperty(split))
				return;
			obj = obj[split];
		}
		if(!obj) {
			for(let e of this.elem.querySelectorAll('.has-container')) {
				e.style.display = 'none';
			}
			for(let e of this.elem.querySelectorAll('.has-no-container')) {
				e.style.display = null;
			}
			for(let e of Object.values(this.reagent_elems)) {
				if(!e)
					continue;
				this.elem.querySelector('.reagents-list').removeChild(e);
			}
			this.reagent_elems = {};
		} else {
			for(let e of this.elem.querySelectorAll('.has-container')) {
				e.style.display = null;
			}
			for(let e of this.elem.querySelectorAll('.has-no-container')) {
				e.style.display = 'none';
			}

			if(obj.temperature != null) {
				[...this.elem.querySelectorAll('.temperature')].forEach((item) => {item.textContent = +obj.temperature.toFixed(1);});
			}
			if(obj.holder_name != null) {
				[...this.elem.querySelectorAll('.holder-name')].forEach((item) => {item.textContent = obj.holder_name;});
			}
			if(obj.total_volume != null) {
				[...this.elem.querySelectorAll('.total-volume')].forEach((item) => {item.textContent = obj.total_volume;});
			}
			if(obj.maximum_volume != null) {
				[...this.elem.querySelectorAll('.maximum-volume')].forEach((item) => {item.textContent = obj.maximum_volume;});
			}

			if(obj.reagents) {
				let reagents_list = this.elem.querySelector('.reagents-list');
				for(let [key, robj] of Object.entries(obj.reagents)) {
					if(!robj) {
						if(this.reagent_elems[key]) {
							reagents_list.removeChild(this.reagent_elems[key]);
							delete this.reagent_elems[key];
						}
						continue;
					}
					let elem = this.reagent_elems[key];
					if(!elem) {
						elem = this.build_entry(key, robj);
						reagents_list.appendChild(elem);
						this.reagent_elems[key] = elem;
					}
					this.update_entry(key, robj, elem);
				}
			}
		}
	}

	build_entry(/*id, obj*/) {
		let elem = document.createElement("div");
		elem.classList.add("zebrastripe");
		elem.style.padding = "2px 0px";
		return elem;
	}
	update_entry(id, obj, elem) {
		elem.textContent = `${+obj.volume.toFixed(2)} unit${obj.volume == 1 ? "" : "s"} of ${obj.name}`;
	}

	close() {
		for(let e of this.elem.querySelectorAll('.has-container')) {
			e.style.display = 'none';
		}
		for(let e of this.elem.querySelectorAll('.has-no-container')) {
			e.style.display = 'visible';
		}
		this.panel.removeListener("message", this.message_handler);
	}
}

module.exports = ReagentBinding;
