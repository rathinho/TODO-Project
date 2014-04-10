/*
 *	File:			models.js
 *  Description:	backbone models for storing data from server
 *  Author:			Rathinho Zhang
 */

// Global namespace
var App = App || {};

App.Task = Backbone.Model.extend({
	defaults: {
		avatar_url:	"",
		end_time:	"",
		end_date:	"",
		start_time:	"",
		start_date:	"",
		status:		"",
		task_name:	""
	},

	url: "",

	initialize: function() {
		var _this = this;

		_this.on("change", function() {
			_this.save();
		});	
	}
});

App.Stage = Backbone.Model.extend({
	defaults: {
		order:		"",
		taskSet:	null
	}
});

App.Project = Backbone.Model.extend({
	defaults: {
		project_name:			"",
		project_manager:		"",
		project_description:	"",
		stageSet:				null
	}
});

App.User = Backbone.Model.extend({
	defaults: {
		avatar_url: "",
		username:	"",
		position:	"",
		projectSet: null,
		msgSet:		null
	}
});

App.Msg = Backbone.Model.extend({
	defaults: {
		project_name:	"",
		task_name:		"",
		msg_content:	"",
		msg_time:		""
	}
});


App.TaskSet = Backbone.Collection.extend({
	model: App.Task
});

App.StageSet = Backbone.Collection.extend({
	model: App.Stage
});

App.ProjectSet = Backbone.Collection.extend({
	model: App.Project
});

App.MsgSet = Backbone.Collection.extend({
	model: App.Msg
});