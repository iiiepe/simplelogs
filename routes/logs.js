var Log = require("../models/log");

/**
 * Get all logs
 */
exports.index = function(req, res) {
	console.log(req.params);
	console.log(req.query);

	var query = Log.find({});

	if(req.query.from && req.query.to && typeof req.query.from !== undefined && typeof req.query.to !== undefined) {
		console.log("Filter");
		query = query.where("timestamp").lte(req.query.to).gte(req.query.from);
	}

	if(req.query.tag && typeof req.query.tag !== undefined) {
		console.log("Tags");
		if(req.query.tag instanceof Array) {
			console.log("is array");
			query = query.where("tags").all(req.query.tag);
		}
		else {
			console.log("is not array");
			query = query.where("tags").all([req.query.tag]);	
		}
	}

	if(req.query.limit && typeof req.query.limit !== undefined) {
		console.log("limit");
		query = query.limit(req.query.limit);
	}

	query.exec(function(err, results) {
		if(err) {
			console.log(err);
			res.send(406, {
				error: err
			})
		}

		if(results) {
			res.send(200, {
				results: results
			})
		}
	});
}

/**
 * Get one log given an id
 */
exports.getLog = function(req, res) {
	var id = req.params.id;
	Log.findOne({_id: id}, function(err, result) {
		if(err) {
			res.send(406, {
				error: err
			})
		}

		if(result) {
			res.send(200, {
				results: result
			})
		}
	})
}

/**
 * Create a log
 */
exports.postLog = function(req, res) {
	var body = req.body;

	var log = new Log({ 
		timestamp: Math.round(new Date().getTime() / 1000),
		message: body.message,
		type: body.type,
		source: body.source,
		tags: body.tags}
	);
	
	log.save(function (err, result) {
		if(err) {
			res.send(406, {
				error: err
			})
		}

		if(result) {
		  res.send(201, {
		  	results: result
		  });			
		}
	});
}