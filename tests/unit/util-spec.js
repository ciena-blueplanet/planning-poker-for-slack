'use strict'

const sinon = require('sinon')
const expect = require('chai').expect
const util = require('./../../util')
const pokerbot = require('./../../pokerbot')

describe('util', () => {
  let sandbox
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
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

  it('Test util.asyncServerCalls is called ', () => {
    let userIdArray = ['ACVCV', 'ASDD', 'ASFHJK']
    let spyGetUserInTeamCall = sinon.spy(util, 'getUserInTeam')
    pokerbot.addNewUsersInTeam(userIdArray, function () {})
    sinon.assert.calledThrice(spyGetUserInTeamCall)
  })

  it('Test util.getAllUnplayedUersForGame is called ', () => {
    let pokerbot = {}
    pokerbot.pokerDataModel = require('./pokerDataModel.json')
    pokerbot.allUsersInTeam = require('./poker-all-users.json')
    let spyAsyncServerCalls = util.getAllUnplayedUersForGame(pokerbot, 'JIRA-1234')
    expect(spyAsyncServerCalls).to.contain('testuser5')
  })
})
