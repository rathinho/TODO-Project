/*
 *	File:			app.js
 *  Description:	app starts here
 *  Author:			Rathinho Zhang
 */

// Global namespace
var App = App || {};
App.testData = {
	user: {
		avatar_url: "images/default.png",
		username: "Rathinho",
		position: "前端开发工程师",
	},

	projectA: {
		project_name: "Loiter项目管理",
		project_manager: "Rathinho",
		project_description: "基于微信平台的公司项目管理移动客户端"
	},

	projectB: {
		project_name: "大学生酸梅计划",
		project_manager: "温俊强",
		project_description: "吃酸莓"
	},

	projectC: {
		project_name: "黄埔军校可视化方案",
		project_manager: "魏志华",
		project_description: "黄埔军校可视化方案"
	},

	projectD: {
		project_name: "Yanis Net品牌包装计划",
		project_manager: "王伟雄",
		project_description: "Yanis Net品牌包装计划"
	},

	projectE: {
		project_name: "Holly Shit项目",
		project_manager: "鸡鸡",
		project_description: "Holly Shit项目"
	},

	stageA: {
		order: "一"
	},

	stageB: {
		order: "二"
	},

	stageC: {
		order: "三"
	},

	taskA: {
		avatar_url:	"images/default.png",
		end_time:	"12:30",
		end_date:	"3月21日",
		start_time:	"12:34",
		start_date:	"3月18日",
		status:		"finished",
		task_name:	"主要功能设计"
	},

	taskB: {
		avatar_url:	"images/default.png",
		end_time:	"15:30",
		end_date:	"4月11日",
		start_time:	"16:35",
		start_date:	"3月28日",
		status:		"ongoing",
		task_name:	"界面优化"
	},

	taskC: {
		avatar_url:	"images/default.png",
		end_time:	"10:30",
		end_date:	"3月22日",
		start_time:	"18:30",
		start_date:	"3月15日",
		status:		"checking",
		task_name:	"需求文档"
	},

	msgA: {
		project_name:	"Loiter项目管理",
		task_name:		"主要功能设计",
		msg_content:	"快一点啊艹",
		msg_time:		"22:23/4月10日"
	},

	msgB: {
		project_name:	"Loiter项目管理",
		task_name:		"需求文档",
		msg_content:	"看懂了没给点反馈",
		msg_time:		"22:25/4月10日"
	}
};

$(function() {
	App.Start = new App.Router();
	App.Start.start();
});