'use strict';
class AdminPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.message_handler.bind(this));

		this.panel.content_obj.innerHTML = `
<input type="text" placeholder="Search..." class="button search-field">
<div class='tools-list'>
</div>
`;
		this.panel.$('.search-field').addEventListener("input", (e) => {
			let term = e.target.value;
			for(let item of this.panel.$$('.tool-entry')) {
				if(item.dataset.searchString.includes(term))
					item.style.display = "block";
				else
					item.style.display = "none";
			}
		});
	}

	message_handler(msg) {
		if(msg.tools) {
			this.tools = msg.tools;
			this.populate_tools();
		}
	}

	populate_tools() {
		for(let [key, val] of Object.entries(this.tools).sort((a,b) => {return a[1].name > b[1].name ? 1 : (a[1].name == b[1].name ? 0 : -1);})) {
			let template_elem = document.createElement('div');
			template_elem.classList.add('tool-entry');
			template_elem.style.borderBottom = "1px solid grey";
			template_elem.innerHTML = `
<div style='font-weight:bold'>${val.name}</div>
<div><i>${val.desc || ""}</i></div>
<div class='buttons'></div>
`;
			template_elem.dataset.searchString = key + val.name;
			this.panel.$('.tools-list').appendChild(template_elem);
			let buttons_list = template_elem.querySelector('.buttons');
			for(let button of val.buttons) {
				let elem = document.createElement('div');
				elem.classList.add("button");
				elem.textContent = button;
				elem.dataset.message = JSON.stringify({button_tool: key, button});
				buttons_list.appendChild(elem);
			}
		}
	}
}

module.exports.panel_classes = {AdminPanel};
