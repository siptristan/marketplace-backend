module.exports = {
    user: (email) => {
        return `SELECT * FROM users WHERE Email = '${email}' LIMIT 1`
    },
    register: (name, email, password, avatar) => {
        return `INSERT INTO users(Name, Email, Password, Avatar) VALUES('${name}', '${email}', '${password}', '${avatar}')`
    },
    avatar: (img, UserID) => {
        return `UPDATE users SET Avatar = '${img}' WHERE UserID = ${UserID}`
    }
}