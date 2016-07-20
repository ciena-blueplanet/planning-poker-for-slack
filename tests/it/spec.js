var request = require('supertest');
var should = require("should");
var url = "http://127.0.0.1:3000";

describe('GET for root route ', function () {
  //var server,app;
  this.timeout(15000);

  beforeEach(function (done) {
   done();
  });

  afterEach(function (done) {
   done();
  });

  it('responds to /', function testSlash(done) {
    request(url)
    .get('/')
    .end(function(err,res){
      // HTTP status should be 200
      should.equal(res.status, 200, "status code for / is not 200");
      done();
    });
  });

  it('404 everything else', function testPath(done) {
    request(url)
      .get('/foo/bar')
      .end(function(err,res){
        should.equal(res.status, 404, "status code for unregistered resource is not 404");
        done();
      })
  });

});
