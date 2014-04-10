/**
 * Module dependencies.
 */

// include essential modules
var express = require('express'),
	http = require('http'),
	path = require('path');

// connect to database
var db = require('mongoskin').db('mongodb://localhost/todo');

// create socket, listening port #3001
// var socketio = require('socket.io').listen(3001);

// initialize express
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

// create server, listening to port #3000
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});