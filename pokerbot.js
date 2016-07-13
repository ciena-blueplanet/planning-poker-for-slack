var pokerbot = {};

pokerbot.root = function (req, res, next) {

  var  botPayload = {
      text: "Please give your poker vote for JIRA-1111 ",
      attachments: [
          {
              response_type: "in_channel",
              text: "Please give your vote",
              fallback: "You are unable to choose a game",
              callback_id: "wopr_game",
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
                      name: "seven",
                      text: "7",
                      type: "button",
                      value: "7",
                      confirm: {
                        title: "Are you sure?",
                        text: "Are you sure you want to vote 7 ?",
                        ok_text: "Yes",
                        dismiss_text: "No"
                     }
                  },
                  {
                      name: "eleven",
                      text: "11",
                      type: "button",
                      value: "11",
                      confirm: {
                        title: "Are you sure?",
                        text: "Are you sure you want to vote 11 ?",
                        ok_text: "Yes",
                        dismiss_text: "No"
                     }
                  }

              ]
          }
      ]
  }

  return res.status(200).json(botPayload);
}

 module.exports=pokerbot;
