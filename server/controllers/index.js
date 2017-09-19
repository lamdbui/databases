var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(data => {
        res.statusCode = 200;
        res.send(data);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(data => {
        res.statusCode = 200;
        res.send(data);
      });
    },
    post: function (req, res) {
      // req.body


      res.send('hello');

    }
  }
};
