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


var  response = {
    response_type: "in_channel",
    text: "Please give your poker vote for "+jiraId,
    attachments: [
        {
            text: "Please give your vote",
            color: "#3AA3E3",
            attachment_type: "default",
            actions: [
                {
                    name: "one",
                    text: "1",
                    type: "button",
                    value: "1",
                    confirm: {
                      title: "Are you sure?",
                      text: "Are you sure you want to vote 1 ?",
                      ok_text: "Yes",
                      dismiss_text: "No"
                   }
                },
                {
                    name: "two",
                    text: "2",
                    type: "button",
                    value: "2",
                    confirm: {
                      title: "Are you sure?",
                      text: "Are you sure you want to vote 2 ?",
                      ok_text: "Yes",
                      dismiss_text: "No"
                   }
                },
                {
                    name: "three",
                    text: "3",
                    type: "button",
                    value: "3",
                    confirm: {
                      title: "Are you sure?",
                      text: "Are you sure you want to vote 3 ?",
                      ok_text: "Yes",
                      dismiss_text: "No"
                   }
                },
                {
                    name: "five",
                    text: "5",
                    type: "button",
                    value: "5",
                    confirm: {
                      title: "Are you sure?",
                      text: "Are you sure you want to vote 5 ?",
                      ok_text: "Yes",
                      dismiss_text: "No"
                   }
                },
                {
                    name: "eight",
                    text: "8",
                    type: "button",
                    value: "8",
                    confirm: {
                      title: "Are you sure?",
                      text: "Are you sure you want to vote 8 ?",
                      ok_text: "Yes",
                      dismiss_text: "No"
                   }
                },
                {
                    name: "thirteen",
                    text: "13",
                    type: "button",
                    value: "11",
                    confirm: {
                      title: "Are you sure?",
                      text: "Are you sure you want to vote 13 ?",
                      ok_text: "Yes",
                      dismiss_text: "No"
                   }
                },
                {
                    name: "tweenty0ne",
                    text: "21",
                    type: "button",
                    value: "21",
                    confirm: {
                      title: "Are you sure?",
                      text: "Are you sure you want to vote 21 ?",
                      ok_text: "Yes",
                      dismiss_text: "No"
                   }
                }


            ]
        }
    ]
}

return res.status(200).json(response);
}

 module.exports=pokerbot;
