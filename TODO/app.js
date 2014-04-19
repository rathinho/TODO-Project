/**
 * Module dependencies.
 */

// default port
var defaultPort = 3000;

// include essential modules
var express = require('express'),
	http = require('http'),
	path = require('path'),
	user = require('./routes/user'),
	project = require('./routes/project');

// connect to database
var db = require('mongoskin').db('mongodb://localhost/todo');

// create socket, listening port #3001
// var socketio = require('socket.io').listen(3001);

// initialize express
var app = express();

// all environments
app.set('port', process.env.PORT || defaultPort);
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


// RESTFUL API
app.get("/user", user.getUserList(db));
app.get("/user/:uid", user.getUser(db));
app.post("/user", user.addUser(db));
app.put("/user/:uid", user.updateUser(db));
app.delete("/user/:uid", user.deleteUser(db));

app.get("/project", project.getProjectList(db));
app.get("/project/:pid", project.getProject(db));
app.get("/project/user/:uid", project.getProjectListByUid(db));
app.post("/project", project.addProject(db));
app.put("/project/:pid", project.updateProject(db));
app.delete("/project/:pid", project.deleteProject(db));

app.post("/project/addstage/:pid", project.addStage(db));
app.post("/project/addtask/:pid", project.addTask(db));