// env
const dotenv = require('dotenv')
dotenv.config();
//use mysql database
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: 'root',
    password: '',
    database: 'marketplace'
});

//connect ke database
db.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

module.exports = db