const { fetchFromAPI } = require('../services/storeApi')

exports.getProducts = async (req, res) => {
    try {
        const data = await fetchFromAPI('https://api.escuelajs.co/api/v1/products')

        res.status(200).json({ success: true, content: data })
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'server error' })
    }
}

exports.getProductById = async (req, res) => {

    const { id } = req.params

    try {
        const data = await fetchFromAPI(`https://api.escuelajs.co/api/v1/products/${id}`)

        res.status(200).json({ success: true, content: data })
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'server error' })
    }
}