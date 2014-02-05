var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/simplelogs');

var Log = mongoose.model('Log', { 
	timestamp: Number,
	message: String,
	type: String,
	source: String,
	tags: []
});

module.exports = Log;