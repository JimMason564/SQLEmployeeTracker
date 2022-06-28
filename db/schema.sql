DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL;
    department_name VARCHAR(30) NOT NULL
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL;
    role_title VARCHAR(30) NOT NULL;
    salary DEC (10,0) NOT NULL;
    department_id INT;
    PRIMARY KEY (id)
)

CREAT TABLE employee (
    id INT NOT NULL;
    first_name VARCHAR(30) NOT NULL;
    last_name VARCHAR(30) NOT NULL;
    role_id INT NOT NULL;
    manager_id INT;
    PRIMARY KEY (id);
)