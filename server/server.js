const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require("cors")
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db')
const authRoute = require('./routes/authRoute')
const movieRoute = require('./routes/movieRoute')
const PORT = process.env.PORT || 5000

connectDB()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/movie', movieRoute)

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})