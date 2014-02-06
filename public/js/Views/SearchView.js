App.Views.SearchView = Backbone.View.extend({
	el: ".log-results",
	tagName: "div",
	template: _.template($(".logRow").html()),
	initialize: function() {
		this.render();
	},
	render: function() {
		var self = this;
		var collection = new App.Collections.Logs();
		collection.fetch({
			success: function(col, response) {
				_.each(response.results, function(result) {
					self.$el.prepend(self.template(result));
				})
			},
			error: function(col, error) {
				console.log(col);
				console.log(error);
			}
		});
	}
});

App.Views.GraphView = Backbone.View.extend({
	el: ".graph",
	tagName: "div",
	initialize: function(data) {
		console.log(data);
	},
	render: function() {
		// Morris.Bar({
		//   element: 'bar-example',
		//   data: [
		//     { y: '2006', a: 100, b: 90 },
		//     { y: '2007', a: 75,  b: 65 },
		//     { y: '2008', a: 50,  b: 40 },
		//     { y: '2009', a: 75,  b: 65 },
		//     { y: '2010', a: 50,  b: 40 },
		//     { y: '2011', a: 75,  b: 65 },
		//     { y: '2012', a: 100, b: 90 }
		//   ],
		//   xkey: 'y',
		//   ykeys: ['a', 'b'],
		//   labels: ['Series A', 'Series B']
		// });
	}
});