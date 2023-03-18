module.exports = {
    product: (UserID) => {
        let sql = `SELECT p.*, c.CategoryID, c.CategoryName FROM products p JOIN Categories c ON p.CategoryID = c.CategoryID ${UserID !== undefined ? `WHERE p.UserID != ${UserID} AND` : 'WHERE'} p.IsDeleted = 0`;
        return sql;
    },
    category: () => {
        return "SELECT * FROM categories";
    },
    productById: (slug) => {
        return `SELECT p.*, c.CategoryID, c.CategoryName FROM products p JOIN Categories c ON p.CategoryID = c.CategoryID WHERE Slug = '${slug}'`;
    }
}