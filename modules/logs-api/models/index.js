var mongoose = require('mongoose');

var Log = mongoose.model('Log', {
	timestamp: Number,
	message: String,
	type: String,
	source: String,
	tags: []
});

module.exports = Log;