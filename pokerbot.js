var app = require('./app');
var pokerbot = {};

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

 var attachments = fs.readFileSync(path.join(__dirname + '/config/data.json'));
 console.log(attachments);
 var  response = {
  response_type: "in_channel",
  text: "Please give your poker vote for "+jiraId,
  attachments : attachments
 }
 return res.status(200).json(response);
}

pokerbot.vote = function (req, res, next) {
  var requestBody = JSON.parse(req.body.payload);
  console.log(requestBody);
  return res.status(200).json({'Response':'You have voted :'+requestBody.actions[0].value});
}

 module.exports=pokerbot;
