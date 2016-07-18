var app = require('./app');
var fs = require('fs');
var path = require('path');
var UserRating = require('./model/userrating');


var pokerbot = {};
var ratingModel = {};

pokerbot.root = function (req, res, next) {
 var requestBodyTextArray =  req.body.text.split(" ");
 var jiraId = requestBodyTextArray[1] ? requestBodyTextArray[1] : undefined;
 var numberOfParticipants = isNaN(requestBodyTextArray[2]) ? -1 : requestBodyTextArray[2];

 if(jiraId===undefined || numberOfParticipants===-1){
  var responseForBadRequestFormat = {
   text: "Please enter the command in correct format e.g. /planning-poker start JIRA-1001 5"
  }
  return res.status(200).json(responseForBadRequestFormat);
 }

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
  if(!ratingModel.hasOwnProperty(userRating)){
    ratingModel.ratingModel = new Array();
  }
  ratingModel.ratingModel.push(userRating);
  return res.status(200).json(ratingModel);
}

 module.exports=pokerbot;
