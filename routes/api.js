var axios = require('axios').default;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    let lat = 40.793396;
    let lon = -77.860001;
    axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=daily,minutely,alerts&units=imperial&appid=c0c35b925bbddaaf1dca134adf31f13a').then(function(response){
        res.send(response.data.current);
    });

});

module.exports = router;