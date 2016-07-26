'use strict'

const https = require('https')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
const auth = {}

/**
 * We are getting the OAuth token from slack server for our app
  * @param {Object} req - request object of the express module
 * @param {Object} res -  response object of the express module
 * @param {Object} next - next object of the express module
*/
auth.getToken = function (req, res, next) {
  const authCode = req.query.code
  const slackKey = JSON.parse(fs.readFileSync(path.join(__dirname, '/config/slackAppKey.json'), 'utf8'))
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
