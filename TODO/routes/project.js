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
		db.collection('projects').insert(req.body, function(err, result) {
			res.send((err === null) ? { msg: 'Add project successfully' } : { msg: err });
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
			res.send((err === null) ? { msg: 'Update project ' + pid + ' successfully' } : { msg: err });
		});
	};
};

/*
 * DELETE to delete project.
 */
exports.deleteProject = function(db) {
	return function(req, res) {
		var projectToDelete = req.params.id;
		db.collection('projects').removeById(projectToDelete, function(err, result) {
			res.send((err === null) ? { msg: 'Delete project ' + pid + ' successfully' } : { msg: err });
		});
	};
};


/*
 * POST to add stage.
 */
exports.addStage = function(db) {
	return function(req, res) {
		var pid = req.params["pid"];

		db.collection('projects').update({id: pid}, {$addToSet: {stageSet: req.body}}, function(err, result) {
			res.send((err === null) ? { msg: 'Update Stage successfully.' } : { msg: err });
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
		var pid = req.params["pid"];

		db.collection('projects').findOne({id: pid}, function(err, item) {
			res.json(item.stageSet[0]);
		});
		// db.collection('projects').update({id: pid}, {$addToSet: {stageSet: req.body}}, function(err, result) {
		// 	res.send((err === null) ? { msg: 'Update task successfully.' } : { msg: err });
		// });
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