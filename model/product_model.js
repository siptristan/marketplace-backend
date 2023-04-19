module.exports = {
    product: (UserID) => {
        let sql = `SELECT p.*, c.CategoryID, c.CategoryName FROM products p JOIN categories c ON p.CategoryID = c.CategoryID ${UserID !== undefined ? `WHERE p.UserID != ${UserID} AND` : 'WHERE'} p.IsDeleted = 0`;
        return sql;
    },
    category: () => {
        return "SELECT * FROM categories";
    },
    productById: (slug) => {
        return `SELECT p.*, c.CategoryID, c.CategoryName FROM products p JOIN categories c ON p.CategoryID = c.CategoryID WHERE Slug = '${slug}'`;
    },
    addProduct: (data, path) => {
        return `INSERT INTO products(CategoryID,UserID,Title,Price,Stock,Discount,Description,Slug,Image,IsDiscount,IsDeleted) VALUES(${data.CategoryID}, ${data.UserID}, '${data.Title}', ${data.Price}, ${data.Stock}, ${data.Discount}, '${data.Description}', '${data.Slug}', '${path}', ${data.IsDiscount}, ${data.IsDeleted})`
    }
}