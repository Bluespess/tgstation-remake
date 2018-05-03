'use strict';
const {Component} = require('bluespess');

class WearableItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

//TODO: Handle flags_inv
//TODO: Handle flags_cover
//TODO: Handle dog_fashion

WearableItem.template = {
	vars: {
		components: {
			"WearableItem": {
				put_on_delay: 2000,
				strip_delay: 4000,
				body_parts_covered: [],
				clothing_armor: {melee: 0, bullet: 0, laser: 0, energy: 0, bomb: 0, bio: 0, rad: 0, fire: 0, acid: 0},
				flags_inv: null,
				flags_cover: null,
				dog_fashion: null
			},
			"Item": {
				inhand_lhand_icon: 'icons/mob/inhands/clothing_lefthand.png',
				inhand_rhand_icon: 'icons/mob/inhands/clothing_righthand.png',
			}
		}
	}
};

WearableItem.depends = ["Item"];
WearableItem.loadBefore = ["Item"];

class BackItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

BackItem.template = {
	vars: {
		components: {
			"BackItem": {
				worn_icon: 'icons/mob/back.png',
				worn_icon_state: null // If null, inherits from inhand_icon_state
			}
		}
	}
};

BackItem.depends = ["WearableItem"];
BackItem.loadBefore = ["WearableItem"];

class BeltItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

BeltItem.template = {
	vars: {
		components: {
			"BeltItem": {
				worn_icon: 'icons/mob/belt.png',
				worn_icon_state: null // If null, inherits from inhand_icon_state
			}
		}
	}
};

BeltItem.depends = ["WearableItem"];
BeltItem.loadBefore = ["WearableItem"];

class EarItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

EarItem.template = {
	vars: {
		components: {
			"EarItem": {
				worn_icon: 'icons/mob/ears.png',
				worn_icon_state: null // If null, inherits from inhand_icon_state
			}
		}
	}
};

EarItem.depends = ["WearableItem"];
EarItem.loadBefore = ["WearableItem"];

class EyeItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

EyeItem.template = {
	vars: {
		components: {
			"EyeItem": {
				worn_icon: 'icons/mob/eyes.png',
				worn_icon_state: null // If null, inherits from inhand_icon_state
			}
		}
	}
};

EyeItem.depends = ["WearableItem"];
EyeItem.loadBefore = ["WearableItem"];

class HandItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

HandItem.template = {
	vars: {
		components: {
			"HandItem": {
				worn_icon: 'icons/mob/hands.png',
				worn_icon_state: null // If null, inherits from inhand_icon_state
			}
		}
	}
};

HandItem.depends = ["WearableItem"];
HandItem.loadBefore = ["WearableItem"];

class MaskItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

MaskItem.template = {
	vars: {
		components: {
			"MaskItem": {
				worn_icon: 'icons/mob/mask.png',
				worn_icon_state: null // If null, inherits from inhand_icon_state
			}
		}
	}
};

MaskItem.depends = ["WearableItem"];
MaskItem.loadBefore = ["WearableItem"];

class NeckItem extends Component {
	constructor(atom, template) {
		super(atom, template);
	}
}

NeckItem.template = {
	vars: {
		components: {
			"NeckItem": {
				worn_icon: 'icons/mob/neck.png',
				worn_icon_state: null // If null, inherits from inhand_icon_state
			}
		}
	}
};

NeckItem.depends = ["WearableItem"];
NeckItem.loadBefore = ["WearableItem"];

module.exports.components = {WearableItem, BackItem, BeltItem, EarItem, EyeItem, HandItem, MaskItem, NeckItem};
