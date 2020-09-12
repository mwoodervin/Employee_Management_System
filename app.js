const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const connection = require("./connection.js");

// function to start the program
function start() {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "Welcome to your Employee Manageer. \n What would you like to do?",
        choices:
            [
                "VIEW departments",
                "VIEW roles",
                "VIEW employees",
                "UPDATE employee role",
                "ADD department",
                "ADD role",
                "ADD employee",
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

                case "ADD department":
                    addDepartment();
                    break;

                case "ADD role":
                    addRole();
                    break;

                case "ADD employee":
                    addRole();
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
    const query = "SELECT roles.id id, roles.title, roles.salary, department.dept_name deptname FROM roles LEFT JOIN department ON roles.department_id = department.id";
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function viewEmployees() {
    const query = "SELECT employee.id, concat(employee.first_name, ' ', employee.last_name) employee, roles.title role FROM employee LEFT JOIN roles ON employee.role_id = role.id";
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "newdept",
        message: "What department do you want to add?"

    })
        .then(function (answers) {
            const query = 'INSERT INTO department (name) VALUES (?)';
            connection.query(query, answers.newdept, function (err, results) {
                if (err) throw err;
                console.log("department added");
                start();
            });
        })
}

function addRole() {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;

        inquirer.prompt([{
            type: "input",
            name: "newrole",
            message: "What role do you want to add?"

        },
        {
            type: "input",
            name: "newsalary",
            message: "What is the salary for this role?"
        },
        {
            type: "list",
            name: "roledept",
            message: "What department is the new role in?",
            choices: results.map(function (deptrow) {
                return {
                    name: deptrow.name,
                    value: deptrow.id
                }
            })
        }])
            .then(function (answers) {
                console.log(answers);
                const query = 'INSERT INTO role (??) VALUES (?, ?, ?)';
                connection.query(query, [["title", "salary", "department_id"], answers.newrole, answers.newsalary, answers.roledept], function (err, results) {
                    if (err) throw err;
                    console.log("role added");
                    start();
                });
            })
    });
}

function exit() {

    inquirer.prompt({
        type: "list",
        name: "restart",
        message: "Are you sure you want to exit this Employee Management application?",
        choices:
            [
                "YES - I am sure.",
                "NO - take me back to view options."
            ]

    })
        .then(function (answer) {
            if (answer.restart == "YES - I am sure.") {
                console.log("Thank you for using this application. Good bye!");
            }
            else {
                start();
            }
        })
}
    // call the start function 
    start();

