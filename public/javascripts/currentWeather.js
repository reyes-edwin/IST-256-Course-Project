$(document).ready(function () {});

var nameInput = document.getElementById("input");
document
  .querySelector("form.search-form")
  .addEventListener("submit", function (e) {
    //prevent the normal submission of the form
    e.preventDefault();
    $.getJSON(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        nameInput.value +
        ",us&units=imperial&appid=c0c35b925bbddaaf1dca134adf31f13a",
      function (data) {
        console.log(data);

        let icon =
          "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        $(".icon").attr("src", icon);

        let temp = Math.floor(data.main.temp);
        $(".temp").append(temp + "&deg;");

        let weather = data.weather[0].main;
        $(".condition").append(weather);
        if (weather === "Clear") {
          document.body.style.backgroundImage = "url('images/clearSky.jpg')";
          document.getElementById("container").style.background =
            " linear-gradient(180deg, rgba(61,167,232,1) 0%, rgba(135,206,250,1) 100%)";
        } else if (weather === "Rain") {
          document.body.style.backgroundImage = "url('images/rain.jpg')";
        }

        let location = data.name;
        $(".city").append(location + " Weather");

        let wind = data.wind.speed;
        $(".wind").append(wind + " mph");
      }
    );
  });

$("form").submit(function () {
  $("input[type=submit]", this).attr("disabled", "disabled");
});
