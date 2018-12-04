'use strict';
const {Panel, Atom, has_component, to_chat} = require('bluespess');
const _has_received_templates = Symbol('_has_received_templates');

class SpawnObjectPanel extends Panel {
	constructor(client) {
		super(client, {width:400, height:600, title:"Spawn Object", can_close: true});
		this.on("message", this.message_handler.bind(this));
		this.on("open", this.opened.bind(this));
	}
	message_handler(msg) {
		if(msg.spawn) {
			let obj = new Atom(this.client.server, msg.spawn);
			let mob = this.client.mob;
			if(!mob) {
				to_chat`<span class='warning'>You have no mob!</span>`(this.client);
				return;
			}
			if(has_component(obj, "Item") && has_component(mob, "MobInventory")) {
				mob.c.MobInventory.put_in_hands(obj);
			}
			if(!obj.loc)
				obj.loc = mob.fine_loc;
		}
	}
	opened() {
		if(!this.client[_has_received_templates]) {
			this.client[_has_received_templates] = true;
			for(let template of Object.values(this.client.server.templates)) {
				this.client.server.process_template(template);
			}
			this.send_message({templates: this.client.server.templates});
		}
	}
}

module.exports = SpawnObjectPanel;
