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
		$.ajax({
			url: "/project/addstage/p000000005",
			type: "post",
			data: {
				"order": "二",
				"taskSet": {
					"0":{
					"task_manager_id": "u0000002",
					"avatar_url": "images\/wayzh.jpg",
					"end_time": "12: 30",
					"end_date": "3月21日",
					"start_time": "12: 35",
					"start_date": "3月18日",
					"status": "ongoing",
					"task_name": "killing u"
				},
				"1":{
					"task_manager_id": "u0000002",
					"avatar_url": "images\/wayzh.jpg",
					"end_time": "12: 30",
					"end_date": "3月21日",
					"start_time": "12: 35",
					"start_date": "3月18日",
					"status": "ongoing",
					"task_name": "killing u2"
				}}
			},
			success: function(res) {
				console.log(res);
			}
		})
	},

	index: function() {
		// this._hideWechatNavbar();
		App.renderUtil = this._render();
		this._initializeData(App.renderUtil.renderAll);
	},

	start: function() {
		Backbone.history.start();
	},

	_initializeData: function(callback) {
		var uid = "u0000001";	// wait to add login module

		App.user = new App.User();
		App.user.fetch({
			url: "/user/" + uid,
			success: function() {
				App.projectSet = new App.ProjectSet();
				App.user.set('projectSet', App.projectSet);

				App.initProject = new App.Project();
				App.initProject.getProject(App.user.get("projectList")[1].id, callback);
				console.log(App.user);
			}
		});
	},

	_render: function() {
		var _this = this;
		App.views = {
			mainView: null,
			infoView: null,
			msgView: null
		};

		var scroller = {
			mainScroller: null,
			projectScroller: null,
			msgScroller: null
		};

		function renderCenter(model, update) {
			if (App.views.mainView) {
				App.views.mainView.remove();
			}

			App.views.mainView = new App.MainView({model: model});
			_this.wrapper.append(App.views.mainView.render().el);

			if (model.get("stageSet")) {
				model.get("stageSet").each(function(stage) {
					var stageView = new App.StageView({model: stage, id: "stage-" + stage.cid});
					App.views.mainView.$el.find("#main-list").append(stageView.render().el);

					if (stage.get('taskSet')) {
						stage.get('taskSet').each(function(task) {
							var taskView = new App.TaskView({model: task, id: "task-" + task.cid});
							stageView.$el.find(".task-list").append(taskView.render().el);
						});
					}
				});
			}

			scroller.mainScroller = new iScroll("main-scroll", {vScrollbar: false});

			if (update) {
				resize();
			}
		}

		function renderLeft() {
			App.views.infoView = new App.InfoBarView({model: App.user});
			_this.wrapper.append(App.views.infoView.render().el);

			var nameList = App.user.get('projectList');
			var projectList = App.views.infoView.$el.find("#project-list");

			if (nameList) {
				for (var i in nameList) {
					projectList.append($("<li class=\"project-item\" id=\""+nameList[i].id+"\">"+nameList[i].name+"</li>"));
				}
			}

			scroller.projectScroller = new iScroll("project-scroller", {vScrollbar: false});
		}

		function renderRight() {
			App.views.msgView = new App.MsgBarView();
			_this.wrapper.append(App.views.msgView.render().el);

			var msgList = App.views.msgView.$el.find("#msg-list");

			if (App.user.get("msgSet")) {
				App.user.get("msgSet").each(function(msg) {
					var msgView = new App.MsgView({model: msg});
					msgList.append(msgView.render().el);
				});
			}
			

			scroller.msgScroller = new iScroll("msg-scroller", {vScrollbar: false});
		}

		function resize() {
			var left = App.views.infoView.$el,
				right = App.views.msgView.$el,
				main = App.views.mainView.$el;

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
			renderCenter(App.initProject);
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
	},

	_hideWechatNavbar: function() {
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			WeixinJSBridge.call('hideToolbar');
		});		
	}
});