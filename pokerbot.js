var pokerbot = {};

pokerbot.root = function (req, res, next) {
  console.log(req.connection.remoteAddress);
  var botPayload = {
    text : 'Hello, World!'
  };
  console.log(res.statusCode);

  var  botPayload = {
      "text": "Would you like to play a game?",
      "attachments": [
          {
              "text": "Choose a game to play",
              "fallback": "You are unable to choose a game",
              "callback_id": "wopr_game",
              "color": "#3AA3E3",
              "attachment_type": "default",
              "actions": [
                  {
                      "name": "chess",
                      "text": "Chess",
                      "type": "button",
                      "value": "chess"
                  },
                  {
                      "name": "maze",
                      "text": "Falken's Maze",
                      "type": "button",
                      "value": "maze"
                  },
                  {
                      "name": "war",
                      "text": "Thermonuclear War",
                      "style": "danger",
                      "type": "button",
                      "value": "war",
                      "confirm": {
                          "title": "Are you sure?",
                          "text": "Wouldn't you prefer a good game of chess?",
                          "ok_text": "Yes",
                          "dismiss_text": "No"
                      }
                  }
              ]
          }
      ]
  }

  return res.status(200).json(botPayload);
}

 module.exports=pokerbot;
