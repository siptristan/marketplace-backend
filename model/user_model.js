module.exports = {
    user: (email) => {
        return `SELECT * FROM users WHERE Email = '${email}' LIMIT 1`
    }
}