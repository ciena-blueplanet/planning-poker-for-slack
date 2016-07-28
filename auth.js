'use strict'

const https = require('https')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
// const util = require('./util')
let auth = {}
auth.token = ''

/**
 * We are getting the OAuth token from slack server for our app
 * @param {Object} req - request object of the express module
 * @param {Object} res -  response object of the express module
 * @param {Object} next - next object of the express module
*/
auth.getToken = function (req, res, next) {
  console.log('Auth getToken : begin')
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
      process.stdout.write(d)
      auth.token = JSON.parse(d.toString())
      fs.writeFile(path.join(__dirname, '/config/auth.json'), '', function () {
        fs.writeFile(path.join(__dirname, '/config/auth.json'), d.toString(), (err) => {
          if (err) throw err
          console.log('written auth file at : ' + path.join(__dirname, '/config/auth.json'))
        })
      })
      console.log('Auth getToken : end')
      res.sendFile(path.join(__dirname, '/public/success.html'))
    })
  })
  request.end()
  request.on('error', (e) => {
    console.error(e)
    console.log('Auth getToken : end')
  })
}

module.exports = auth
