var app = require('./app');
var https = require('https');
var auth = {};

auth.getToken = function (req, res, next) {

 var code =  req.params.code;

 var extServerOptions = {
  host: 'https://slack.com',
  path: '/api/oauth.access?client_id=55672736423.58936834261&client_secret=831e9b5e514c9587d7f3820aac9b0299&code='+code,
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
