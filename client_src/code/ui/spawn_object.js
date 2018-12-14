'use strict';
const {Atom} = require('bluespess-client');
class SpawnObjectPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.message_handler.bind(this));
		if(this.panel.manager.client.server_templates) {
			this.templates = this.panel.manager.client.server_templates;
			this.populate_templates();
		}

		this.panel.content_obj.innerHTML = `
<input type="text" placeholder="Search..." class="button search-field">
<div class='templates-list'>
</div>
`;
		this.panel.$('.search-field').addEventListener("input", (e) => {
			let term = e.target.value;
			for(let item of this.panel.$$('.template-entry')) {
				if(item.dataset.searchString.includes(term))
					item.style.display = "block";
				else
					item.style.display = "none";
			}
		});
		this.panel.content_obj.addEventListener("click", (e) => {
			let button = e.target.closest(".spawn-button");
			if(button) {
				let template_name = button.closest(".template-entry").dataset.templateKey;
				this.panel.send_message({spawn: template_name});
			}
		});
	}

	message_handler(msg) {
		if(msg.templates) {
			this.templates = msg.templates;
			this.panel.manager.client.server_templates = msg.templates;
			this.populate_templates();
		}
	}

	populate_templates() {
		for(let [key, val] of Object.entries(this.templates).sort((a,b) => {return a[0] > b[0] ? 1 : (a[0] == b[0] ? 0 : -1);})) {
			let template_elem = document.createElement('div');
			template_elem.classList.add('template-entry');
			template_elem.style.borderBottom = "1px solid grey";
			template_elem.innerHTML = `
<canvas class='item-preview float-left' width=32 height=32></canvas>
<div class='button spawn-button float-right' dataset-template>Spawn</div>
<div><b>${val.vars.name}</b></div>
<div>
	<i>${key}</i>
</div>
`;
			template_elem.dataset.templateKey = key;
			template_elem.dataset.searchString = key + val.vars.name;
			this.panel.$('.templates-list').appendChild(template_elem);
			let preview = template_elem.querySelector('.item-preview');

			setTimeout(() => {
				// alright we need to build some images
				let instobj = Object.assign({}, val.vars);
				instobj.components = (val.components || []).filter((i) => {return this.panel.manager.client.components[i];});
				instobj.component_vars = val.vars.components;

				let a = new Atom(this.panel.manager.client, instobj); // quick and dirty
				a.on_render_tick(0);
				a.fully_load().then(() => {
					a.on_render_tick(0);
					a.draw(preview.getContext('2d'), 0);
					a.del();
				});
			}, 1);
		}
	}
}

module.exports.panel_classes = {SpawnObjectPanel};
