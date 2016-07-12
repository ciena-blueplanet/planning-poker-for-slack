var pokerbot = {};

pokerbot.root = function (req, res, next) {
  console.log(req.connection.remoteAddress);
  var botPayload = {
    text : 'Hello, World!'
  };
  console.log(res.statusCode);
  return res.status(200).json(botPayload);
}

 module.exports=pokerbot;
