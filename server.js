const inquirer = require("inquirer");
const mysql = require("mysql2");

const sql = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "employees_db",
});

sql.connect(function (err) {
  if (err) {
    console.error("There was a problem connecting to the database: ", err);
    return;
  }
  console.log("Welcome to the Employee Tracker!");
  editData();
});

function editData() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
      name: "options",
      message: "Please choose an option:",
    })
    .then((answer) => {
      if (answer.options === "View all departments") {
        viewDepartment();
      } else if (answer.options === "View all roles") {
        viewRoles();
      } else if (answer.options === "View all employees") {
        viewEmployees();
      } else if (answer.options === "Add a department") {
        addDepartment();
      } else if (answer.options === "Add a role") {
        addRole();
      } else if (answer.options === "Add an employee") {
        addEmployee();
      } else if (answer.options === "Update an employee role") {
        updateEmployee();
      }
    });
}

const viewDepartment = () => {
  let query = "SELECT * FROM departments";
  sql.query(query, function (err, results) {
    if (err) {
      console.error("There was a problem loading the table: ", err);
    }
    console.log(results);
    editData();
  });
};

const viewRoles = () => {
  let query = "SELECT * FROM roles";
  sql.query(query, function (err, results) {
    if (err) {
      console.error("There was a problem loading the table: ", err);
    }
    console.log(results);
    editData();
  });
};

const viewEmployees = () => {
  let query = "SELECT * FROM employees";
  sql.query(query, function (err, results) {
    if (err) {
      console.error("There was a problem loading the table: ", err);
    }
    console.log(results);
    editData();
  });
};

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "Please name the new department: ",
    })
    .then((answer) => {
      const query = `INSERT INTO departments (department_name) VALUES (?)`;

      sql.query(query, [answer.departmentName], function (err, results) {
        if (err) {
          console.error("Error adding department:", err);
          return;
        }

        console.log(
          `\n"${answer.departmentName}" department added successfully.\n`
        );
        editData();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "department",
        choices: ["Accounting", "Sales", "IT", "Customer Service"],
        message: "Please choose the department to add the role to: ",
      },
      {
        type: "input",
        name: "jobTitle",
        message: "Please name the new role: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary for the new role: ",
      }
    ])
    .then((answer) => {
      const query = `INSERT INTO roles (department_id, job_title, salary) VALUES (?, ?, ?)`;

      const departmentId = getDepartmentId(answer.department);

      sql.query(query, [departmentId, answer.jobTitle, answer.salary], function (err, results) {
        if (err) {
          console.error("Error adding role:", err);
          return;
        }

        console.log(
          `\n"${answer.jobTitle}" role added successfully.\n`
        );
        editData();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the new employee's first name: ",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the new employee's last name: ",
      },
      {
        type: "list",
        name: "department",
        choices: ["Accounting", "Sales", "IT", "Customer Service"],
        message: "Please choose the department for the new employee: ",
      },
      {
        type: "input",
        name: "role",
        message: "Please enter the new employee's role ID: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the new employee's salary: ",
      },
    ])
    .then((answer) => {
      const query =
        "INSERT INTO employees (first_name, last_name, role_id, department_id, salary) VALUES (?, ?, ?, ?, ?)";

      const departmentId = getDepartmentId(answer.department);

      sql.query(
        query,
        [answer.first_name, answer.last_name, answer.role, departmentId, answer.salary],
        function (err, results) {
          if (err) {
            console.error("Error adding employee:", err);
            return;
          }

          console.log(`\n"${answer.first_name} ${answer.last_name}" employee added successfully.\n`);
          editData();
        }
      );
    });
}

function updateEmployee() {
  let query = "SELECT employee_id, first_name, last_name FROM employees";
  sql.query(query, function (err, employees) {
    if (err) {
      console.error("Error fetching employee list:", err);
      editData();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select an employee to update their role: ",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.employee_id,
          })),
        },
        {
          type: "input",
          name: "newRole",
          message: "Enter the new role for the selected employee: ",
        },
      ])
      .then((answer) => {
        const updateQuery = "UPDATE employees SET role_id = ? WHERE employee_id = ?";
        sql.query(updateQuery, [answer.newRole, answer.employeeId], function (err, results) {
          if (err) {
            console.error("Error updating employee role: ", err);
          } else {
            console.log("Employee's role updated successfully.");
          }
          editData();
        });
      });
  });

}


function getDepartmentId(departmentName) {
  switch (departmentName) {
    case "Accounting":
      return 1;
    case "Sales":
      return 2;
    case "IT":
      return 3;
    case "Customer Service":
      return 4;
    default:
      return null;
  }
}