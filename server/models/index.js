var db = require('../db');
var connection = db.connection;


module.exports = {
  messages: {
    get: function () {

    }, // a function which produces all the messages
    post: function () {

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      connection.query('SELECT name FROM users', (error, results, fields) => {
        let queryResults = [];
        console.log(results);
        results.forEach((row) => {
          queryResults.push({'username': row.name});
        });
        callback(queryResults);
      });
    },
    post: function (username, callback) {
      connection.query(`INSERT INTO users values(null, '${username}')`, (error, results, fields) => {
        if (error) {
          console.log('ERROR: problem inserting user -', username);
          callback(false);
        }
        console.log(`SUCCESS: '${username}' successfully added into table`);
        callback(true);
      });
    }
  }
};
