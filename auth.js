'use strict'

const https = require('https')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
var auth = {}

// To get the oauth token from slack server.
auth.getToken = function (req, res, next) {
  var authCode = req.query.code
  var slackKey = JSON.parse(fs.readFileSync(path.join(__dirname, '/config/slackAppKey.json'), 'utf8'))
  var querystringObject = {
    client_id: slackKey.client_id,
    client_secret: slackKey.client_secret,
    code: authCode
  }
  var extServerOptions = {
    hostname: 'slack.com',
    path: '/api/oauth.access?' + querystring.stringify(querystringObject),
    method: 'GET'
  }
  console.log(extServerOptions)
  var request = https.request(extServerOptions, (response) => {
    response.on('data', (d) => {
      process.stdout.write(d)
      res.sendFile(path.join(__dirname, '/public/success.html'))
    })
  })
  request.end()
  request.on('error', (e) => {
    console.error(e)
  })
}
module.exports = auth
