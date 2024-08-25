const express = require("express");
const { deleteCart, removeFromCart, addToCart } = require("../controllers/cartController");
const router = express.Router()

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.post("/delete", deleteCart);

module.exports = router