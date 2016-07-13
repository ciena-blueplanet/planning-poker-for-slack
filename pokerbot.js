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
              text: "Choose a game to play",
              fallback: "You are unable to choose a game",
              callback_id: "wopr_game",
              color: "#3AA3E3",
              attachment_type: "default",
              actions: [
                  {
                      name: "chess",
                      text: "Chess",
                      type: "button",
                      value: "chess"
                  },

              ]
          }
      ]
  }

  return res.status(200).json(botPayload);
}

 module.exports=pokerbot;
