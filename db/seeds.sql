INSERT INTO department(department_name)
VALUES("Software Delivery Enablement"), 
("Data Engineering"), 
("Data Governance"),
("Finance"),
("Marketing"), 
("Salesforce");

INSERT INTO roles(title, salary, department_id)
VALUES ("Associate System Developer", 75000, 1),
("Analyst System Developer", 87000, 2),
("VP of Software Delivery Enablement", 350000, 3),
("Salesforce Developer", 810000, 4),
("Marketing Associate", 32000, 5),
("Data Analyst", 75000, 6);

INSERT INTO employees(first_name, last_name, manager_id, role_id)
VALUES ("Jessica", "Kamman", NULL, 2),
("John", "Doe", 1, 5),
("Vince", "Doe", 1,3 );