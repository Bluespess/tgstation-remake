'use strict';
const {Component, chain_func} = require('bluespess');

const _amount = Symbol('_amount');

class Stack extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.on("amount_changed", this.amount_chaged.bind(this));
		this.a.attack_hand = chain_func(this.a.attack_hand, this.attack_hand.bind(this));
	}

	get amount() {
		return this[_amount];
	}
	set amount(val) {
		if(this[_amount] == val)
			return;
		this[_amount] = val;
		this.emit("amount_changed");
	}

	amount_changed() {
		if(this.amount == 0) {
			this.a.destroy();
		}

		if(!this.novariants) {
			var base_state = this.a.template.vars.icon_state;
			if(this.amount <= (this.max_amount * (1/3)))
				this.a.icon_state = base_state;
			else if(this.amount <= (this.max_amount * (2/3)))
				this.a.icon_state = `${base_state}_2`;
			else
				this.a.icon_state = `${base_state}_3`;
		}

		var base_w_class = this.a.template.vars.w_class;
		if(this.amount <= (this.max_amount * (1/3)))
			this.a.c.Item.w_class = Math.max(base_w_class - 2, 1);
		else if(this.amount <= (this.max_amount * (2/3)))
			this.a.c.Item.w_class = Math.max(base_w_class - 1, 1);
		else
			this.a.c.Item.w_class = base_w_class;
	}

	use(used) {
		if(this.amount < used)
			return false;
		this.amount -= used;
		return true;
	}

	merge(S) { // merge into S, as much as possible
		if(!this.a.server.has_component(S, "Stack") || S.destroyed || this.a.destroyed || S == this.a)
			return;
		var transfer = Math.min(this.amount, S.c.Stack.max_amount - S.c.Stack.amount);
		this.use(transfer);
		S.amount += transfer;
		return transfer;
	}
}

Stack.template = {
	vars: {
		icon: 'icons/obj/stack_objects.png',
		components: {
			"Stack": {
				amount: 1,
				max_amount: 50,
				merge_type: null,
				novariants: true,
				singular_name: null
			}
		}
	}
};

Stack.depends = ["Item"];
Stack.loadBefore = ["Item"];
