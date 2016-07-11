var express = require('express');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var pokerbot = require('./pokerbot');


var port = process.argv[2] ? process.argv[2] : 3000;

app.use(bodyParser.urlencoded({ extended: true }));

http.createServer(app).listen(port);

app.get('/', pokerbot.root);
