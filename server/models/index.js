var db = require('../db');


module.exports = {
  messages: {
    get: function () {
      // res.send()

    }, // a function which produces all the messages
    post: function () {
      res.send('hello');

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {

    },
    post: function () {
      res.send('hello');
    }
  }
};

