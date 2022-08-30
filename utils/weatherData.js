const request = require('request');
const constants = require('../config');

// builds object with weather data based on location parameter (in this case, the city name)
const weatherData = (location, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(location) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    console.log('Weather appliation API is: ', url);
    request({url, json:true}, (error, {body}) => {
        // console.log(body);
        if (error) {
            callback("An error occurred. Unable to fetch data from weather map api", undefined);
        } else if (!body.main || !body.name || !body.sys || !body.coord || !body.weather) {
            callback("Unable to find data on location. Please enter a new location", undefined);
        } else {
            callback(undefined, {
                city: body.name,
                country: body.sys.country,
                latitude: body.coord.lat,
                longitude: body.coord.lon,
                description: body.weather[0].description,
                temperature: body.main.temp,
                minTemp: body.main.temp_min,
                maxTemp: body.main.temp_max,
                humidity: body.main.humidity
            });
        };
    });
};

module.exports = weatherData;