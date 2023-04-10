const db = require('../config/database')
const modelCart = require('../model/cart_model')
const modelCheckout = require('../model/checkout_model')

module.exports = {
    addCheckout: async(req, res) => {
        let sql = '';
        // let productId = [];

        if (Array.isArray(req.body.ProductID)) {
            console.log(req,body.ProductID)
            for (let i = 0; i < req.body.ProductID.length; i++) {
                let cart = modelCart.cart(req.body.UserID)
                let cartData = db.query(cart, (err, result) => {
                    if(err) throw err;
                    result.map((item) => {
                        if (item.ProductID === req.body.ProductID[i] && item.UserID === req.body.UserID) {
                            sql = modelCheckout.insertCheckout(req.body.ProductID[i], req.body.UserID, item.TotalProduct, item.TotalPrice)
                            let sqlResults = db.query(sql, (err, results) => {
                                if(err) throw err;
                                // return true;
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
                return res.json(req.body);
            })
        }
    },
    checkout: async(req, res) => {
        let sql = modelCheckout.checkout(req.body.UserID, req.body.ProductID);
        let query = db.query(sql, (error, result) => {
            if(error) throw error;
            return res.json(result);
        })
    },
    checkoutAll: async(req, res) => {
        let sql = modelCheckout.listCheckout(req.query.UserID);
        let query = db.query(sql, (error, result) => {
            if(error) throw error;
            return res.json(result)
        })
    }
}
