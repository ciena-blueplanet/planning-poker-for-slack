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
      auth.token = JSON.parse(d.toString()).access_token
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

auth.test = function (req, res, next) {
  console.log('Auth Test : begin')
  const querystringObject = {
    scope: encodeURIComponent('commands,chat:write:bot,channels:read'),
    redirect_uri : encodeURIComponent('https://127.0.0.1:3000/vote1'),
    client_id: '55672736423.58936834261'
  }
  const extServerOptions = {
    hostname: 'slack.com',
    path: '/oauth/authorize?' + querystring.stringify(querystringObject),
    method: 'GET'
  }
  console.log(extServerOptions)
  const request = https.request(extServerOptions, (response) => {
    response.on('data', (d) => {
      process.stdout.write(d)
    })
  })
  request.end()
  request.on('error', (e) => {
    console.error(e)
    console.log('Auth getToken : end')
  })
}

module.exports = auth
