const { fetchFromTMDB } = require('../services/tmdb')

exports.getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
        const randomMovie = data.results[Math.floor() * data.results?.lenght]

        res.status(200).json({ success: true, content: randomMovie })
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'server error' })
    }
}