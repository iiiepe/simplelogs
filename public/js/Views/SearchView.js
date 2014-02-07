App.Views.SearchView = Backbone.View.extend({
	el: ".log-results",
	tagName: "div",
	events: {
		"click a.view-log": "viewLog"
	},
	template: _.template($(".logRow").html()),
	initialize: function(data) {
		this.collection = new App.Collections.Logs();
		if(data && typeof data !== undefined) {
			this.collection.fetch({data: data});

			// Set the page title
			var search = null;
			for(var name in data) {
				search = data[name];
			}

			$("h1.page-header").text("Search by " + search);
		}
		else {
			this.collection.fetch();
			$("h1.page-header").text("Search");
		}

		this.render();
		this.listen();

		this.collection.on("add", this.renderLog, this);
		this.collection.on("reset", this.render, this);
	},
	render: function() {
		// new App.Views.GraphView({collection: this.collection});
	},
	renderLog: function(response) {
		var self = this;
		self.$el.prepend(self.template(response.toJSON()));
	},
	listen: function() {
		var self = this;
		App.io.on("logs:new", function(data) {
			// Add the new log to the collection
			self.collection.add(data);
		})
	},
	viewLog: function(e) {
		var self = this;
		e.preventDefault();

		var id = $(e.currentTarget).attr("data-id");
		var log = self.collection.get(id);

		var view = new App.Views.LogView();
		var modal = new Backbone.BootstrapModal({
			content: view.render(log)
		}).open();
	}
});

/**
 * Render a log. Used in Modal
 */
App.Views.LogView = Backbone.View.extend({
	template: _.template($(".logDetail").html()),
	initialize: function(data) {
		console.log(data);
	},
	render: function(model) {
		var self = this;
		var log = model.toJSON();
		return self.template(log);
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
		this.collection = data.collection;
		this.render();
	},
	render: function() {
		var self = this;
		var graphData = []
		
		var now = Math.round(new Date().getTime());
		var anHourAgo = now-3600000;
		console.log(self.collection);
		_.each(self.collection.toJSON(), function(row) {
			console.log(row.get("timestamp"));
			graphData.push([row.timestamp*1000, 1]);
		});

		var plot = $.plot("#graph-container", [graphData], {
			xaxis: {
				mode: "time",
				minTickSize: [1, "minute"],
				min: now-3600000,
				max: now,
			},
			yaxis: {
				show: false,
			},
			series: {
        lines: { show: false},
        points: { show: true, fill: true }
    	}
		});

		App.io.on("logs:new", function(data) {	
			
			graphData.push([data.timestamp*1000, 1]);

			plot.setData([graphData]);
			console.log("Redrawing");
			// plot.setupGrid();
			// plot.draw();
			plot.triggerRedrawOverlay();
		})
	}
});