INSERT INTO department(department_name)
VALUES("Software Delivery Enablement"), ("Data Engineering"), ("Data Governance"),("Finance"),("Marketing"), ("Salesforce");

INSERT INTO role(job_titles, salaries, department_id)
VALUES ("Associate System Developer", 75000, 1), ("Analyst System Developer", 87000, 2), ("VP of Software Delivery Enablement", 350000, 3), ("Salesforce Developer", 810000, 4), ("Marketing Associate", 32000, 5), ("Data Analyst", 75000, 6);

INSERT INTO employees(first_name, last_name, manager_id, role_id)
VALUES ("Jessica", "Kamman", "Analyst System Developer", 3, 4), ("John", "Doe", "Marketing Associate", 2, 1), ("Vince", "Doe", 3,4 );