var mongoose = require('mongoose');

/**
 * @todo add ip restriction?
 * @todo add privateKey?
 */
var Source = mongoose.model('Source', { 
	name: String,
	accessKey: String,
});

module.exports = Source;