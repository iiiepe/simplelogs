exports = module.exports;

var include = require("includemvc");
var app = include.app();
var Source = include.model("sources-api");
var Secure = include.lib("secure");
var secure = new Secure();

exports.index = function(req, res) {
	var query = Source.find({});
	
	if(req.query.limit && typeof req.query.limit !== undefined) {
		query = query.limit(req.query.limit);
	} 
	
	query.exec(function(err, result) {
		if(err) {
			res.send(406, err);
		}
		
		if(result) {
			res.send(200, result);
		}
	});
}

/*
 * Get a source by name
 */
exports.getSource = function(req, res) {
	var name = req.params.name;
	
	var query = Source.findOne({"name": name}, function(err, result) {
		if(err) {
			res.send(404, err);
		}
		
		if(result) {
			var send = result;

			res.send(200, send);
		}
	})
}

exports.postSource = function(req, res) {
  var body = req.body;
	
	if(!body.name || typeof body.name === undefined || typeof body.name === "undefined") {
		res.send(406, "Name is required and must be unique")
	}
	
	Source.findOne({"name": body.name}, function(err, result) {
		if(err || result) {
			res.send(406, "That name already exists, it must be unique");
		}
		
		else {
			var timestamp = Math.round(new Date().getTime() / 1000);
			var accessKey = secure.encrypt(timestamp.toString());

			// Not removing accents
			var name = body.name.toLowerCase().replace(/[\*\^\'\!]/g, '').split(' ').join('-');

			var source = new Source({
				name: name,
				accessKey: accessKey
			});
			
			source.save(function(err, result) {
				if(err) {
					res.send(406, err);
				}
				if(result) {
					res.send(201, result);
				}
			})
		}
	})
}

exports.deleteSource = function(req, res) {
 	Source.remove({_id: req.body.id}, function(err) {
 		if(err) {
 			res.send(406, err);
 		}
 		else {
 			res.send(200);
 		}
 	})
}