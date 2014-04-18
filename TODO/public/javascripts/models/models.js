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
			// _this.save();
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
	},

	getProject: function(id, callback) {
		var _this = this;
		this.fetch({
			url: "/project/" + id,
			success: function() {
				if (App.projectSet) App.projectSet.add(_this);

				if (callback) callback();
			}
		});
	},

	// override /*parse*/ to fit specific needs
	parse: function(res) {
		if (res.stageSet) {
			var  taskObj, task, taskSet, stage, stageSet = new App.StageSet();

			_.each(res.stageSet, function(stage) {
				var _stage = new App.Stage(stage);
				taskObj = _stage.get("taskSet");
				taskSet = new App.TaskSet();

				if (taskObj) {
					_.each(taskObj, function(task) {
						var _task = new App.Task(task);
						taskSet.add(_task);
					});
				}
				_stage.set('taskSet', taskSet);
				stageSet.add(_stage);
			});

			res.stageSet = stageSet;
		}
		return res;
	}
});

App.User = Backbone.Model.extend({
	defaults: {
		avatar_url: "",
		username:	"",
		position:	"",
		priority:	0,
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