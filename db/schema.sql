DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db

CREATE table viewDepartment(
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    department_name VARCHAR(25) NOT NULL,
);
CREATE table viewRoles(
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    job_titles VARCHAR(25) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    salary INTEGER
);
CREATE table viewEmployees(
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    job_titles VARCHAR(25) NOT NULL,
    salaries INTEGER NOT NULL,
    managers VARCHAR(25) NOT NULL,
);









