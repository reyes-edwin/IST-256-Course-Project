var axios = require('axios').default;
var express = require('express');
var router = express.Router();

// Gets current weather data from OpenWeatherAPI given geographic coordinates sent in an ajax request
router.get('/coords', function(req, res, next){
    const apiKey = 'c0c35b925bbddaaf1dca134adf31f13a';
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&units=imperial&appid=${apiKey}`).then((response) => {
        res.send(response.data);
    }).catch((err) =>
    {
        res.send(err);
    });

});

// Gets the previous day's weather data from OpenWeatherAPI given geographic coordinates and a date sent in an ajax request
router.get('/coords/previous', function(req, res, next){
    const apiKey = 'c0c35b925bbddaaf1dca134adf31f13a';
    
    axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${req.query.lat}&lon=${req.query.lon}&dt=${req.query.date}&units=imperial&appid=${apiKey}`).then((response) => {
        res.send(response.data);
    }).catch((err) =>
    {
        res.send(err);
    });

});

// Gets weather data from a variant of the OpenWeather API, Onecall, which also provides weekly/hourly data given geographic coordinates sent in an ajax request
router.get('/coords/onecall', function(req, res, next){
    const apiKey = 'c0c35b925bbddaaf1dca134adf31f13a';
    
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.query.lat}&lon=${req.query.lon}&exclude=minutely,alerts&units=imperial&appid=${apiKey}`).then((response) => {
        res.send(response.data);
    }).catch((err) =>
    {
        res.send(err);
    });

});

// Gets current weather data from OpenWeatherAPI given a zip code sent in an ajax request
router.get('/zipCode', function(req, res, next) {
    const apiKey = 'c0c35b925bbddaaf1dca134adf31f13a';

    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${req.query.zipCode},us&appid=${apiKey}`).then((response) => { 
        res.send(response.data);
    }).catch((err) =>
    {
        res.send(err);
    });
    
});

module.exports = router;