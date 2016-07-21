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
    .expect('Content-Type', 'text/html; charset=UTF-8')
    .end(function (err, res) {
      if (err) return done(err)
      should.equal(res.status, 200, 'Status code for / is not 200')
      done()
    })
  })

  it('404 everything else', function testPath (done) {
    request(url)
      .get('/foo/bar')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end(function (err, res) {
        if (err) return done(err)
        should.equal(res.status, 404, 'Status code for unregistered resource is not 404')
        done()
      })
  })
})
