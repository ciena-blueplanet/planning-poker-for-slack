var app = require('./app');
var https = require('https');
var auth = {};

auth.getToken = function (req, res, next) {

 console.log(req.params);
 var code =  req.query.code;

 var extServerOptions = {
  hostname: 'https://slack.com/api/oauth.access?client_id=55672736423.58936834261&client_secret=831e9b5e514c9587d7f3820aac9b0299&code='+code,
  port:443,
  method: 'GET'
 };

 console.log(extServerOptions);
 var req = https.request(extServerOptions, (res) => {
  //console.log('statusCode: ', res.statusCode);
  //console.log('headers: ', res.headers);

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
