var db = require('../db');
var connection = db.connection;


module.exports = {
  messages: {
    // a function which produces all the messages
    get: function (callback) {
      // query into messages and grab all messages.
      let results = [];
      connection.query('SELECT * from messages', (error, messageResults, fields) => {
        if (error) {
          console.log('ERROR: problem accessing messages', error);
          callback(JSON.stringify(results));
        } else {
          // for each message in messageResults
          messageResults.forEach(message => {
            // convert message into result message format
            let messageText = message.message_text;
            connection.query(`SELECT name from rooms WHERE id=${message.room_id}`, (error, roomResults, fields) => {
              if (error) {
                console.log('Error accessing rooms', error);
                callback(JSON.stringify(results));
              } else {
                // checking if room exists
                if (roomResults.length === 1) {
                  // convert user into result message format
                  connection.query(`SELECT name from users WHERE id=${message.username_id}`, (error, userResults, fields) => {
                    if (error) {
                      console.log('Error accessing users', error);
                      callback(JSON.stringify(results));
                    } else {
                      // if user exists
                      if (userResults.length === 1) {
                        // create message object with the roomname, username and text
                        let message = {
                          roomname: roomResults[0].name,
                          username: userResults[0].name,
                          text: messageText
                        };

                        results.push(message);
                        if (messageResults.length === results.length) {
                          // returns an array of message objects with fields of username, text, roomname, serialized to a json string
                          callback(JSON.stringify(results));
                        }
                      }
                    }
                  });
                } else {
                  // TODO: handle case when there are no matching room names for id
                }
              }
            });
          });
        }
      });
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
              // get id for a given name for the foreign key
              connection.query(`SELECT * from users WHERE name='${message.username}'`, (error, userResults, fields) => {
                if (error) {
                  console.log('ERROR: problem accessing users table');
                  callback(false);
                } else {
                  // checking for existence for user
                  if (userResults.length === 1) {
                    // if user exists, then go ahead and add the message!
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
          // if the room already exists
          connection.query(`SELECT * from users WHERE name='${message.username}'`, (error, userResults, fields) => {
            if (error) {
              console.log('ERROR: problem accessing users table');
              callback(false);
            } else {
              // checking for existence for user
              if (userResults.length === 1) {
                // we have all we need, let's insert the new message!
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
