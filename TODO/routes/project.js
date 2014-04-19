/*
 * GET project list .
 */
exports.getProjectList = function(db) {
	return function(req, res) {
		db.collection('projects').find().toArray(function(err, items) {
			res.json(items);
		});
	};
};

/*
 * GET project list by uid .
 */
exports.getProjectListByUid = function(db) {
	return function(req, res) {
		var uid = req.params["uid"];
		db.collection('users').findOne({id: uid}, function(err, user) {
			var queryArr = [];
			for (var i in user.projectList) {
				queryArr.push(user.projectList[i].id);
			}

			db.collection('projects').find({id: {$in: queryArr}}).toArray(function(err, items) {
				res.json(items);
			});
		});
	};
};

/*
 * GET single project by Id.
 */
exports.getProject = function(db) {
	return function(req, res) {
		var pid = req.params["pid"];
		db.collection('projects').findOne({id: pid}, function(err, item) {
			res.json(item);
		});
	};
};

/*
 * POST to add project.
 */
exports.addProject = function(db) {
	return function(req, res) {
		var projectDB = db.collection('projects');
		projectDB.count(function(err, count) {

			db.collection('users').findOne({username: req.body.project_manager}, function(err, user) {
				var project = {
					"id": "p00000000" + (count + 1),
					"project_name" : req.body.project_name,
					"project_description" : req.body.project_description,
					"project_manager": req.body.project_manager,
					"project_manager_id": user.id,
					"stageSet": [],
					"userSet": [],
				};

				projectDB.insert(project, function(err, result) {
					res.send((err === null) ? { msg: 'Add project successfully' , code: 1} : { msg: err , code: 0});
				});
			});
		});
	};
};

/*
 * POST to update project.
 */
exports.updateProject = function(db) {
	return function(req, res) {
		var pid = req.params["pid"];
		db.collection('projects').update({id: pid}, {$set: req.body}, function(err, result) {
			res.send((err === null) ? { msg: 'Update project ' + pid + ' successfully' , code: 1} : { msg: err , code: 0});
		});
	};
};

/*
 * DELETE to delete project.
 */
exports.deleteProject = function(db) {
	return function(req, res) {
		var projectToDelete = req.params["pid"];
		db.collection('projects').remove({id: projectToDelete}, function(err, result) {
			res.send((err === null) ? { msg: 'Delete project ' + projectToDelete + ' successfully', code: 1 } : { msg: err, code: 0 });
		});
	};
};


/*
 * POST to add stage.
 */
exports.addStage = function(db) {
	return function(req, res) {
		var pid = req.params["pid"];
		var stage = {
			id: req.body.id,
			order: req.body.order,
			taskSet: []
		};

		db.collection('projects').update({id: pid}, {$addToSet: {stageSet: stage}}, function(err, result) {
			res.send((err === null) ? { msg: 'Update Stage successfully.', code: 1 } : { msg: err, code: 0 });
		});
	};
};

/*
 * GET to get stage.
 */
exports.getStage = function(db) {
	return function(req, res) {

	};
};

/*
 * PUT to update stage.
 */
exports.updateStage = function(db) {
	return function(req, res) {

	};
};

/*
 * DELETE to delete stage.
 */
exports.deleteStage = function(db) {
	return function(req, res) {

	};
};

/*
 * POST to add task.
 */
exports.addTask = function(db) {
	return function(req, res) {
		var pid = req.params["pid"],
			sid = req.params["sid"];

		db.collection('projects').findOne({id: pid}, function(err, item) {
			item.stageSet.forEach(function(i) {
				if (i.id == sid) {
					db.collection('users').findOne({username: req.body.task_manager_name}, function(err, user) {
						var task = {
							id: req.body.id,
							task_manager_name: req.body.task_manager_name,
							task_name: req.body.task_name,
							avatar_url: user.avatar_url,
							task_manager_id: user.id,
							end_timestamp: req.body.end_timestamp,
							start_timestamp: req.body.start_timestamp,
							status: "ongoing"
						};

						i.taskSet.push(task);

						db.collection('projects').update({id: pid}, {$set: {stageSet: item.stageSet}}, function(err, result) {
							res.send((err === null) ? { msg: 'Update task successfully.', code: 1 } : { msg: err, code: 0 });
						});
					});
				} else {
					return;
				}
			});
		});
	};
};

/*
 * GET to get task.
 */
exports.getTask = function(db) {
	return function(req, res) {

	};
};

/*
 * PUT to update task.
 */
exports.updateTask = function(db) {
	return function(req, res) {

	};
};

/*
 * DELETE to delete task.
 */
exports.deleteTask = function(db) {
	return function(req, res) {

	};
};