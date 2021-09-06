DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE table department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    department_name VARCHAR(50) NOT NULL
);
CREATE table roles(
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE table employees(
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER,
    FOREIGN Key (role_id) REFERENCES roles(id),
    manager_id INTEGER,
    FOREIGN Key (manager_id) REFERENCES employees(id)
);









