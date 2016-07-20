var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var pokerbot = require('./pokerbot');
var auth = require('./auth');

var port = process.argv[2] ? process.argv[2] : 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.post('/start', pokerbot.root);
app.post('/vote', pokerbot.vote);
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('/token',auth.getToken);

var server = app.listen(port);
console.log("Application listening on port : "+ port);

//For Intergration test only.
module.exports = {
    server : server,
    app : app
};
