'use strict'

const request = require('supertest')
const should = require('should')
const token = require('../../config/auth.json').access_token
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
      'text': 'start JIRA-' + jiraId,
      'channel': 'C1ML2QAJV',
      'token': token
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
        should.equal(res.status, 200, 'Status code for stop is not 200')
        done()
      })
    })
  })

  it('responds to /vote with start', function testSlash (done) {
    let jiraId = Math.floor((Math.random() * 1000) + 1)
    request(url)
    .post('/start')
    .send({
      'text': 'start JIRA-' + jiraId,
      'channel': 'C1ML2QAJV',
      'token': token
    })
    .end(function (err, res) {
      if (err) return done(err)
      should.equal(res.status, 200, 'Status code for /start is not 200')
      should.equal(res.body.text, 'Please give your poker vote for JIRA-' + jiraId, 'Response body is not ok.')
      const startPayload = require('../test-data.json').startPayload
      startPayload.original_message.text = 'start JIRA-' + jiraId
      let requestBody = {
        payload: JSON.stringify(startPayload)
      }
      console.log(requestBody)
      request(url)
      .post('/vote')
      .send(requestBody)
      .end(function (err, res) {
        if (err) return done(err)
        should.equal(res.status, 200, 'Status code for /start is not 200')
        should.equal(res.body.text, 'You have voted 8 for JIRA-' + jiraId, 'Response not ok.')

        request(url)
        .post('/start')
        .send({
          'text': 'stop JIRA-' + jiraId,
          'channel': 'C1ML2QAJV',
          'token': token
        })
        .end(function (err, res) {
          if (err) return done(err)
          should.equal(res.status, 200, 'Status code for stop is not 200')
          should.equal(res.body.text, 'Planning for JIRA-' + jiraId + ' is complete. ' +
          'Average vote : 8.00 Thanks for voting.', 'Response not ok.')
          done()
        })
      })
    })
  })

  it('user abstains from voting', function testSlash (done) {
    let jiraId = Math.floor((Math.random() * 1000) + 1)
    request(url)
    .post('/start')
    .send({
      'text': 'start JIRA-' + jiraId,
      'channel': 'C1ML2QAJV',
      'token': token
    })
    .end(function (err, res) {
      if (err) return done(err)
      should.equal(res.status, 200, 'Status code for /start is not 200')
      should.equal(res.body.text, 'Please give your poker vote for JIRA-' + jiraId, 'Response body is not ok.')
      const startPayload = require('../abstain-vote-test-data.json').startPayload
      startPayload.original_message.text = 'vote JIRA-' + jiraId
      let requestBody = {
        payload: JSON.stringify(startPayload)
      }
      request(url)
      .post('/vote')
      .send(requestBody)
      .end(function (err, res) {
        if (err) return done(err)
        should.equal(res.status, 200, 'Status code for /vote is not 200')
        should.equal(res.body.text, 'You have voted 0 for JIRA-' + jiraId, 'Response not ok.')

        request(url)
        .post('/start')
        .send({
          'text': 'stop JIRA-' + jiraId,
          'channel': 'C1ML2QAJV',
          'token': token
        })
        .end(function (err, res) {
          if (err) return done(err)
          should.equal(res.status, 200, 'Status code for stop is not 200')
          should.equal(res.body.text, 'Planning for JIRA-' + jiraId + ' is complete. Average vote : 0' +
          '\nFollowing members have abstained from voting : \nuser' + '\n Thanks for voting.',
          'Response not ok.')
          done()
        })
      })
    })
  })

  it('responds to /start with wrong format', function testSlash (done) {
    const errorMessage = 'Response not ok.'
    const successMessage = 'Please enter the command in correct format ' +
    'e.g. /planning-poker start or stop or status JIRA-1001'
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
