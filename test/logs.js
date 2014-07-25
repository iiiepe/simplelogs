var should = require("should");
var request = require("superagent").agent();

var baseUrl = "http://localhost";

describe("Logs", function() {
	var id;

	var accessKey;
	var log = {
		message: "This is a log post created by Mocha",
		type: "notice",
		source: "mocha-test",
		tags: [
			"mocha",
			"test",
			"mocha-test"
		],
	}

	var logid;

	before(function(done) {
		var source = {
			name: "mocha-test"
		}

		request
			.post(baseUrl + "/api/sources")
			.send(source)
			.end(function(err, result) {
				result.statusCode.should.equal(201);
				result.body.name.should.equal(source.name);

				// Set the variables to the returned values so we can re-use them
				id = result.body._id;
				accessKey = result.body.accessKey;

				done();
			});
	});

	after(function(done) {
		request
			.del(baseUrl + "/api/sources/" + id)
			.send()
			.end(function(result) {
				result.statusCode.should.equal(200);

				done();
			});
	});

	it("Should give an error when creating a log without an accessKey", function(done) {
		request
			.post(baseUrl + "/api/logs")
			.send(log)
			.end(function(err, result) {
				result.statusCode.should.equal(403);

				done();
			});
	})

	it("Should give an error when creating a log with a wrong accessKey", function(done) {
		var logWithAccessKey = log;
		logWithAccessKey.accessKey = "123";

		request
			.post(baseUrl + "/api/logs")
			.send(logWithAccessKey)
			.end(function(err, result) {
				result.statusCode.should.equal(403);
				result.text.should.equal("The accessKey does not match the source of the log you\'re sending");

				done();
			});
	})

	it("Should create a new a new log", function(done) {
		var logWithAccessKey = log;
		logWithAccessKey.accessKey = accessKey;

		request
			.post(baseUrl + "/api/logs")
			.send(logWithAccessKey)
			.end(function(err, result) {
				result.statusCode.should.equal(201);
				result.body.should.be.an.Object;
				result.body.message.should.equal(log.message);
				result.body.source.should.equal(log.source);
				result.body.type.should.equal(log.type);
				result.body.tags.should.be.an.Array;
				result.body.tags.should.have.length(3);

				logid = result.body._id;

				done();
			});
	});

	it("Should get a log", function(done) {
		request
			.get(baseUrl + "/api/logs/" + logid)
			.end(function(err, result) {

				result.statusCode.should.equal(200);
				result.body.should.be.an.Object;
				result.body.message.should.equal(log.message);
				result.body.source.should.equal(log.source);
				result.body.type.should.equal(log.type);
				result.body.tags.should.be.an.Array;
				result.body.tags.should.have.length(3);
				result.body._id.should.equal(logid);

				done();
			});
	})

	it("Should get a list of logs", function(done) {
		request
			.get(baseUrl + "/api/logs")
			.end(function(err, result) {
				result.statusCode.should.equal(200);
				result.body.should.be.an.Array;

				done();
			});
	});


});