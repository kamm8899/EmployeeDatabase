DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db

CREATE table department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    department_name VARCHAR(25) NOT NULL,
);
CREATE table roles(
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    job_titles VARCHAR(25) NOT NULL,
    department_name VARCHAR(25) NOT NULL,
    salary INTEGER
    department_id INTEGER
);
CREATE table employees(
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    role_id VARCHAR(25) NOT NULL,
    salaries INTEGER NOT NULL,
    manager_id VARCHAR(25) NOT NULL,
);









