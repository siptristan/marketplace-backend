const db = require('../config/database')
//bcrypt encryption
const bcrypt = require('bcrypt');
//json web token
const jwt = require('jsonwebtoken')
// env
const dotenv = require('dotenv')
// user model
const model = require('../model/user_model')
dotenv.config();

module.exports = {
    login: async(req, res) => {
        let sql = model.user(req.body.email)
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            bcrypt
            .compare(req.body.password, results[0].Password)
            .then(check => {
                if (check) {
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let data = results[0]
                
                const token = jwt.sign({ data }, jwtSecretKey, { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED });
                
                return res.json({ user: results[0], token })
                }
            })
            .catch(err => console.error(err.message))
        })
    },
    validateToken: (req, res) => {
        // Tokens are generally passed in the header of the request
        // Due to security reasons.
    
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        try {
            const token = req.getHeader('Authorization')
      
            const verified = jwt.verify(token, jwtSecretKey);
            if(verified){
                return res.send("Successfully Verified");
            }else{
                // Access Denied
                return res.status(401).send(error);
            }
        } catch (error) {
            // Access Denied
            return res.status(401).send(error);
        }
    },
    getUser: (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) => {})
        if (verified) {
            let user = model.user(req.body.email)
            let query = db.query(user, (err, results) => {
                if(err) throw err;
                return res.json(results);
            })
        }

    },
    register: (req, res) => {
        const Name = req.body.Name
        const Email = req.body.Email
        const Avatar = req.body.Avatar
        const saltRounds = 10
        let hashPass = ''
        bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(req.body.Password, salt)
        })
        .then(Hash => {
            let checkUser = model.user(Email)
            let register = model.register(Name, Email, Hash, Avatar)
            let check = db.query(checkUser, (err, result) => {
                if(err) throw err;
                if (result.length > 0) {
                    return res.json({ success: false, message: `Email ${Email} Sudah terdaftar!` })
                } else {
                    let query = db.query(register, (err, result) => {
                        if(err) throw err;
                        return res.json({ success: true, result })
                    })
                }
            })
        })
        .catch(err => console.error(err.message))
    },
    updateAvatar: (req, res) => {
        const img = req.body.Avatar
        const id = req.body.UserID
        if (img !== '' || img !== null || img !== undefined) {
            let update = model.avatar(img, id)
            let query = db.query(update, (err, result) => {
                if(err) throw err;
                return res.json(result)
            })
        }
    }
}