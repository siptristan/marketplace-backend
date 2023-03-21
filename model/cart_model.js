module.exports = {
    insertCart: (ProductID, UserID, TotalBuy, TotalPrice) => {
        return `INSERT INTO carts(ProductID, UserID, TotalProduct, TotalPrice) VALUES(${ProductID}, ${UserID}, ${TotalBuy}, ${TotalPrice})`;
    },
    cart: (UserID) => {
        return `SELECT c.*, p.Title, p.Image, p.Price FROM carts c JOIN products p ON c.ProductID = p.ProductID WHERE c.UserID = ${UserID} AND c.IsDeleted = 0 OR c.IsDeleted = null`;
    },
    removeCart: (CartID, Date) => {
        return `UPDATE carts SET IsDeleted = 1, updated_at = '${Date}' WHERE CartID IN (${CartID})`
    }
}