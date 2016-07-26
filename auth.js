'use strict'

const https = require('https')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
const util = require('./util')
let auth = {}
auth.oauthToken = {}
auth.channel = {}
/**
 * We are getting the OAuth token from slack server for our app
 * @param {Object} req - request object of the express module
 * @param {Object} res -  response object of the express module
 * @param {Object} next - next object of the express module
*/
auth.getToken = function (req, res, next) {
  const authCode = req.query.code
  const slackKey = JSON.parse(fs.readFileSync(path.join(__dirname, '/config/slack-app-key.json'), 'utf8'))
  const querystringObject = {
    client_id: slackKey.client_id,
    client_secret: slackKey.client_secret,
    code: authCode
  }
  const extServerOptions = {
    hostname: 'slack.com',
    path: '/api/oauth.access?' + querystring.stringify(querystringObject),
    method: 'GET'
  }
  console.log(extServerOptions)
  const request = https.request(extServerOptions, (response) => {
    response.on('data', (d) => {
      console.log('Got the oAuth token to be used in slack Web API.')
      process.stdout.write(d)
      // fs.writeFileSync(path.join(__dirname, '/config/oauth.json'), d, 'utf-8')clear
      auth.oauthToken = JSON.parse(d.toString())
      console.log(auth.oauthToken)
      util.setChannelInfo(auth.oauthToken.access_token)
      res.sendFile(path.join(__dirname, '/public/success.html'))
    })
  })
  request.end()
  request.on('error', (e) => {
    console.error(e)
  })
}
module.exports = auth
