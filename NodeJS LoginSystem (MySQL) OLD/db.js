var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "beest",
});

con.connect(function (err) {
  if (err) {
    //throw err;
    console.log(
      `|    Verbindung zur Datenbank    |
|       fehlgeschlagen!          |
\\--------------------------------/`
    );
  } else {
    console.log(
      `|    Verbindung zur Datenbank    |
|       erfolgreich!             |
\\--------------------------------/`
    );
  }
});

module.exports = con;
