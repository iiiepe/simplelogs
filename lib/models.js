var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/simplelogs');

var Cat = mongoose.model('Cat', { name: String });



exports.models = {
	
}