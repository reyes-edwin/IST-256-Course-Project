window.addEventListener("DOMContentLoaded", function(event){
    console.log("Document up.");

});

// var autoLocation = document.getElementById("detectLocation");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
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