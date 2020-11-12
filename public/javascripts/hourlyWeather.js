$.ajax({
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/weather?q=state college&appid=c0c35b925bbddaaf1dca134adf31f13a',
    success: function(data) {
        console.log(data);
        runAPI(data);
    }
});

function runAPI(obj) {
    var lat = obj.coord.lat;
    var lon = obj.coord.lon;
    console.log(lat + " " + lon);
    $.ajax({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=daily,minutely,alerts&units=imperial&appid=c0c35b925bbddaaf1dca134adf31f13a',
        success: function(data) {
            populateWeather(data);
        }
    });
}

function populateWeather(obj) {
    console.log(obj.current.weather);
    for (var i = 0; i < 6; i++) {
        var hId = "#hour" + (i + 1);
        var iId = "#icon" + (i + 1);
        var hour = obj.hourly[i];
        var aChild = $(hId)[0].children[0].children;
        var nData = [];
        var arrayTracker = 0;
        console.log(hour);

        $(iId).attr("src", changeIcon(hour.weather[0].id));

        nData.push(convertToDate(hour.dt).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }));
        nData.push("State College, PA");
        nData.push(Math.round(hour.temp) + "&deg;F");
        nData.push(hour.weather[0].description);
        nData.push("Humidity: " + hour.humidity + "%");
        nData.push("Wind Speed: " + Math.round(hour.wind_speed) + " mph");
        nData.push("Rain: " + Math.round((hour.pop * 100)) + "%");
        for (var n = 0; n < aChild.length; n++) {
            if (aChild[n].tagName != "IMG") {
                aChild[n].innerHTML = nData[arrayTracker];
                arrayTracker++;
            }
        }
    }
}

function convertToDate(n) {
    var time = n * 1000;
    return new Date(time);
}

function changeIcon(id) {
    if (id == 800) {
        return "images/ios11-weather-sunny-icon.png";
    } else if (id == 801 || id == 802) {
        return "/images/ios11-weather-partly-sunny-icon.png";
    } else if (id == 803 || id == 804) {
        return "/images/ios11-weather-cloudy-icon.png"
    } else if (id > 599 && id < 700) {
        return "/images/ios11-weather-snow-icon.png";
    } else if (id > 499 && id < 600) {
        return "/images/ios11-weather-rain-icon.png";
    } else if (id > 299 && id < 400) {
        return "/images/ios11-weather-drizzle-icon.png";
    } else {
        return "/images/ios11-weather-thunderstorm-icon.png";
    }
}