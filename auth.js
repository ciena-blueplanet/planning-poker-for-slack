var app = require('./app');
var https = require('https');
var path = require('path');
var auth = {};

auth.getToken = function (req, res, next) {

 console.log(req.params);
 var code =  req.query.code;
 var encodedUrlRedirect = encodeURIComponent('https://orchestraion-india.slack.com/messages');

 var extServerOptions = {

  hostname: 'slack.com',
  path: '/api/oauth.access?client_id=55672736423.58936834261&client_secret=831e9b5e514c9587d7f3820aac9b0299&code='+code,
  method: 'GET'
 };
 console.log(extServerOptions);
 var req = https.request(extServerOptions, (res) => {
  res.on('data', (d) => {
   process.stdout.write(d);
   console.log(res.statusCode);
   res.send('HELLO WORLD');
   /*var successPageOptions = {
    hostname: 'localhost',
    method: 'GET'
   };
   https.get(successPageOptions, (res) => {
    console.log('statusCode: ', res.statusCode);
    console.log('headers: ', res.headers);
    res.on('data', (d) => {
     process.stdout.write(d);
    });
   }).on('error', (e) => {
    console.error(e);
  });*/

  });
 });
 req.end();
 req.on('error', (e) => {
  console.error(e);
});


}
 module.exports=auth;
