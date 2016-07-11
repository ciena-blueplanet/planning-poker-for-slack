var express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var app = express();
var pokerbot = require('./pokerbot');


var port = process.argv[2] ? process.argv[2] : 3000;

app.use(bodyParser.urlencoded({ extended: true }));

var hskey = fs.readFileSync('key.pem');
var hscert = fs.readFileSync('cert.pem');

var options = {
    key: hskey,
    cert: hscert
};

https.createServer(options, app).listen(port);

app.get('/', pokerbot.root);
