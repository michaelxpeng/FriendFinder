// Dependencies
var friends = require('../data/friends.js');

// Route that sends the user to the friends API page
module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function (req, res) {
    var friendScores = req.body.scores;
    var scoresArr = [];
    var closestMatch = 0;

    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friendScores.length; j++) {
        totalDifference += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(friendScores[j])));
      }
      scoresArr.push(totalDifference);
    }

    for (var i = 0; i < scoresArr.length; i++) {
      if (scoresArr[i] <= scoresArr[closestMatch]) {
        closestMatch = i;
      }
    }

    var newFriend = friends[closestMatch];
    res.json(newFriend);
    friends.push(req.body);
  });
};