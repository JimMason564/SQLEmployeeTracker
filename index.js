const mysql = require('mysql');
const inquirer = require('inquirer')
require('const table')


const connect =mysql.createConnection({
    host: 'localhost',
    port:'3001',
    user: 'root',
    password: '',
    
}
)