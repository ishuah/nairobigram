var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

//home
app.get('/', function(req, res) {
  res.send('Received');
});

//subscriptions post
app.post('/callback', function(req, res){
	res.send('Post');
});

//subscriptions get
app.get('/callback', function(req, res){
	res.send('Get');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
