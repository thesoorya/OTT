const express = require("express")
const { getProducts, getProductById } = require("../controllers/productController")
const router = express.Router()

router.get('/getproducts', getProducts)
router.get('/getproductbyid/:id', getProductById)

module.exports = router