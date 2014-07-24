var should = require("should");
var request = require("superagent").agent();

var baseUrl = "http://localhost";

describe("Sources", function() {

	var source = {
		name: "mocha-test"
	}

	var id;

	it("Should create a new source", function(done) {
		request
			.post(baseUrl + "/api/sources")
			.send(source)
			.end(function(err, result) {
				result.statusCode.should.equal(201);
				result.body.name.should.equal(source.name);

				id = result.body.id;

				done();
			});
	});

	it("Should delete a source", function(done) {
		request
			.delete(baseUrl + "/api/sources/" + id)
			.send(source)
			.end(function(err, result) {
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

	it("Should give an error when sending nothing");

});