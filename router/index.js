const express = require('express')
const router = express.Router()
const product = require('../controller/product')
const cart = require('../controller/cart')
const checkout = require('../controller/checkout')
const auth = require('../controller/user')

// router product
router.get('/api/products', product.getProducts)
router.get('/api/categories', product.getCategories)
router.get('/api/product-detail', product.getProductById)
router.post('/api/add-product', product.addProduct)

// router cart
router.post('/api/add-cart', cart.addCart)
router.get('/api/get-cart', cart.cart)
router.post('/api/remove-cart', cart.removeCart)

// router checkout
router.get('/api/get-all-checkout', checkout.checkoutAll)
router.post('/api/add-checkout', checkout.addCheckout)
router.post('/api/get-checkout', checkout.checkout)
router.post('/api/upload-payment-proof', checkout.uploadPaymentProof)
router.post('/api/confirm-payment', checkout.confirmPayment)

// router user
router.post('/api/auth/login', auth.login)
router.get('/api/auth/validate', auth.validateToken)
router.get('/api/auth/user', auth.getUser)
router.post('/api/auth/register', auth.register)
router.post('/api/update-avatar', auth.updateAvatar)

module.exports = router