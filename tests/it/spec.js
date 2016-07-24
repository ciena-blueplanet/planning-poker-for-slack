'use strict'

const request = require('supertest')
const should = require('should')
const url = 'http://127.0.0.1:3000'

describe('GET for root route ', function () {
  this.timeout(10000)

  before(function (done) {
    done()
  })

  after(function (done) {
    done()
  })

  it('responds to /', function testSlash (done) {
    request(url)
    .get('/')
    .end(function (err, res) {
      if (err) return done(err)
      should.equal(res.status, 200, 'Status code for / is not 200')
      done()
    })
  })

  it('404 everything else', function testPath (done) {
    request(url)
      .get('/foo/bar')
      .end(function (err, res) {
        if (err) return done(err)
        should.equal(res.status, 404, 'Status code for unregistered resource is not 404')
        done()
      })
  })

  it('Start and stop playing.', function testSlash (done) {
    let jiraId = Math.floor((Math.random() * 1000) + 1)
    request(url)
    .post('/start')
    .send({
      'text': 'start JIRA-' + jiraId
    })
    .end(function (err, res) {
      if (err) return done(err)
      should.equal(res.status, 200, 'Status code for /start is not 200')
      should.equal(res.body.text, 'Please give your poker vote for JIRA-' + jiraId, 'Response body is not ok.')
      request(url)
      .post('/start')
      .send({
        'text': 'stop JIRA-' + jiraId
      })
      .end(function (err, res) {
        if (err) return done(err)
        should.equal(res.status, 200, 'Status code for /start is not 200')
        should.equal(res.body.text, 'Planning for this JIRA ID is complete. Thanks for Playing.', 'Response not ok.')
        done()
      })
    })
  })

  it('responds to /vote with start', function testSlash (done) {
    let jiraId = 'JIRA-' + Math.floor((Math.random() * 1000) + 1)
    const startPayload = require('../test-data.json').startPayload
    startPayload.original_message.text = 'start ' + jiraId
    let requestBody = {
      payload: JSON.stringify(startPayload)
    }
    request(url)
    .post('/vote')
    .send(requestBody)
    .end(function (err, res) {
      if (err) return done(err)
      should.equal(res.status, 200, 'Status code for /start is not 200')
      should.equal(res.body.text, 'You have voted 8 for JIRA ID : ' + jiraId.split('JIRA-')[1], 'Response not ok.')
      done()
    })
  })

  it('responds to /start with wrong format', function testSlash (done) {
    const errorMessage = 'Response not ok.'
    const successMessage = 'Please enter the command in correct format e.g. /planning-poker start or stop JIRA-1001'
    request(url)
    .post('/start')
    .send({'text': 'wrongFormat'})
    .end(function (err, res) {
      if (err) return done(err)
      should.equal(res.status, 200, 'Status code for /start is not 200')
      should.equal(res.body.text, successMessage, errorMessage)
      done()
    })
  })
})
