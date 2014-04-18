/*
 * GET userlist .
 */
exports.getUserList = function(db) {
	return function(req, res) {
		db.collection('users').find().toArray(function(err, items) {
			res.json(items);
		});
	};
};

/*
 * GET single user by Id.
 */
exports.getUser = function(db) {
	return function(req, res) {
		var uid = req.params["id"];
		db.collection('users').findOne({id: uid}, function(err, item) {
			res.json(item);
		});
	};
};

/*
 * POST to add user.
 */
exports.addUser = function(db) {
	return function(req, res) {
		db.collection('users').insert(req.body, function(err, result) {
			res.send((err === null) ? { msg: '' } : { msg: err });
		});
	};
};

/*
 *	PUT to update user 
 */
exports.updateUser = function(db) {
	return function(req, res) {
		var uid = req.params["id"];
	};
};

/*
 * DELETE to deleteuser.
 */
exports.deleteUser = function(db) {
	return function(req, res) {
		var userToDelete = req.params.id;
		db.collection('users').removeById(userToDelete, function(err, result) {
			res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
		});
	};
};