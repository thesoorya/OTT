const express = require("express")
const { getTrendingMovie } = require("../controllers/movieController")
const router = express.Router()

router.get('/trending', getTrendingMovie)
router.get('/',)
router.get('/',)
router.get('/',)
router.get('/',)

module.exports = router