USE employee_db;

INSERT INTO department (name)
VALUES 
("Engineering"), 
("Sales"), 
("Accounting"), 
("Human Resources");

INSERT INTO role (role_title, salary, department_id)
VALUES 
("Lead Software Engineer", 1000000, 1), 
("Salesperson", 500000, 2), 
("Lead Accountant", 300000, 3), 
("Human Resources Director", 120000, 4), 

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("Richard", "Hendrix", 1), 
("Jared", "Dunn", 2), 
("Dinesh", "Chugtai", 3),
("Gavin", "Belson", 4), 
