'use strict';
const atmos_defines = require('../../../defines/atmos_defines.js');

var metas = {};

class GasMeta {
	constructor({id = "", specific_heat = 0, name = "", gas_overlay = "", moles_visible = 0, dangerous = false}) {
		this.id = id;
		this.specific_heat = specific_heat;
		this.name = name;
		this.gas_overlay = gas_overlay;
		this.moles_visible = moles_visible;
		this.dangerous = dangerous;
	}
}

addMeta(new GasMeta({
	id: "o2",
	specific_heat: 20,
	name: "Oxygen"
}));

addMeta(new GasMeta({
	id: "n2",
	specific_heat: 20,
	name: "Nitrogen"
}));

addMeta(new GasMeta({
	id: "co2",
	specific_heat: 30,
	name: "Carbon Dioxide"
}));

addMeta(new GasMeta({
	id: "plasma",
	specific_heat: 200,
	name: "Plasma",
	gas_overlay: "plasma",
	moles_visible: atmos_defines.MOLES_PLASMA_VISIBLE,
	dangerous: true
}));

addMeta(new GasMeta({
	id: "water_vapor",
	specific_heat: 40,
	name: "Water Vapor",
	gas_overlay: "water_vapor",
	moles_visible: atmos_defines.MOLES_PLASMA_VISIBLE
}));

addMeta(new GasMeta({
	id: "freon",
	specific_heat: 2000,
	name: "Freon",
	gas_overlay: "freon",
	moles_visible: atmos_defines.MOLES_PLASMA_VISIBLE,
	dangerous: true
}));

addMeta(new GasMeta({
	id: "n2o",
	specific_heat: 40,
	name: "Nitrous Oxide",
	gas_overlay: "nitrous_oxide",
	moles_visible: atmos_defines.MOLES_PLASMA_VISIBLE,
	dangerous: true
}));

addMeta(new GasMeta({
	id: "agent_b",
	specific_heat: 300,
	name: "Oxygen Agent B"
}));

addMeta(new GasMeta({
	id: "v_fuel",
	specific_heat: 30,
	name: "Volatile Fuel"
}));

addMeta(new GasMeta({
	id: "bz",
	specific_heat: 20,
	name: "BZ",
	dangerous: true
}));

function addMeta(meta) {
	metas[meta.id] = meta;
}

module.exports = metas;