function UserRating(user,rating) {
  this.user = user;
  this.rating = (typeof rating !== 'undefined') ? rating :1;
}

// class methods
UserRating.prototype.toString = function userRatingToString() {
  var ret = 'UserRating of ' + this.user + ' is  ' + this.rating;
  return ret;
}

// export the class
module.exports = UserRating;
