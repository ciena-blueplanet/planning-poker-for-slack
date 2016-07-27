'use strict'

const UserRating = require('./model/user-rating')
const IN_CHANNEL = 'in_channel'
const EPHEMERAL = 'ephemeral'
const pokerbot = {}
pokerbot.ratingModel = {}    // It conatins the rating by each user. It is a map having key as unique Jira ID and value has an array comtaining ratingModel objects.
pokerbot.jiraTimestampModel = {}    // It conatins the key value pair for jira-id with timestamp.

/**
 * We have received a request to start or stop the poker planning
 * @param {Object} req - request object of the express module
 * @param {Object} res -  response object of the express module
 * @param {Object} next - next object of the express module
 * @returns {Object} - response object of the express module
*/
pokerbot.root = function (req, res, next) {
  const requestBodyTextArray = req.body.text.split(' ')
  const option = requestBodyTextArray[0] ? requestBodyTextArray[0] : undefined
  const jiraId = requestBodyTextArray[1] ? requestBodyTextArray[1] : undefined

 // Bad command syntex.
  if ((option !== 'start' && option !== 'stop') || jiraId.indexOf('JIRA-') < 0) {
    let responseForBadRequestFormat = {
      response_type: EPHEMERAL,
      text: 'Please enter the command in correct format e.g. /planning-poker start or stop JIRA-1001'
    }
    return res.status(200).json(responseForBadRequestFormat)
  }

 // Closing the unstarted Jira Planning.
  if (option === 'stop' && (!pokerbot.ratingModel.hasOwnProperty(jiraId))) {
    let responseForUnstartedJira = {
      response_type: EPHEMERAL,
      text: 'Planning for this JIRA ID is not started yet.'
    }
    return res.status(200).json(responseForUnstartedJira)
  }

 // Closing the planning activity.
  if (option === 'stop' && (pokerbot.ratingModel.hasOwnProperty(jiraId))) {
    let userRatingArray = pokerbot.ratingModel[jiraId]
    let responseText
    if (userRatingArray.length > 0) {
      // var sortedUserRatingArray = util.sortArrayBasedOnObjectProperty(userRatingArray, 'rating')
      responseText = 'Voting Result : '
      for (let ratingIndex = 0; ratingIndex < userRatingArray.length; ratingIndex++) {
        responseText = responseText + userRatingArray[ratingIndex].userName + ' voted : '
        responseText = responseText + userRatingArray[ratingIndex].rating + '. '
      }
      responseText = responseText + ' . Thanks for voting.'
    } else {
      responseText = 'No Voting for this JIRA yet. Closing the voting now.'
    }
    let responsePlanningComplete = {
      response_type: IN_CHANNEL,
      text: responseText
    }
    delete pokerbot.ratingModel[jiraId]
    delete pokerbot.jiraTimestampModel[jiraId]
    return res.status(200).json(responsePlanningComplete)
  }

 // Starting the duplicate jira.
  if (option === 'start' && (pokerbot.ratingModel.hasOwnProperty(jiraId))) {
    console.log(pokerbot.ratingModel)
    let responseDuplicateJira = {
      response_type: EPHEMERAL,
      text: 'Planning for this Jira : ' + jiraId + ' is already in progress'
    }
    return res.status(200).json(responseDuplicateJira)
  }

 // Start the Poker game.
  if (option === 'start' && (!pokerbot.ratingModel.hasOwnProperty(jiraId))) {
    let attachment1 = {
      text: '',
      color: '#3AA3E3',
      attachment_type: 'default',
      callback_id: 'planning-poker',
      actions: []
    }
    let attachment2 = {
      text: '',
      color: '#3AA3E3',
      attachment_type: 'default',
      callback_id: 'planning-poker',
      actions: []
    }
    const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55]
    for (var index = 0; index < fibonacci.length; index++) {
      let action = {}
      action.name = fibonacci[index]
      action.text = fibonacci[index]
      action.type = 'button'
      action.value = fibonacci[index]
      action.confirm = {
        title: 'Are you sure ?',
        text: 'Are you sure you want to vote ' + fibonacci[index] + '  ?',
        ok_text: 'Yes',
        dismiss_text: 'No'
      }
      if (index < 5) {
        attachment1.actions[attachment1.actions.length] = action
      } else {
        attachment2.actions[attachment2.actions.length] = action
      }
    }
    pokerbot.ratingModel[jiraId] = []
    let currentEpoc = (new Date()).getTime()
    console.log(currentEpoc)
    pokerbot.jiraTimestampModel[jiraId] = currentEpoc
    let response = {
      response_type: IN_CHANNEL,
      text: 'Please give your poker vote for ' + jiraId,
      attachments: [attachment1, attachment2]
    }
    return res.status(200).json(response)
  }
}

/**
 * We have received a vote from user
  * @param {Object} req - request object of the express module
 * @param {Object} res -  response object of the express module
 * @param {Object} next - next object of the express module
 * @returns {Object} - response object of the express module
*/
pokerbot.vote = function (req, res, next) {
  const requestBody = JSON.parse(req.body.payload)
  const vote = requestBody.actions[0].value
  const userName = requestBody.user.name
  const userId = requestBody.user.id
  const userRating = new UserRating(userId, userName, vote)
  const jiraId = 'JIRA-' + requestBody.original_message.text.split('JIRA-')[1]
  console.log(userRating)
  console.log(pokerbot.ratingModel)
  console.log(jiraId)
  pokerbot.ratingModel[jiraId].push(userRating)
  let responseEphemeral = {
    response_type: EPHEMERAL,
    text: 'You have voted ' + vote + ' for ' + jiraId,
    replace_original: false
  }
  return res.status(200).json(responseEphemeral)
}

module.exports = pokerbot
