var app = require('./app');
var https = require('https');
var auth = {};

auth.getToken = function (req, res, next) {

 console.log(req.params);
 var code =  req.query.code;
 var encodedPath = encodeURIComponent('/api/oauth.access?client_id=55672736423.58936834261&redirect_uri=https://orchestraion-india.slack.com/messages/&client_secret=831e9b5e514c9587d7f3820aac9b0299&code=')+code;

 var extServerOptions = {
  hostname: 'slack.com',
  path: encodedPath,
  method: 'GET'
 };

 console.log(extServerOptions);
 var req = https.request(extServerOptions, (res) => {
  res.on('data', (d) => {
   process.stdout.write(d);
  });
 });
 req.end();
 req.on('error', (e) => {
  console.error(e);
});


}
 module.exports=auth;
