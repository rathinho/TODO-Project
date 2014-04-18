/*
 *	File:			views.js
 *  Description:	backbone views for displaying model data to client
 *  Author:			Rathinho Zhang
 */

// Global namespace
var App = App || {};

App.TaskView = Backbone.View.extend({
	tagName: "li",

	template: _.template($("#task-template").html()),

	events: {
		"tap .task-status" : "changeStatus"
	},

	initialize: function() {
		this.model.set("priority", App.user.get("priority"));
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	changeStatus: function() {

	}
});

App.StageView = Backbone.View.extend({
	tagName: "li",

	template: _.template($("#stage-template").html()),

	events: {
		"tap .task-adder" : "addTask"
	},

	initialize: function() {
		this.model.set("priority", App.user.get("priority"));
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	addTask: function() {

	}
});

App.MsgView = Backbone.View.extend({
	tagName: "li",

	template: _.template($("#msg-template").html()),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

App.RightSidebarView = App.MsgBarView = Backbone.View.extend({
	tagName: "div",

	className: "container bg-black",

	id: "msg-sidebar",

	template: _.template($("#msgBar-template").html()),

	render: function() {
		this.$el.html(this.template());
		return this;
	}
});

App.LeftSidebarView = App.InfoBarView = Backbone.View.extend({
	tagName: "div",

	className: "container bg-black",

	id: "info-sidebar",

	template: _.template($("#infoBar-template").html()),

	events: {
		"tap .project-item": "renderProject",
		"tap #project-adder": "addProject"
	},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	renderProject: function(evt) {
		var id = evt.srcElement.id;
		var project = new App.Project();

		// check cache
		if (App.projectSet.get(id)) {
			App.renderUtil.renderMain(App.projectSet.get(id), true);
		} else {
			project.getProject(id, function() {
				App.renderUtil.renderMain(project, true);
			});
		}
	},

	addProject: function() {
		
	}
});

App.CenterView = App.MainView = Backbone.View.extend({
	tagName: "div",

	className: "container main bg-grey",

	id: "main",

	template: _.template($("#main-template").html()),

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});