var app = require('./app');
var https = require('https');
var auth = {};

auth.getToken = function (req, res, next) {

 var code =  req.params.code;

 var extServerOptions = {
  host: 'https://slack.com',
  path: '%2Fapi%2Foauth.access%3Fclient_id%3D55672736423.58936834261%26client_secret%3D831e9b5e514c9587d7f3820aac9b0299%26code='+code,
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
