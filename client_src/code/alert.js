'use strict';
const {Component} = require('bluespess-client');

class Tooltip extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.a.on("mouseover", this.mouseover.bind(this));
		this.a.on("mouseout", this.mouseout.bind(this));
		this.a.on("mousemove", this.mousemove.bind(this));
		this.alert_div = document.createElement("div");
		this.alert_div.classList.add("tooltip");
		this.alert_div.classList.add(this.theme || "midnight");
		this.alert_div.innerHTML = `<div class="content"><h1 class="title"></h1><p class="desc"></p></div>`;
		this.title_elem = this.alert_div.querySelector('.title');
		this.desc_elem = this.alert_div.querySelector('.desc');
	}

	mouseover(e) {
		this.title_elem.textContent = this.a.name;
		this.desc_elem.textContent = this.desc;
		let elem = document.createElement("div");
		elem.classList.add("dropdown", "tooltip-wrapper");
		elem.appendChild(this.alert_div);
		document.body.appendChild(elem);
		this.mousemove(e);
	}

	mouseout() {
		if(this.alert_div.parentNode && this.alert_div.parentNode.parentNode)
			this.alert_div.parentNode.parentNode.removeChild(this.alert_div.parentNode);
		if(this.alert_div.parentNode)
			this.alert_div.parentNode.removeChild(this.alert_div);
	}

	mousemove(e) {
		if(this.alert_div.parentNode) {
			this.alert_div.parentNode.style.left = e.original_event.clientX + "px";
			this.alert_div.parentNode.style.top = e.original_event.clientY + "px";
		}
	}
}

module.exports.components = {Tooltip};
