const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../../modules/module-12/u-develop-it/db/connection');

//create the connection to database
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Novabear2010',
    database: 'employee_db'
})

function startApplication(){
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'Which would you like to do?',
                choices:[
                    'View all roles',
                    'View all Employees',
                    'Add a Department',
                    'Add an Employee',
                    'Update an Employee',
                    'View Department',
                    'Add Employee',
                    'Add role',
                    'Add Department',
                    'Exit'
                ]
            }
    
        ])
    .then((choiceAnswers) =>{
        console.log(choiceAnswers);
        if(choiceAnswers.choices === 'View all roles'){
            viewRoles();
        }
        if(choiceAnswers.choices === 'View all Employees'){
            viewEmployees();
        }
        if(choiceAnswers.choices === 'View Department'){
            viewDepartment();
        }
        if(choiceAnswers.choices === 'Add a Department'){
            addDepartment();
        }
        if(choiceAnswers.choices === 'Add an Employee'){
            addEmployee();
        }
        if(choiceAnswers.choices === 'Update an Employee'){
            updateEmployee();
        }
        if(choiceAnswers.choices === 'Add Employee'){
            addEmployee();
        }
        if(choiceAnswers.choices === 'Add role'){
            addRole();
        }
        if(choiceAnswers.choices === 'Add Department'){

        }

    });
};

function viewDepartment(){
    connection.query(
        'SELECT * FROM department;',
        (err, result) =>{
            if(err){
                console.log("could not find results");
            }
            console.table(result);
        }
        

    )

}


startApplication();
//what do I need to do with console table?

// Acceptance Criteria

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 