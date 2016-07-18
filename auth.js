var app = require('./app');
var https = require('https');
var auth = {};

auth.getToken = function (req, res, next) {

 /*var code =  req.params.code;

 var extServerOptions = {
  host: 'https://slack.com/api/oauth.access',
  method: 'GET'
 };

 var req = https.request(extServerOptions, (res) => {
  console.log('statusCode: ', res.statusCode);
  console.log('headers: ', res.headers);

  res.on('data', (d) => {
   process.stdout.write(d);
  });
 });
 req.end();
 req.on('error', (e) => {
  console.error(e);
});*/
 console.log(req.params.code);

}
 module.exports=auth;
