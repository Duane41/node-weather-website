const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

const app = express()

const partialPath = path.join(__dirname, '../templates/partials')

//Define paths for Express config and setup for handlebars location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
app.use(express.static(path.join(__dirname, "../public")))
hbs.registerPartials(partialPath)


const viewsPath = 


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Duane de Villiers'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: "Duane de Villiers"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "Help message",
        name: "Duane de Villiers"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return console.log(error)
        } else {
            forecast(latitude , longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                } else {
                    res.send({
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    })
                }
            })
        }
        
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({products: []})
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error:",
        message: "Help article not found",
        name: "Duane de Villiers"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error:",
        message: "Page not found",
        name: "Duane de Villiers"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})