var express = require("express");
var logfmt = require("logfmt");
var url = require("url");
var app = express();
//total objects updated
var objects = 0;

app.use(logfmt.requestLogger());
app.use(express.bodyParser());

//home
app.get('/', function(req, res) {
  res.send('Total objects: '+objects);
});

//subscriptions post
app.post('/callback', function(req, res){
	var obj = req.body;
	console.log("obj: "+obj.length);
	objects += obj.length
	res.send(200);
});

//subscriptions get; part of the  Pubsubhubub challenge flow.
app.get('/callback', function(req, res){
	var parsedUrl = url.parse(req.url, true);
	var urlObjects = parsedUrl.query;
	res.send(urlObjects["hub.challenge"]);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
