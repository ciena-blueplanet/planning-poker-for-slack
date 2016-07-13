var pokerbot = {};

pokerbot.root = function (req, res, next) {
  console.log(req.connection.remoteAddress);
  /*var botPayload = {
    text : 'Hello, World!'
  };*/
  console.log(res.statusCode);

  var  botPayload = {
      text: "Would you like to play a game?",
      attachments: [
          {
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
                      value: "1"
                  },
                  {
                      name: "three",
                      text: "3",
                      type: "button",
                      value: "3"
                  },
                  {
                      name: "five",
                      text: "5",
                      type: "button",
                      value: "5"
                  },
                  {
                      name: "seven",
                      text: "7",
                      type: "button",
                      value: "7"
                  },
                  {
                      name: "eleven",
                      text: "11",
                      type: "button",
                      value: "11",
                      confirm: {
                        title: "Are you sure?",
                        text: "Wouldn't you prefer to vote ?",
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
