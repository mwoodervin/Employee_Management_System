-- populate database with starter content


-- Departments
INSERT INTO department (dept_name) VALUES ('Finance');
INSERT INTO department (dept_name) VALUES ('Sales/Marketing');
INSERT INTO department (dept_name) VALUES ('Engineering/Development');
INSERT INTO department (dept_name) VALUES ('Customer Support');
INSERT INTO department (dept_name) VALUES ('Legal');


-- Roles
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Team Manager', 160000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('House Counsel', 180000, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('Paralegal', 100000, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('Lead Developer', 150000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 80000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Salesperson', 80000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Accountant', 150000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('CFO', 180000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Customer Support Manager', 160000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Customer Liaison', 60000, 4);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jim', 'Jones',1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Lucy', 'Loo',2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mary', 'Lamb',3 ,2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Anna', 'Banana',4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Frank', 'Beans',5 ,4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sam', 'Iam',6 ,1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Franklin',7,8);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Abraham', 'Lincoln',8, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Liz', 'Lemon',9, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Super', 'Mann',10 ,9);


