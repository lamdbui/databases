var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get(data => {
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(data);
      });
    },
    // a function which handles posting a message to the database
    post: function (req, res) {
      var newMessage = req.body;
      models.messages.post(newMessage, postSucceeded => {
        if (postSucceeded) {
          console.log('Successfully added message');
          res.status(201);
          res.set('Content-Type', 'text/html');
          res.send();
        } else {
          console.log('ERROR adding message');
          res.status(400);
          res.send();
        }
      });
    }
  },

  users: {
    // a function which handles a get request for all users
    get: function (req, res) {
      models.users.get(data => {
        res.status(200);
        res.set('Content-Type', 'application/json');
        res.send(data);
      });
    },
    // a function which handles posting a user to the database
    post: function (req, res) {
      var newUser = req.body;
      models.users.post(newUser.username, postSucceeded => {
        if (postSucceeded) {
          console.log('Successfully added user');
          res.status(201);
          res.set('Content-Type', 'text/html');
          res.send();
        } else {
          console.log('ERROR adding user');
          res.status(400);
          res.send();
        }
      });
    }
  }
};
