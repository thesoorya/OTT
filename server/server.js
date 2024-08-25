const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require("cors")
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const categoryRoute = require('./routes/categoryRoute')
const cartRoute = require('./routes/cartRoute')
const wishlistRoute = require('./routes/wishlistRoute')
const {protectRoute} = require('./middleware/protectRoute')
const PORT = process.env.PORT || 5000

connectDB()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)
app.use('/api/category', categoryRoute) 
app.use('/api/cart', protectRoute, cartRoute) 
app.use('/api/wishlist', protectRoute, wishlistRoute) 

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})