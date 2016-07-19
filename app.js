var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var pokerbot = require('./pokerbot');
var auth = require('./auth');

var port = process.argv[2] ? process.argv[2] : 3000;
console.log("App listening on port : "+ port);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
http.createServer(app).listen(port);

app.post('/start', pokerbot.root);
app.post('/stop', pokerbot.stop);
app.post('/vote', pokerbot.vote);
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/token',auth.getToken);
