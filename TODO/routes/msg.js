/*
 * GET msglist .
 */
exports.getMsgList = function(db) {
	return function(req, res) {
		var uid = req.params["uid"];
		db.collection('messages').find({to: uid}).toArray(function(err, items) {
			res.json(items);
		});
	};
};

/*
 * POST to add msg.
 */
exports.addMsg = function(db) {
	return function(req, res) {
		db.collection('messages').insert(req.body, function(err, result) {
			res.send((err === null) ? { msg: 'Add message successfully.' } : { msg: err });
		});
	};
};