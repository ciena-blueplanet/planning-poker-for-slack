'use strict'

// const rewire = require('rewire')
const sinon = require('sinon')
const expect = require('chai').expect
const util = require('./../../util')
// const pokerDataModel = require('./pokerDataModel')

describe('util', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    // remove all stubs/spies
    sandbox.restore()
  })

  it('Test util.sortArrayBasedOnObjectProperty based on voting object', () => {
    let unSortedArray = [
      {'userId': 'U1MKN7AJC', 'userName': 'satpal', 'rating': 5},
      {'userId': 'U1MKN7AJC', 'userName': 'satpal', 'rating': 3},
      {'userId': 'U1MKN7AJC', 'userName': 'satpal', 'rating': 8},
      {'userId': 'U1MKN7AJC', 'userName': 'satpal', 'rating': 2}
    ]
    let sortedArray = util.sortArrayBasedOnObjectProperty(unSortedArray, 'rating')
    console.log(sortedArray)
    expect(sortedArray[0].rating).to.be.equal(2)
    expect(sortedArray[1].rating).to.be.equal(3)
    expect(sortedArray[2].rating).to.be.equal(5)
    expect(sortedArray[3].rating).to.be.equal(8)
  })
})
