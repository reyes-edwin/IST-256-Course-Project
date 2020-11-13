window.addEventListener("DOMContentLoaded", function(event){
    console.log("Document up.");

});

var lat = null;
var long = null; 
function setLocation(){
  if (typeof(Storage) !== "undefined") {
    // Store
    console.log(lat + "*" + long);
    if((lat != null) && (long != null)){
      console.log(lat + "*" + long);
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("long", long);
      alert(sessionStorage.getItem("lat"));
    } else {
      alert("Lat or long have not been read");
    }
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}

// var autoLocation = document.getElementById("detectLocation");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else { 
    // autoLocation.innerHTML = "Geolocation is not supported by this browser.";
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
//   autoLocation.innerHTML = "Latitude: " + position.coords.latitude + 
//   "<br>Longitude: " + position.coords.longitude;

 // let location = {lat: position.coords.latitude, long:  position.coords.longitude};
  lat =  position.coords.latitude;
  long = position.coords.longitude;
  console.log("Latitude: " + lat + 
    "\nLongitude: " + long);
  // console.log("location inside showPos: " + location);
  // return location;
}

//TODO: Add in error handling

function showError(error) {
  switch(error.code) {
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