const route = require('express').Router()
const {getProduct,postProducts,putProducts,deleteProducts} = require('../controller/productController')
const auth = require('../middleware/auth')


route.get('/',getProduct)
route.post('/',auth,postProducts)
route.put('/:id',auth,putProducts)
route.delete('/:id',auth,deleteProducts)

module.exports = route