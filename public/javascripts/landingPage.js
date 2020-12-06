$(document).ready(function () {
  setSessionID(sessionStorage.sessionID);
});

function printData(data) {
  console.log(data);
}

//CRUD Operations

//Sets an ID called SessionID, which saves through page refreshes so data can be accessed from the database via an ID
function setSessionID(id) {
  if (typeof Storage !== "undefined") {
    sessionStorage.setItem("sessionID", id);
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }

  sessionID = sessionStorage.sessionID;
}

//Creates an entry in the database given location data and connects this entry to the SessionID
function createLocationData(lat, lon, zip, cityName) {
  $.ajax({
    method: "POST",
    url: "/create",
    data: {
      lat: lat,
      lon: lon,
      zipCode: zip,
      cityName: cityName,
    },
    async: false,
    success: function (data) {
      setSessionID(data);
      console.log(`Data stored successfully under id: ${sessionID}`);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
    },
  });
}

//Reads the data from an entry in the database given its ID and returns the data as a json object--or returns null if there's an error
function readLocationData(sessionID) {
  var locationData;

  $.ajax({
    method: "GET",
    url: "/read",
    data: {
      id: sessionID,
    },
    async: false,
    success: function (data) {
      locationData = {
        lat: data.lat,
        lon: data.lon,
        zipCode: data.zipCode,
        cityName: data.cityName,
      };
      //console.log(data);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
      locationData = null;
    },
  });

  return locationData;
}

//Updates an entry in the database given its ID and and the data to be updated
function updateLocationData(sessionID, lat, lon, zip, cityName) {
  $.ajax({
    method: "POST",
    url: "/update",
    data: {
      id: sessionID,
      lat: lat,
      lon: lon,
      zipCode: zip,
      cityName: cityName,
    },
    async: false,
    success: function (data) {
      console.log(`Data has been updated to: \n${data}`);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
    },
  });
}

//Deletes an entry given its ID and logs what was deleted to the console
function deleteLocationData(sessionID) {
  $.ajax({
    method: "POST",
    url: "/delete",
    data: {
      id: sessionID,
    },
    success: function (data) {
      console.log(data);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
    },
  });
}

//Deletes all entries in the database
function clearData(lat, lon, zip, cityName) {
  $.ajax({
    method: "POST",
    url: "/deleteAll",
    async: false,
    success: function (data) {
      console.log(data);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
    },
  });
}



// Handler for auto-detect location button
$("#detectLocation").click(function (e) {
  //e.preventDefault();
  // alert("start");
  getAutoLocation();
  // alert("endOfClick");
});

//Delegate for changing the page during automatic location detection
function updatePage() {
  //if (sessionStorage.getItem("lat")) {
  if (readLocationData(sessionID).lat) {
    $(location).attr("href", "currentWeather.html");
  }
}

// Handler for zipCode input button, including validation that the zip code's data is available from the Weather API.
$("#zipCodeForm").submit(submitProvidedLocation);

function submitProvidedLocation() {
  let zipCode = $("#zipCode").val();
  console.log(zipCode);
  if (verifyZipCode(zipCode)) {
    setZipCode(zipCode);
  } else {
    //setZipCode(null);
    event.preventDefault();
    alert(
      "Sorry, it appears this zip code's weather data is unavailable.\nPlease enter a new zip code!"
    );
  }
}

//Retrieve location coordinates from Geolocation auto-detection.
function getAutoLocation() {
  if (navigator.geolocation) {
    // alert("getAutoLocation");
    navigator.geolocation.getCurrentPosition(setCoords, showAutoLocError);
    // alert("setCoords was called");
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function setCoords(position) {
  //alert("setcoords");
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  if (lat != null && lon != null) {
    createLocationData(lat, lon, "undetected", getName(lat, lon));

    // alert("calling clickHandler");
    //Used to Test Lat/Lon
    // let loc1 = sessionStorage.getItem("lat");
    // let loc2 = sessionStorage.getItem("lon");
    // alert("Lat: " + loc1 + " Lon: " + loc2);
    updatePage();
  } else {
    console.log("Error: The coordinates were registered as null.");
  }
}

/*
function setCoords(position) {
  //alert("setcoords");
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  if (typeof Storage !== "undefined") {
    if (lat != null && lon != null) {
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("lon", lon);
      sessionStorage.setItem("zipCode", "undetected");
      setName(lat, lon);

      

      // alert("calling clickHandler");
      //Used to Test Lat/Lon
      // let loc1 = sessionStorage.getItem("lat");
      // let loc2 = sessionStorage.getItem("lon");
      // alert("Lat: " + loc1 + " Lon: " + loc2);
      updatePage();
    } else {
      console.log("Error: The coordinates were registered as null.");
    }
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}
*/

function showAutoLocError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert(
        "Please change your browser's permissions to allow for automatic location detection."
      );
      // sessionStorage.setItem("lat", null);
      // sessionStorage.setItem("lon", null);
      deleteLocationData(sessionID);
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      // sessionStorage.setItem("lat", null);
      // sessionStorage.setItem("lon", null);
      break;
    case error.TIMEOUT:
      alert("The request to get your location timed out. Please");
      // sessionStorage.setItem("lat", null);
      // sessionStorage.setItem("lon", null);
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      // sessionStorage.setItem("lat", null);
      // sessionStorage.setItem("lon", null);
      break;
  }
}

/*
//Set the zip code and coordinates after the zip code has been verified.
function setZipCode(zipCode) {
  if (typeof Storage !== "undefined") {
    sessionStorage.setItem("zipCode", zipCode);
    if (zipCode != null) {
      setCoordsFromZip(zipCode);
    }
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
}
*/

//Set the zip code and coordinates after the zip code has been verified.
function setZipCode(zipCode) {
  if (zipCode != null) {
    var coords = getCoordsFromZip(zipCode);
    createLocationData(coords.lat, coords.lon, zipCode, coords.cityName);
  } else {
    createLocationData(null, null, null, null);
  }
}

//Verify that the inputted zip code matches weather stored in the Weather API.
function verifyZipCode(zipCode) {
  let isValid = false;

  if (zipCode != null && zipCode >= 0) {
    $.ajax({
      method: "GET",
      url: "/weather/zipCode",
      data: {
        zipCode: zipCode,
      },
      async: false,
      success: function (data) {
        // console.log("made it to success");
        // console.log(typeof(data.name));
        console.log(data);
        if (data.name === "Error") {
          // console.log("false");
          isValid = false;
        } else {
          // console.log("true");
          isValid = true;
        }
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ": " + xhr.statusText;
        console.log("Error: " + errorMessage);
        isValid = false;
      },
    });
  } else {
    isValid = false;
  }

  return isValid;
}

/*
//Set the coordinates using a call to the API with the verified zip code.
function setCoordsFromZip(zipCode) {
  $.ajax({
    method: "GET",
    url: "/weather/zipCode",
    data: {
      zipCode: zipCode,
    },
    async: false,
    success: function (data) {
      sessionStorage.setItem("lat", data.coord.lat);
      sessionStorage.setItem("lon", data.coord.lon);
      sessionStorage.setItem("cityName", data.name);
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
    },
  });
}
*/

//Set the coordinates using a call to the API with the verified zip code.
function getCoordsFromZip(zipCode) {
  var coords;

  $.ajax({
    method: "GET",
    url: "/weather/zipCode",
    data: {
      zipCode: zipCode,
    },
    async: false,
    success: function (data) {
      coords = {
        lat: data.coord.lat,
        lon: data.coord.lon,
        cityName: data.name,
      };
    },
    error: function (xhr, status, error) {
      var errorMessage = xhr.status + ": " + xhr.statusText;
      console.log("Error: " + errorMessage);
      coords = null;
    },
  });

  return coords;
}

/*
//Set the city name using a call to the API with the detected latitude and longitude.
function setName(lat, lon) {
  if (lat != null && lon != null) {
    $.ajax({
      method: "GET",
      url: "/weather/coords",
      data: {
        lat: lat,
        lon: lon,
      },
      async: false,
      success: function (data) {
        sessionStorage.setItem("cityName", data.name);
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ": " + xhr.statusText;
        console.log("Error: " + errorMessage);
      },
    });
  }
}
*/

//Set the city name using a call to the API with the detected latitude and longitude.
function getName(lat, lon) {
  var cityName;

  if (lat != null && lon != null) {
    $.ajax({
      method: "GET",
      url: "/weather/coords",
      data: {
        lat: lat,
        lon: lon,
      },
      async: false,
      success: function (data) {
        cityName = data.name;
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ": " + xhr.statusText;
        console.log("Error: " + errorMessage);
        cityName = null;
      },
    });
  }

  return cityName;
}

//Backup functions which directly call OpenWeather API rather than local API, used for testing API.

// VerifyZipCode function which calls directly on the OpenWeather API rather than local API.
/*
function verifyZipCode(zipCode) {
  let isValid = false;
  const apiKey = "c0c35b925bbddaaf1dca134adf31f13a";

  if (zipCode != null && zipCode >= 0) {
    $.ajax({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`,
      async: false,
      success: function (data) {
        console.log(data);
        isValid = true;
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ": " + xhr.statusText;
        console.log("Error: " + errorMessage);
        isValid = false;
      },
    });
  } else {
    isValid = false;
  }
  return isValid;
}

// SetCoordsFromZip function which calls directly on the OpenWeather API rather than local API.
function setCoordsFromZip(zipCode) {
  const apiKey = "c0c35b925bbddaaf1dca134adf31f13a";

  if (zipCode != null) {
    $.ajax({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`,
      async: false,
      success: function (data) {
        sessionStorage.setItem("lat", data.coord.lat);
        sessionStorage.setItem("lon", data.coord.lon);
        sessionStorage.setItem("cityName", data.name);
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ": " + xhr.statusText;
        console.log("Error: " + errorMessage);
      },
    });
  }
}

//SetName function which calls directly on the OpenWeather API rather than local API.
function setName(lat, lon) {
  const apiKey = "c0c35b925bbddaaf1dca134adf31f13a";
  // alert("setName");
  if (lat != null && lon != null) {
    $.ajax({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      async: false,
      success: function (data) {
        sessionStorage.setItem("cityName", data.name);
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ": " + xhr.statusText;
        console.log("Error: " + errorMessage);
      },
    });
  }
}

//End of backup functions

*/

//  Test the Geolocation built-in API

// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     alert("Geoloc not supported");
//   }
// }

// function showPosition(position) {
//   alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
// }
