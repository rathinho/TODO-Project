/*
 *	File:			router.js
 *  Description:	backbone router for routing url
 *  Author:			Rathinho Zhang
 */

// Global namespace
var App = App || {};

App.Router = Backbone.Router.extend({
	routes: {
		"" : "index"
	},

	wrapper: $("#wrapper"),

	initialize: function() {

	},

	index: function() {
		this._initializeData(function() {

		});

		this._render().renderAll();
	},

	start: function() {
		Backbone.history.start();
	},

	_initializeData: function(callback) {
		App.user = new App.User(App.testData.user);
		App.projectA = new App.Project(App.testData.projectA);
		App.projectB = new App.Project(App.testData.projectB);
		App.projectC = new App.Project(App.testData.projectC);
		App.projectD = new App.Project(App.testData.projectD);
		App.projectE = new App.Project(App.testData.projectE);
		App.stageA = new App.Stage(App.testData.stageA);
		App.stageB = new App.Stage(App.testData.stageB);
		App.stageC = new App.Stage(App.testData.stageC);
		App.taskA = new App.Task(App.testData.taskA);
		App.taskB = new App.Task(App.testData.taskB);
		App.taskC = new App.Task(App.testData.taskC);

		App.msgA = new App.Msg(App.testData.msgA);
		App.msgB = new App.Msg(App.testData.msgB);
	
		App.taskSet = new App.TaskSet([App.taskA, App.taskB, App.taskC]);
		App.stageA.set('taskSet', App.taskSet);

		App.stageSet = new App.StageSet([App.stageA, App.stageB, App.stageC]);
		App.projectA.set('stageSet', App.stageSet);

		App.projectSet = new App.ProjectSet([App.projectA, App.projectB, App.projectC, App.projectD, App.projectE]);
		App.msgSet = new App.MsgSet([App.msgA, App.msgB]);
		App.user.set('projectSet', App.projectSet);
		App.user.set('msgSet', App.msgSet);

		// console.log(App.user.toJSON());
	},

	_render: function() {
		var _this = this;
		var views = {
			mainView: null,
			infoView: null,
			msgView: null
		};

		var scroller = {
			mainScroller: null,
			projectScroller: null,
			msgScroller: null
		};

		function renderCenter(model) {
			views.mainView = new App.MainView({model: model});
			_this.wrapper.append(views.mainView.render().el);

			App.projectA.get("stageSet").each(function(stage) {
				var stageView = new App.StageView({model: stage});
				views.mainView.$el.find("#main-list").append(stageView.render().el);

				if (stage.get('taskSet')) {
					stage.get('taskSet').each(function(task) {
						var taskView = new App.TaskView({model: task});
						stageView.$el.find(".task-list").append(taskView.render().el);
					});
				}
			});

			scroller.mainScroller = new iScroll("main-scroll", {vScrollbar: false});
		}

		function renderLeft() {
			views.infoView = new App.InfoBarView({model: App.user});
			_this.wrapper.append(views.infoView.render().el);

			var nameList = App.user.get('projectSet').pluck('project_name');
			var projectList = views.infoView.$el.find("#project-list");

			nameList.forEach(function(projectName) {
				projectList.append($("<li>"+projectName+"</li>"));
			});

			scroller.projectScroller = new iScroll("project-scroller", {vScrollbar: false});
		}

		function renderRight() {
			views.msgView = new App.MsgBarView();
			_this.wrapper.append(views.msgView.render().el);

			var msgList = views.msgView.$el.find("#msg-list");

			App.user.get("msgSet").each(function(msg) {
				var msgView = new App.MsgView({model: msg});
				msgList.append(msgView.render().el);
			});

			scroller.msgScroller = new iScroll("msg-scroller", {vScrollbar: false});
		}

		function resize() {
			var left = views.infoView.$el,
				right = views.msgView.$el,
				main = views.mainView.$el;

			var width = parseInt(main.css('width'));

			left.css('width', 300 + 'px');
			right.css('width', 300 + 'px').css('left', (width - 300) + 'px');

			main.swipeRight(function() {
				var _this = $(this),
					leftOffset = parseInt(_this.css("-webkit-transform").match(/-?\d{1,}/g));

				if (isNaN(leftOffset) || leftOffset === 0) {
					left.show();
					right.hide();
					scroller.mainScroller.disable();
					_this.css({'-webkit-transform':'translate(300px)','-webkit-transition':'200ms ease-in'});
				} else if (leftOffset < 0) {
					_this.css({'-webkit-transform':'translate(0)','-webkit-transition':'200ms ease-in'});

					setTimeout(function() {
						right.hide();
						scroller.mainScroller.enable();
					}, 200);
				}

				
			});

			main.swipeLeft(function() {
				var _this = $(this),
					leftOffset = parseInt(_this.css("-webkit-transform").match(/-?\d{1,}/g));

				if (isNaN(leftOffset) || leftOffset === 0) {
					left.hide();
					right.show();
					scroller.mainScroller.disable();
					_this.css({'-webkit-transform':'translate(-300px)','-webkit-transition':'200ms ease-out'});
				} else if (leftOffset > 0) {
					_this.css({'-webkit-transform':'translate(0)','-webkit-transition':'200ms ease-out'});

					setTimeout(function() {
						left.hide();
						scroller.mainScroller.enable();
					}, 200);
				}
			});
		}

		function renderAll() {
			renderCenter(App.projectA);
			renderLeft();
			renderRight();
			resize();
		}

		return {
			renderMain: renderCenter,
			renderInfo: renderLeft,
			renderMsg: renderRight,
			renderAll: renderAll
		};
	}
});