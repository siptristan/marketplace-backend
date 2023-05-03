const db = require('../config/database')
const modelCart = require('../model/cart_model')
const modelCheckout = require('../model/checkout_model')
//@ts-ignore
const base64Img = require('base64-img')
const fs = require('fs')

module.exports = {
    addCheckout: async(req, res) => {
        let sql = '';
        // let productId = [];

        if (Array.isArray(req.body.ProductID)) {
            for (let i = 0; i < req.body.ProductID.length; i++) {
                let cart = modelCart.cart(req.body.UserID)
                let cartData = db.query(cart, (err, result) => {
                    if(err) {
                        throw err;
                    } else {
                        result.map((item) => {
                            if (item.ProductID === req.body.ProductID[i] && item.UserID === req.body.UserID) {
                                sql = modelCheckout.insertCheckout(req.body.ProductID[i], req.body.UserID, item.TotalProduct, item.TotalPrice)
                                let sqlResults = db.query(sql, (err, results) => {
                                    if(err) throw err;
                                    // return true;
                                })
                            }
                        })
                    }
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
    },
    uploadPaymentProof: (req, res) => {
        console.log(req.body)
        const base64Data = req.body.base64Img;
        const destpath = `public/images/payment/${req.body.UserID}`;

        if (!fs.existsSync(destpath)){
            fs.mkdirSync(destpath, { recursive: true });
        }

        const filename = `${req.body.UserID}_${req.body.date}`;
        const filepath = base64Img.imgSync(base64Data, destpath, filename);
        const path = filepath.split(/\\/)
        const pathString = `${path[0]}/${path[1]}/${path[2]}/${path[3]}/${path[4]}`
        
        
        const data = {
            PaymentProof: base64Data,
            CheckoutID: req.body.CheckoutID
        }
        let sql = modelCheckout.updatePaymentProof(data)
        let queryUpload = db.query(sql, (err, results) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                return res.json({success: true, message: 'success'})
            }
        })
    },
    confirmPayment: (req, res) => {
        let sql = modelCheckout.confirmPayment(req.body.CheckoutID)
        let query = db.query(sql, (err, results) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                return res.json({success: true, message: 'success'})
            }
        })
    },
    checkoutAllAdmin: async(req, res) => {
        let sql = modelCheckout.listCheckoutAdmin(req.query.UserID);
        let query = db.query(sql, (error, result) => {
            if(error) throw error;
            return res.json(result)
        })
    },
}
