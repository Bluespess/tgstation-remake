'use strict';
const {Component, Sound, make_watched_property, to_chat, audible_message, chain_func, has_component, sleep} = require('bluespess');
const combat_defines = require('../../../defines/combat_defines.js');

class Airlock extends Component {
	constructor(atom, template) {
		super(atom, template);

		if(this.a.c.Door.glass)
			this.airlock_material = "glass";

		if(this.airlock_material) {
			this.a.overlays.airlock_filling = {icon: this.overlays_file, icon_state: `${this.airlock_material}_[parent]`};
		} else {
			this.a.overlays.airlock_filling = {icon_state: "fill_[parent]"};
		}
		this.update_panel_overlay();
		this.update_welded_overlay();
		this.update_lights_overlay();

		this.a.c.Door.deny = this.deny.bind(this);
		this.a.c.Door.open = this.open.bind(this);
		this.a.c.Door.close = this.close.bind(this);

		this.a.c.Door.on("locked", this.locked.bind(this));
		this.a.c.Door.on("unlocked", this.unlocked.bind(this));

		this.a.c.MachineWires.on("cut", this.wire_cut.bind(this));
		this.a.c.MachineWires.on("mend", this.wire_mended.bind(this));
		this.a.c.MachineWires.on("pulse", this.wire_pulsed.bind(this));

		this.a.c.Emaggable.emag_act = chain_func(this.a.c.Emaggable.emag_act, this.emag_act.bind(this));
		this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
		this.on("panel_open_changed", ()=>{this.update_panel_overlay();});

		make_watched_property(this, "panel_open", "boolean");
	}

	update_panel_overlay() {
		if(this.panel_open) {
			this.a.overlays.airlock_panel = {icon: this.overlays_file, icon_state: "panel_[parent]"};
		} else {
			this.a.overlays.airlock_panel = null;
		}
	}

	update_welded_overlay() {
		if(this.a.c.Door.welded) {
			this.a.overlays.airlock_weld = {icon: this.overlays_file, icon_state: "welded"};
		} else {
			this.a.overlays.airlock_weld = null;
		}
	}

	update_lights_overlay() {
		this.a.overlays.airlock_emergency_lights = this.a.c.Door.emergency ? {icon: this.overlays_file, icon_state: "lights_emergency_[parent]"} : null;
		this.a.overlays.airlock_lights = this.a.c.Door.locked ? {icon: this.overlays_file, icon_state: "lights_bolts_[parent]"} : {icon: this.overlays_file, icon_state: "lights_[parent]"};
	}

	deny() {
		this.a.flick = {overlays: {airlock_lights: {icon_state: "lights_denied"}}};
		new Sound(this.a.server, {path: this.deny_sound, volume: 0.5}).emit_from(this.a);
	}

	async open(forced = 0) {
		if(this.a.c.Door.operating || this.a.c.Door.welded || this.a.c.Door.locked)
			return false;
		if(this.a.density < 1)
			return true;
		if(forced < 2) {
			//use_power(50)
			new Sound(this.a.server, {path: this.open_sound, vary: true, volume: 0.3}).emit_from(this.a);
		} else {
			new Sound(this.a.server, {path: 'sound/machines/airlockforced.ogg', vary: true, volume: 0.3}).emit_from(this.a);
		}

		if(this.a.c.Door.autoclose)
			setTimeout(() => {
				this.a.c.Door.close();
			}, this.a.c.Door.autoclose_delay);
		this.a.c.Door.operating = true;
		this.a.flick = {icon_state: this.a.c.Door.opening_state};
		this.a.icon_state = this.a.c.Door.open_state;
		if(!this.air_tight)
			this.a.c.BlocksAir.is_blocking = false;
		await sleep(100);
		this.a.opacity = false;
		await sleep(400);
		this.a.density = 0;
		this.a.c.BlocksAir.is_blocking = false;
		await sleep(100);
		this.a.layer = this.a.c.Door.open_layer;
		this.a.c.Door.operating = false;
		if(this.delayed_close_requested) {
			this.delayed_close_requested = false;
			setTimeout(() => {
				this.a.c.Door.close();
			}, 100);
		}
		this.a.c.Door.emit("opened");
		return true;
	}

	async close(forced = 0) {
		if(this.a.c.Door.operating || this.a.c.Door.welded || this.a.c.Door.locked)
			return false;
		if(this.a.density > 0)
			return true;
		if(!forced)
			if(!this.has_power())
				return;
		if(this.a.c.Door.safe)
			for(let atom of this.a.crosses()) {
				if(atom.density) {
					setTimeout(() => {
						this.a.c.Door.close();
					}, 6000);
					return;
				}
			}
		if(forced < 2) {
			// emag check
			//use_power(50)
			new Sound(this.a.server, {path: this.close_sound, vary: true, volume: 0.3}).emit_from(this.a);
		} else {
			new Sound(this.a.server, {path: 'sound/machines/airlockforced.ogg', vary: true, volume: 0.3}).emit_from(this.a);
		}

		for(var obj of this.a.crosses()) {
			if(has_component(obj, "Window")) {
				obj.a.c.Tangible.ex_act(combat_defines.EXPLODE_HEAVY); //Smashin windows
			}
		}

		this.a.c.Door.operating = true;
		this.a.flick = {icon_state: this.a.c.Door.closing_state};
		this.a.icon_state = this.a.c.Door.closed_state;
		this.a.layer = this.a.c.Door.closed_layer;
		if(this.air_tight) {
			this.a.density = 1;
			this.a.c.BlocksAir.is_blocking = true;
		}
		await sleep(100);
		this.a.density = 1;
		this.a.c.BlocksAir.is_blocking = true;
		await sleep(400);
		if(!this.a.c.Door.safe) {
			this.a.c.Door.crush();
		}
		if(!this.a.c.Door.glass)
			this.a.opacity = true;
		await sleep(100);
		this.a.c.Door.operating = false;
		this.delayed_close_requested = false;
		if(this.a.c.Door.safe)
			for(let atom of this.a.crosses()) {
				if(has_component(atom, "LivingMob")) {
					setTimeout(() => {this.a.c.Door.open();}, 100);
					break;
				}
			}
		this.a.c.Door.emit("closed");
		return true;
	}

	emag_act(prev) {
		if(!this.a.c.Door.operating && this.a.density && this.has_power() && !this.a.c.Emaggable.emagged) {
			this.a.c.Door.operating = true;
			this.a.flick = {overlays: {airlock_lights: {icon_state: "sparks"}}};
			(async () => {
				await sleep(600);
				if(this.a.destroyed)
					return;
				this.a.c.Door.operating = false;
				await this.open();
				prev();
				this.lights = false;
				this.a.c.Door.locked = true;
			})().catch(err => {
				console.error(err);
			});
		}
	}

	has_power() {
		return !this.seconds_main_power_lost || !this.seconds_backup_power_lost;
	}

	locked() {
		if(this.a.c.Emaggable.emagged)
			return;
		new Sound(this.a.server, {path: this.bolt_sound, volume: 0.3}).emit_from(this.a);
		this.update_lights_overlay();
	}

	unlocked() {
		if(this.a.c.Emaggable.emagged)
			return;
		new Sound(this.a.server, {path: this.unbolt_sound, volume: 0.3}).emit_from(this.a);
		this.update_lights_overlay();
	}

	attack_hand(prev, user) {
		if(this.panel_open) {
			this.a.c.MachineWires.show_ui(user);
			return true;
		}
		return prev();
	}
	attack_by(prev, item, user) {
		if(has_component(item, "Tool") && item.c.Tool.can_use("Screwdriver", user)) {
			this.panel_open = !this.panel_open;
			to_chat`<span class='notice'>You ${this.panel_open ? "open":"close"} the maintenance panel of the airlock.</span>`(user);
			item.c.Tool.used("Screwdriver");
			return true;
		}
		if(this.a.c.MachineWires.is_wire_tool(item)) {
			this.a.attack_hand(user);
			return true;
		}
		return prev();
	}

	wire_cut(/*wire*/) {

	}
	wire_mended(/*wire*/) {

	}
	wire_pulsed(wire) {
		if(wire.type == "bolts") {
			this.a.c.Door.locked = !this.a.c.Door.locked;
			audible_message`<span class='italics'>You hear a click from the bottom of the door.</span>`.range(1).emit_from(this.a);
		}
	}
}

Airlock.one_per_tile = true;

Airlock.template = {
	vars: {
		components: {
			"SmoothGroup": {
				groups: ["titanium_wall"]
			},
			"Door": {
				open_state: "open",
				closed_state: "closed",
				opening_state: "opening",
				closing_state: "closing",
				autoclose: true
			},
			"MachineWires": {
				wire_types: {
					"power1": "Main Power 1",
					"power2": "Main Power 2",
					"backup1": "Auxiliary Power 1",
					"backup2": "Auxiliary Power 2",
					"open": "Open",
					"bolts": "Bolts",
					"idscan": "ID Scan",
					"ai": "AI Connection",
					"shock": "High Voltage Ground",
					"safety": "Safety",
					"timing": "Timing",
					"light": "Bolt Lights",
					"zap1": "High Voltage Circuit 1",
					"zap2": "High Voltage Circuit 2",
					"dud1": null,
					"dud2": null
				},
				wire_group: "airlock"
			},
			"Airlock": {
				security_level: 0, //How much are wires secured
				ai_control_disabled: 0, //If 1, AI control is disabled until the AI hacks back in and disables the lock. If 2, the AI has bypassed the lock. If -1, the control is enabled but the AI had bypassed it earlier, so if it is disabled again the AI would have no trouble getting back in.
				hack_proof: false, // if true, this door can't be hacked by the AI
				lights: true, // bolt lights show by default
				normalspeed: true,

				open_sound: 'sound/machines/airlock.ogg',
				close_sound: 'sound/machines/airlockclose.ogg',
				deny_sound: 'sound/machines/deniedbeep.ogg',
				bolt_sound: 'sound/machines/boltsdown.ogg',
				unbolt_sound: 'sound/machines/boltsup.ogg',
				nopower_sound: 'sound/machines/doorclick.ogg',

				airlock_material: null,
				overlays_file: 'icons/obj/doors/airlocks/station/overlays.png',
				note_overlays_file: 'icons/obj/doors/airlocks/station/overlays.png', // Used for papers and photos pinned to the airlock

				air_tight: false // true means density will be set as soon as the door begins to close
			}
		},
		icon: 'icons/obj/doors/airlocks/station/public.png',
		icon_state: "closed"
	}
};

Airlock.depends = ["Door", "Emaggable", "MachineWires", "SmoothGroup"];
Airlock.loadBefore = ["Door", "Emaggable", "MachineWires"];

Airlock.update_map_instance = function(instobj) {
	let airlock_material = instobj.computed_vars.components.Airlock.airlock_material;
	if(instobj.computed_vars.components.Door.glass)
		airlock_material = "glass";

	if(airlock_material) {
		instobj.client_atom.set_overlay("airlock_filling", {icon: instobj.computed_vars.components.Airlock.overlays_file, icon_state: `${airlock_material}_[parent]`});
	} else {
		instobj.client_atom.set_overlay("airlock_filling", {icon_state: "fill_[parent]"});
	}
};

module.exports.templates = {
	"airlock": {
		components: ["Airlock"],
		tree_paths: ["basic_structures/airlock"]
	},
};

module.exports.components = {Airlock};
