var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'plantlife',
  database: 'chat',
});


connection.connect((err) => {
  if (err) {
    console.log('Error!', err.stack);
  } else {
    console.log('Connected as ' + connection.threadId);
  }
});



exports.connection = connection;
exports.closeConnection = connection.end;




