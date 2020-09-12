### Schema

DROP DATABASE IF EXISTS Employee_Management;

CREATE DATABASE Employee_Management;
USE Employee_Management;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
	dept_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	role_id int NOT NULL,
	manager_id int,
	PRIMARY KEY (id)
);
CREATE TABLE roles
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(255) NOT NULL,
	salary decimal(10,0),
	department_id int NOT NULL,
	PRIMARY KEY (id)
);