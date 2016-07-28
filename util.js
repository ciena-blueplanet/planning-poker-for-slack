'use strict'

const https = require('https')

const maxPlayTime = require('./config/schedule.json').maxPlayTime
const gameInterval = require('./config/schedule.json').gameInterval
const token = require('./config/auth.json').access_token
const __ = require('lodash')

let util = {}

/**
 * We are asking the slack server to give us channel information
 * @param {String} token - token id issued to us by slack-server
 * @param {String} channelId - channel id
 * @returns {Promise} promise - channel info issued to us by slack-server
 */
util.getChannelInfo = function (token, channelId) {
  let extServerOptions = {
    hostname: 'slack.com',
    path: '/api/channels.info?token=' + token + '&channel=' + channelId,
    method: 'GET'
  }
  console.log(extServerOptions)
  return new Promise((resolve, reject) => {
    let req = https.request(extServerOptions, (res) => {
      res.on('data', (d) => {
        // process.stdout.write(d)
        resolve(JSON.parse(d.toString()).channel)
      })
    })
    req.end()
    req.on('error', (error) => {
      console.error(error)
      // return JSON.parse(error)
      reject(error)
    })
  })
}

/**
  * @param {String} token - token id issued to us by slack-server
  * @param {String} channelId - channel id
  * @param {String} message - message to be post to channel
*/
util.postMessageToChannel = function (token, channelId, message) {
  console.log('Util postMessage : begin')
  const queryParams = 'token=' + token + '&channel=' + channelId + '&text=' + encodeURIComponent(message)
  let extServerOptions = {
    hostname: 'slack.com',
    path: '/api/chat.postMessage?' + queryParams,
    method: 'GET'
  }
  console.log(extServerOptions)
  let req = https.request(extServerOptions, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d)
      console.log('Util postMessage : end')
      return JSON.parse(d)
    })
  })
  req.end()
  req.on('error', (error) => {
    console.error(error)
    console.log('Util postMessage : end')
    return JSON.parse(error)
  })
}

/**
 * Sorting the array of objects based on object property
  * @param {object} items - array of objects
 * @param {String} prop -   property name on bases of which sorting will be done
 * @returns {Array} - sorted array
*/
util.sortArrayBasedOnObjectProperty = function (items, prop) {
  console.log('Util sortArrayBasedOnObjectProperty : begin')
  console.log(items)
  let sortedArray = __.sortBy(items, function (item) {
    return item.prop
  })
  console.log(sortedArray)
  console.log('Util sortArrayBasedOnObjectProperty : end')
  return sortedArray
}

/**
 * Sorting the array of objects based on object property
 * @param {String} jiraId - JIRA id for which voting is in progress
 * @returns {String} - Voting result
*/
util.getVotingResult = function (jiraId) {
  console.log('Util getVotingResult : begin')
  const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55]
  let pokerDataModel = require('./pokerbot').pokerDataModel
  let userRatingArray = []
  if (pokerDataModel.hasOwnProperty(jiraId)) {
    let votingDataModel = pokerDataModel[jiraId].voting
    for (let prop in votingDataModel) {
      userRatingArray.push(votingDataModel[prop])
    }
  }
  console.log(userRatingArray)
  let sortedUserRatingArray = util.sortArrayBasedOnObjectProperty(userRatingArray, 'rating')
  console.log(sortedUserRatingArray)
  if (sortedUserRatingArray.length > 0) {
    let leastUserVotingModel = sortedUserRatingArray[0]
    console.log(leastUserVotingModel)
    let leastUserVoting = leastUserVotingModel.rating
    let maxUserVotingModel = sortedUserRatingArray[sortedUserRatingArray.length - 1]
    console.log(maxUserVotingModel)
    let maxUserVoting = maxUserVotingModel.rating
    let leastUserVotingIndex = fibonacci.indexOf(leastUserVoting)
    let maxUserVotingIndex = fibonacci.indexOf(maxUserVoting)
    let sum = 0
    for (let index = 0; index < sortedUserRatingArray.length; index++) {
      sum = sum + sortedUserRatingArray[index].rating
    }
    let avgRating = sum / sortedUserRatingArray.length
    console.log('Average rating : ' + avgRating)
    if (maxUserVotingIndex - leastUserVotingIndex > 1) {
      console.log('Util getVotingResult : end')
      return 'Minimum vote : ' + leastUserVotingModel.rating + ' by ' + leastUserVotingModel.userName +
     ', Maximum vote : ' + maxUserVotingModel.rating + ' by ' + maxUserVotingModel.userName +
     ', Average vote : ' + avgRating
    } else {
      console.log('All rating are in expected range')
      console.log('Util getVotingResult : end')
      return 'Average vote : ' + avgRating
    }
  } else {
    console.log('Util getVotingResult : end')
    return 'Average vote : 0'
  }
}

/**
 * This is the schedular which will run to send notification for each in-progress poker game.
*/
util.runSchedularForInProgressJira = function () {
  console.log('Util runScheduler : begin')
  let that = this
  setInterval(function () {
    let pokerDataModel = require('./pokerbot').pokerDataModel
    let currentEpocTime = (new Date()).getTime()
    console.log('Running schedular to see all live planning. Current time : ' + currentEpocTime)
    let startedTimeOfJira, differenceTravel, seconds, channelId, responseText
    for (let prop in pokerDataModel) {
      startedTimeOfJira = pokerDataModel[prop].craetedOn
      channelId = pokerDataModel[prop].channelId.id
      differenceTravel = currentEpocTime - startedTimeOfJira
      seconds = Math.floor((differenceTravel) / (1000))
      if (seconds > maxPlayTime) {
        responseText = util.getVotingResult(prop)
        responseText = responseText + ' Thanks for voting.'
        delete pokerDataModel[prop]
        that.postMessageToChannel(token, channelId, responseText)
      } else {
        let reminderMessage = 'Planning for JIRA ID ' +
         prop + ' is in progress. Please vote if you have not done yet. '
        that.postMessageToChannel(token, channelId, reminderMessage)
      }
    }
  }, gameInterval * 1000)
  console.log('Util runScheduler : end')
}

module.exports = util
