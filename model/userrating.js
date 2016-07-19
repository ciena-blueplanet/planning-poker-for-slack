function UserRating(userid,userName,rating) {
  this.userid = userid;
  this.userName = userName;
  this.rating = (typeof rating !== 'undefined') ? rating :1;
}

// class methods
UserRating.prototype.toString = function userRatingToString() {
  var ret = 'UserRating of ' + this.userName + 'with userId : '+this.userid+' is  ' + this.rating;
  return ret;
}

// export the class
module.exports = UserRating;
