App.Views.SearchView = Backbone.View.extend({
	el: ".log-results",
	tagName: "div",
	template: _.template($(".logRow").html()),
	initialize: function() {
		this.render();
		this.listen();
	},
	render: function() {
		var self = this;
		var collection = new App.Collections.Logs();
		collection.fetch({
			success: function(col, response) {
				_.each(response.results, function(result) {
					self.$el.prepend(self.template(result));
				});

				new App.Views.GraphView(response.results);
			},
			error: function(col, error) {
				console.log(col);
				console.log(error);
			}
		});
	},
	listen: function() {
		var self = this;
		App.io.on("logs:new", function(data) {
			console.log(data);
			self.$el.prepend(self.template(data));
		})
	}
});

/**
 * Graph View
 * Display a graph view with data from the SearchView
 */
App.Views.GraphView = Backbone.View.extend({
	el: ".graph",
	tagName: "div",
	initialize: function(data) {
		this.render(data);
	},
	render: function(data) {
		var graphData = []
		_.each(data, function(row) {
			graphData.push({
				y: row.timestamp,
				timestamp: 1,
				source: row.source,
				type: row.type
			});
		});

		App.io.on("logs:new", function(data) {
			console.log(data);
			graphData.push({
				y: data.timestamp,
				timestamp: 1,
				source: data.source,
				type: data.type
			});
		})

		Morris.Bar({
		  element: 'graph-container',
		  data: graphData,
		  xkey: 'y',
		  ykeys: ['timestamp'],
		  labels: ['Source'],
		  stacked: true,
		  hoverCallback: function(index, options, content) {
		  	var row = options.data[index];
		  	return row.type + " from " + row.source;
		  }
		});
	}
});