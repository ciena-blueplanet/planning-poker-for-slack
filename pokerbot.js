var app = require('./app');
var fs = require('fs');
var path = require('path');
var UserRating = require('./model/userrating');

var pokerbot = {};
var ratingModel = {};    // It conatins the rating by each user.
var playersModel = {};  //it conatins the number of players for jira.

pokerbot.root = function (req, res, next) {
 var requestBodyTextArray =  req.body.text.split(" ");
 var option =  requestBodyTextArray[0] ? requestBodyTextArray[0] : undefined;
 var jiraId = requestBodyTextArray[1] ? requestBodyTextArray[1] : undefined;
 if((option!='start' && option!='stop')||jiraId===undefined){
   var responseForBadRequestFormat = {
    text: "Please enter the command in correct format e.g. /planning-poker start JIRA-1001"
   }
   return res.status(200).json(responseForBadRequestFormat);
 }


 var numberOfParticipants = isNaN(requestBodyTextArray[2]) ? 0 : requestBodyTextArray[2];

 //if(jiraId===undefined || numberOfParticipants===0){
 /*if(jiraId===undefined || option===0){
  var responseForBadRequestFormat = {
   text: "Please enter the command in correct format e.g. /planning-poker start JIRA-1001 5"
  }
  return res.status(200).json(responseForBadRequestFormat);
}*/

 //var players = new Players(jiraId,numberOfParticipants);
 if(option=='start' && playersModel.hasOwnProperty(jiraId)){
   var responseForDuplicateJira = {
    text: "Planning for this JIRA ID is already in progress."
   }
   return res.status(200).json(responseForDuplicateJira);
 }

 if(option=='stop' && (!playersModel.hasOwnProperty(jiraId))){
   var responseForDuplicateJira = {
    text: "Planning for this JIRA ID is not started yet."
   }
   return res.status(200).json(responseForDuplicateJira);
 }


 playersModel[jiraId] = numberOfParticipants;
 console.log(playersModel);
 var attachments = JSON.parse(fs.readFileSync(path.join(__dirname + '/config/data.json'), 'utf8'));
 console.log(attachments);
 var  response = {
  response_type: "in_channel",
  text: "Please give your poker vote for "+jiraId,
  attachments : attachments.attachments
 }
 return res.status(200).json(response);
}

pokerbot.vote = function (req, res, next) {
  var requestBody = JSON.parse(req.body.payload);
  console.log(requestBody);
  var vote = requestBody.actions[0].value;
  var user = requestBody.user.name;
  var userRating = new UserRating(user,vote);
  var jiraId = requestBody.original_message.text.split("JIRA-")[1];
  console.log('JIRAID : '+jiraId);
  console.log(userRating);
  if(!ratingModel.hasOwnProperty(jiraId)){
    ratingModel[jiraId] = new Array();
  }
  ratingModel[jiraId].push(userRating);
  var  response_member = {
   response_type: "ephemeral",
   text: "You have voted "+vote" for JIRA ID : "+jiraId,
   replace_original : false
  }
  var  response_channel = {
   response_type: "in_channel",
   text: "Voting for "+jiraId+ "is finished. Thanks for voting.",
   replace_original : true
  }
  if(true){
    return res.status(200).json(response_member);
  }else{
    return res.status(200).json(response_channel);
  }

}



 module.exports=pokerbot;
