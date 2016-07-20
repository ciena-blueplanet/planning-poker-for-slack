var app = require('./app');
var https = require('https');
var path = require('path');
var fs = require('fs');
var auth = {};

//To get the oauth token from slack server.
auth.getToken = function (req, res, next) {

 var authCode =  req.query.code;
 var slackKey = JSON.parse(fs.readFileSync(path.join(__dirname + '/config/slackAppKey.json'), 'utf8'));
 console.log(slackKey);
 var extServerOptions = {
  hostname: 'slack.com',
  path: '/api/oauth.access?client_id='+slackKey.client_id+'&client_secret='+slackKey.client_secret+'&code='+authCode,
  method: 'GET'
 };
 console.log(extServerOptions);
 var req = https.request(extServerOptions, (res1) => {
  res1.on('data', (d) => {
   process.stdout.write(d);
   res.sendFile(path.join(__dirname + '/public/success.html'));
  });
 });
 req.end();
 req.on('error', (e) => {
  console.error(e);
 });

}
 module.exports=auth;
