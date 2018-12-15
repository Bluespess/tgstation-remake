'use strict';
const {Atom} = require('bluespess-client');

class StripPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.handle_message.bind(this));
		this.panel.content_obj.innerHTML = `
			<table class='item-table'></table>
		`;
		this.covered = {};
		this.cached_appearances = {};
	}

	handle_message(msg) {
		console.log(msg);
		if(msg.layout) {
			let table = this.panel.$('.item-table');
			let i = 0;
			for(let slotkey of msg.layout) {
				let name = msg.layout_names[i];
				i++;
				let tr = document.createElement('tr');
				table.appendChild(tr);
				if(slotkey == null) {
					tr.innerHTML = `<td colspan=3>&nbsp;</td>`;
					continue;
				}
				tr.dataset.slot = slotkey;
				tr.innerHTML = `
<td>${name}</td>
<td>
	<div class='button strip-button'>
		<canvas style='display:none;height:16px;float:left' width=32 height=32 class='item-appearance'></canvas>
		<span class='item-name'>Empty</span>
	</div>
</td>
<td><div class='button internals-button' style='display:none' data-message="${JSON.stringify({slot_internals: slotkey})}">Disable Internals</div></td>
				`;
				tr.querySelector('.strip-button').dataset.message = JSON.stringify({slot: slotkey});
			}
		}
		if(msg.covered) {
			for(let [slot, val] of Object.entries(msg.covered)) {
				if(!this.panel.$(`tr[data-slot=${slot}]`))
					continue;
				this.covered[slot] = val;
				let item_name_elem = this.panel.$(`tr[data-slot=${slot}] .item-name`);
				let strip_button_elem = this.panel.$(`tr[data-slot=${slot}] .strip-button`);
				if(val) {
					item_name_elem.textContent = "Obscured";
					strip_button_elem.classList.add("disabled");
					strip_button_elem.style.color = "inherit";
				} else {
					strip_button_elem.classList.remove("disabled");
				}
			}
		}
		if(msg.item_names) {
			for(let [slot, newname] of Object.entries(msg.item_names)) {
				if(!this.panel.$(`tr[data-slot=${slot}]`))
					continue;
				if(!this.covered[slot]) {
					this.panel.$(`tr[data-slot=${slot}] .item-name`).textContent = newname || "Empty";
					if(newname)
						this.panel.$(`tr[data-slot=${slot}] .strip-button`).style.color = "inherit";
					else
						this.panel.$(`tr[data-slot=${slot}] .strip-button`).style.color = "grey";
				}
			}
		}
		if(msg.item_appearances) {
			for(let [slot, newappearance] of Object.entries(msg.item_appearances)) {
				if(!this.panel.$(`tr[data-slot=${slot}]`))
					continue;
				let canvas = this.panel.$(`tr[data-slot=${slot}] .item-appearance`);
				let do_clear = !this.cached_appearances[slot];
				this.cached_appearances[slot] = newappearance;
				if(newappearance) {
					canvas.style.display = "inline-block";
					let ctx = canvas.getContext('2d');
					let a = new Atom(this.panel.manager.client, newappearance); // quick and dirty
					if(do_clear)
						ctx.clearRect(0, 0, 32, 32);
					a.on_render_tick(0);
					a.fully_load().then(() => {
						if(newappearance == this.cached_appearances[slot]) {
							ctx.clearRect(0, 0, 32, 32);
							a.on_render_tick(0);
							a.draw(ctx, 0);
						}
						a.del();
					});
				} else {
					canvas.style.display = "none";
				}
			}
		}
	}
}

module.exports.panel_classes = {StripPanel};
