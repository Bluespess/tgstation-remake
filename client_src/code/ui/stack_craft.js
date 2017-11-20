'use strict';

class StackCraftPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.on("message", this.handle_message.bind(this));

		var amount_elem = document.createElement('div');
		amount_elem.appendChild(document.createTextNode('amount: '));
		amount_elem.appendChild(this.amount_node = document.createTextNode(''));
		this.panel.content_obj.appendChild(amount_elem);
		this.recipes_elem = document.createElement('div');
		this.panel.content_obj.appendChild(this.recipes_elem);
	}

	handle_message(message) {
		if(message.recipes) {
			this.recipes = message.recipes;
			this.build_recipes();
		}
		if(message.amount) {
			this.amount_node.textContent = message.amount;
		}
		if(message.build_limit) {
			this.recipes[message.build_limit.index].build_limit = message.build_limit.build_limit;
			this.build_recipe(message.build_limit.index);
		}
	}

	build_recipes() {
		this.recipes_elem.innerHTML = "";
		for(let i = 0; i < this.recipes.length; i++) {
			let recipe = this.recipes[i];
			if(recipe == null) {
				this.recipes_elem.appendChild(document.createElement('hr'));
				continue;
			}
			let recipe_elem = document.createElement('div');
			recipe_elem.classList.add('small-vertical-margins');
			this.recipes_elem.appendChild(recipe_elem);
			this.build_recipe(i);
		}
	}
	build_recipe(i) {
		let elem = this.recipes_elem.childNodes[i];
		elem.innerHTML = "";
		let recipe = this.recipes[i];

		let main_button_elem = document.createElement('div');
		main_button_elem.innerText = `${recipe.res_amount && recipe.res_amount > 1 ? `${recipe.res_amount}x ` : ""}${recipe.name} (costs ${recipe.cost})`;
		main_button_elem.classList.add('button');
		if(recipe.build_limit <= 0)
			main_button_elem.classList.add('disabled');
		main_button_elem.dataset.message = JSON.stringify({build: i, amount: 1});
		elem.appendChild(main_button_elem);
	}
}

module.exports.panel_classes = {StackCraftPanel};
