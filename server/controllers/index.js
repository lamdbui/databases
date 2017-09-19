var models = require('../models');
// var 

module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {} // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // res.send('hello');

    },
    post: function (req, res) {
      // req.body


      res.send('hello');

    }
  }
};

