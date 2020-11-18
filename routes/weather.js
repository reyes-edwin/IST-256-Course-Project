const axios = require('axios').default;
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
    const apiKey = 'c0c35b925bbddaaf1dca134adf31f13a';
    
    let lat = sessionStorage.getItem("lat");
    let lon = -77.860001;
    axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=daily,minutely,alerts&units=imperial&appid=c0c35b925bbddaaf1dca134adf31f13a').then(function(response){
        res.send(response.data.current);
    });

});


router.get('/zipCode', function(req, res, next) {
    const apiKey = 'c0c35b925bbddaaf1dca134adf31f13a';

    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${req.query.zipCode},us&appid=${apiKey}`).then((response) => { 
        res.send(response.data.current);
    }).catch((err) =>
    {
        console.log('An error has occurred');
        
    });
    
    
});

module.exports = router;