'use strict';

module.exports.now = function(client) {
	if(global.is_bs_editor_env)
		return;
	window.addEventListener("load", () => {
		let input_elem = document.getElementById("main-text-input");
		document.addEventListener('keydown', (e) => {
			if(e.target.localName == "input" || !client.connection)
				return;
			// the e.preventDefault() is for stopping the character being typed into the input
			if(e.which == 79) { // o
				input_elem.dataset.inputting = 'ooc';
				input_elem.disabled = false;
				input_elem.focus();
				e.preventDefault();
			} else if(e.which == 84) { // t
				input_elem.dataset.inputting = 'say';
				input_elem.disabled = false;
				input_elem.focus();
				e.preventDefault();
			}
		});
		input_elem.parentElement.addEventListener('click', (e) => {
			if(input_elem.disabled && !e.defaultPrevented) {
				input_elem.blur();
				let div = document.createElement('div');
				div.textContent = "Use 'o' for OOC, and 't' for speech.";
				let cw = document.getElementById('chatwindow');
				let do_scroll = false;
				if(cw.scrollTop + cw.clientHeight >= cw.scrollHeight)
					do_scroll = true;
				cw.appendChild(div);
				if(do_scroll)
					cw.scrollTop = cw.scrollHeight - cw.clientHeight;
			}
		});
		input_elem.addEventListener('keydown', (e) => {
			if(e.which == 27) { // escape
				input_elem.blur();
				input_elem.dataset.inputting = null;
				input_elem.value = "";
				input_elem.disabled = true;
				e.preventDefault();
			} else if(e.which == 13) { // enter
				if(input_elem.dataset.inputting == "ooc") {
					if(client.connection)
						client.connection.send(JSON.stringify({ooc_message: input_elem.value}));
				} else if(input_elem.dataset.inputting == "say") {
					if(client.connection)
						client.connection.send(JSON.stringify({say_message: input_elem.value}));
				}

				input_elem.blur();
				input_elem.dataset.inputting = null;
				input_elem.value = "";
				input_elem.disabled = true;
				e.preventDefault();
			}
		});
		input_elem.addEventListener('input', () => {
			let text = input_elem.value;
			if(text.startsWith(";")) {
				input_elem.classList.add("radio");
			} else {
				input_elem.classList.remove("radio");
			}
		});
	});
};
