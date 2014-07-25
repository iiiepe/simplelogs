var should = require("should");
var request = require("superagent").agent();

var baseUrl = "http://localhost";

describe("Sources", function() {
	var source = {
		name: "mocha-test"
	}

	var id;

	it("Should create a new source gith a - instead of a space", function(done) {
		request
			.post(baseUrl + "/api/sources")
			.send({name: "mocha test"})
			.end(function(err, result) {
				result.statusCode.should.equal(201);
				result.body.name.should.equal(source.name);

				id = result.body._id;

				done();
			});
	});

	it("Should get a source given it's id", function(done) {
		request
			.get(baseUrl + "/api/sources/" + id)
			.end(function(err, result) {
				result.statusCode.should.equal(200);
				result.body.name.should.equal(source.name);
				result.body.accessKey.should.be.a.String;

				done();
			})
	})

	it("Should give an error when sending an existing name", function(done) {
		request
			.post(baseUrl + "/api/sources")
			.send({name: "mocha test"})
			.end(function(err, result) {
				result.statusCode.should.equal(406);
				result.text.should.equal("That name already exists, it must be unique");

				done();
			});
	});

	it("Should delete a source", function(done) {
		request
			.del(baseUrl + "/api/sources/" + id)
			.send()
			.end(function(result) {
				result.statusCode.should.equal(200);

				done();
			});
	});

	it("Should give an error when not sending a name", function(done) {
		request
			.post(baseUrl + "/api/sources")
			.send({})
			.end(function(err, result) {
				result.statusCode.should.equal(406);

				done();
			})
	});

	it("Should give an error when sending null as name", function(done) {
		request
			.post(baseUrl + "/api/sources")
			.send({name: null})
			.end(function(err, result) {
				result.statusCode.should.equal(406);

				done();
			})
	});

	it("Should give an error when sending undefined as name", function(done) {
		request
			.post(baseUrl + "/api/sources")
			.send({name: undefined})
			.end(function(err, result) {
				result.statusCode.should.equal(406);

				done();
			})
	});

	it("Should give an error when sending nothing", function(done) {
		request
			.post(baseUrl + "/api/sources")
			.send()
			.end(function(err, result) {
				result.statusCode.should.equal(406);

				done();
			})
	});
});