function Players(jiraId,players) {
  this.jiraId = jiraId;
  this.players = (typeof players !== 'undefined') ? players :1;
}

// class methods
Players.prototype.toString = function playersToString() {
  var ret = 'Number of players  for JIRA ID : ' + this.jiraId + ' is '+this.players;
  return ret;
}

// export the class
module.exports = Players;
