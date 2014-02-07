App.Collections.Logs = Backbone.Collection.extend({
	model: App.Models.Log,
	url: '/api/logs'
});