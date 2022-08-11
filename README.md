## SQL Employee Tracker

## Description
This is a Node-based employee management app that utilizes MySQL2. This app allows the user to view all employees, the org chart based on dept, add and delete employees, update roles for existing employee. This app is unable to be deployed as it strictly a back-end application, a walkthrough video of the app is at the bottom of this README. 

## Technology Used
Node, MySql2

## Usage
Users will need to run npm install upon opening repo locally to install all dependencies. They will then need to log into MySql and run the schema and the seeds to set up the initial database. From there, they will type node index.js into the integrated terminal to launch the program. This program is very simple- using the up and down arrow and enter keys to navigate and select options. When an option is selected, the appropriate prompts or data will appear with the menu reloading underneath. When done, the user simply navigates to the exit option, which will end their session.

## User Story
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Github Repo
https://github.com/JimMason564/SQLEmployeeTracker

## Walkthrough video link
https://drive.google.com/file/d/1IiTwJlO_X1P0RCCpB8LQJf5SqNwvMj3S/view

## Screenshot
![image](./Documents/SQLTracker.jpeg)
