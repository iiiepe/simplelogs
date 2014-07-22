var include = require("includemvc");
var app = include.app();

exports = module.exports;

exports.api = function(req, res) {
	res.render("api", {
		title: "API"
	})
}