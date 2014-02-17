exports = module.exports;
var app = require("../../../app");

var Source = require("../models");

exports.getSources = function(req, res) {
	var query = Source.find({});
		
	query.exec(function(err, result) {
		if(err) {
			res.send(406, err);
		}
		
		if(result) {
			res.render("sources", {
				title: "Sources",
				sources: result
			});
		}
	});
}