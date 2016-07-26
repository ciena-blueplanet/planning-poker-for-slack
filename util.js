'use strict'

const https = require('https')
var util = {}

/**
 * We are asking the slack server to give us channel information
 * @param {String} token - token id issued to us by slack-server
 * @param {String} channelId -  channelId for the channel
*/
util.getUserCountInChannel = function (token, channelId) {
  var extServerOptions = {
    hostname: 'slack.com',
    path: '/api/channels.info?token=' + token + '&channel=' + channelId,
    method: 'GET'
  }
  console.log(extServerOptions)
  var req = https.request(extServerOptions, (res) => {
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
  var sortedArray = items.sort(function (a, b) {
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

module.exports = util
