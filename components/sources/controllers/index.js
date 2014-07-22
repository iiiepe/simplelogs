exports = module.exports;
var include = require("includemvc");
var app = include.app();
var Source = include.model("sources-api");

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