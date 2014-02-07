App.Views.SourceView = Backbone.View.extend({
	events: {
		"click .add-source": "addSource",
	},
	initialize: function() {
		// this.model.on("add", function() {
		// 	console.log("Adding model");
		// })
	},
	render: function() {
	},
	saveSource: function() {
		var self = this;
		var name = $("#name").val();

		if(name.length > 0) {
			var model = new App.Models.Source();

			model.save({
				name: name
			}, {
				success: function(model, results) {
					var view = new App.Views.SourceResult();
					var modal = new Backbone.BootstrapModal({
						content: view.render(model.toJSON()),
						okText: "Close",
						cancelText: false,
						animate: true,
						enterTriggersOk: true,
					}).open();
				},
				error: function(model, xhr) {
					var modal = new Backbone.BootstrapModal({
						content: '<div class="alert alert-danger"><p>There was an error</p><p>' + xhr.responseText + '</p></div>',
						okText: "Close",
						cancelText: false,
						animate: true,
						enterTriggersOk: true,
					}).open();
				}
			});
		}
	},
	addSource: function(e) {
		e.preventDefault();
		var view = new App.Views.SourceFormView();
		var modal = new Backbone.BootstrapModal({
			content: view.render(),
			okText: "Save",
			animate: true,
			enterTriggersOk: true,
		}).open();

		modal.on("ok", this.saveSource);
	}
});

// Create the modal
App.Views.SourceFormView = Backbone.View.extend({
	template: _.template($(".sourceForm").html()),
	render: function() {
		var self = this;
		return self.template();
	}
});

// Create the modal
App.Views.SourceResult = Backbone.View.extend({
	template: _.template($(".sourceResult").html()),
	render: function(data) {
		var self = this;
		return self.template(data);
	}
});