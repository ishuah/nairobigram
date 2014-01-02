var express = require("express");
var logfmt = require("logfmt");
var url = require("url");
var io = require("socket.io");
var app = express();
var routes = require('./routes');
var path = require('path');
var http = require('http');
//total objects updated
var objects;

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(logfmt.requestLogger());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


var sio = io.listen(server);

sio.sockets.on('connection', function (socket) {
	socket.emit('message', { message: 'Connected' });
});

//home
app.get('/', function(req, res){
	res.send(objects);
});

//subscriptions post
app.post('/callback', function(req, res){
	var obj = req.body;
	objects = obj;
	res.send(200);
});

//subscriptions get; part of the  Pubsubhubub challenge flow.
app.get('/callback', function(req, res){
	var parsedUrl = url.parse(req.url, true);
	var urlObjects = parsedUrl.query;
	res.send(urlObjects["hub.challenge"]);
});
