var express = require('express');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var pokerbot = require('./pokerbot');
var pokerPlanningMap = {};

var port = process.argv[2] ? process.argv[2] : 3000;

console.log("App listening on port : "+ port);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

http.createServer(app).listen(port);

app.post('/', pokerbot.root);
app.post('/vote/:id', pokerbot.vote);
