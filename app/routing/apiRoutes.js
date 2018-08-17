// Dependencies
var friends = require('../data/friends.js');

// Route that sends the user to the friends API page
module.exports = function(app) {
  app.get('/api/friends', function(req, res) {
    res.json(friends);
  });
};