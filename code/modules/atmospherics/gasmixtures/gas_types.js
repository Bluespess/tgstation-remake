'use strict';
const atmos_defines = require('../../../defines/atmos_defines.js');

var metas = [];

class GasMeta {
	constructor({id = "", specific_heat = 0, name = "", gas_overlay = "", moles_visible = 0, dangerous = false, hardcoded = false}) {
		this.id = id;
		this.specific_heat = specific_heat;
		this.name = name;
		this.gas_overlay = gas_overlay;
		this.moles_visible = moles_visible;
		this.dangerous = dangerous;
		this.hardcoded = hardcoded;
		Object.freeze(this);
	}
}

addMeta(new GasMeta({
	id: "o2",
	specific_heat: 20,
	name: "Oxygen",
	hardcoded: true
}));

addMeta(new GasMeta({
	id: "n2",
	specific_heat: 20,
	name: "Nitrogen",
	hardcoded: true
}));

addMeta(new GasMeta({
	id: "co2",
	specific_heat: 30,
	name: "Carbon Dioxide",
	hardcoded: true
}));

addMeta(new GasMeta({
	id: "plasma",
	specific_heat: 200,
	name: "Plasma",
	hardcoded: true,
	gas_overlay: "plasma",
	moles_visible: atmos_defines.MOLES_GAS_VISIBLE,
	dangerous: true
}));

addMeta(new GasMeta({
	id: "water_vapor",
	specific_heat: 40,
	name: "Water Vapor",
	gas_overlay: "water_vapor",
	moles_visible: atmos_defines.MOLES_GAS_VISIBLE
}));

addMeta(new GasMeta({
	id: "nob",
	specific_heat: 2000,
	name: "Hyper-noblium",
	gas_overlay: "freon",
	moles_visible: atmos_defines.MOLES_GAS_VISIBLE,
	dangerous: true
}));

addMeta(new GasMeta({
	id: "n2o",
	specific_heat: 40,
	name: "Nitrous Oxide",
	gas_overlay: "nitrous_oxide",
	moles_visible: atmos_defines.MOLES_GAS_VISIBLE,
	dangerous: true
}));

addMeta(new GasMeta({
	id: "no2",
	specific_heat: 20,
	name: "Nitryl",
	gas_overlay: "nitryl",
	moles_visible: atmos_defines.MOLES_GAS_VISIBLE,
	dangerous: true
}));

addMeta(new GasMeta({
	id: "tritium",
	specific_heat: 10,
	name: "Tritium",
	gas_overlay: "tritium",
	moles_visible: atmos_defines.MOLES_GAS_VISIBLE,
	dangerous: true
}));

addMeta(new GasMeta({
	id: "bz",
	specific_heat: 20,
	name: "BZ",
	dangerous: true
}));

addMeta(new GasMeta({
	id: "stim",
	specific_heat: 5,
	name: "Stimulum"
}));

addMeta(new GasMeta({
	id: "pluox",
	specific_heat: 5,
	name: "Pluoxium"
}));

function addMeta(meta) {
	metas.push(meta);
}

module.exports = metas;
