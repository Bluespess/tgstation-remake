'use strict';

const {Component} = require('bluespess');
const _access_expression = Symbol('_access_expression');
const _access_function = Symbol('_access_function');

class RequiresAccess extends Component {
	constructor(atom, template) {
		super(atom, template);
	}

	get access_expression() {
		return this[_access_expression];
	}
	set access_expression(val) {
		this[_access_expression] = ""+val;
		this.build_access_function();
	}

	build_access_function() {
		var expression = "";
		var re = /(?:[()]|\|\||&&|==|!=|!|true|false|([a-z_]+))/ig;
		var match;
		do {
			match = re.exec(this.access_expression);
			if(match) {
				if(match[1]) {
					expression += `access_checker("${match[1]}")`;
				} else {
					expression += match[0];
				}
			}
		} while(match);
		this[_access_function] = new Function("access_checker", `return ${expression};`);
	}

	can_access(target) {
		var access_checker;
		if(this.a.server.has_component(target, "HasAccess"))
			access_checker = target.c.HasAccess.has_access.bind(target.c.HasAccess);
		else
			access_checker = (() => false); // no access at all! But we still want to let people in if the thing doesn't actually need any access
		return this[_access_function](access_checker);
	}
}

RequiresAccess.template = {
	vars: {
		components: {
			"RequiresAccess": {
				access_expression: "true"
			}
		}
	}
};

class HasAccess extends Component {
	constructor(atom, template) {
		super(atom, template);
	}

	has_access() { // implement it yourself
		return false;
	}

	can_access(target) {
		if(!this.a.server.has_component(target, "RequiresAccess"))
			return true;
		return target.c.RequiresAccess.can_access(this);
	}
}

module.exports.components = {RequiresAccess, HasAccess};
