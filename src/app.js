const express = require('express');
const hbs = require('hbs');
const path = require ('path');
const app = express();

// custom modules
const weatherData = require('../utils/weatherData');

// use the environemntal variable for port (or default to 3000)
const port = process.env.PORT || 3000;

// tell express (app) where all the static files (css, js, etc.), templates, and partials are located
const publicStaticDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set the view engine, views, partials, and use the necessary static files
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirectoryPath)); 

// main/home (index)
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    });
});

// weather api endpoint localhost:3000/weather?location={name of city here}
app.get('/weather', (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.send({
            error: "No location has been entered"
        });
    };

    weatherData(location, (error, {city, country, longitude, latitude, description, temperature, minTemp, maxTemp, humidity} = {}) => {
        if (error) {
            return res.send({
                error
            });
        };
        // console.log(city, country, coordinates, description, temperature, minTemp, maxTemp, humidity);
        res.send({
            city,
            country,
            longitude,
            latitude,
            description,
            temperature,
            minTemp,
            maxTemp,
            humidity
        });
    });
});

// prevents user from navigating to non-existant routes *KEEP BELOW ALL OTHER ROUTES
app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    });
});


app.listen(port, () => {
    console.log("Node server running on port: ", port);
});