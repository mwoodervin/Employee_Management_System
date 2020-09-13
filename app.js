const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const connection = require("./connection.js");

// function to start the program
function start() {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "Welcome to your Employee Manager. \n What would you like to do? \n",
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
                    getNewEmployee();
                    break;

                case "EXIT":
                    exit();
                    break;
            }
        });
}

function viewDepartments() {
    console.log('\n-----  DEPARTMENTS -----')
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function viewRoles() {
    console.log('\n----- ROLES -----')
    const query = "SELECT roles.id ID, roles.title Title, roles.salary Base Salary, department.dept_name Department FROM roles LEFT JOIN department ON roles.department_id = department.id";
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

function viewEmployees() {
    console.log('\n----- EMPLOYEES -----')
    const query = "SELECT employee.id ID, concat(employee.first_name, ' ', employee.last_name) Employee, roles.title Role FROM employee LEFT JOIN roles ON employee.role_id = roles.id";
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
                console.log("A new department has been added.");
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
                const query = 'INSERT INTO roles (??) VALUES (?, ?, ?)';
                connection.query(query, [["title", "salary", "department_id"], answers.newrole, answers.newsalary, answers.roledept], function (err, results) {
                    if (err) throw err;
                    console.log("A new role has been added.");
                    start();
                });
            })
    });
}
function getNewEmployee() {
    let newEmployeeInfo = [];
        connection.query("SELECT * FROM employee", async function (err, results) {
            try {
            const newName = await
                inquirer.prompt([{
                    type: "input",
                    name: "firstname",
                    message: "What is the employee's first name?"
                },
                {
                    type: "input",
                    name: "lastname",
                    message: "What is the employee's last name?"
                }])
                .then(function (answers) {
                    newEmployeeInfo.push(answers.firstname, answers.lastname);
                    console.log(`with names ${newEmployeeInfo}`);
                    });
            } catch(err) {
                console.log(err);
            }
            connection.query("SELECT * FROM roles", async function (err, roleresults) {
                try {
                const newRole = await
                    inquirer.prompt([{
                        type: "list",
                        name: "newemprole",
                        message: "What is the employee's role?",
                        choices: roleresults.map(function (rolerow) {
                            return {
                                name: rolerow.title,
                                value: rolerow.id
                            }
                        })
                    }])
                    .then(function (answers) {
                        newEmployeeInfo.push(answers.newemprole);
                        console.log(`with role ${newEmployeeInfo}`);
                    });
                } catch(err) {
                    console.log(err);
                }
                connection.query("SELECT * FROM employee WHERE manager_id IS NULL ", async function (err, mgrresults) {
                    try {
                        const newManager = await inquirer.prompt([{
                        type: "list",
                        name: "newempmgr",
                        message: "Who is the employee's manager?",
                        choices: mgrresults.map(function (mgrrow) {
                            return {
                                name: `${mgrrow.first_name} ${mgrrow.last_name}`,
                                value: mgrrow.manager_id
                            }
                        })
                    }])
                        .then(function (answers) {
                            newEmployeeInfo.push(answers.newempmgr);
                            console.log(`with manager ${newEmployeeInfo}`);
                            const query = 'INSERT INTO employee (??) VALUES (?, ?, ?, ?)';
                            connection.query(query, [["first_name", "last_name", "role_id", "manager_id"], newEmployeeInfo[0], newEmployeeInfo[1], newEmployeeInfo[2], newEmployeeInfo[3]], function (err, results) {
                                if (err) throw err;
                                console.log("A new employee has been added.");
                                start();
                            });
                        });
                    } catch(err) {
                        console.log(err);
                    }
                });
            });
        });
}

// function for EXIT option
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


// }
// call the start function 
start();
