const express = require("express")
const { getCategories, getCategoryById } = require("../controllers/categoryController")
const router = express.Router()

router.get('/getcategories', getCategories)
router.get('/getcategorybyid/:id', getCategoryById)

module.exports = router