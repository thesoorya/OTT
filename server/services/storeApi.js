const axios = require('axios')

exports.fetchFromAPI = async (url) => {

    const response = await axios.get(url)

    if (response.status !== 200) {
        throw new Error('failed to fetch data from API' + response.statusText)
    }

    return response.data

}