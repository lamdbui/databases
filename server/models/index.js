var db = require('../db');
var connection = db.connection;


module.exports = {
  messages: {
    get: function (callback) {

    }, // a function which produces all the messages
    post: function (message, callback) {
      // TODO: create room entry, if does not exist

      // if  length of (select * from rooms where rooms.name=message.roomname) === 0
        // create our room and add to rooms table

      connection.query(`SELECT * from rooms WHERE name='${message.roomname}'`, (error, results, fields) => {
        if (error) {
          console.log('ERROR: problem accessing rooms table');
          // console.log('ERROR: problem creating room -', message.roomname);
          //callback(false);
        }
        if (results.length === 0) {
          connection.query(`INSERT INTO rooms VALUES(null, '${message.roomname}')`, (error, results, fields) => {
            if (error) {
              console.log('ERROR: problem creating room -', message.roomname);
              //callback(false);
            } else {
              console.log('room results:', results);
              connection.query(`INSERT INTO messages VALUES(null, '${message.username}', '${message.message}', '${message.roomname}')`, (error, results, fields) => {
                if (error) {
                  console.log('ERROR: problem inserting message -', message, 'with error:', error);
                  callback(false);
                }
                console.log(`SUCCESS: '${message}' successfully added into table`);
                callback(true);
              });
            }
          });
        } else {
          connection.query(`INSERT INTO messages VALUES(null, '${message.username}', '${message.message}', '${message.roomname}')`, (error, results, fields) => {
            if (error) {
              console.log('ERROR: problem inserting message -', message, 'with error2:', error);
              callback(false);
            }
            console.log(`SUCCESS: '${message}' successfully added into table`);
            callback(true);
          });
        }
        // console.log(`SUCCESS: '${message.roomname}' successfully added into table`);
        //callback(true);
      });

      // connection.query(`INSERT INTO messages VALUES(null, '${message.username}', '${message.message}', '${message.roomname}')`, (error, results, fields) => {
      //   if (error) {
      //     console.log('ERROR: problem inserting message -', message);
      //     callback(false);
      //   }
      //   console.log(`SUCCESS: '${message}' successfully added into table`);
      //   callback(true);
      // });
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
