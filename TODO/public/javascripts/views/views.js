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

	initialize: function(opt) {
		this.pid = opt.pid;
		this.sid = opt.sid;
		this.model.set("priority", App.user.get("priority"));
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	changeStatus: function() {
		var status = this.model.get('status');
		var _this = this;

		if (status === "ongoing") {
			this.model.set('status', 'checking');
		} else if (status === "checking") {
			if (this.model.get('priority') === 1) {
				this.model.set('status', 'finished');
			}
		}

		var postUrl = "/project/" + _this.pid + "/" + _this.sid + "/" + _this.model.get('id');
		$.ajax({
			url: postUrl,

			type: "PUT",

			data: {
				status: _this.model.get('status')
			},

			success: function(data) {
				console.log(data);
			},

			error: function(err) {
				console.log(err);
			}
		});
	}
});

App.StageView = Backbone.View.extend({
	tagName: "li",

	template: _.template($("#stage-template").html()),

	events: {
		"tap .task-adder" : "addTask"
	},

	initialize: function(opt) {
		this.pid = opt.pid || "";
		this.model.set("priority", App.user.get("priority"));
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	addTask: function() {
		App.dialog = new App.DialogView({nameList: App.nameList, pid: this.pid, sid: this.model.get('id')});
		$("#wrapper").append(App.dialog.render().el);
		App.dialog.getNameList();
		App.dialog.setMode("task");
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

	events: {
		"tap #sender" : "send"
	},

	template: _.template($("#msgBar-template").html()),

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	send: function() {
		App.senderView = new App.SenderView({model: this.model});
		$("#wrapper").append(App.senderView.render().el);
		App.senderView.getNameList();
	},

	loadMsg: function(callback) {
		var msgList = App.views.msgView.$el.find("#msg-list");
		var msgView, msgModel;

		$.ajax({
			url: "/msg/" + this.model.get('username'),

			type: "GET",

			success: function(data) {
				data.forEach(function(msg) {
					msgModel = new App.Msg(msg);
					msgView = new App.MsgView({model: msgModel});
					msgList.append(msgView.render().el);
				});
				
				callback();
			}
		});
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

		$.ajax({
			url: "/user/",

			type: "GET",

			success: function(data) {
				App.nameList = data;
			}
		});
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	renderProject: function(evt) {
		if (evt.srcElement.className === "config") {
			var id = evt.srcElement.parentElement.id;
			this.dropdown(id);
		} else {
			var project = new App.Project();
			var id = evt.srcElement.id;

			// check cache
			if (App.projectSet.get(id)) {
				App.renderUtil.renderMain(App.projectSet.get(id), true);
			} else {
				project.getProject(id, function() {
					App.renderUtil.renderMain(project, true);
				});
			}
		}
	},

	addProject: function() {
		App.dialog = new App.DialogView({nameList: App.nameList});
		$("#wrapper").append(App.dialog.render().el);
		App.dialog.getNameList();
	},

	dropdown: function(id) {
		App.dropdown = new App.DropdownView({pid: id});
		$("#wrapper").append(App.dropdown.render().el);
	}
});

App.CenterView = App.MainView = Backbone.View.extend({
	tagName: "div",

	className: "container main bg-grey",

	id: "main",

	template: _.template($("#main-template").html()),

	events: {
		"tap #stage-adder": "addStage"
	},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	addStage: function() {
		var list = this.$el.find("#main-list");
		var stageCount = list.children().length;
		var _this = this;
		var stage = new App.Stage({id: "s000000" + stageCount, order: arabToCN(stageCount)});

		$.ajax({
			url: "/project/" + this.model.get('id'),

			type: "POST",

			data: {
				id : stage.get('id'),
				order: stage.get('order')
			},

			success: function(data) {
				if (data.code === 1) {
					window.location.reload();
				}
			}
		});


		function arabToCN(n) {
			var mapArr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
			if (n < 10) {
				return mapArr[n];
			} else {
				var temp = "";
				temp += mapArr[Math.floor(n/10)] + mapArr[10] + mapArr[n%10];
				return temp;
			}
		}
	}
});


App.DialogView = Backbone.View.extend({
	className: "modal",

	id: "project-adder-dialog",

	template: _.template($("#dialog-template").html()),

	events: {
		"tap #submit" : "submit",
		"tap #cancel" : "cancel"
	},

	initialize: function(opt) {
		this.nameList = opt.nameList;
		this.ajaxType = opt.type || "POST";
		this.pid = opt.pid || "";
		this.sid = opt.sid || "";
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	setMode: function(mode) {
		this.mode = mode;
		if (mode === "task") {
			this.$el.find("#task-dialog").removeClass("hide");
			this.$el.find("#project-dialog").addClass("hide");
			this.$el.find(".dialog").css({"height":"260px", "margin-top": "-130px"});
		} else {
			this.$el.find("#task-dialog").addClass("hide");
			this.$el.find("#project-dialog").removeClass("hide");
			this.$el.find(".dialog").css({"height":"210px", "margin-top": "-105px"});
		}
	},

	getNameList: function() {
		var pnameListSelect = this.$el.find("select[name=project_manager]"),
			tnameListSelect = this.$el.find("select[name=task_manager]");

		this.nameList.forEach(function(name) {
			pnameListSelect.append("<option>"+name+"</option>");
			tnameListSelect.append("<option>"+name+"</option>");
		});
	},

	submit: function() {

		if (this.validate()) {
			var projectData = {
				project_name : this.$el.find("input[name=project_name]").val(),
				project_manager: this.$el.find("select[name=project_manager]").val(),
				project_description: this.$el.find("input[name=project_description]").val()
			};

			var start_timestamp = this._getTimestamp(this.$el.find("input[name=starttime_year]").val(), this.$el.find("input[name=starttime_month]").val(), this.$el.find("input[name=starttime_date]").val(), this.$el.find("input[name=starttime_hour]").val()),
				end_timestamp = this._getTimestamp(this.$el.find("input[name=endtime_year]").val(), this.$el.find("input[name=endtime_month]").val(), this.$el.find("input[name=endtime_date]").val(), this.$el.find("input[name=endtime_hour]").val());

			var taskData = {
				id: this.$el.find("input[name=task_id]").val(),
				task_name: this.$el.find("input[name=task_name]").val(),
				task_manager_name: this.$el.find("select[name=task_manager]").val(),
				end_timestamp: start_timestamp,
				start_timestamp: end_timestamp
			};

			var _this = this;

			$.ajax({
				url: "/project/" + this.pid + (this.pid ? ("/" + this.sid) : ""),

				type: this.ajaxType,

				data: (this.mode === "task" ? taskData : projectData),

				success: function(data) {
					if (data.code === 1) {
						_this.remove();
						window.location.reload();
					}
				},

				error: function(err) {
					console.log(err);
					alert("服务器无相应，请稍后重试");
				}
			});
		}
	},

	validate: function() {
		var isPassed = false;
		var pname = this.$el.find("input[name=project_name]"),
			pdesc = this.$el.find("input[name=project_description]"),
			pmanager = this.$el.find("select[name=project_manager]"),
			tname = this.$el.find("input[name=task_name]"),
			tmanager = this.$el.find("sselect[name=task_manager]");
			tstart_year = this.$el.find("input[name=starttime_year]");
			tstart_month = this.$el.find("input[name=starttime_month]");
			tstart_date = this.$el.find("input[name=starttime_date]");
			tstart_hour = this.$el.find("input[name=starttime_hour]");
			tend_year = this.$el.find("input[name=endtime_year]");
			tend_month = this.$el.find("input[name=endtime_month]");
			tend_date = this.$el.find("input[name=endtime_date]");
			tend_hour = this.$el.find("input[name=endtime_hour]");

		if (this.mode === "task") {
			if (tname.val() === "") {
				tname.focus();
			} else if (tstart_year.val() === "") {
				tstart_year.focus();
			} else if (tstart_month.val() === "") {
				tstart_month.focus();
			} else if (tstart_date.val() === "") {
				tstart_date.focus();
			} else if (tstart_hour.val() === "") {
				tstart_hour.focus();
			} else if (tend_year.val() === "") {
				tend_year.focus();
			} else if (tend_month.val() === "") {
				tend_month.focus();
			} else if (tend_date.val() === "") {
				tend_date.focus();
			} else if (tend_hour.val() === "") {
				tend_hour.focus();
			} else {
				isPassed = true;
			}
		} else {
			if (pname.val() === "") {
				pname.focus();
			} else if (pdesc.val() === "") {
				pdesc.focus();
			} else {
				isPassed = true;
			}
		}

		return isPassed;
	},

	cancel: function() {
		this.remove();
	},

	_getTimestamp: function(year, month, date, hour) {
		var time = new Date();
		time.setFullYear(year, month, date);
		time.setHours(hour);
		return time.getTime();
	}
});

App.DropdownView = Backbone.View.extend({
	className: "modal",

	id: "dropdown",

	template: _.template($("#dropdown-template").html()),

	events: {
		"tap #modify": "modify",
		"tap #delete": "delete",
		"tap #cancel": "cancel"
	},

	initialize: function(opt) {
		this.pid = opt.pid || "";
		this.sid = opt.sid || "";
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	modify: function() {
		this.remove();

		App.dialog = new App.DialogView({nameList: App.nameList, type: "PUT", pid: this.pid, sid: this.sid});
		$("#wrapper").append(App.dialog.render().el);
		App.dialog.getNameList();
	},

	delete: function() {
		$.ajax({
			url: "/project/" + this.pid + (this.pid ? ("/" + this.sid) : ""),

			type: "DELETE",

			success: function(data) {
				if (data.code === 1) {
					window.location.reload();
				}
			},

			error: function(err) {
				console.log(err);
				alert("服务器无相应，请稍后重试");
			}
		});
	},

	cancel: function() {
		this.remove();
	}
});

App.SenderView = Backbone.View.extend({
	className: "modal",

	id: "sender-dialog",

	template: _.template($("#sender-template").html()),

	events: {
		"tap #submit" : "send",
		"tap #cancel" : "cancel"
	},

	initialize: function() {

	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	send: function() {
		var _this = this;

		$.ajax({
			url: "/msg",

			type: "POST",

			data: {
				from: _this.model.get("username"),
				to: _this.$el.find("select[name=receiver]").val(),
				content: this.$el.find("textarea[name=content]").val(),
				timestamp: new Date().getTime()
			},

			success: function(data) {
				_this.$el.find(".dialog").text("发送成功");

				setTimeout(function() {
					_this.remove()
				}, 2000);
			},

			error: function(err) {
				console.log(err);
			}
		});
	},

	cancel: function() {
		this.remove();
	},

	getNameList: function() {
		var nameListSelect = this.$el.find("select[name=receiver]");

		App.nameList.forEach(function(name) {
			nameListSelect.append("<option>"+name+"</option>");
		});
	}
});