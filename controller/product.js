const db = require('../config/database')
const modelProduct = require('../model/product_model')
const modelCart = require('../model/cart_model')
const modelCheckout = require('../model/checkout_model')
const fs = require('fs')
const base64Img = require('base64-img')

module.exports = {
    getProducts: async(req, res) => {
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
    addProduct: (req, res) => {
        const base64Data = req.body.base64Img;
        const destpath = `public/images/product/${req.body.UserID}`;

        // if (!fs.existsSync(destpath)){
        //     fs.mkdirSync(destpath, { recursive: true });
        // }

        const filename = `${req.body.Slug}`;
        const filepath = base64Img.imgSync(base64Data, destpath, filename);
        const path = filepath.split(/\\/)
        const pathString = `${path[0]}/${path[1]}/${path[2]}/${path[3]}/${path[4]}`
        
        let sql = modelProduct.addProduct(req.body, filepath.replace('public/',''))
        let query = db.query(sql, (err, results) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                return res.json({success: true, message: 'success'})
            }
        })
    },
}
