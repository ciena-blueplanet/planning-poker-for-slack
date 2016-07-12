var pokerbot = {};

pokerbot.root = function (req, res, next) {
  var botPayload = {
    text : 'Hello, World!'
  };
  return res.status(200).json(botPayload);
}

 module.exports=pokerbot;
