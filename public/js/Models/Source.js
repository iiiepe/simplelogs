App.Models.Source = Backbone.Model.extend({
	url: "/api/sources",
	idAttribute: "_id",
	defaults: {
		"name": "",
		"accessKey": "",
	}
});