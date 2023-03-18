const db = require('../config/database')
const modelCart = require('../model/cart_model')

module.exports = {
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
        let sql = modelCart.removeCart(req.body.CartID, req.body.Date);
        let query = db.query(sql, (error, result) => {
            if(error) throw error;
            return res.json(result)
        })
    }
}
