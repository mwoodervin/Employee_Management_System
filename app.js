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
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices:
            [
                "VIEW departments",
                "VIEW roles",
                "VIEW employees",
                "UPDATE employee managers",
                "DELETE departments",
                "EXIT"
            ]

    })
        .then(function (answer) {
            switch (answer.action) {
                case "VIEW departments":
                    viewDepartments();
                    break;

                case "VIEW roles":
                    viewRoles();
                    break;

                case "VIEW employees":
                    viewEmployees();
                    break;

                case "EXIT":
                    exit();
                    break;


            }

        });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function viewRoles() {
    const query = "SELECT role.id, role.title, role.salary, department.name deptname FROM role LEFT JOIN department ON role.department_id = department.id";
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function viewEmployees() {
    const query = "SELECT employee.id, concat(employee.first_name, ' ', employee.last_name) employee, role.title role FROM employee LEFT JOIN role ON employee.role_id = role.id";
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function exit() {

    return inquirer.prompt({
        type: "list",
        name: "restart",
        message: "Are you sure you want to exit this Employee Management application?",
        choices:
            [
                "YES - I am sure.",
                "NO - take me back to view options."
            ]

            

    })
    .then(function(answer) {
        if (answer.restart == "YES - I am sure.") {
            console.log("Thank you for using this application. Good bye!");
        }
        else {
        start();
        }
    })
}





// {
//     type: "list",
//     name: "managers",
//     message: "Select a manager",
//     choices: function() {
//         var managerArray = [];
//         for (var i=0; i < results.length; i++) {
//             if (results[i].role_id === 5) {
//                 managerArray.push(results[i].first_name);
//             }
//         } 
//         return(managerArray);
//     },
//     when: (answers) => answers.action === "VIEW employees by manager"
// }



// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

