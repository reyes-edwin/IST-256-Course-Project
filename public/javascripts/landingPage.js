window.addEventListener("DOMContentLoaded", function(event){
    console.log("Document up.");

});

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
    alert("Latitude: " + position.coords.latitude + 
    "\nLongitude: " + position.coords.longitude);
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