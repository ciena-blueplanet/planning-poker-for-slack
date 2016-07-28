'use strict'

const https = require('https')

const maxPlayTime = require('./config/schedule.json').maxPlayTime
const gameInterval = require('./config/schedule.json').gameInterval

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
  let sortedArray = items.sort(function (a, b) {
    if (a.prop > b.prop) {
      return 1
    }
    if (a.prop < b.prop) {
      return -1
    }
   // a must be equal to b
    return 0
  })
  return sortedArray
}

/**
 * This is the schedular which will run to send notification for each in-progress poker game.
*/
util.runSchedularForInProgressJira = function () {
  console.log('Util runScheduler : begin')
  let that = this
  setInterval(function () {
    const token = require('./auth').token.access_token
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
        let votingMap = pokerDataModel[prop].voting
        let keys = Object.keys(votingMap)
        if (keys.length > 0) {
          responseText = 'Voting Result : '
          for (let ratingIndex = 0; ratingIndex < keys.length; ratingIndex++) {
            responseText = responseText + votingMap[keys[ratingIndex]].userName + ' voted : '
            responseText = responseText + votingMap[keys[ratingIndex]].rating + '. '
          }
        } else {
          responseText = 'No Voting for this JIRA yet. Closing the voting now.'
        }
        responseText = responseText + ' . Thanks for voting.'
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
