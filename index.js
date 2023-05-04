//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
//express js
const app = express();
//bcrypt encryption
const bcrypt = require('bcrypt');
//env config
const dotenv = require('dotenv')
//json web token
const jwt = require('jsonwebtoken')

const db = require('./config/database')

const router = require('./router/index')

const cors = require('cors')

// Set up Global configuration access
dotenv.config();
  
let PORT = process.env.PORT || 5000;

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  origin: '*'
}))
app.use(express.static('public'));
app.use(router);

//route untuk login
// app.post('/auth/login',(req, res) => {
//   let sql = `SELECT * FROM users WHERE Email = '${req.body.email}' LIMIT 1`
//   let query = db.query(sql, (err, results) => {
//     if(err) throw err;
//     bcrypt
//       .compare(req.body.password, results[0].Password)
//       .then(check => {
//         if (check) {
//           let jwtSecretKey = process.env.JWT_SECRET_KEY;
//           let data = results[0]
        
//           const token = jwt.sign({ data }, jwtSecretKey, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED });
        
//           res.send(token);
//           // return res.json({ user: results[0], token })
//         } else {
//           console.log(check)
//         }
//       })
//       .catch(err => console.error(err.message))
//   })
// })

// app.get("/auth/validateToken", (req, res) => {
//   // Tokens are generally passed in the header of the request
//   // Due to security reasons.

//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;

//   try {
//       const token = req.header(tokenHeaderKey);

//       const verified = jwt.verify(token, jwtSecretKey);
//       if(verified){
//           return res.send("Successfully Verified");
//       }else{
//           // Access Denied
//           return res.status(401).send(error);
//       }
//   } catch (error) {
//       // Access Denied
//       return res.status(401).send(error);
//   }
// });

//server listening
app.listen(PORT, () => {
});
