'use strict';

class LoginPanel {
	constructor(panel) {
		this.panel = panel;
		this.panel.content_obj.classList.add("center");
		this.panel.header_obj.classList.add("center");
		this.connection = panel.manager.client.connection;
		this.message_handler = this.message_handler.bind(this);
		this.connection.addEventListener("message", this.message_handler);
	}

	message_handler(e) {
		let obj = JSON.parse(e.data);
		if(obj.login_type == "debug") {
			let div = document.createElement("div");
			div.classList.add("vertical-margins");
			let text_input = document.createElement("input");
			text_input.type = "text";
			text_input.maxlength = 30;
			text_input.value = localStorage.getItem("debug_username") || null;
			text_input.placeholder = "Nickname";
			div.appendChild(text_input);
			this.panel.content_obj.appendChild(div);
			div = document.createElement("div");
			div.classList.add("vertical-margins");
			let button = document.createElement("div");
			button.classList.add("button");
			button.textContent = "Connect";
			button.addEventListener("click", () => {
				localStorage.setItem("debug_username", text_input.value);
				this.connection.send(JSON.stringify({"login": text_input.value}));
				this.login_finish();
			});
			div.appendChild(button);
			this.panel.content_obj.appendChild(div);
		} else if(obj.login_type == "github") {
			let client_id = obj.client_id;

			this.panel.content_obj.innerHTML = `
<div class='vertical-margins not-logged-in' style='display: none'>
	<div class='button login-button'>Login</div>
</div>
<div class='vertical-margins logged-in' style='display: none'>
	<div>Logged in as</div>
	<div class='logged-in-as'></div>
	<div><div class='button logout-button'>Logout</div></div>
</div>
<div><div class='button connect-button disabled'>Connect</div></div>`;

			let login_button = this.panel.content_obj.getElementsByClassName('login-button')[0];
			let logout_button = this.panel.content_obj.getElementsByClassName('logout-button')[0];
			let connect_button = this.panel.content_obj.getElementsByClassName('connect-button')[0];

			login_button.addEventListener("click", () => {
				window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user:email`, "_self");
			});
			logout_button.addEventListener("click", () => {
				this.connection.send(JSON.stringify({logout: true}));
				this.panel.content_obj.getElementsByClassName('logged-in')[0].style.display = 'none';
				this.panel.content_obj.getElementsByClassName('not-logged-in')[0].style.display = 'block';
				this.panel.content_obj.getElementsByClassName('connect-button')[0].classList.add('disabled');
				localStorage.setItem("gh_access_token", undefined);
			});
			connect_button.addEventListener("click", () => {
				if(connect_button.classList.contains("disabled"))
					return;
				this.connection.send(JSON.stringify({login: true}));
				this.login_finish();
			});

			let access_token = localStorage.getItem("gh_access_token");
			if(access_token) {
				this.connection.send(JSON.stringify({access_token}));
			} else {
				this.panel.content_obj.getElementsByClassName('not-logged-in')[0].style.display = 'block';
			}
		} else if(obj.valid !== undefined) {
			if(obj.valid) {
				this.panel.content_obj.getElementsByClassName('logged-in')[0].style.display = 'block';
				this.panel.content_obj.getElementsByClassName('not-logged-in')[0].style.display = 'none';
				this.panel.content_obj.getElementsByClassName('connect-button')[0].classList.remove('disabled');
				this.panel.content_obj.getElementsByClassName('logged-in-as')[0].textContent = obj.logged_in_as;
			} else {
				this.panel.content_obj.getElementsByClassName('logged-in')[0].style.display = 'none';
				this.panel.content_obj.getElementsByClassName('not-logged-in')[0].style.display = 'block';
				this.panel.content_obj.getElementsByClassName('connect-button')[0].classList.add('disabled');
				localStorage.setItem("gh_access_token", undefined);
			}
		}
	}

	login_finish() {
		this.connection.removeEventListener("message", this.message_handler);
		this.panel.manager.client.login_finish();
		this.panel.close();
	}
}

module.exports.panel_classes = {LoginPanel};
