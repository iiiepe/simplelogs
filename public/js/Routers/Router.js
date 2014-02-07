App.Routers.Router = Backbone.Router.extend({
	initialize: function() {
		
	},
	routes: {
		"": "search",
		"source/:source": "searchBySource",
		"tag/:tag": "searchByTag",
		"type/:type": "searchByType"
	},
	search: function() {
		new App.Views.SearchView();
	},
	searchBySource: function(source) {
		// search#source/Coleccion-Dev
		new App.Views.SearchView({source: source});
	},
	searchByTag: function(tag) {
		new App.Views.SearchView({tag: tag});
	},
	searchByType: function(type) {
		new App.Views.SearchView({type: type});
	}
});