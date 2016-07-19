var app = require('./app');
var https = require('https');
var util = {};

util.getUserCountInChannel = function (token,channelId) {
 var extServerOptions = {
  hostname: 'slack.com',
  path: '/api/channels.info?token='+token+'&channel='+channelId,
  method: 'GET'
 };
 console.log(extServerOptions);
 var req = https.request(extServerOptions, (res) => {
  res.on('data', (d) => {
   process.stdout.write(d);
   return JSON.parse(d);
  });
 });
 req.end();
 req.on('error', (e) => {
  console.error(e);
  return JSON.parse(d);
 });
}
 module.exports=util;
