'use strict'

const https = require('https')
const ratingModel = require('./pokerbot').ratingModel
const jiraTimestampModel = require('./pokerbot').jiraTimestampModel
const channelName = require('./config/channel-name.json').name
const maxPlayTime = require('./config/schedule.json').maxPlayTime
const gameInterval = require('./config/schedule.json').gameInterval
// const auth = require('./auth')
let util = {}

/**
 * We are asking the slack server to give us channel information
 * @param {String} token - token id issued to us by slack-server
 * @returns {Promise} promise - channel info issued to us by slack-server
 */
util.setChannelInfo = function (token) {
  let extServerOptions = {
    hostname: 'slack.com',
    path: '/api/channels.list?token=' + token,
    method: 'GET'
  }
  console.log(extServerOptions)
  return new Promise((resolve, reject) => {
    let req = https.request(extServerOptions, (res) => {
      res.on('data', (d) => {
        process.stdout.write(d)
        let allchannels = JSON.parse(d.toString()).channels
        console.log('Number of channels : ' + allchannels.length)
        let channel
        for (let index = 0; index < allchannels.length; index++) {
          channel = allchannels[index]
          if (channel.name === channelName) {
            console.log('Found our channel detail.')
            // auth.channel = channel
            console.log(channel)
            resolve(channel)
          }
        }
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
  * @param {String} message - message to be post to channel
*/
util.postMessageToChannel = function (message) {
  // const token = require('./config/oauth.json').access_token
  // const channelId = 'C1MKJE5PY'
  const accessToken = require('./auth').oauthToken.access_token
  const channelId = require('./auth').channel.id

  console.log('posting message to channel')
  const queryParams = 'token=' + accessToken + '&channel=' + channelId + '&text=' + encodeURIComponent(message)
  let extServerOptions = {
    hostname: 'slack.com',
    path: '/api/chat.postMessage?' + queryParams,
    method: 'GET'
  }
  console.log(extServerOptions)
  let req = https.request(extServerOptions, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d)
      return JSON.parse(d)
    })
  })
  req.end()
  req.on('error', (error) => {
    console.error(error)
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
  let that = this
  setInterval(function () {
    let currentEpocTime = (new Date()).getTime()
    console.log('Running schedular to see all live planning. Current time : ' + currentEpocTime)
    let startedTimeOfJira, differenceTravel, seconds
    for (let prop in jiraTimestampModel) {
      startedTimeOfJira = jiraTimestampModel[prop]
      differenceTravel = currentEpocTime - startedTimeOfJira
      seconds = Math.floor((differenceTravel) / (1000))
      if (seconds > maxPlayTime) {
        console.log(ratingModel)
        console.log(jiraTimestampModel)
        delete ratingModel[prop]
        delete jiraTimestampModel[prop]
        console.log(ratingModel)
        console.log(jiraTimestampModel)
        that.postMessageToChannel('Message for poker planning.')
        return
      }
      let reminderMessage = 'Planning for JIRA ID ; ' +
       prop + ' is in progress. Please vote if you have not done yet. '
      that.postMessageToChannel(reminderMessage)
    }
  }, gameInterval * 1000)
}

module.exports = util
