App.Models.Log = Backbone.Model.extend({
	url: "/api/logs",
	idAttribute: "_id",
	defaults: {
		"type": "",
		"message": "",
		"tags": [],
		"timestamp": "",
		"source": ""
	}
});