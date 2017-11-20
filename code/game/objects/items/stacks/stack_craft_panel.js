'use strict';
const {Panel} = require('bluespess');

class StackCraftPanel extends Panel {
	constructor(client, panel_props) {
		super(client, panel_props);
		this.on("open", this.opened.bind(this));
		this.on("close", this.closed.bind(this));

		this.recipe_build_limit_changed = this.recipe_build_limit_changed.bind(this);
		this.amount_changed = this.amount_changed.bind(this);
	}

	recipe_build_limit_changed(e) {
		this.send_message({build_limit: {index: e.index, build_limit: e.recipe.build_limit}});
	}

	amount_changed() {
		this.send_message({amount: this.bound_atom.c.Stack.amount});
	}

	opened() {
		this.send_message({recipes: this.bound_atom.c.Stack.recipes, amount: this.bound_atom.c.Stack.amount});
		this.bound_atom.c.Stack.on("amount_changed", this.amount_changed);
		this.bound_atom.c.Stack.on("recipe_build_limit_changed", this.recipe_build_limit_changed);
	}

	closed() {
		this.bound_atom.c.Stack.removeListener("amount_changed", this.amount_changed);
		this.bound_atom.c.Stack.removeListener("recipe_build_limit_changed", this.recipe_build_limit_changed);
	}
}

module.exports = StackCraftPanel;
