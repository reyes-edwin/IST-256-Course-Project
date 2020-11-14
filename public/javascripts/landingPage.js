window.addEventListener("DOMContentLoaded", function(event){
    console.log("Document up.");

});

//TODO: Test session storage 
//TODO: submit buttons to currentWeather.html

//TODO: Set up check against API for valid zip code/coords


function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation, showError);
    } else { 
      // autoLocation.innerHTML = "Geolocation is not supported by this browser.";
      alert("Geolocation is not supported by this browser.");
    }
  }

  function setLocation(position){
    let lat =  position.coords.latitude;
    let long = position.coords.longitude;

    if (typeof(Storage) !== "undefined") {
      if((lat != null) && (long != null)){
        sessionStorage.setItem("lat", lat);
        sessionStorage.setItem("long", long);

        //Used to Test Lat/Long
        let loc1 = sessionStorage.getItem("lat");
        let loc2 = sessionStorage.getItem("long");
        alert('Lat: ' + loc1 + " Long: " + loc2);
      }
    } else {
          alert("Sorry, your browser does not support Web Storage...");
    }

  }


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