'use strict';

const {dropdown} = require('bluespess-client');

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

<img class='float-right' width=100 height=100 style='margin: 10px'>
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
	<div class='flex-horizontal wrap appearance-properties-container'></div>
</div>

</div>
<div class='tabcontent' style='display: none' data-tab='preferences'>

Preferences

</div>`;
		[...this.panel.content_obj.querySelectorAll(`.button[data-radio-group="tab"]`)].forEach((item) => {
			item.addEventListener("click", () => {
				this.show_tab(item.dataset.tab);
			});
		});

		let name_field = this.panel.content_obj.querySelector(`.property-name`);
		name_field.addEventListener("input", () => {
			this.panel.send_message({char_prefs: {name: name_field.value}});
		});

		let gender_dropdown = this.panel.content_obj.querySelector(`.property-gender`);
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
				});
				menu.appendChild(item);
			}
			dropdown(gender_dropdown, menu);
		});

		this.panel.content_obj.querySelector(`.property-age`).addEventListener("input", (e) => {
			let age = Math.round(+e.target.value);
			this.panel.send_message({char_prefs: {age}});
		});

		this.panel.on("message", this.handle_message.bind(this));

		this.char_prefs = {};
	}

	show_tab(tab) {
		[...this.panel.content_obj.querySelectorAll(`.tabcontent`)].forEach((item)=>{item.style.display = 'none';});
		let tab_obj = this.panel.content_obj.querySelector(`.tabcontent[data-tab='${tab}']`);
		if(tab_obj)
			tab_obj.style.display = 'block';
	}

	handle_message(msg) {
		if(msg.set_tab) {
			[...this.panel.content_obj.querySelectorAll(`.button[data-radio-group='tab']`)].forEach((item)=>{item.classList.remove("selected");});
			this.panel.content_obj.querySelector(`.button[data-radio-group='tab'][data-tab='${msg.set_tab}']`).classList.add("selected");
			this.show_tab(msg.set_tab);
		}
		if(msg.char_prefs) {
			Object.assign(this.char_prefs, msg.char_prefs);
			if(msg.char_prefs.name) {
				this.panel.content_obj.querySelector(`.property-name`).value = msg.char_prefs.name;
			}
			if(msg.char_prefs.gender) {
				this.panel.content_obj.querySelector(`.property-gender`).textContent = msg.char_prefs.gender == "male" ? "Male" : "Female";
			}
			if(msg.char_prefs.age) {
				this.panel.content_obj.querySelector(`.property-age`).value = msg.char_prefs.age;
			}
		}
		if(msg.hasOwnProperty("name_valid")) {
			let elem = this.panel.content_obj.querySelector(`.property-name`);
			if(msg.name_valid)
				elem.classList.remove("red");
			else
				elem.classList.add("red");
		}
		if(msg.name_correction) {
			let elem = this.panel.content_obj.querySelector(`.property-name`);
			if(elem.value == msg.name_correction[0])
				elem.value = msg.name_correction[1];
		}
	}
}

module.exports.panel_classes = {PreferencesPanel};
