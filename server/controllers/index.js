var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get(data => {
        res.statusCode = 200;
        res.send(data);
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      var newMessage = req.body;
      models.messages.post(newMessage, (postSucceeded) => {
        if (postSucceeded) {
          console.log('Successfully added message');
          res.statusCode = 201;
          res.send();
        } else {
          console.log('ERROR adding message');
          res.statusCode = 400;
          res.send();
        }
      });
    }
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
