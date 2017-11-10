'use strict';
const {Component, Atom, chain_func} = require('bluespess');

const _amount = Symbol('_amount');

class Stack extends Component {
	constructor(atom, template) {
		super(atom, template);
		this.on("amount_changed", this.amount_changed.bind(this));
		this.a.on("crossed_by", this.crossed_by.bind(this));
		this.a.c.Examine.examine = chain_func(this.a.c.Examine.examine, this.examine.bind(this));
		this.a.attack_by = chain_func(this.a.attack_by, this.attack_by.bind(this));
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
		if(this.amount <= 0) {
			this.a.destroy();
		}

		if(this.amount == 1)
			this.a.gender = "neutral";
		else
			this.a.gender = "plural";

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
		S.c.Stack.amount += transfer;
		return transfer;
	}

	examine(prev, user) {
		prev();
		this.a.server.to_chat`There ${this.amount == 1 ? "is" : "are"} ${this.amount} ${this.singular_name || ""}s in the stack.`(user);
	}

	attack_by(prev, item, user) {
		if(this.merge_type && this.a.server.has_component(item, this.merge_type)) {
			if(this.merge(item))
				this.a.server.to_chat`<span class='notice'>Your ${item.name} stack now contains ${item.c.Stack.amount} ${item.c.Stack.singular_name}s.</span>`(user);
		} else {
			return prev();
		}
	}

	attack_hand(prev, user) {
		let slot = this.a.c.Item.slot;
		if(slot && slot.mob == user && slot.props.is_hand_slot && user.c.MobInventory.active_hand != slot) {
			return this.split(user, 1);
		} else {
			prev();
		}
	}

	split(user, amount) {
		if(amount <= 0)
			return;
		if(amount >= this.amount) {
			if(this.a.server.has_component(user, "MobInventory"))
				user.c.MobInventory.put_in_hands(this.a);
			return this.a;
		}
		var new_stack = new Atom(this.a.server, this.a.template);
		new_stack.c.Stack.amount = amount;
		this.use(amount, true);
		if(this.a.server.has_component(user, "MobInventory")) {
			user.c.MobInventory.put_in_hands(new_stack);
		}
		// TODO evidence
	}

	crossed_by(target) {
		if(this.merge_type && this.a.server.has_component(target, this.merge_type) && !target.c.Tangible.throwing) {
			process.nextTick(() => this.merge(target));
		}
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

module.exports.components = {Stack};
