const axios = require('axios')

exports.fetchFromTMDB = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer' + process.env.TMDB_API_KEY
        }
    };

    const response = await axios.get(url, options)

    if (response.status !== 200) {
        throw new Error('failed to fetch data from TMDB' + response.statusText)
    }

    return response.data

}