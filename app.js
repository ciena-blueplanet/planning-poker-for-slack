'use strict'

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const pokerbot = require('./pokerbot')
const auth = require('./auth')
const util = require('./util')

const port = process.argv[2] ? process.argv[2] : 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.post('/start', pokerbot.root)
app.post('/vote', pokerbot.vote)
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.get('/token', auth.getToken)
app.post('/test', auth.test)
app.post('/vote1', auth.getToken)

app.listen(port)
console.log('Application listening on port : ' + port)
util.runSchedularForInProgressJira()
