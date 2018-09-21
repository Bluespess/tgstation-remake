'use strict';

const {Atom, dropdown} = require('bluespess-client');

class PreferencesPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.header_obj.classList.add("center");
		this.panel.content_obj.innerHTML = `
<div class='center'>
	<div class='button' data-radio-group='tab' data-tab='character'>Character Setup</div>
	<div class='button' data-radio-group='tab' data-tab='preferences'>Preferences</div>
</div>
<hr>
<div class='tabcontent' style='display: none' data-tab='character'>

<div class='status-display float-right' style='width:128px;height:128px;margin-left: 10px;padding:0px;position:relative'>
	<canvas class='preview-down' style='width:64px; position:absolute; top:0px;left:0px'></canvas>
	<canvas class='preview-right' style='width:64px; position:absolute; top:0px;right:0px'></canvas>
	<canvas class='preview-up' style='width:64px; position:absolute; bottom:0px;left:0px'></canvas>
	<canvas class='preview-left' style='width:64px; position:absolute; bottom:0px;right:0px'></canvas>
</div>
<div class='status-display'>
	<h2>Identity</h2>
	<div><div class='button property-be_random_name'>Always Random Name</div></div>
	<table>
	<tr>
		<td>Name:</td>
		<td><input type='text' class='button nopress nocenter property-name' maxlength=42></td>
		<td><div class='button yellow' data-message='{"randomize_name":"human"}'>Random</div></td>
	</tr>
	<tr>
		<td>Gender:</td>
		<td><div class='button property-gender dropdown'>Male</div></td>
	</tr>
	<tr>
		<td>Age:</td>
		<td><input class='button nopress nocenter property-age' type='number' min=17 max=85></td>
	</tr>
	</table>
</div>

<div class='status-display'>
	<h2>Body</h2>
	<div class='flex-horizontal wrap appearance-properties-container'>
		<div>
			<h3>Skin Tone</h3>
			<div><div class='button property-skin_tone dropdown'>caucasian2</div></div>
		</div>
		<div>
			<h3>Hair Style</h3>
			<div><div class='button property-hair dropdown'>Bald</div></div>
			<div><div class='button property-hair_color dropdown'>Color</div>
		</div>
	</div>
</div>

</div>
<div class='tabcontent' style='display: none' data-tab='preferences'>

Preferences

</div>`;
		[...this.panel.$$(`.button[data-radio-group="tab"]`)].forEach((item) => {
			item.addEventListener("click", () => {
				this.show_tab(item.dataset.tab);
			});
		});

		let name_field = this.panel.$(`.property-name`);
		name_field.addEventListener("input", () => {
			this.panel.send_message({char_prefs: {name: name_field.value}});
		});

		let gender_dropdown = this.panel.$(`.property-gender`);
		gender_dropdown.addEventListener("click", (e) => {
			if(e.defaultPrevented)
				return;
			let genders = {'male': "Male", 'female': "Female"};
			let menu = document.createElement('div');
			menu.classList.add("dropdown-content");
			for(let [id, name] of Object.entries(genders)) {
				let item = document.createElement('div');
				item.classList.add("button", "dropdown-item");
				if(id == this.char_prefs.gender) {
					item.classList.add("selected");
				}
				item.textContent = name;
				item.addEventListener("click", (e) => {
					this.panel.send_message({char_prefs: {gender: id}});
					e.preventDefault();
					this.char_prefs.gender = id;
					gender_dropdown.textContent = name;
					this.update_previews();
				});
				menu.appendChild(item);
			}
			dropdown(gender_dropdown, menu);
		});

		let hair_dropdown = this.panel.$(`.property-hair`);
		hair_dropdown.addEventListener("click", (e) => {
			if(e.defaultPrevented)
				return;
			let menu = document.createElement('div');
			menu.classList.add("dropdown-content");
			let sel_elem = null;
			for(let [id, obj] of Object.entries(this.sprite_accessories.hair)) {
				let item = document.createElement('div');
				item.classList.add("button", "dropdown-item");
				item.style.height = "64px";
				if(id == this.char_prefs.hair_style) {
					item.classList.add("selected");
					sel_elem = item;
				}
				let text = document.createElement('span');
				text.textContent = obj.name;
				let preview = this.create_preview({prefs_modifier: (prefs) => {
					prefs.hair_style = id;
				}});
				preview.style.float = "left";
				preview.style.height = "64px";
				item.appendChild(preview);
				item.appendChild(text);
				item.addEventListener("click", (e) => {
					this.panel.send_message({char_prefs: {hair_style: id}});
					e.preventDefault();
					this.char_prefs.hair_style = id;
					hair_dropdown.textContent = obj.name;
					this.update_previews();
				});
				menu.appendChild(item);
			}
			dropdown(hair_dropdown, menu);
			if(sel_elem)
				sel_elem.scrollIntoView({behavior: "instant"});
		});

		let skin_tone_dropdown = this.panel.$(`.property-skin_tone`);
		skin_tone_dropdown.addEventListener("click", (e) => {
			if(e.defaultPrevented)
				return;
			let menu = document.createElement('div');
			menu.classList.add("dropdown-content");
			let sel_elem = null;
			for(let id of Object.keys(this.skin_tones)) {
				let item = document.createElement('div');
				item.classList.add("button", "dropdown-item");
				item.style.height = "64px";
				if(id == this.char_prefs.skin_tone) {
					item.classList.add("selected");
					sel_elem = item;
				}
				let text = document.createElement('span');
				text.textContent = id;
				let preview = this.create_preview({prefs_modifier: (prefs) => {
					prefs.skin_tone = id;
				}});
				preview.style.float = "left";
				preview.style.height = "64px";
				item.appendChild(preview);
				item.appendChild(text);
				item.addEventListener("click", (e) => {
					this.panel.send_message({char_prefs: {skin_tone: id}});
					e.preventDefault();
					this.char_prefs.skin_tone = id;
					skin_tone_dropdown.textContent = id;
					this.update_previews();
				});
				menu.appendChild(item);
			}
			dropdown(skin_tone_dropdown, menu);
			if(sel_elem)
				sel_elem.scrollIntoView({behavior: "instant"});
		});

		let hair_color_dropdown = this.panel.$(`.property-hair_color`);
		hair_color_dropdown.addEventListener("click", (e) => {
			if(e.defaultPrevented)
				return;
			let menu = document.createElement('div');
			menu.classList.add('button', "dropdown-content");
			menu.style.height = "100px";
			let sliders = [];
			for(let i = 0; i < 3; i++) {
				let slider = document.createElement('input');
				sliders[i] = slider;
				slider.type = 'range';
				slider.classList.add('button', 'dropdown-item');
				slider.style.display = "block";
				slider.min = 0;
				slider.max = 255;
				slider.step = 1;
				slider.value = this.char_prefs.hair_color[i];
				slider.addEventListener("input", () => {
					this.char_prefs.hair_color = sliders.map(elem => {return +elem.value;});
					hair_color_dropdown.style.backgroundColor = `rgb(${this.char_prefs.hair_color.join(",")})`;
					this.update_previews();
				});
				slider.addEventListener("change", () => {
					this.panel.send_message({char_prefs: {hair_color: this.char_prefs.hair_color}});
				});
				menu.appendChild(slider);
			}
			dropdown(hair_color_dropdown, menu);
		});

		this.panel.$(`.property-age`).addEventListener("input", (e) => {
			let age = Math.round(+e.target.value);
			this.panel.send_message({char_prefs: {age}});
		});

		this.panel.on("message", this.handle_message.bind(this));

		this.char_prefs = {};
	}

	show_tab(tab) {
		[...this.panel.$$(`.tabcontent`)].forEach((item)=>{item.style.display = 'none';});
		let tab_obj = this.panel.$(`.tabcontent[data-tab='${tab}']`);
		if(tab_obj)
			tab_obj.style.display = 'block';
	}

	handle_message(msg) {
		if(msg.sprite_accessories) {
			this.sprite_accessories = msg.sprite_accessories;
		}
		if(msg.skin_tones) {
			this.skin_tones = msg.skin_tones;
		}
		if(msg.set_tab) {
			[...this.panel.$$(`.button[data-radio-group='tab']`)].forEach((item)=>{item.classList.remove("selected");});
			this.panel.$(`.button[data-radio-group='tab'][data-tab='${msg.set_tab}']`).classList.add("selected");
			this.show_tab(msg.set_tab);
		}
		if(msg.char_prefs) {
			Object.assign(this.char_prefs, msg.char_prefs);
			if(msg.char_prefs.name) {
				this.panel.$(`.property-name`).value = msg.char_prefs.name;
			}
			if(msg.char_prefs.gender) {
				this.panel.$(`.property-gender`).textContent = msg.char_prefs.gender == "male" ? "Male" : "Female";
			}
			if(msg.char_prefs.age) {
				this.panel.$(`.property-age`).value = msg.char_prefs.age;
			}

			if(msg.char_prefs.skin_tone) {
				this.panel.$(`.property-skin_tone`).textContent = msg.char_prefs.skin_tone;
			}
			if(msg.char_prefs.hair_color) {
				let hc = msg.char_prefs.hair_color;
				this.panel.$(`.property-hair_color`).style.backgroundColor = `rgb(${hc[0]},${hc[1]},${hc[2]})`;
			}
			if(msg.char_prefs.hair_style) {
				this.panel.$(`.property-hair`).textContent = this.sprite_accessories.hair[msg.char_prefs.hair_style].name;
			}
			this.update_previews();
		}
		if(msg.hasOwnProperty("name_valid")) {
			let elem = this.panel.$(`.property-name`);
			if(msg.name_valid)
				elem.classList.remove("red");
			else
				elem.classList.add("red");
		}
		if(msg.name_correction) {
			let elem = this.panel.$(`.property-name`);
			if(elem.value == msg.name_correction[0])
				elem.value = msg.name_correction[1];
		}
	}

	update_previews() {
		this.create_preview({canvas: this.panel.$(`.preview-down`), dir: 2});
		this.create_preview({canvas: this.panel.$(`.preview-right`), dir: 4});
		this.create_preview({canvas: this.panel.$(`.preview-up`), dir: 1});
		this.create_preview({canvas: this.panel.$(`.preview-left`), dir: 8});
	}

	create_preview({canvas, dir = 2, modifier = null, prefs_modifier = null, add_clothes = true} = {}) {
		let atom = new Atom(this.panel.manager.client, {dir});
		let prefs = JSON.parse(JSON.stringify(this.char_prefs));
		if(prefs_modifier)
			prefs_modifier(prefs);
		for(let part of ["l_arm","r_arm","l_leg","r_leg","chest","head"]) {
			let icon_state = `human_${part}`;
			if(part == "chest" || part == "head") {
				icon_state += (prefs.gender == "female") ? "_f" : "_m";
			}
			let color = null;
			if(this.skin_tones)
				color = this.skin_tones[prefs.skin_tone];
			atom.set_overlay(`limb_${part}`, {icon: 'icons/mob/human_parts_greyscale.png', icon_state, color});
		}
		let hair_style = this.sprite_accessories.hair[prefs.hair_style];
		if(hair_style) {
			let hc = this.char_prefs.hair_color || [255,255,255];
			atom.set_overlay("hair", {icon: hair_style.icon, icon_state: hair_style.icon_state, color: `rgb(${hc[0]},${hc[1]},${hc[2]})`, overlay_layer: 14});
		}
		if(add_clothes)
			atom.set_overlay(`uniform`, {icon: 'icons/mob/uniform.png', icon_state: "grey"});
		if(modifier)
			modifier(atom);
		if(!canvas)
			canvas = document.createElement('canvas');
		canvas.width = 32;
		canvas.height = 32;
		let ts = performance.now();
		atom.on_render_tick(ts);
		atom.fully_load().then(() => {
			ts = performance.now();
			atom.on_render_tick(ts);
			let ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			atom.draw(ctx, ts);
			atom.del();
		});
		return canvas;
	}
}

module.exports.panel_classes = {PreferencesPanel};
