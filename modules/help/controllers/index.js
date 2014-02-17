var app = require("../../../app");
exports = module.exports;

exports.api = function(req, res) {
	res.render("api", {
		title: "API"
	})
}