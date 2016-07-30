'use strict'

const sinon = require('sinon')
const expect = require('chai').expect
const UserRating = require('./../../../model/user-rating')

describe('UserRating', () => {
  let userRating, sandbox
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    userRating = new UserRating('ABCDEF', 'testuser', 5)
  })

  afterEach(() => {
    // remove all stubs/spies
    sandbox.restore()
  })

  it('craete new user-rating object', () => {
    expect(userRating.userid).to.be.equal('ABCDEF')
    expect(userRating.userName).to.be.equal('testuser')
    expect(userRating.rating).to.be.equal(5)
  })

  it('Test toString() method', () => {
    expect(userRating).to.be.a('object')
  })
})
