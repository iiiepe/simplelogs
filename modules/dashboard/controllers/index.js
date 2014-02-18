var Source = require("../../sources/models");
var app = require("../../../app");
exports = module.exports;

exports.dashboard = function(req, res) {
	var query = Source.find({}).limit(50);
	
	query.exec(function(err, result) {
		if(err) {
			res.send(406, err);
		}
		
		if(result) {
			res.render("dashboard", {
				title: "Dashboard",
				sources: result
			})
		}
	});	
}

