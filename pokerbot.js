var app = require('./app');
var fs = require('fs');
var path = require('path');
var UserRating = require('./model/userrating');

var pokerbot = {};
var ratingModel = {};    // It conatins the rating by each user. It is a map having key as unique Jira ID and value has an array comtaining ratingModel objects.

pokerbot.root = function (req, res, next) {
 var requestBodyTextArray =  req.body.text.split(" ");
 var option =  requestBodyTextArray[0] ? requestBodyTextArray[0] : undefined;
 var jiraId = requestBodyTextArray[1] ? requestBodyTextArray[1] : undefined;

 //Bad command syntex.
 if((option!='start' && option!='stop')||jiraId===undefined){
   var responseForBadRequestFormat = {
    text: "Please enter the command in correct format e.g. /planning-poker start or stop JIRA-1001"
   }
   return res.status(200).json(responseForBadRequestFormat);
 }

 //Closing the unstarted Jira Planning.
 if(option=='stop' && (!ratingModel.hasOwnProperty(jiraId))){
    var response_unstarted_jira = {
     text: "Planning for this JIRA ID is not started yet."
    }
    return res.status(200).json(response_unstarted_jira);
 }

 //Closing the planning activity.
 if(option=='stop' && (ratingModel.hasOwnProperty(jiraId))){
    var response_planning_complete = {
     text: "Planning for this JIRA ID is complete. Thanks for Playing."
    }
    // write the complete logic for average calculation.
    return res.status(200).json(response_planning_complete);
 }

 //Starting the duplicate jira.
 if(option=='start' && (ratingModel.hasOwnProperty(jiraId))){
  var  response_duplicate_jira = {
    text: "Planning for this Jira : "+jiraId+ " is already in progress"
   }
   return res.status(200).json(response);
 }

 //Star the Poker game.
 if(option=='start' && (!ratingModel.hasOwnProperty(jiraId))){
  console.log(ratingModel);
  ratingModel[jiraId] = new Array();
  var attachments = JSON.parse(fs.readFileSync(path.join(__dirname + '/config/data.json'), 'utf8'));
  var  response = {
   response_type: "in_channel",
    text: "Please give your poker vote for "+jiraId,
    attachments : attachments.attachments
   }
   return res.status(200).json(response);
 }

}

pokerbot.vote = function (req, res, next) {
  var requestBody = JSON.parse(req.body.payload);
  var vote = requestBody.actions[0].value;
  var userName = requestBody.user.name;
  var userId = requestBody.user.id;
  var userRating = new UserRating(userId,userName,vote);
  var jiraId = requestBody.original_message.text.split("JIRA-")[1];
  console.log(userRating);
  if(!ratingModel.hasOwnProperty(jiraId)){
    ratingModel[jiraId] = new Array();
  }
  ratingModel[jiraId].push(userRating);
  var  response_member = {
   response_type: "ephemeral",
   text: "You have voted "+vote+" for JIRA ID : "+jiraId,
   replace_original : false
  }
  var  response_channel = {
   response_type: "in_channel",
   text: "Voting for "+jiraId+ "is finished. Thanks for voting.",
   replace_original : true
  }
  return res.status(200).json(response_member);
}

module.exports=pokerbot;
