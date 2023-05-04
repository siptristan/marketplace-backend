module.exports = {
    insertCheckout: (ProductID, UserID, TotalBuy, TotalPrice) => {
        return `INSERT INTO checkouts(ProductID, UserID, TotalProduct, TotalPrice) VALUES(${ProductID}, ${UserID}, ${TotalBuy}, ${TotalPrice})`;
    },
    updateCheckout: (CheckoutID, TotalBuy, TotalPrice) => {
        return `UPDATE checkouts SET TotalPrice = ${TotalPrice}, TotalProduct = ${TotalBuy} WHERE CheckoutID = ${CheckoutID}`
    },
    checkout: (ProductID, UserID) => {
        return `SELECT c.* FROM checkouts c WHERE c.UserID = ${UserID} AND c.ProductID = ${ProductID} AND c.IsDeleted = 0 AND c.IsPaid = 0 AND c.PaymentProof != null`;
    },
    checkoutAll: (UserID, ProductID) => {
        return `SELECT c.*, p.Title, p.Image, p.Price FROM checkouts c JOIN products p ON c.ProductID = p.ProductID WHERE c.UserID = ${UserID} AND c.ProductID IN (${ProductID})`;
    },
    listCheckout: (UserID) => {
        return `SELECT c.*, p.Title, p.Image, p.Price, c2.CategoryName FROM checkouts c JOIN products p ON c.ProductID = p.ProductID JOIN categories c2 ON p.CategoryID = c2.CategoryID WHERE c.UserID = ${UserID} AND c.IsDeleted = 0`
    },
    listCheckoutAdmin: (UserID) => {
        return `SELECT c.*, p.Title, p.Image, p.Price, c2.CategoryName FROM checkouts c JOIN products p ON c.ProductID = p.ProductID JOIN categories c2 ON p.CategoryID = c2.CategoryID WHERE c.ProductID IN (SELECT ProductID FROM products WHERE UserID = ${UserID}) AND c.IsDeleted = 0`
    },
    removeCheckout: (UserID, ProductID) => {

    },
    updatePaymentProof: (data) => {
        return `UPDATE checkouts SET PaymentProof = '${data.PaymentProof}' WHERE CheckoutID = ${data.CheckoutID}`
    },
    confrimPayment: (id) => {
        return `UPDATE checkouts SET IsPaid = 1 WHERE CheckoutID = ${id}`
    }
}