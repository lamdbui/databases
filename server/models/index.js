var db = require('../db');
var connection = db.connection;


module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (callback) {

    },
    // a function which can be used to insert a message into the database
    post: function (message, callback) {
      connection.query(`SELECT * from rooms WHERE name='${message.roomname}'`, (error, roomResults, fields) => {
        if (error) {
          console.log('ERROR: problem accessing rooms table');
          callback(false);
          return;
        }
        // checking for existence for room
        if (roomResults.length === 0) {
          connection.query(`INSERT INTO rooms VALUES(null, '${message.roomname}')`, (error, results, fields) => {
            if (error) {
              console.log('ERROR: problem creating room -', message.roomname);
              callback(false);
            } else {
              connection.query(`SELECT * from users WHERE name='${message.username}'`, (error, userResults, fields) => {
                if (error) {
                  console.log('ERROR: problem accessing users table');
                  callback(false);
                } else {
                  // checking for existence for user
                  if (userResults.length === 1) {
                    connection.query(`INSERT INTO messages VALUES(null, ${userResults[0].id}, '${message.message}', ${roomResults[0].id})`, (error, results, fields) => {
                      if (error) {
                        console.log('ERROR: problem inserting message -', message, 'with error:', error);
                        callback(false);
                      } else {
                        console.log(`SUCCESS: '${message}' successfully added into table`);
                        callback(true);
                      }
                    });
                  }
                }
              });
            }
          });
        } else {
          connection.query(`SELECT * from users WHERE name='${message.username}'`, (error, userResults, fields) => {
            if (error) {
              console.log('ERROR: problem accessing users table');
              callback(false);
            } else {
              // checking for existence for user
              if (userResults.length === 1) {
                connection.query(`INSERT INTO messages VALUES(null, ${userResults[0].id}, '${message.message}', ${roomResults[0].id})`, (error, results, fields) => {
                  if (error) {
                    console.log('ERROR: problem inserting message -', message, 'with error:', error);
                    callback(false);
                  } else {
                    console.log(`SUCCESS: '${message}' successfully added into table`);
                    callback(true);
                  }
                });
              }
            }
          });
        }
      });
    }
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
      connection.query(`INSERT INTO users VALUES(null, '${username}')`, (error, results, fields) => {
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
