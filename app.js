const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root12345",
    database: "Employee_Management"
  });
  
function start() {
    return inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["VIEW employees by manager", "UPDATE employee managers","DELETE departments"]
        },
        {
            type: "list",
            name: "view",
            message: "Select a manager",
            choices: [{
                name: "Mary Ervin",
                value: "Manager", 
                short: "Mary"}, 
                {
                name: "Miriam Ervin", 
                value: "Manager", 
                short: "Miriam"}],
            when: (answers) => answers.action === "VIEW employees by manager"
        }
    ]);
}

  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  