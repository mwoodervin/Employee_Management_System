const mysql = require("mysql");

// create connection with the database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root12345",
    database: "Employee_Management"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;