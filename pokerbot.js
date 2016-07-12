var pokerbot = {};

pokerbot.root = function (req, res, next) {
  console.log(req);
  var botPayload = {
    text : 'Hello, World!'
  };
  return res.status(200).json(botPayload);
}

 module.exports=pokerbot;
