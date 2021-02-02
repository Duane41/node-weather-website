const request = require('request')
 const forecast = (lat, long, callback) => {
     
    const url = 'http://api.weatherstack.com/current?access_key=639ac3fff329dbe31f939df4c0c7b554&query=' + lat + ',' + long

    request({ 
        url,
        json: true
        }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            console.log(body.error)
            callback("Unable to find location", undefined)
        } else {
            const {temperature, feelslike, precip} = body.current
            console.log(body.current)
            callback(undefined, 
            {
                current_temp: temperature,
                feels_like_temp: feelslike,
                precip: precip
            })
        }
    })
 }

 module.exports = forecast
