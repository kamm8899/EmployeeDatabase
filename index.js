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

function viewRoles(){
    connection.query(
        'SELECT * FROM roles;',
        (err, result) =>{
            if(err){
                console.log("couldn not find results");
            }
            console.table(result);
        }
    )
}
//missing salary title, department_id, 
function viewEmployees(){
    let employeeQuery=    `SELECT employees.id,
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

    connection.promise().query(employeeQuery)
        .then(([rows, fields])=>{
            console.table(rows);
            startApplication();
        })
        .catch(console.log)
        .then( () => connection.end());
    
        }

//Add an department
function addDepartment(){
    inquirer.prompt([{
        type: 'input',
        name: 'newDepartment',
        message: 'What department would you like to add?'
    }
])
.then((choiceAnswer) =>{
    let departmentQuery = `INSERT INTO department(department_name) VALUES (?)`;
    connection.query(departmentQuery, choiceAnswer.newDepartment, (error, response) =>{
        if(error){
            console.log("Couldnt find results");
        } 
        viewDepartment();
        console.table(response);
        startApplication();
        //Why doesnt the whole table show
    }
    ); 
});
};

//Add a Role
// function addRole(){
//     const sql= 'SELECT * FROM department'
//     connection.promise().query(sql, (error, response)=>{
//         if(error){
//             console.log("Couldnt find connection");
//         }
//         //set array for Department
//         let 
//     })
//     inquirer.prompt([{
//         type: "input",
//         name : "newRole",
//         message: "Please enter name of new Role?"
//     }])
// }




// //Add an Employee 
function addEmployee(){
    inquirer.
    prompt([{
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?"
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last Name?"
    }
    ])
    .then(choiceAnswers =>{

        const employeeCredentials = [choiceAnswers.firstName, choiceAnswers.lastName];
        const employeeSQL = `SELECT roles.id, roles.title FROM roles`;
        connection.promise().query(employeeSQL, (error, data) =>{
            if(error) throw error;
            const roles = data.map(({id, title})=> ({name: title, value: id}));

        })  
            inquirer.prompt([
                {
                    type:'list',
                    name: 'role',
                    message: 'What is the employees role?',
                    choices: roles
                }
            ])
            .then(choiceAnswers=>{
                const employeeRole = choiceAnswers.roles;
                employeeCredentials.push(employeeRole);
                 
                //find manager and add employee to manager
                const findManager = `SELECT * FROM employee`;

                connection.promise().query(findManager, (error, data)=>{
                    if(error){
                        console.log("Couldnt connect");
                    }
                    const addManager = data.map(({id, first_name, last_name}) => ({ value: id , name: first_name + " " + last_name}));
                    //inquirer prompt to trigger questions
                    inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is the new Employees Manager",
                        choices: addManager

                    }
                ])
                    .then(choiceAnswer =>{
                        employeeCredentials.push(choiceAnswer.manager);
                        managerSQL= `INSERT INTO employee (first_name, last_name, roles_id, manager_id)
                                    VALUES (?,?,?,?)`;
                        //query connection to add manager to new employee
                        connection.query(managerSQL, employeeCredentials, (error, response)=>{
                            if (error){
                                console.log("Couldn't Connect");
                            }
                            console.log("Employee has been added to Database");
                            console.table(response);
                            viewAllEmployees();
                            startApplication();
                        });
                    });
                  });
                });
             });
          };

startApplication();

// Acceptance Criteria

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 