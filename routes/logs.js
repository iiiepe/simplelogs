var Log = require("../models/log");
var Source = require("../models/source");
var events = require("../lib/events").events;

/**
 * Get all logs
 */
exports.index = function(req, res) {
	var query = Log.find({});

	// From and to
	if(req.query.from && req.query.to && typeof req.query.from !== undefined && typeof req.query.to !== undefined) {
		query = query.where("timestamp").lte(req.query.to).gte(req.query.from);
	}
	
	// type
	if(req.query.type && typeof req.query.type !== undefined) {
		query = query.where("type").equals(req.query.type);	
	}

	// Source
	if(req.query.source && typeof req.query.source !== undefined) {
		query = query.where("source").equals(req.query.source);
	}

	// Tags, either as a string or an array
	if(req.query.tag && typeof req.query.tag !== undefined) {
		if(req.query.tag instanceof Array) {
			query = query.where("tags").all(req.query.tag);
		}
		else {
			query = query.where("tags").all([req.query.tag]);	
		}
	}

	// Limit
	if(req.query.limit && typeof req.query.limit !== undefined) {
		query = query.limit(req.query.limit);
	}
	else {
		query = query.limit(100);
	}

	// sort by timestamp
	query = query.sort({timestamp: -1});

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

/**
 * Get one log given an id
 */
exports.getLog = function(req, res) {
	var id = req.params.id;
	Log.findOne({_id: id}, function(err, result) {
		if(err) {
			res.send(406, err);
		}

		if(result) {
			res.send(200, result);
		}
	})
}

/**
 * Create a log
 */
exports.postLog = function(req, res) {
	var body = req.body;	
	
	if(!body.accessKey || typeof body.accessKey === undefined || typeof body.accessKey === "undefined") {		
		res.send(403, "No access key defined");
	}
	else {
		Source.findOne({"name": body.source}, function(err, result) {
			if(err) {
				res.send(406, "There was a problem finding that access key")
			}

			if(result) {
				if(result.accessKey === body.accessKey) {
					var log = new Log({ 
						timestamp: Math.round(new Date().getTime() / 1000),
						message: body.message,
						type: body.type,
						source: body.source,
						tags: body.tags
					});
					
					log.save(function (err, result) {
						if(err) {
							res.send(406, err);
						}
				
						if(result) {
							events.emit("logs:new", result);
						  res.send(201, result);			
						}
					});
				}
				else {
					console.log("The accessKey does not match the source of the log you're sending");
					res.send(403, "The accessKey does not match the source of the log you're sending")
				}
			}
			else {
				console.log("There's no source with that name");
				res.send(403, "There's no source with that name")
			}
		})
	}
}