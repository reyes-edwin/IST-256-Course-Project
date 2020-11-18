// Ensure the JS code is loaded before running
$(document).ready(function () {
  getWeather();
});

let getZip = sessionStorage.getItem("zipCode");

function getWeather() {
  $.getJSON(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      getZip +
      ",us&units=imperial&appid=c0c35b925bbddaaf1dca134adf31f13a",

    function getWeather(data) {
      console.log(data);
      console.log("User entered: " + getZip);
      // getting the temperature from the API
      let temp = Math.floor(data.main.temp);
      $(".temp").html(temp + "&deg;F");

      // getting the weather condition rom the API
      let weather = data.weather[0].main;
      $(".condition").html(weather);

      // select city class and append the user location
      let location = sessionStorage.getItem("cityName");
      $(".city").html(location + " Weather");

      // Select the wind class and append the current wind speed
      let wind = data.wind.speed;
      $("#windSpeed").html(wind + " mph");
    


      // Select the sunrise class
      let rise = data.sys.sunrise;
      var date = new Date(rise * 1000);

      // Hours part from the timestamp
      var hours = date.getHours();

      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();

      // Display time in 10:20 format
      var formattedTime = hours + ":" + minutes.substr(-2);

      // append the time the sun rose
      $("#rise").html(formattedTime + " am")
      

      // Select the sunset class
      let set = data.sys.sunset;
      var date = new Date(set * 1000);

      // Hours part from the timestamp
      var hours = date.getHours();
      hours = hours % 12 || 12;

      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();

      // Display time in 10:20 format
      var formattedTime = hours + ":" + minutes.substr(-2);

      // append the time the sun rose
      $("#set").html(formattedTime + " pm");
      
      


      // list of icons based on the weather condition
      const nightIconList = {
        200: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        201: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        202: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        210: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        211: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        212: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        221: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        230: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        231: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        232: "./images/night-icons/ios11-weather-thunderstorm-icon.png",
        300: "./images/night-icons/ios11-weather-drizzle-icon.png",
        301: "./images/night-icons/ios11-weather-drizzle-icon.png",
        302: "./images/night-icons/ios11-weather-drizzle-icon.png",
        310: "./images/night-icons/ios11-weather-drizzle-icon.png",
        311: "./images/night-icons/ios11-weather-drizzle-icon.png",
        312: "./images/night-icons/ios11-weather-drizzle-icon.png",
        313: "./images/night-icons/ios11-weather-drizzle-icon.png",
        314: "./images/night-icons/ios11-weather-drizzle-icon.png",
        321: "./images/night-icons/ios11-weather-drizzle-icon.png",
        500: "./images/night-icons/ios11-weather-rain-icon.png",
        501: "./images/night-icons/ios11-weather-rain-icon.png",
        502: "./images/night-icons/ios11-weather-heavy-rain-icon.png",
        503: "./images/night-icons/ios11-weather-heavy-rain-icon.png",
        504: "./images/night-icons/ios11-weather-heavy-rain-icon.png",
        511: "./images/night-icons/ios11-weather-hail-icon.png",
        520: "./images/night-icons/ios11-weather-rain-icon.png",
        521: "./images/night-icons/ios11-weather-rain-icon.png",
        522: "./images/night-icons/ios11-weather-heavy-rain-icon.png",
        531: "./images/night-icons/ios11-weather-rain-icon.png",
        600: "./images/night-icons/ios11-weather-scattered-snow-icon.png",
        601: "./images/night-icons/ios11-weather-snow-icon.png",
        602: "./images/night-icons/ios11-weather-snow-sleet-icon.png",
        611: "./images/night-icons/ios11-weather-snow-sleet-icon.png",
        612: "./images/night-icons/ios11-weather-snow-sleet-icon.png",
        613: "./images/night-icons/ios11-weather-snow-sleet-icon.png",
        615: "./images/night-icons/ios11-weather-hail-icon.png",
        616: "./images/night-icons/ios11-weather-hail-icon.png",
        620: "./images/night-icons/ios11-weather-snow-icon.png",
        621: "./images/night-icons/ios11-weather-snow-icon.png",
        622: "./images/night-icons/ios11-weather-snow-sleet-icon.png",
        701: "./images/night-icons/ios11-weather-haze-icon.png",
        711: "./images/night-icons/ios11-weather-smoke-icon.png",
        721: "./images/night-icons/ios11-weather-haze-icon.png",
        731: "./images/night-icons/ios11-weather-dust-icon.png",
        741: "./images/night-icons/ios11-weather-fog-icon.png",
        751: "./images/night-icons/ios11-weather-dust-icon.png",
        761: "./images/night-icons/ios11-weather-dust-icon.png",
        762: "./images/no-report-icon.png",
        771: "./images/no-report-icon.png",
        781: "./images/night-icons/ios11-weather-tornado-icon.png",
        800: "./images/night-icons/ios11-weather-clear-night-icon.png",
        801: "./images/night-icons/ios11-weather-partly-cloudy-night-icon.png",
        802: "./images/night-icons/ios11-weather-partly-cloudy-night-icon.png",
        803: "./images/night-icons/ios11-weather-cloudy-icon.png",
        804: "./images/night-icons/ios11-weather-cloudy-icon.png",
      };
      const dayIconList = {
        200: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        201: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        202: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        210: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        211: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        212: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        221: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        230: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        231: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        232: "./images/day-icons/ios11-weather-thunderstorm-icon.png",
        300: "./images/day-icons/ios11-weather-drizzle-icon.png",
        301: "./images/day-icons/ios11-weather-drizzle-icon.png",
        302: "./images/day-icons/ios11-weather-drizzle-icon.png",
        310: "./images/day-icons/ios11-weather-drizzle-icon.png",
        311: "./images/day-icons/ios11-weather-drizzle-icon.png",
        312: "./images/day-icons/ios11-weather-drizzle-icon.png",
        313: "./images/day-icons/ios11-weather-drizzle-icon.png",
        314: "./images/day-icons/ios11-weather-drizzle-icon.png",
        321: "./images/day-icons/ios11-weather-drizzle-icon.png",
        500: "./images/day-icons/ios11-weather-rain-icon.png",
        501: "./images/day-icons/ios11-weather-rain-icon.png",
        502: "./images/day-icons/ios11-weather-heavy-rain-icon.png",
        503: "./images/day-icons/ios11-weather-heavy-rain-icon.png",
        504: "./images/day-icons/ios11-weather-heavy-rain-icon.png",
        511: "./images/day-icons/ios11-weather-hail-icon.png",
        520: "./images/day-icons/ios11-weather-rain-icon.png",
        521: "./images/day-icons/ios11-weather-rain-icon.png",
        522: "./images/day-icons/ios11-weather-heavy-rain-icon.png",
        531: "./images/day-icons/ios11-weather-rain-icon.png",
        600: "./images/day-icons/ios11-weather-scattered-snow-icon.png",
        601: "./images/day-icons/ios11-weather-snow-icon.png",
        602: "./images/day-icons/ios11-weather-snow-sleet-icon.png",
        611: "./images/day-icons/ios11-weather-snow-sleet-icon.png",
        612: "./images/day-icons/ios11-weather-snow-sleet-icon.png",
        613: "./images/day-icons/ios11-weather-snow-sleet-icon.png",
        615: "./images/day-icons/ios11-weather-hail-icon.png",
        616: "./images/day-icons/ios11-weather-hail-icon.png",
        620: "./images/day-icons/ios11-weather-snow-icon.png",
        621: "./images/day-icons/ios11-weather-snow-icon.png",
        622: "./images/day-icons/ios11-weather-snow-sleet-icon.png",
        701: "./images/day-icons/ios11-weather-haze-icon.png",
        711: "./images/day-icons/ios11-weather-smoke-icon.png",
        721: "./images/day-icons/ios11-weather-haze-icon.png",
        731: "./images/day-icons/ios11-weather-dust-icon.png",
        741: "./images/day-icons/ios11-weather-fog-icon.png",
        751: "./images/day-icons/ios11-weather-dust-icon.png",
        761: "./images/day-icons/ios11-weather-dust-icon.png",
        762: "./images/no-report-icon.png",
        771: "./images/no-report-icon.png",
        781: "./images/day-icons/ios11-weather-tornado-icon.png",
        800: "./images/day-icons/ios11-weather-sunny-icon.png",
        801: "./images/day-icons/ios11-weather-partly-sunny-icon.png",
        802: "./images/day-icons/ios11-weather-partly-sunny-icon.png",
        803: "./images/day-icons/ios11-weather-cloudy-icon.png",
        804: "./images/day-icons/ios11-weather-cloudy-icon.png",
      };

      function changeIcon(id, time) {
        if (time == "d") {
          return dayIconList[id];
        } else if (time == "n") {
          return nightIconList[id];
        }
      }

      $(".icon").attr(
        "src",
        changeIcon(data.weather[0].id, data.weather[0].icon.substring(2))
      );
      
      // Change the background image and the container color depending on the weather condition.
      if (weather === "Clear") {
        document.body.style.backgroundImage = "url('images/clearSky.jpg')";
        document.getElementById("container").style.background = "#6691BB";
      } else if (weather === "Rain") {
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        document.getElementById("container").style.background =
          "linear-gradient(180deg, rgba(127, 123, 130, 1) 0%, #3c3c3c 100%";
      } else if (weather === "Clouds") {
        document.body.style.backgroundImage = "url('images/cloudy.jpg')";
        document.getElementById("container").style.background = "#465367";
      } else if (weather === "Thunderstorm") {
        document.body.style.backgroundImage = "url('images/thunder.jpg')";
        document.getElementById("container").style.background = "#78777F";
      } else if (weather === "Snow") {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
        document.getElementById("container").style.background = "#759AAC";
      } else if (weather === "Fog" || weather === "Mist") {
        document.body.style.backgroundImage = "url('images/fog.jpg')";
        document.getElementById("container").style.background = "#78777F";
      }
    }
  );
}

$("form").submit(function (e) {
  e.preventDefault();
  var newZip = $("input").first().val();
  sessionStorage.setItem("zipCode", newZip);
  $.ajax({
    method: "GET",
    url:
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
      sessionStorage.getItem("zipCode") +
      "&appid=c0c35b925bbddaaf1dca134adf31f13a",
    success: function (data) {
      sessionStorage.setItem("lat", data.coord.lat);
      sessionStorage.setItem("lon", data.coord.lon);
      sessionStorage.setItem("cityName", data.name);
      getWeather();
    },
  });
});
