var include = require("includemvc");
var app = include.app();
var Model = include.model("users-api");

exports = module.exports;

exports.getUser = function(req, res) {  
  var id = req.params.id;
	Model.findOne({_id: id}, function(err, result) {
		if(err) {
			res.send(406, err);
		}

		if(result) {
			res.send(200, result);
		}
	})
}

exports.getUsers = function(req, res) {
  var query = Model.find({});

	// Limit
	if(req.query.limit && typeof req.query.limit !== undefined) {
		query = query.limit(req.query.limit);
	}
	else {
		query = query.limit(100);
	}

	// sort by timestamp
	query = query.sort({'_id': -1});

	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.send(406, err)
		}

		if(results) {
			res.send(200, results);
		}
	});
}

exports.postUser = function(req, res) {
  var body = req.body;	
  
	var user = new Model({ 
		created: Math.round(new Date().getTime() / 1000),
		username: body.username,
		fullName: body.fullName,
		lfullName: body.fullName.toLowerCase(),
		password: body.password // @todo encrypt
	});

	user.save(function (err, result) {
		if(err) {
			res.send(406, err);
		}

		if(result) {
		  res.send(201, result);			
		}
	});
}