const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "NoTimetoDie21",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) {
    return console.log(err.message);
  }
});

function startMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "View Employees",
          "View Roles",
          "View Departments",
          "Organization Chart",
          "Add Employee",
          "Delete Employee",
          "Update Role",
          "Add Role",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((res) => {
      console.log(res.userChoice);
      switch (res.userChoice) {
        case "View Employees":
          eeView();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Departments":
          viewDepts();
          break;

        case "Organization Chart":
          getDept();
          break;

        case "Add Employee":
          addEE();
          break;

        case "Delete Employee":
          removeEE();
          break;

        case "Update Role":
          updEERole();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDept();
          break;

        case "Exit":
          connection.end();
          break;
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

startMenu();

function eeView() {
  let query = `SELECT 
          employee.id, 
          employee.first_name, 
          employee.last_name, 
          role.title, 
          department.name, 
          role.salary,
          CONCAT(manager.first_name, " " ,manager.last_name) AS manager
      FROM employee
      LEFT JOIN role
          ON employee.role_id = role.id
      LEFT JOIN department
          ON department.id = role.department_id
      LEFT JOIN employee manager
          ON manager.id = employee.manager_id`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    console.log();
    startMenu();
  });
}

function getDept() {
  let query = `SELECT department.id,
              department.name
              FROM department
              `;
  connection.query(query, (err, res) => {
    if (err) throw err;
    const deptChoices = res.map(({ id, name }) => ({
      value: id,
      name: name,
    }));
    viewEEbyDept(deptChoices);
  });

  function viewEEbyDept(deptChoices) {
    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Which department?",
          choices: deptChoices,
        },
      ])
      .then((res) => {
        let query = `SELECT 
                        employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        department.name
                    FROM employee
                    LEFT JOIN role
                        ON employee.role_id = role.id
                    LEFT JOIN department
                        ON department.id = role.department_id
                    WHERE department.id = ?`;
        let param = res.department;
        connection.query(query, param, (err, res) => {
          if (err) throw err;
          startMenu();
          console.table(res);
        });
      });
  }
}

function addEE() {
  let query = `SELECT 
          role.id, 
          role.title, 
          role.salary 
      FROM role`;

  connection.query(query, (err, res) => {
    if (err) console.log(err);
    const role = res.map(({ id, title }) => ({
      value: id,
      name: `${title}`,
    }));
    console.table(res);
    eeRole(role);
  });
}

function eeRole(role) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Employee First Name: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Employee Last Name: ",
      },
      {
        type: "list",
        name: "roleId",
        message: "Employee Role: ",
        choices: role,
      },
    ])
    .then((res) => {
      let query = `INSERT INTO employee SET ?`;
      connection.query(
        query,
        {
          first_name: res.firstName,
          last_name: res.lastName,
          role_id: res.roleId,
        },
        (err, res) => {
          if (err) throw err;
          startMenu();
        }
      );
    });
}

const viewRoles = async () => {
  console.log("View Roles");
  try {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let roleArray = [];
      res.forEach((role) => roleArray.push(role));
      console.table(roleArray);
      startMenu();
    });
  } catch (err) {
    console.log(err);
    startMenu();
  }
};

const viewDepts = async () => {
  console.log("Departments");
  try {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let departmentArray = [];
      res.forEach((department) => departmentArray.push(department));
      console.table(departmentArray);
      startMenu();
    });
  } catch (err) {
    console.log(err);
    startMenu();
  }
};

function removeEE() {
  let query = `SELECT
        employee.id, 
        employee.first_name, 
        employee.last_name
    FROM employee`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    const employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`,
    }));
    console.table(res);
    delEE(employee);
  });
}

function delEE(employee) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Who would you like to remove?",
        choices: employee,
      },
    ])
    .then((res) => {
      let query = `DELETE FROM employee WHERE ?`;
      connection.query(query, { id: res.employee }, (err, res) => {
        if (err) throw err;
        startMenu();
      });
    });
}

function updEERole() {
  let query = `SELECT 
                      *
                  FROM employee`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    const employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));
    updRole(employee);
  });
}

function updRole(employee) {
  let query = `SELECT 
     *
    FROM role`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    let roleChoices = res.map(({ id, title }) => ({
      value: id,
      name: `${title}`,
    }));
    upd(employee, roleChoices);
  });
}

function upd(employee, roleChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: `Employee Name: `,
        choices: employee,
      },
      {
        type: "list",
        name: "role",
        message: "Updated Role: ",
        choices: roleChoices,
      },
    ])
    .then((res) => {
      let query = `UPDATE employee SET role_id = ? WHERE id = ?`;
      connection.query(query, [res.role, res.employee], (err, res) => {
        if (err) throw err;
        startMenu();
      });
    });
}

function addRole() {
  var query = `SELECT 
        department.id, 
        department.name, 
        role.salary
      FROM employee
      JOIN role
        ON employee.role_id = role.id
      JOIN department
        ON department.id = role.department_id
      GROUP BY department.id, department.name`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    const department = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));
    console.table(res);
    adding(department);
  });
}

function adding(department) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Role title: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Role Salary: ",
      },
      {
        type: "list",
        name: "department",
        message: "Department: ",
        choices: department,
      },
    ])
    .then((res) => {
      let query = `INSERT INTO role SET ?`;

      connection.query(
        query,
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,
        },
        (err, res) => {
          if (err) throw err;
          startMenu();
        }
      );
    });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Department Name: ",
      },
    ])
    .then((res) => {
      let query = `INSERT INTO department SET ?`;
      connection.query(query, { name: res.name }, (err, res) => {
        if (err) throw err;
        startMenu();
      });
    });
}
