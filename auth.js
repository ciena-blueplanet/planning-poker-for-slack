var app = require('./app');
var https = require('https');
var path = require('path');
var auth = {};

auth.getToken = function (req, res, next) {

 var code =  req.query.code;
 var encodedUrlRedirect = encodeURIComponent('https://orchestraion-india.slack.com/messages');
 var extServerOptions = {
  hostname: 'slack.com',
  path: '/api/oauth.access?client_id=55672736423.58936834261&client_secret=831e9b5e514c9587d7f3820aac9b0299&code='+code,
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
