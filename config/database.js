// env
const dotenv = require('dotenv')
dotenv.config();
//use mysql database
const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'marketplace'
// });
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

//connect ke database
db.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

module.exports = db