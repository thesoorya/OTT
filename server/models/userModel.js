const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    searchHistory: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model("User", user)
