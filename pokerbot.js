'use strict'

const UserRating = require('./model/user-rating')
const IN_CHANNEL = 'in_channel'
const EPHEMERAL = 'ephemeral'

var pokerbot = {}
var ratingModel = {}    // It conatins the rating by each user. It is a map having key as unique Jira ID and value has an array comtaining ratingModel objects.

pokerbot.root = function (req, res, next) {
  var requestBodyTextArray = req.body.text.split(' ')
  var option = requestBodyTextArray[0] ? requestBodyTextArray[0] : undefined
  var jiraId = requestBodyTextArray[1] ? requestBodyTextArray[1] : undefined

 // Bad command syntex.
  if ((option !== 'start' && option !== 'stop') || jiraId.indexOf('JIRA-') < 0) {
    var responseForBadRequestFormat = {
      response_type: EPHEMERAL,
      text: 'Please enter the command in correct format e.g. /planning-poker start or stop JIRA-1001'
    }
    return res.status(200).json(responseForBadRequestFormat)
  }

 // Closing the unstarted Jira Planning.
  if (option === 'stop' && (!ratingModel.hasOwnProperty(jiraId))) {
    console.log(ratingModel)
    var responseForUnstartedJira = {
      response_type: EPHEMERAL,
      text: 'Planning for this JIRA ID is not started yet.'
    }
    return res.status(200).json(responseForUnstartedJira)
  }

 // Closing the planning activity.
  if (option === 'stop' && (ratingModel.hasOwnProperty(jiraId))) {
    console.log(ratingModel)

    var responsePlanningComplete = {
      response_type: IN_CHANNEL,
      text: 'Planning for this JIRA ID is complete. Thanks for Playing.'
    }
    // write the complete logic for average calculation.
    var userRatingArray = ratingModel[jiraId]
    console.log(userRatingArray)
    // var sortedUserRatingArray = util.sortArrayBasedOnObjectProperty(userRatingArray,'rating');
    // console.log(userRatingArray);

    delete ratingModel[jiraId]
    console.log(ratingModel)
    return res.status(200).json(responsePlanningComplete)
  }

 // Starting the duplicate jira.
  if (option === 'start' && (ratingModel.hasOwnProperty(jiraId))) {
    console.log(ratingModel)
    var responseDuplicateJira = {
      response_type: EPHEMERAL,
      text: 'Planning for this Jira : ' + jiraId + ' is already in progress'
    }
    return res.status(200).json(responseDuplicateJira)
  }

 // Start the Poker game.
  if (option === 'start' && (!ratingModel.hasOwnProperty(jiraId))) {
    console.log(ratingModel)
    var attachment1 = {
      text: '',
      color: '#3AA3E3',
      attachment_type: 'default',
      callback_id: 'planning-poker',
      actions: []
    }
    var attachment2 = {
      text: '',
      color: '#3AA3E3',
      attachment_type: 'default',
      callback_id: 'planning-poker',
      actions: []
    }
    const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55]
    for (var index = 0; index < fibonacci.length; index++) {
      var action = {}
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
    ratingModel[jiraId] = []
    var response = {
      response_type: IN_CHANNEL,
      text: 'Please give your poker vote for ' + jiraId,
      attachments: [attachment1, attachment2]
    }
    return res.status(200).json(response)
  }
}

pokerbot.vote = function (req, res, next) {
  var requestBody = JSON.parse(req.body.payload)
  var vote = requestBody.actions[0].value
  var userName = requestBody.user.name
  var userId = requestBody.user.id
  var userRating = new UserRating(userId, userName, vote)
  var jiraId = requestBody.original_message.text.split('JIRA-')[1]
  console.log(userRating)
  if (!ratingModel.hasOwnProperty(jiraId)) {
    ratingModel[jiraId] = []
  }
  ratingModel[jiraId].push(userRating)
  var responseEphemeral = {
    response_type: EPHEMERAL,
    text: 'You have voted ' + vote + ' for JIRA ID : ' + jiraId,
    replace_original: false
  }
  /*
    var responseChannel = {
    response_type: IN_CHANNEL,
    text: 'Voting for ' + jiraId + 'is finished. Thanks for voting.',
    replace_original: true
    }
  */
  return res.status(200).json(responseEphemeral)
}

module.exports = pokerbot
