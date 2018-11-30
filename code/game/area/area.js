'use strict';
const {Component, has_component} = require('bluespess');
const layers = require('../../defines/layers.js');

const _areas = Symbol('_areas');
const _area = Symbol('_area');
const _area_brushes = Symbol('_area_brushes');

class Area extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.area_brushes = new Set();
		this.touching = new Set();
		this.a.once("map_instanced", (map) => {
			if(!this.map_id)
				return;
			map[_areas] = map[_areas] || {};
			map[_areas][this.map_id] = this.a;
		});
	}
}

Area.template = {
	vars: {
		components: {
			"Area": {
				brush_icon: 'icons/turf/areas.png',
				brush_icon_state: "unknown",
				map_id: null
			}
		},
		name: "Area",
		icon: 'icons/turf/areas.png',
		icon_state: "origin_marker",
		visible: false,
		layer: layers.BELOW_AREA_LAYER
	}
};

Area.update_map_instance = function(instobj) {
	let id = instobj.computed_vars.components.Area.map_id;
	if(!id)
		return;
	instobj.map[_areas] = instobj.map[_areas] || {};
	instobj.map[_areas][id] = instobj;
	if(!instobj.map[_area_brushes] || !instobj.map[_area_brushes][id])
		return;
	for(let brush of instobj.map[_area_brushes][id]) {
		brush.client_atom.icon = instobj.computed_vars.components.Area.brush_icon;
		brush.client_atom.icon_state = instobj.computed_vars.components.Area.brush_icon_state;
	}
};

class AreaBrush extends Component {
	constructor(atom, template) {
		super(atom, template);
		this[_area] = null;
		this.a.once("map_instance_done", (map) => {
			if(!this.map_id)
				return;
			map[_areas] = map[_areas] || {};
			let area = map[_areas][this.map_id];
			if(area) {
				this.assign_area(area);
			} else {
				throw new Error(`Cannot find area of id ${this.map_id}`);
			}
		});
		this.a.on("crossed", this.crossed.bind(this));
		this.a.on("crossed_by", this.crossed.bind(this));
		this.a.on("uncrossed", this.uncrossed.bind(this));
		this.a.on("uncrossed_by", this.uncrossed.bind(this));
	}

	crossed(atom) {
		if(!this.area)
			return;
		if(!this.area.c.Area.touching.has(atom)) {
			this.area.c.Area.touching.add(atom);
			this.area.c.Area.emit("start_touch", atom);
			atom.emit("start_touch_area", this.area);
		}
	}

	uncrossed(atom) {
		if(!this.area)
			return;
		for(let brush of atom.crosses()) {
			if(has_component(brush, "AreaBrush") && brush.c.AreaBrush.area == this.area)
				return;
		}
		this.area.c.Area.touching.delete(atom);
		this.area.c.Area.emit("end_touch", atom);
		atom.emit("end_touch_area", this.area);
	}

	assign_area(area) {
		if(this.area)
			throw new Error(`This brush already has an area associated with it!`);
		this[_area] = area;
		area.c.Area.area_brushes.add(this.a);
		for(let atom of this.a.crosses())
			this.crossed(atom);
	}

	get area() {
		return this[_area];
	}

	destroy() {
		super.destroy();
		if(this.area)
			this.area.area_brushes.delete(this.a);
	}
}

AreaBrush.template = {
	vars: {
		components: {
			"AreaBrush": {
				map_id: null
			}
		},
		icon: 'icons/turf/areas.png',
		icon_state: "unknown",
		visible: false,
		layer: layers.BELOW_AREA_LAYER
	}
};

AreaBrush.update_map_instance = function(instobj) {
	let id = instobj.computed_vars.components.AreaBrush.map_id;
	if(!id)
		return;
	instobj.map[_area_brushes] = instobj.map[_area_brushes] || {};
	instobj.map[_area_brushes][id] = instobj.map[_area_brushes][id] || new Set();
	instobj.map[_area_brushes][id].add(instobj);
	let area = instobj.map[_areas] && instobj.map[_areas][id];
	if(area) {
		instobj.client_atom.icon = area.computed_vars.components.Area.brush_icon;
		instobj.client_atom.icon_state = area.computed_vars.components.Area.brush_icon_state;
	}
};

module.exports.templates = {
	"area": {
		components: ["Area", "AreaAmbience", "AreaPower"],
		tree_paths: ["areas"]
	},
	"area_maintenance": {
		components: ["Area", "AreaAmbience", "AreaPower"],
		vars: {
			components: {
				"AreaAmbience": {
					ambient_sounds: [
						'sound/ambience/ambimaint1.ogg',
						'sound/ambience/ambimaint2.ogg',
						'sound/ambience/ambimaint3.ogg',
						'sound/ambience/ambimaint4.ogg',
						'sound/ambience/ambimaint5.ogg',
						'sound/voice/lowHiss2.ogg', //Xeno Breathing Hisses, Hahahaha I'm not even sorry.
						'sound/voice/lowHiss3.ogg',
						'sound/voice/lowHiss4.ogg'
					]
				}
			}
		},
		tree_paths: ["areas/maintenance"]
	},
	"area_chapel": {
		components: ["Area", "AreaAmbience", "AreaPower"],
		vars: {
			components: {
				"AreaAmbience": {
					ambient_sounds: ['sound/ambience/ambicha1.ogg','sound/ambience/ambicha2.ogg','sound/ambience/ambicha3.ogg','sound/ambience/ambicha4.ogg']
				}
			}
		},
		tree_paths: ["areas/chapel"]
	},
	"area_engine": {
		components: ["Area", "AreaAmbience", "AreaPower"],
		vars: {
			components: {
				"AreaAmbience": {
					ambient_sounds: ['sound/ambience/ambisin1.ogg','sound/ambience/ambisin2.ogg','sound/ambience/ambisin3.ogg','sound/ambience/ambisin4.ogg']
				}
			}
		},
		tree_paths: ["areas/engine"]
	},
	"area_morgue": {
		components: ["Area", "AreaAmbience", "AreaPower"],
		vars: {
			components: {
				"AreaAmbience": {
					ambient_sounds: ['sound/ambience/ambimo1.ogg','sound/ambience/ambimo2.ogg']
				}
			}
		},
		tree_paths: ["areas/engine"]
	},
	"area_detective": {
		components: ["Area", "AreaAmbience", "AreaPower"],
		vars: {
			components: {
				"AreaAmbience": {
					ambient_sounds: ['sound/ambience/ambidet1.ogg','sound/ambience/ambidet2.ogg']
				}
			}
		},
		tree_paths: ["areas/engine"]
	},
	"area_arrivals": {
		components: ["Area", "AreaAmbience", "AreaArrivals", "AreaPower"],
		vars: {
			components: {
				"AreaPower": {
					infinite_power: true
				}
			}
		},
		tree_paths: ["areas/shuttle/arrivals"]
	},
	"area_brush": {
		components: ["AreaBrush"],
		tree_paths: ["areas/brush"]
	}
};

module.exports.components = {Area, AreaBrush};
module.exports.symbols = {_areas};
