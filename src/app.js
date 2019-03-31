const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

//creates an express application
const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alexandru-Dan Maftei'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Alexandru-Dan Maftei'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Alexandru-Dan Maftei'
    })
})

app.get('/weather', (req, res) => {    
    if(!req.query.address){
        return res.send({
            error: "Address must be provided"
        })        
    }
    geocode(req.query.address, (error,  {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })    
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        errorMessage: 'Help article not found',
        title: 'Help',
        name: 'Alexandru-Dan Maftei'
    })    
})

app.get('*', (req, res) => {
    res.render('error',{
        errorMessage: 'Page not found',
        title: 'Error',
        name: 'Alexandru-Dan Maftei'
    })
})

//start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})