const {FunctionChain} = require('bluespess');
const EventEmitter = require('events');

function chain(func1, func2) {
	return function chained_func(...args) {
		return func2.call(this, (...override_args)=>{
			if(!func1)
				return;
			if(override_args.length)
				return func1.call(this, ...override_args);
			else
				return func1.call(this, ...args);
		}, ...args)
	}
}

function time() {return new Date().getTime()};

function testProxyFuncChain(chain_len) {
	var funcChain = new FunctionChain();
	for(let i = 0; i < chain_len; i++) {
		funcChain.push(function(prev, a) {
			return prev() + ", " + i + " " + a;
		});
	}
	var starttime = time();
	for(var i = 0; i < 100000; i++) {
		funcChain("612343");
	}
	var timelen = time() - starttime;
	console.log(`FunctionChain with length ${chain_len}: ${timelen} milliseconds`);
}

function testNormalFuncChain(chain_len) {
	var funcChain = undefined;
	for(let i = 0; i < chain_len; i++) {
		funcChain = chain(funcChain, function(prev, a) {
			return prev() + ", " + i + " " + a;
		});
	}
	var starttime = time();
	for(var i = 0; i < 100000; i++) {
		funcChain("612343");
	}
	var timelen = time() - starttime;
	console.log(`chain() with length ${chain_len}: ${timelen} milliseconds`);
}

function testEventBased(chain_len) {
	var retval = "";
	var emitter = new EventEmitter();
	for(let i = 0; i < chain_len; i++) {
		emitter.on("trigger", function(a) {
			retval += ", " + i + " " + a;
		});
	}
	var starttime = time();
	for(var i = 0; i < 100000; i++) {
		retval = "";
		emitter.emit("trigger", "612343");
	}
	var timelen = time() - starttime;
	console.log(`EventEmitter with length ${chain_len}: ${timelen} milliseconds`);
}

for(var i = 1; i <= 10; i++) {
	testProxyFuncChain(i);
}

for(var i = 1; i <= 10; i++) {
	testNormalFuncChain(i);
}

for(var i = 1; i <= 10; i++) {
	testEventBased(i);
}