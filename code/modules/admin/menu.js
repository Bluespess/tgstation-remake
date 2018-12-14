'use strict';
const {Panel} = require('bluespess');
let admin_tools = {};

class AdminPanel extends Panel {
	constructor(client) {
		super(client, {width:500, height:800, title:"Admin Tools", can_close: true});
		this.on("message", this.message_handler.bind(this));
		this.on("open", this.opened.bind(this));
		this.on("close", this.closed.bind(this));
	}

	message_handler(msg) {
		if(msg.button_tool && msg.button) {
			let tool = admin_tools[msg.button_tool];
			if(tool && this.client.holder && this.client.holder.has_permission(tool.perm_required)) {
				let func = tool.buttons[msg.button];
				if(func) func(this.client);
			}
		}
	}
	opened() {
		this.client.holder.admin_menu = this;
		let tools = {};
		for(let [key, tool] of Object.entries(admin_tools)) {
			if(!this.client.holder || !this.client.holder.has_permission(tool.perm_required))
				continue;
			tools[key] = {name: tool.name, desc: tool.desc, buttons: Object.keys(tool.buttons)};
		}
		this.send_message({tools: tools});
	}
	closed() {
		this.client.holder.admin_menu = null;
	}
}

importModule(require('./spawn_object.js'));
importModule(require('./unsorted_tools.js'));

function importModule(mod) {
	if(mod.admin_tools) {
		for(let [key, tool] of Object.entries(mod.admin_tools)) {
			if(admin_tools[key])
				console.warn(`Admin tool ${key} already exists!`);
			admin_tools[key] = tool;
		}
	}
}

module.exports.now = (server) => {
	server.on("client_login", (client) => {
		client.on("keydown", (e) => {
			if(!e)
				return;
			if(e.which == 115) {
				if(client.holder && !client.holder.admin_menu) {
					let menu = new AdminPanel(client);
					menu.open();
				}
			}
		});
	});
};
