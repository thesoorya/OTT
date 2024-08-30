const express = require('express');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const router = express.Router();

router.post('/add', addToWishlist);
router.post('/remove', removeFromWishlist);
router.get('/getwishlist', getWishlist);

module.exports = router;
