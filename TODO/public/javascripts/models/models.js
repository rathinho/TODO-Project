/*
 *	File:			models.js
 *  Description:	backbone models for storing data from server
 *  Author:			Rathinho Zhang
 */

// Global namespace
var App = App || {};

App.Task = Backbone.Model.extend({
	defaults: {
		id: 			"",
		avatar_url:		"",
		end_timestamp:	"",
		start_timestamp:"",
		status:			"",
		task_name:		""
	},

	url: "/project/",

	initialize: function() {
		var _this = this;
		this.on('change', function() {
			console.log(_this);
		})
	},

	updateChange: function(pid, sid) {

	}
});

App.Stage = Backbone.Model.extend({
	defaults: {
		id: "",
		order:		"",
		taskSet:	[]
	}
});

App.Project = Backbone.Model.extend({
	defaults: {
		id: "",
		project_name:			"",
		project_manager:		"",
		project_description:	"",
		stageSet:				[]
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
	urlRoot: "/user/",

	defaults: {
		id: "",
		avatar_url: "",
		username:	"",
		position:	"",
		priority:	0,
		projectSet: [],
	}
});

App.Msg = Backbone.Model.extend({
	defaults: {
		id:			"",
		from:		"",
		to:			"",
		content:	"",
		timestamp:	""
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