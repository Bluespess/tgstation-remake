const {Component} = require('bluespess');

class NewPlayer extends Component {
	constructor(atom, template) {
		super(atom, template);
		
		//this.atom.components.Eye.screen.title = {screen_loc_x:0,screen_loc_y:0,}
	}
}
NewPlayer.require = ['Mob'];
NewPlayer.loadBefore = ['Mob'];

module.exports.components = {NewPlayer};