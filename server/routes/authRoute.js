const express = require("express")
const { register, login, logout, authCheck } = require("../controllers/authController")
const { protectRoute } = require('../middleware/protectRoute')
const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/authcheck", protectRoute, authCheck)

module.exports = router