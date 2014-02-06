App.Routers.Router = Backbone.Router.extend({
	initialize: function() {
		console.log("Hello World");
	},
	routes: {
		"search": "search"
	},
	search: function() {
		new App.Views.SearchView();
	}
});