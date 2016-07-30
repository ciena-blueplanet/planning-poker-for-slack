'use strict'

// const rewire = require('rewire')
// const sinon = require('sinon')
const expect = require('chai').expect
const util = require('./../../util')

describe('util', () => {
  beforeEach(() => {
  })

  afterEach(() => {
    // remove all stubs/spies
    // sandbox.restore()
  })

  it('saves the sortArrayBasedOnObjectProperty', () => {
    let unSortedArray = [
       {x: 4, y: 2},
       {x: 1, y: 9},
       {x: 2, y: 3},
       {x: 8, y: 4}
    ]
    let sortedArray
    sortedArray = util.sortArrayBasedOnObjectProperty(unSortedArray, 'x')
    expect(sortedArray[0].x).to.be.equal(1)
    expect(sortedArray[1].x).to.be.equal(2)
    expect(sortedArray[2].x).to.be.equal(4)
    expect(sortedArray[3].x).to.be.equal(8)
    sortedArray = util.sortArrayBasedOnObjectProperty(unSortedArray, 'y')
    expect(sortedArray[0].y).to.be.equal(2)
    expect(sortedArray[1].y).to.be.equal(3)
    expect(sortedArray[2].y).to.be.equal(4)
    expect(sortedArray[3].y).to.be.equal(9)
  })
})
