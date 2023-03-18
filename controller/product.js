const db = require('../config/database')
const modelProduct = require('../model/product_model')
const modelCart = require('../model/cart_model')
const modelCheckout = require('../model/checkout_model')

module.exports = {
    getProducts: async(req, res) => {
        console.log(req.query.UserID)
        let sql = modelProduct.product(req.query.UserID);
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    },
    getCategories: async(req, res) => {
        let sql = modelProduct.category();
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        })
    },
    getProductById: async(req, res) => {
        let sql = modelProduct.productById(req.query.slug);
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        })
    },
    addCart: async(req, res) => {
        let sql = modelCart.insertCart(req.body.ProductID, req.body.UserID, req.body.TotalBuy, req.body.TotalPrice)
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            let sql2 = modelCart.cart(req.body.UserID);
            let query2 = db.query(sql2, (error, rslt) => {
                if(error) throw error;
                return res.json(rslt);
            })
        })
    },
    cart: async(req, res) => {
        let sql = modelCart.cart(req.query.UserID);
        let query = db.query(sql, (error, result) => {
            if(error) throw error;
            return res.json(result);
        })
    },
    removeCart: async(req, res) => {
        let sql = modelCart.removeCart(req.body.ProductID, req.body.Date);
        let query = db.query(sql, (error, result) => {
            if(error) throw error;
            return res.json(result)
        })
    },
    addCheckout: async(req, res) => {
        let sql = '';
        // let productId = [];

        if (Array.isArray(req.body.ProductID)) {
            for (let i = 0; i < req.body.ProductID.length; i++) {
                let cart = modelCart.cart(req.body.UserID)
                let cartData = db.query(cart, (err, result) => {
                    if(err) throw err;
                    result.map((item) => {
                        if (item.ProductID === req.body.ProductID[i] && item.UserID === req.body.UserID) {
                            sql = modelCheckout.insertCheckout(req.body.ProductID[i], req.body.UserID, item.TotalProduct, item.TotalPrice)
                            let sqlResults = db.query(sql, (err, results) => {
                                if(err) throw err;
                                return true;
                            })
                        }
                    })
                })
            }
            return res.json(req.body)
        } else {
            sql = modelCheckout.insertCheckout(req.body.ProductID, req.body.UserID, req.body.TotalBuy, req.body.TotalPrice)
            let sqlResults = db.query(sql, (err, result) => {
                if(err) throw err;
                return res.json(result);
            })
        }
    },
    checkout: async(req, res) => {
        let sql = modelCheckout.checkout(req.body.UserID, req.body.ProductID);
        let query = db.query(sql, (error, rslt) => {
            if(error) throw error;
            return res.json(rslt);
        })
    }
}
