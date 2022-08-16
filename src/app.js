const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbar engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        titulo: 'Weather App',
        nombre: 'Jose Eslava'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        titulo: 'Solicita tu ticket de servicio',
        nombre: 'Jose Eslava'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        titulo: 'Conocenos!',
        nombre: 'Jose Eslava'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No se encontró la dirección'
        })
    }

    forecast(req.query.address, (error, forecastData) => {
        if (error) {
            res.send({ error })
        }

        res.send({
            clima: forecastData,
            address: req.query.address
        })
    
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        titulo: '404 Page',
        nombre: 'Jose Eslava',
        errorMessage: 'Help article does not exist'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        titulo: '404 Page',
        nombre: 'Jose Eslava',
        errorMessage: 'There is no more info!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        titulo: '404 Page',
        nombre: 'Jose Eslava',
        errorMessage: 'Page does not exist'
    })
})

app.listen(port, () => {
    console.log('Server is up on server ' + port)
})
