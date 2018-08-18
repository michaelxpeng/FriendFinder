// Dependencies
var artists = require('../data/friends.js');

// Route that sends the user to the artists API page
module.exports = function (app) {
  app.get('/api/artists', function (req, res) {
    res.json(artists);
  });

  app.post('/api/artists', function (req, res) {
    var artistScores = req.body.scores;
    var scoresArr = [];
    var closestMatch = 0;

    for (var i = 0; i < artists.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < artistScores.length; j++) {
        totalDifference += (Math.abs(parseInt(artists[i].scores[j]) - parseInt(artistScores[j])));
      }
      scoresArr.push(totalDifference);
    }

    for (var i = 0; i < scoresArr.length; i++) {
      if (scoresArr[i] <= scoresArr[closestMatch]) {
        closestMatch = i;
      }
    }

    var newArtist = artists[closestMatch];
    res.json(newArtist);
    
    // no need to push new entry if only searching for matches for bands
    // artists.push(req.body);
  });
};