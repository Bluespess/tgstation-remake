'use strict';

module.exports.now = function(client) {
	if(global.is_bs_editor_env)
		return;
	window.addEventListener("load", () => {
		let input_elem = document.getElementById("main-text-input");
		document.addEventListener('keydown', (e) => {
			if(e.target.localName == "input" || !client.connection)
				return;
			if(e.which == 79) { // o
				input_elem.dataset.inputting = 'ooc';
				input_elem.disabled = false;
				input_elem.focus();
				e.preventDefault();
			}
		});
		input_elem.addEventListener('keydown', (e) => {
			if(e.which == 27) {
				input_elem.blur();
				input_elem.dataset.inputting = null;
				input_elem.value = "";
				input_elem.disabled = true;
				e.preventDefault();
			} else if(e.which == 13) {
				if(input_elem.dataset.inputting == "ooc") {
					if(client.connection)
						client.connection.send(JSON.stringify({ooc_message: input_elem.value}));
				}

				input_elem.blur();
				input_elem.dataset.inputting = null;
				input_elem.value = "";
				input_elem.disabled = true;
				e.preventDefault();
			}
		});
	});
};
