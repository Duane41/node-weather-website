const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +  ".json?" + 
    "access_token=pk.eyJ1IjoiZHVhbmU0MSIsImEiOiJja2p4NGR5eXIwbGN3MndtbHFtNHphbm9qIn0.at-84pa4swQAaSa-2UFZQQ" +
    "&limit=1"

    request({ 
        url,
        json: true
        }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to location services', undefined)
            } else if(body.features.length === 0) {
                callback("Unable to find location. Try another search.", undefined)
            } else {
                const { coordinates} = body.features[0].geometry
                const { place_name } = body.features[0]

                callback(undefined, {
                    latitude: coordinates[0],
                    longitude: coordinates[1],
                    location: place_name
                })
            }
        
    })
}

module.exports = geocode

