$.ajax({
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/onecall?lat=40.8&lon=-77.86&exclude=current,hourly,minutely,alerts&units=imperial&appid=c0c35b925bbddaaf1dca134adf31f13a',
    success: function(data) {
        populateWeather(data);
    }
});


function populateWeather(obj) {
    for (var i = 0; i < 7; i++) {
        var dId = "#d" + (i + 1);
        var iId = "#icon" + (i + 1);
        var today = obj.daily[i];
        var nData = [];

        $(iId).attr("src", changeIcon(today.weather[0].id));

        nData.push(convertToDate(today.dt).toDateString().substring(0, 10));
        nData.push("State College, PA");
        nData.push(convertToDate(today.sunrise).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }));
        console.log(convertToDate(today.dt));
        nData.push(convertToDate(today.sunset).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true }));
        nData.push(Math.round(today.wind_speed) + " mph");
        nData.push(Math.round(today.temp.max) + "&deg;F/");
        nData.push(Math.round(today.temp.min) + "&deg;F");
        nData.push(today.weather[0].description);
        nData.push("Rain: " + Math.round((today.pop * 100)) + "%");
        nData.push("Humidity: " + today.humidity + "%");
        var aChild = $(dId)[0].children;
        var arrayTracker = 0;
        for (var n = 0; n < aChild.length; n++) {
            if (aChild[n].children.length > 0) {
                for (var k = 0; k < aChild[n].children.length; k++) {
                    if (aChild[n].children[k].tagName != "IMG") {
                        if (aChild[n].children[k].childNodes.length > 1) {
                            aChild[n].children[k].childNodes[1].nodeValue = " " + nData[arrayTracker];
                        } else {
                            aChild[n].children[k].innerHTML = nData[arrayTracker];
                        }
                        arrayTracker++;
                    }
                }
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