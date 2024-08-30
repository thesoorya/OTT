const express = require("express");
const { deleteCart, removeFromCart, addToCart, getCartItems } = require("../controllers/cartController");
const router = express.Router()

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.post("/delete", deleteCart);
router.get("/getcart", getCartItems);

module.exports = router