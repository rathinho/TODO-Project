/*
 * GET userlist .
 */
exports.getUserList = function(db) {
	return function(req, res) {
		db.collection('users').find().toArray(function(err, items) {
			var nameList = [];

			items.forEach(function(i) {
				nameList.push(i.username);
			});
			
			res.json(nameList);
		});
	};
};

/*
 * GET single user by Id.
 */
exports.getUser = function(db) {
	return function(req, res) {
		var uid = req.params["uid"];
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
			res.send((err === null) ? { msg: 'Add user successfully.' } : { msg: err });
		});
	};
};

/*
 *	PUT to update user 
 */
exports.updateUser = function(db) {
	return function(req, res) {
		var uid = req.params["uid"];
		db.collection('users').update({id: uid}, {$set: req.body}, function(err, result) {
			res.send((result === 1) ? { msg: 'update user ' + uid + ' successfully.' } : { msg:'error: ' + err });
		});
	};
};

/*
 * DELETE to deleteuser.
 */
exports.deleteUser = function(db) {
	return function(req, res) {
		var userToDelete = req.params['uid'];
		db.collection('users').remove({id: userToDelete}, function(err, result) {
			res.send((result === 1) ? { msg: 'Remove user ' + userToDelete + ' successfully.' } : { msg:'error: ' + err });
		});
	};
};