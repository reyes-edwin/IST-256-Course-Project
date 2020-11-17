$(document).ready(function(){
  //testAPICall();
  getLocation();
});

//  API Testing
// function testAPICall(){
//   $.ajax({
//     method: 'GET',
//     url: '/api',
//     success: function(data){
//       console.log(data);
//     }
//   });
// }


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geoloc not supported");
  }
}

function showPosition(position) {
  alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
}


///////////////////

$("#detectLocation").click(submitDetectedLocation);

function submitDetectedLocation() {
  getAutoLocation();
  $(location).attr("href", "currentWeather.html");
}

$("#zipCodeForm").submit(submitProvidedLocation);

function submitProvidedLocation() {
  let zipCode = $("#zipCode").val();
  if(verifyZipCode(zipCode)){
    setZipCode(zipCode);
  } else{
    setZipCode(null);
    event.preventDefault();
    alert("Sorry, it appears this zip code's weather data is unavailable.\nPlease enter a new zip code!");
  }
}

function getAutoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCoords, showAutoLocError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function setCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  if (typeof Storage !== "undefined") {
    if (lat != null && lon != null) {
      console.log("Hello");
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("lon", lon);
      sessionStorage.setItem("zipCode", "undetected");

      //Used to Test Lat/Lon
      let loc1 = sessionStorage.getItem("lat");
      let loc2 = sessionStorage.getItem("lon");
      alert("Lat: " + loc1 + " Lon: " + loc2);
    } else{
      alert("coords registered as null");
      
    }
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}

function showAutoLocError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}




function setZipCode(zipCode) {
  if (typeof Storage !== "undefined") {
    sessionStorage.setItem("zipCode", zipCode);
    if(zipCode != null){
      setCoordsFromZip(zipCode);
    }
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}

function verifyZipCode(zipCode) {
  let isValid = false;
  apiKey = 'c0c35b925bbddaaf1dca134adf31f13a';

  if (zipCode != null && zipCode >= 0) {
    $.ajax({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`,
      async: false,
      success: function(data) {
        console.log(data);
        isValid = true;
      }, 
      error: function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        console.log("Error: " + errorMessage);
        isValid = false;
      }
    });
  } 
  else{
    isValid = false;
  }
  return isValid;
}

function setCoordsFromZip(zipCode){
  if(zipCode != null){
    $.ajax({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`,
      success: function(data) {
        sessionStorage.setItem("lat", data.coord.lat);
        sessionStorage.setItem("lon", data.coord.lon);
        sessionStorage.setItem("cityName", data.name);
      },
      error: function(xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        console.log("Error: " + errorMessage);
      }
    });
  }
}
