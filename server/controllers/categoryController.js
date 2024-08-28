const { fetchFromAPI } = require('../services/storeApi')

exports.getCategories = async (req, res) => {
    try {
        const data = await fetchFromAPI('https://fakestoreapi.com/products/categories')

        res.status(200).json({ success: true, content: data })
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'server error' })
    }
}

exports.getCategoryById = async (req, res) => {

    const { query } = req.params

    try {
        const data = await fetchFromAPI(`https://fakestoreapi.com/products/category/${query}`)

        res.status(200).json({ success: true, content: data })
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'server error' })
    }
}