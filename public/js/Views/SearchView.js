App.Views.SearchView = Backbone.View.extend({
	// el: "#page-wrapper",
	tagName: "tbody",
	initialize: function() {
		console.log("Hola views");

		this.render();
	},
	render: function() {
		var self = this;
		var collection = new App.Collections.Logs();
		collection.fetch({
			success: function(col, response) {
				console.log(col);
				console.log(response);

				_.each(response.results, function(result) {
					var template = _.template($(".logRow").html());

					self.$el.append(template, response);
				})
			},
			error: function(col, error) {
				console.log(col);
				console.log(error);
			}
		});
	}
});