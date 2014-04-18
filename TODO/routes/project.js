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
		var pid = req.params["id"];
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
			res.send((err === null) ? { msg: '' } : { msg: err });
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
			res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
		});
	};
};


/*
 * POST to add stage.
 */
exports.addStage = function(db) {
	return function(req, res) {
		var pid = req.params["pid"],
			projects = db.collection('projects');

		projects.findOne({id: pid}, function(err, proj) {
			// res.send(req.body);
			if (proj) {
				projects.update({id: pid}, {$addToSet: {stageSet: req.body}}, function(err, result) {
					res.send((err === null) ? { msg: result } : { msg: err });
				});
			}
		});		
	};
};