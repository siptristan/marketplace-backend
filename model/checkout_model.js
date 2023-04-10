module.exports = {
    insertCheckout: (ProductID, UserID, TotalBuy, TotalPrice) => {
        return `INSERT INTO checkouts(ProductID, UserID, TotalProduct, TotalPrice) VALUES(${ProductID}, ${UserID}, ${TotalBuy}, ${TotalPrice})`;
    },
    checkout: (UserID, ProductID) => {
        return `SELECT c.*, p.Title, p.Image, p.Price FROM checkouts c JOIN products p ON c.ProductID = p.ProductID WHERE c.UserID = ${UserID} AND c.ProductID IN (${ProductID}) AND c.IsDeleted = 0`;
    },
    listCheckout: (UserID) => {
        return `SELECT c.*, p.Title, p.Image, p.Price, p.Stock, c2.CategoryName FROM checkouts c JOIN products p ON c.ProductID = p.ProductID JOIN categories c2 ON p.CategoryID = c2.CategoryID WHERE c.UserID = ${UserID} AND c.IsDeleted = 0`
    },
    removeCheckout: (UserID, ProductID) => {

    }
}