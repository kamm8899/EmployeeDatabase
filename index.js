const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

//create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db",
});

function startApplication() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Which would you like to do?",
        choices: [
          "View all roles",
          "View all Employees",
          "Add a Department",
          "Add an Employee",
          "Update an Employee",
          "View Department",
          "Add Employee",
          "Add role",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((choiceAnswers) => {
      console.log(choiceAnswers);
      if (choiceAnswers.choices === "View all roles") {
        viewRoles();
      }
      if (choiceAnswers.choices === "View all Employees") {
        viewEmployees();
      }
      if (choiceAnswers.choices === "View Department") {
        viewDepartment();
      }
      if (choiceAnswers.choices === "Add a Department") {
        addDepartment();
      }
      if (choiceAnswers.choices === "Add an Employee") {
        addEmployee();
      }
      if (choiceAnswers.choices === "Update an Employee Role") {
        updateEmployee();
      }
      if (choiceAnswers.choices === "Add Employee") {
        addEmployee();
      }
      if (choiceAnswers.choices === "Add role") {
        addRole();
      }
      if(choiceAnswers.choices === "Exit"){
        process.exit(1);
      }
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM department;", (err, result) => {
    if (err) {
      console.log("could not find results");
    }
    console.table(result);
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles;", (err, result) => {
    if (err) {
      console.log("couldn not find results");
    }
    console.table(result);
  });
}
//missing salary title, department_id,
function viewEmployees() {
  let employeeQuery = `SELECT employees.id,
    employees.first_name,
    employees.last_name,
    roles.title,
    employees.manager_id,
    department.department_name AS 'department',
    roles.salary 
    FROM employees, roles, department
    WHERE department.id = roles.department_id
    AND roles.id = employees.role_id
    ORDER BY employees.id ASC`;

  connection
    .promise()
    .query(employeeQuery)
    .then(([rows, fields]) => {
      console.table(rows);
      startApplication();
    })
    .catch(console.log)
    .then(() => connection.end());
}

//Add an department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What department would you like to add?",
      },
    ])
    .then((choiceAnswer) => {
      let departmentQuery = `INSERT INTO department(department_name) VALUES (?)`;
      connection.query(
        departmentQuery,
        choiceAnswer.newDepartment,
        (error, response) => {
          if (error) {
            console.log("Couldnt find results");
          }
          viewDepartment();
          console.table(response);
          startApplication();
          //Why doesnt the whole table show
        }
      );
    });
}

//Add a Role
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What Role title would you like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for the corresponding role?",
      },
      {
        input: "input",
        name: "department_id",
        message: "What is the corresponding department id for the new role?",
      },
    ])
    .then((choiceAnswers) => {
      const roleQuery = [
        choiceAnswers.title,
        choiceAnswers.salary,
        choiceAnswers.department_id,
      ];
      const insertSQL = `INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)`;
      const searchRoles = `SELECT * FROM roles`;
      connection.query(insertSQL, roleQuery, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("New Role has been added to Employee Database");
        connection.query(searchRoles, (err, result) => {
          if (err) {
            return;
          }
          console.table(result);
          startApplication();
        });
      });
    });
}

// //Add an Employee
function addEmployee() {
  const roleSQL = `SELECT roles.id, roles.title FROM roles`;

  connection.query(roleSQL, function (err, roleData) {
    const roles = roleData.map(({ id, title }) => ({ name: title, value: id }));

    const findManager = `SELECT * FROM employees`;

    connection.query(findManager, function (err, employeeData) {
      const employees = employeeData.map(({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
      }));
      employees.push("none");
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last Name?"
          },
          {
            type: "list",
            name: "role",
            message: "What is the employees role?",
            choices: roles,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the new Employees Manager",
            choices: employees,
          },
        ])
        .then((result) => {
          console.log(result);
          const manager= (result.manager=== "none") ? null: result.manager;
          connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
                            VALUES (?,?,?,?)`,[result.firstName, result.lastName, result.role, manager], function(err){
                                if(err) throw err;
                            console.log("The Employee has been created");
                            connection.query(`SELECT * FROM employees`, (err, result) =>{
                                if(err){
                                    return;
                                }
                                console.table(result);
                            })
                            startApplication();

                            });
        });
    });
  });
}

//Update an Employee
function updateEmployee(){
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: "What is the employee's first name?"
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'What is the employees last name?',
    },
    {
      name: 'role_id',
      type: 'number',
      message: 'What is the employees new Role ID?'
    }

  ]).then((choiceAnswers)=>{
    const roleUpdate = [
      choiceAnswers.role_id,
      choiceAnswers.first_name,
      choiceAnswers.last_name
    ];
    const roleUpdateInsert = `UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name`;
    const updatedRoleQuery = `SELECT * FROM employees`;
    connection.query(roleUpdateInsert, roleUpdate, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Role has been changed");
      connection.query(updatedRoleQuery, (err, result) => {
        if (err) {
          return;
        }
        console.table(result);
        startApplication();
  })
});
  });
}

startApplication();

